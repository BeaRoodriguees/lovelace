FROM python:3.12-slim

WORKDIR /app

COPY /system/requirements.txt .
RUN ["pip", "install", "--no-cache-dir", "-r", "requirements.txt"]

COPY /system .

CMD ["python", "-u", "worker.py"]