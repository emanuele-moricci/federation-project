FROM node:14.15.4-alpine3.10 AS base

WORKDIR /app
RUN chmod -R 777 /app

RUN apk update && apk add bash

COPY package*.json yarn.lock /app/

COPY .env.docker.test /app/.env
COPY .env.docker.test /app/.env.test
COPY .env.example /app/.env.example

# copy source files
COPY src /app/src

COPY tsconfig.json /app/tsconfig.json
COPY tsconfig.json /app/tsconfig.prod.json

COPY jest.config.js /app/jest.config.js

COPY bin /app/bin
RUN chmod +x /app/bin/wait-for-it.sh

COPY prisma /app/prisma

COPY codegen.yml /app/codegen.yml

RUN yarn install --frozen-lockfile

# RUN yarn generate
RUN yarn prisma generate

RUN yarn build
CMD [ "yarn", "start" ]
