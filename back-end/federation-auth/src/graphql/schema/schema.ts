import { gql, makeExecutableSchema } from 'apollo-server';
import { GraphQLSchema, printSchema } from 'graphql';

import { mutationType } from '@schema/mutation';
import { queryType } from '@schema/query';
import resolvers from '@schema/resolvers';

const schema = makeExecutableSchema({
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

export default schema;
