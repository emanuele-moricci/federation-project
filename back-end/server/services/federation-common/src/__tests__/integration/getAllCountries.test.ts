/* eslint-disable no-underscore-dangle */
import { ApolloServer, gql } from 'apollo-server-express';

import { getApolloTestServerContext } from '@config/apolloConfig';
import { prismaContext } from '@config/prismaConfig';
import schema from '@fed-schema/schema';

const GETALL_COUNTRIES_QUERY = gql`
  query getAllCountries {
    Country {
      __typename
      countryId
      name
      alpha2
      alpha3
    }
  }
`;

describe('getAllCountries test', () => {
  let server: ApolloServer;

  beforeAll(() => {
    server = new ApolloServer({
      schema,
      context: async ({ req }) => getApolloTestServerContext(req),
    });
  });

  afterAll(async () => {
    prismaContext.prisma.country.deleteMany();
    await prismaContext.prisma.$disconnect();
  });

  it('should pass', async () => {
    const result = await server.executeOperation({
      query: GETALL_COUNTRIES_QUERY,
    });

    expect(result.data).toBeDefined();
    expect(result?.data?.Country).toBeDefined();
    const getAllCountries = result?.data?.Country;
    expect(getAllCountries.length).toBeGreaterThan(0);
  });
});
