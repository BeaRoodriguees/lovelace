import json
import docker
import pika
import tempfile
import os

RABBITMQ_HOST = 'rabbitmq'
QUEUE_NAME = 'submission_queue'


SUFFIX = {
    "python": ".py",
    "c": ".c",
    "cpp": ".cpp",
    "javascript": ".js"
}

COMMAND = {
    "python": "sh -c 'python3 main.py'",
    "c": "sh -c 'gcc main.c -o out && ./out'",
    "cpp": "sh -c 'g++ main.cpp -o out && ./out'",
    "javascript": "sh -c 'node main.js'"
}

def callback(ch, method, properties, body):
    message = json.loads(body.decode("utf-8"))
    language = message["language"]
    code = message["code"]
    
    client = docker.from_env()
    
    try:
        with tempfile.TemporaryDirectory() as temp_dir:
            file_path = os.path.join(temp_dir, f"main{SUFFIX[language]}")
            
            with open(file_path, "w") as file:
                file.write(code)
            
            output = client.containers.run(
                "executor",
                command=COMMAND[language],
                volumes={temp_dir: {"bind": "/code", "mode": "rw"}},
                remove=True,
                working_dir="/code",
                network_disabled=True
            )
            
            print(output.decode("utf-8"))
    except Exception as e:
        print(e)
        
def receive_submission():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
    channel = connection.channel()
    
    channel.queue_declare(queue=QUEUE_NAME)
    
    channel.basic_consume(queue=QUEUE_NAME, on_message_callback=callback, auto_ack=True)
    
    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()
    
if __name__ == "__main__":
    receive_submission()