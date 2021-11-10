/* eslint-disable no-underscore-dangle */
import { ApolloServer, gql } from 'apollo-server-express';

import { getApolloTestServerContext } from '@config/apolloConfig';
import { prismaContext } from '@config/prismaConfig';
import schema from '@fed-schema/schema';

const CREATE_GROUP = gql`
  mutation createGroup($input: createGroupInput) {
    createGroup(input: $input) {
      groupId
    }
  }
`;

describe('createGroup test', () => {
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
    const name = 'test name';
    const bio = 'test bio';

    const result = await server.executeOperation({
      query: CREATE_GROUP,
      variables: {
        input: { name, bio },
      },
    });

    expect(result.data?.createGroup).toBeDefined();
    const group = result.data?.createGroup;
    expect(group).toBeDefined();
    expect(group).not.toBeNull();
  });
});
