/* eslint-disable no-underscore-dangle */
import { ApolloServer, gql } from 'apollo-server-express';

import getApolloServerContext from '@config/apollo/apolloServerTestContext';
import prismaContext from '@config/prisma/prismaContext';
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
      schema: schema,
      context: async ({ req }) => await getApolloServerContext(req),
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
