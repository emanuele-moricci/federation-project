import { gql } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { GraphQLSchema, printSchema } from 'graphql';

import { applyMiddleware } from 'graphql-middleware';

import { mutationType } from '@schema/mutation';
import { queryType } from '@schema/query';
import resolvers from '@schema/resolvers';
import permissions from '@schema/permissions';

let schema = buildSubgraphSchema({
  typeDefs: gql(
    printSchema(
      new GraphQLSchema({
        query: queryType,
        mutation: mutationType,
      })
    )
  ),
  resolvers,
});

schema = applyMiddleware(schema, permissions);

export default schema;
