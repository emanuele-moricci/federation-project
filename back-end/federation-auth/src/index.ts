import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { performAstCodegen } from '@src/codegen';
import schema from '@src/graphql/schema/schema';
import getApolloServerContext from './lib/config/apolloServerContext';

import chalk from 'chalk';
import dotenv from 'dotenv-safe';
dotenv.config();

const startServer = () => {
  performAstCodegen();

  const server = new ApolloServer({
    schema: schema,
    context: async ({ req }) => await getApolloServerContext(req),
  });
  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(
      `🚀 ${chalk.bgCyan('Server ready')} at ${chalk.blue(
        `http://localhost:4000${server.graphqlPath}`
      )}`
    );
  });
};

startServer();
