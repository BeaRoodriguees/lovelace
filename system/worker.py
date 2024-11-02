import json
import os
import subprocess
import tempfile
import time
from pathlib import Path

import docker
import pika

RABBITMQ_HOST = "rabbitmq"
QUEUE_NAME = "submission_queue"


SUFFIX = {"python": ".py", "c": ".c", "cpp": ".cpp", "javascript": ".js"}

COMMAND = {
    "python": "sh -c 'python3 main.py'",
    "c": "sh -c 'gcc main.c -o out && ./out'",
    "cpp": "sh -c 'g++ main.cpp -o out && ./out'",
    "javascript": "sh -c 'node main.js'",
}


def callback(ch, method, properties, body):
    message = json.loads(body.decode("utf-8"))
    language = message["language"]
    code = message["code"]

    client = docker.from_env()
    container_id = os.getenv("HOSTNAME")
    container_origem = client.containers.get(container_id)
    mounts = container_origem.attrs["Mounts"]
    print(mounts)
    volume_origem = None
    for mount in mounts:
        if mount.get("Name", "") == "lovelace_worker-code":
            volume_origem = mount["Source"]
            break
    print(volume_origem)
    try:
        with tempfile.TemporaryDirectory(dir="/app/code") as temp_dir:
            temp_dir = Path(temp_dir)
            temp_dir_name = temp_dir.name
            # file_path = os.path.join(temp_dir, f"main{SUFFIX[language]}")
            file_path = temp_dir / f"main{SUFFIX[language]}"
            print(temp_dir)
            print(temp_dir_name)
            print(file_path)

            with open(file_path, "w") as file:
                file.write(code)

            time.sleep(1)

            resultado = subprocess.run(
                ["ls", "-la", temp_dir], capture_output=True, text=True
            )

            # Imprime a saída do comando 'ls'
            print("Saída do comando ls:")
            print(resultado.stdout)

            output = client.containers.run(
                "executor",
                command=COMMAND[language],
                # command="ls",
                volumes={volume_origem: {"bind": "/code", "mode": "rw"}},
                remove=True,
                working_dir=f"/code/{temp_dir_name}",
                network_disabled=True,
            )

            print(output.decode("utf-8"))
    except Exception as e:
        print(e)


def receive_submission():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
    channel = connection.channel()

    channel.queue_declare(queue=QUEUE_NAME)

    channel.basic_consume(queue=QUEUE_NAME, on_message_callback=callback, auto_ack=True)

    print(" [*] Waiting for messages. To exit press CTRL+C")
    channel.start_consuming()


if __name__ == "__main__":
    receive_submission()
