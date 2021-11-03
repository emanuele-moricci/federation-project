import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloGateway } from '@apollo/gateway';

import { bounceAuthToFederation, loadContext } from './config/GatewayInit';

import secureApp from '@src/security';
import depthLimit from 'graphql-depth-limit';

import { inspect } from 'util';
import { blue, bgCyan } from 'chalk';
import dotenv from 'dotenv-safe';
dotenv.config();

const startServer = async () => {
  const gateway = new ApolloGateway({
    buildService({ url }) {
      return bounceAuthToFederation(url);
    },
  });

  const server = new ApolloServer({
    gateway,
    context: loadContext,
    validationRules: [depthLimit(10)],
    formatError: error => {
      console.error(inspect(error, false, null, true));
      return new Error('Internal Error');
    },
  });

  const app = express();
  await server.start();

  secureApp(app);

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(
      `🚀 ${bgCyan('Server ready')} at ${blue(
        `http://localhost:4000${server.graphqlPath}`
      )}`
    );
  });
};

startServer();
