FROM node:16-alpine AS builder

COPY . .
RUN npm install

CMD [ "node" , "server.js" ]