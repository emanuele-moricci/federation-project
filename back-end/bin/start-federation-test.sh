#!/usr/bin/env bash

source ..

# Federation Microservices start-up [START]
echo 'testing start' \
&& cd ./services/federation-auth/ && yarn test \
&& cd ./services/federation-common/ && yarn test \
&& cd ./services/federation-profile/ && yarn test \
# [ADD NEW TEST COMMANDS ABOVE] <- DO NOT REMOVE - Needed for the generator to create micro-service commands seamlessly
# Federation Microservices start-up [END]

