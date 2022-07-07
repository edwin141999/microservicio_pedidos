FROM node:16-alpine
WORKDIR /app

RUN apk update
RUN apk add git bash
RUN git clone https://github.com/edwin141999/microservicio_pedidos.git

COPY package*.json microservicio_pedidos/
COPY prisma microservicio_pedidos/prisma
COPY .env microservicio_pedidos/

RUN cd microservicio_pedidos && npm install && npx prisma generate

EXPOSE 3000

RUN apk add psmisc

CMD cd microservicio_pedidos && npm start