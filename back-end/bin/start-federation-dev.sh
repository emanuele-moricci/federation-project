#!/usr/bin/env bash

source ..

# Federation Microservices Preparation [START]
if [[ "$1" == "--db-clean" ]]; then
    (cd ./services/federation-auth/ ; yarn generate:reset)
    (cd ./services/federation-common/ ; yarn generate:reset)
    (cd ./services/federation-profile/ ; yarn generate:reset)
(cd ./services/federation-group/ ; yarn generate:reset)
# [ADD NEW GENERATE COMMANDS ABOVE] <- DO NOT REMOVE - Needed for the generator to create micro-service commands seamlessly
fi;
# Federation Microservices Preparation [END]

# Federation Microservices start-up [START]
concurrently "yarn dev" \
"cd ./services/federation-auth/ && yarn dev" \
"cd ./services/federation-common/ && yarn dev" \
"cd ./services/federation-profile/ && yarn dev" \
"cd ./services/federation-group/ && yarn dev" \
# [ADD NEW START COMMANDS ABOVE] <- DO NOT REMOVE - Needed for the generator to create micro-service commands seamlessly
# Federation Microservices start-up [END]

