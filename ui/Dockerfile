FROM node:20

WORKDIR /app

COPY /ui/package.json .
COPY /ui/package-lock.json .

RUN ["npm", "install"]

COPY /ui .
RUN ["chmod", "+x", "./entrypoint.sh"]

EXPOSE 3000
CMD ["sh", "./entrypoint.sh"]