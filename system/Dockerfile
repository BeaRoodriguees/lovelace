FROM python:3.12-slim

WORKDIR /app
RUN apt-get update && apt-get install -y libpq-dev
COPY /system/requirements.txt .
RUN ["pip", "install", "--no-cache-dir", "-r", "requirements.txt"]

COPY /system .

CMD ["python", "-u", "worker.py"]