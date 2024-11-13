import json
import os
import tempfile
import time
from pathlib import Path
from functools import partial

import docker
import pika

from enums import SubmissionStatus
from database import get_session
from models import Submission

class CodeExecutor:
    RABBITMQ_HOST = "rabbitmq"
    QUEUE_NAME = "submission_queue"
    SUFFIX = {"python": "py", "c": "c", "cpp": "cpp", "javascript": "js"}
    COMMAND = {
        "python": "sh -c 'python3 main.py < ./in'",
        "c": "sh -c 'gcc main.c -o out && ./out < ./in'",
        "cpp": "sh -c 'g++ main.cpp -o out && ./out < ./in'",
        "javascript": "sh -c 'node main.js < ./in'",
    }

    def __init__(self):
        self.client = docker.from_env()
        self.code_volume = self.get_container_volume("lovelace_worker-code")
        self.check_and_build_image("executor")

    def check_and_build_image(self, image_name: str):
        image_exists = any(image_name in (img.tags[0] if img.tags else "") for img in self.client.images.list())
        if image_exists:
            print(f"Image '{image_name}' found!")
            return

        print(f"Image '{image_name}' not found. Building...")
        try:
            _, build_logs = self.client.images.build(path=".", tag=image_name, dockerfile="./Dockerfile.executor")
            for log in build_logs:
                if "stream" in log:
                    print(log["stream"], end="")
        except docker.errors.BuildError as e:
            print(f"Build error: {e}")
            raise RuntimeError("Image build failed.")

    def get_container_volume(self, volume_name: str):
        container_id = os.getenv("HOSTNAME")
        container = self.client.containers.get(container_id)
        volume = next((m["Source"] for m in container.attrs["Mounts"] if m.get("Name") == volume_name), None)

        if volume is None:
            raise RuntimeError("Expected volume not configured on Worker.")
        return volume

    def process_submission(self, submission: Submission):
        with tempfile.TemporaryDirectory(dir="/code") as temp_dir:

            file_path = Path(temp_dir) / f"main.{self.SUFFIX[submission.language]}"
            file_path.write_text(submission.body)
            for test_case in submission.problem.testcases:
                file_path = Path(temp_dir) / "in"
                file_path.write_text(test_case.input)
                container = self.client.containers.run(
                    image="executor",
                    command=self.COMMAND[submission.language],
                    volumes={self.code_volume: {"bind": "/code", "mode": "rw"}},
                    remove=False,
                    working_dir=f"/code/{Path(temp_dir).name}",
                    network_disabled=True,
                    detach=True,
                    mem_limit=str(submission.problem.memory_limit)+'m',
                    memswap_limit=str(submission.problem.memory_limit)+'m',
                    mem_swappiness=0,
                )

                time.sleep(submission.problem.time_limit/1000)
                container.reload()

                if container.status == "running":
                    container.kill()
                    return SubmissionStatus.time_limit_exceeded
                elif container.attrs["State"]["ExitCode"] == 137:
                    return SubmissionStatus.memory_limit_exceeded
                elif container.attrs["State"]["ExitCode"] != 0:
                    return SubmissionStatus.runtime_error
                elif container.logs().decode("utf-8").strip() != test_case.output.strip():
                    return SubmissionStatus.wrong_answer
                container.remove()
                
        return SubmissionStatus.accepted

    def callback(self, ch, method, properties, body):
        session = next(get_session())
        message = json.loads(body.decode("utf-8"))
        query_result = session.query(Submission).filter(Submission.id == message["submission_id"]).first()
        
        session.query(Submission).filter(Submission.id == message["submission_id"]).update({"status": SubmissionStatus.running})
        session.commit()
        
        status = self.process_submission(query_result)
        session.query(Submission).filter(Submission.id == message["submission_id"]).update({"status": status})
        session.commit()

        session.close()
        print("Submission processed!")
        ch.basic_ack(delivery_tag=method.delivery_tag)

    def start_queue_listener(self):
        connection = pika.BlockingConnection(pika.ConnectionParameters(host=self.RABBITMQ_HOST))
        channel = connection.channel()
        channel.queue_declare(queue=self.QUEUE_NAME)
        callback_with_args = partial(self.callback)
        channel.basic_consume(queue=self.QUEUE_NAME, on_message_callback=callback_with_args, auto_ack=False)
        print(" [*] Waiting for messages. To exit press CTRL+C")
        channel.start_consuming()


if __name__ == "__main__":
    executor = CodeExecutor()
    executor.start_queue_listener()
