import { GraphQLFieldConfigArgumentMap, GraphQLInt } from 'graphql';

export type PaginationAndSearchArgs = {
  skip?: number;
  take?: number;
  [key: string]: any;
};

export const paginationArgs: GraphQLFieldConfigArgumentMap = {
  skip: {
    description: 'Starting record',
    type: GraphQLInt,
  },
  take: {
    description: 'Records shown',
    type: GraphQLInt,
  },
};
