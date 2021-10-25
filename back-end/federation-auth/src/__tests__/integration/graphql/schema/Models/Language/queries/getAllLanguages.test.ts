/* eslint-disable no-underscore-dangle */
import { ApolloServer, gql } from 'apollo-server-express';

import getApolloServerContext from '@src/lib/config/apolloServerContext';
import prismaContext from '@src/lib/prisma/prismaContext';
import schema from '@src/graphql/schema/schema';

const GETALL_LANGUAGES_QUERY = gql`
  query getAllLanguages {
    Language {
      __typename
      languageId
      code
      name
      native
    }
  }
`;

describe('getAllLanguages test', () => {
  let server: ApolloServer;

  beforeAll(() => {
    server = new ApolloServer({
      schema: schema,
      context: async ({ req }) => await getApolloServerContext(req),
    });
  });

  afterAll(async () => {
    prismaContext.prisma.language.deleteMany();
    await prismaContext.prisma.$disconnect();
  });

  it('should pass', async () => {
    const result = await server.executeOperation({
      query: GETALL_LANGUAGES_QUERY,
    });

    expect(result.data).toBeDefined();
    expect(result?.data?.Language).toBeDefined();
    const getAllLanguages = result?.data?.Language;
    expect(getAllLanguages.length).toBeGreaterThan(0);
  });
});
