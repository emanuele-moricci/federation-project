/* eslint-disable no-underscore-dangle */
import { ApolloServer, gql } from 'apollo-server-express';

import { getApolloTestServerContext } from '@config/apolloConfig';
import { prismaContext } from '@config/prismaConfig';
import schema from '@fed-schema/schema';

const GETALL_GROUPS_QUERY = gql`
  query getAllGroups {
    Group {
      __typename
      groupId
      name
      bio
    }
  }
`;

describe('getAllGroups test', () => {
  let server: ApolloServer;

  beforeAll(() => {
    server = new ApolloServer({
      schema: schema,
      context: async ({ req }) => await getApolloTestServerContext(req),
    });
  });

  afterAll(async () => {
    prismaContext.prisma.group.deleteMany();
    await prismaContext.prisma.$disconnect();
  });

  it('should pass', async () => {
    const result = await server.executeOperation({
      query: GETALL_GROUPS_QUERY,
    });

    expect(result.data).toBeDefined();
    expect(result?.data?.Group).toBeDefined();
    const getAllGroups = result?.data?.Group;
    expect(getAllGroups.length).toBeGreaterThan(0);
  });
});
