import { ApolloServer } from 'apollo-server';
import apolloServerConfig from '@src/lib/config/apolloServerConfig';

import { performAstCodegen } from '@src/codegen';

import chalk from 'chalk';
import dotenv from 'dotenv-safe';
dotenv.config();

const startServer = () => {
  performAstCodegen();

  const server = new ApolloServer(apolloServerConfig);

  server
    .listen()
    .then(({ url }) => {
      console.log(
        `🚀 ${chalk.bgCyan('Server ready')} at ${chalk.blue(`${url}graphql`)}`
      );
    })
    .catch(err => console.log(chalk.bgRed('Error launching server'), err));
};

startServer();
