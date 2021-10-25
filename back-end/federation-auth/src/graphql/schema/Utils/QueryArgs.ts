import { GraphQLFieldConfigArgumentMap, GraphQLInt } from 'graphql';

export type PaginationArgs = {
  skip: number;
  take: number;
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
