import { ApolloServer } from "apollo-server";
import { ApolloGateway } from "@apollo/gateway";

import chalk from "chalk";
import dotenv from "dotenv-safe";
dotenv.config();

const startServer = () => {
  const gateway = new ApolloGateway();

  const server = new ApolloServer({
    gateway,
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
