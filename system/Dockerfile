FROM python:3.12-slim

WORKDIR /app

COPY /system/requirements.txt .
RUN ["pip", "install", "-r", "requirements.txt"]

COPY /system .

CMD ["tail", "-f", "/dev/null"]
# CMD ["python", "./worker.py"]