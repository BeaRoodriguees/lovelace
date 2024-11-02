import json
import os
import tempfile
from functools import partial
from pathlib import Path

import docker
import pika
from docker import DockerClient

RABBITMQ_HOST = "rabbitmq"
QUEUE_NAME = "submission_queue"

SUFFIX = {"python": ".py", "c": ".c", "cpp": ".cpp", "javascript": ".js"}

COMMAND = {
    "python": "sh -c 'python3 main.py'",
    "c": "sh -c 'gcc main.c -o out && ./out'",
    "cpp": "sh -c 'g++ main.cpp -o out && ./out'",
    "javascript": "sh -c 'node main.js'",
}


def check_and_build_image(client: DockerClient, image_name: str):
    images = client.images.list()
    image_names = [image.tags[0] if image.tags else None for image in images]

    if image_name not in image_names:
        print(f"Image '{image_name}' not found. Building...")

        try:
            image, build_logs = client.images.build(
                path=".", tag=image_name, dockerfile="./Dockerfile.executor"
            )

            # Log do build
            for log in build_logs:
                if "stream" in log:
                    print(log["stream"], end="")
        except Exception as e:
            print(e)
            raise RuntimeError("Image build failed.")
    else:
        print(f"Image '{image_name}' found!")


def get_container_volume(client: DockerClient, volume_name: str):
    container_id = os.getenv("HOSTNAME")
    container_origem = client.containers.get(container_id)
    mounts = container_origem.attrs["Mounts"]

    volume = None
    for mount in mounts:
        if mount.get("Name", "") == volume_name:
            volume = mount["Source"]
            break

    if volume is None:
        raise RuntimeError("Expected volume not configured on Worker.")

    return volume


def callback(ch, method, properties, body, client, code_volume):
    message = json.loads(body.decode("utf-8"))
    language = message["language"]
    code = message["code"]

    try:
        with tempfile.TemporaryDirectory(dir="/code") as temp_dir:
            temp_dir = Path(temp_dir)
            file_path = temp_dir / f"main{SUFFIX[language]}"

            with open(file_path, "w") as file:
                file.write(code)

            output = client.containers.run(
                "executor",
                command=COMMAND[language],
                volumes={code_volume: {"bind": "/code", "mode": "rw"}},
                remove=True,
                working_dir=f"/code/{temp_dir.name}",
                network_disabled=True,
            )

            print(output.decode("utf-8"))
    except Exception as e:
        print(e)


def receive_submission():
    client = docker.from_env()

    check_and_build_image(client, "executor")

    code_volume = get_container_volume(client, "lovelace_worker-code")
    callback_with_args = partial(callback, client=client, code_volume=code_volume)

    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
    channel = connection.channel()

    channel.queue_declare(queue=QUEUE_NAME)

    channel.basic_consume(
        queue=QUEUE_NAME, on_message_callback=callback_with_args, auto_ack=True
    )

    print(" [*] Waiting for messages. To exit press CTRL+C")
    channel.start_consuming()


if __name__ == "__main__":
    receive_submission()
