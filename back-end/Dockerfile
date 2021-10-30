FROM node:16-alpine3.11 AS base

WORKDIR /app
RUN chmod -R 777 /app

RUN apk update && apk add bash && apk add curl

# [START] > copy source files
COPY package*.json yarn.lock /app/
# environment files
COPY .env.docker.test /app/.env
COPY .env.docker.test /app/.env.test
COPY .env.example /app/.env.example
# src & services
COPY src /app/src
COPY services /app/services
RUN rm -rf /app/services/federation-auth/.env; ln -s /other /app/services/federation-auth/.env
RUN rm -rf /app/services/federation-common/.env; ln -s /other /app/services/federation-common/.env
RUN mv /app/services/federation-auth/.env.docker.test /app/services/federation-auth/.env
RUN mv /app/services/federation-common/.env.docker.test /app/services/federation-common/.env
# tsconfig and bin
COPY tsconfig.json /app/tsconfig.json
COPY tsconfig.json /app/tsconfig.prod.json
# COPY bin/create-multiple-postgresql-databases.sh /app/docker-entrypoint-initdb.d/
COPY bin /app/bin
RUN chmod +x /app/bin/wait-for-it.sh
# [END] > copy source files

RUN yarn install --frozen-lockfile
RUN npm rebuild bcrypt --build-from-source

RUN yarn build
CMD [ "yarn", "federation" ]
