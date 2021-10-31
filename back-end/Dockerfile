FROM node:16-alpine3.11 AS base

WORKDIR /app
RUN chmod -R 777 /app

RUN apk update && apk add bash && apk add curl

# [START] > copy source files
COPY package*.json yarn.lock /app/
# environment files
COPY .env.docker.test /app/.env
COPY .env.example /app/.env.example
# src & services
COPY src /app/src
COPY services /app/services
RUN rm -rf /app/services/federation-auth/.env; ln -s /other /app/services/federation-auth/.env
RUN rm -rf /app/services/federation-common/.env; ln -s /other /app/services/federation-common/.env
RUN rm -rf /app/services/federation-auth/.env.test; ln -s /other /app/services/federation-auth/.env.test
RUN rm -rf /app/services/federation-common/.env.test; ln -s /other /app/services/federation-common/.env.test
RUN cp /app/services/federation-auth/.env.docker.test /app/services/federation-auth/.env
RUN cp /app/services/federation-common/.env.docker.test /app/services/federation-common/.env
RUN mv /app/services/federation-auth/.env.docker.test /app/services/federation-auth/.env.test
RUN mv /app/services/federation-common/.env.docker.test /app/services/federation-common/.env.test
# tsconfig and bin
COPY tsconfig.json /app/tsconfig.json
COPY tsconfig.json /app/tsconfig.prod.json
# wait-for-it
COPY bin /app/bin
RUN chmod +x /app/bin/wait-for-it.sh
# [END] > copy source files

RUN yarn install --frozen-lockfile

RUN yarn build
CMD [ "yarn", "federation" ]
