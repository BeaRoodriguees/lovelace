import json
import pika

RABBITMQ_HOST = 'localhost'
QUEUE_NAME = 'submission_queue'

hello_world_c = {
    "language": "c",
    "code": '''
#include <stdio.h>
int main() {
   printf("Hello, World! Em C!");
   return 0;
}
'''
}

hello_world_cpp = {
    "language": "cpp",
    "code": '''
#include <iostream>
int main() {
   std::cout << "Hello, World! Em C++!" << std::endl;
   return 0;
}
'''
}

hello_world_python = {
    "language": "python",
    "code": 'print("Hello, World! Em python!")'
}

hello_world_js = {
    "language": "javascript",
    "code": 'console.log("Hello, World! Em JavaScripto!");'
}



def send_submission(code):
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
    channel = connection.channel()
    
    channel.queue_declare(queue=QUEUE_NAME)
    message=json.dumps(code)
    channel.basic_publish(exchange='', routing_key=QUEUE_NAME, body=message)
    
    connection.close()

if __name__ == "__main__":
    send_submission(hello_world_c)
    send_submission(hello_world_cpp)
    send_submission(hello_world_python)
    send_submission(hello_world_js)
