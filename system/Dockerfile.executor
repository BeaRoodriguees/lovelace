FROM debian:bullseye-slim

RUN apt update -y && apt upgrade -y

RUN apt-get install python3.10 gcc g++ curl -y

RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs