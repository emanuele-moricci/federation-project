import express from "express";
import { ApolloServer } from "apollo-server-express";

import schema from "@fed-schema/schema";
import getApolloServerContext from "@config/apollo/apolloServerContext";

import { bgCyan, blue } from "chalk";
import dotenv from "dotenv-safe";
dotenv.config();

const startServer = () => {
  const server = new ApolloServer({
    schema: schema,
    context: async ({ req }) => await getApolloServerContext(req),
  });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4004 }, () => {
    console.log(
      `🚀 ${bgCyan("Server ready")} at ${blue(
        `http://localhost:4004${server.graphqlPath}`
      )}`
    );
  });
};

startServer();
