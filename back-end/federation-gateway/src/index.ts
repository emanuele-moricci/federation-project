import { ApolloServer } from "apollo-server";
import { ApolloGateway } from "@apollo/gateway";

import { bounceAuthToFederation, loadContext } from "./config/request";

import chalk from "chalk";
import dotenv from "dotenv-safe";
dotenv.config();

const startServer = () => {
  const gateway = new ApolloGateway({
    buildService({ url }) {
      return bounceAuthToFederation(url);
    },
  });

  const server = new ApolloServer({
    gateway,
    context: loadContext,
  });

  server.listen({ port: 4000 }, () => {
    console.log(
      `🚀 ${chalk.bgCyan("Server ready")} at ${chalk.blue(
        `http://localhost:4000${server.graphqlPath}`
      )}`
    );
  });
};

startServer();
