/* eslint-disable no-underscore-dangle */
import { ApolloServer, gql } from 'apollo-server-express';

import { getApolloTestServerContext } from '@config/apolloConfig';
import { prismaContext } from '@config/prismaConfig';
import schema from '@fed-schema/schema';

const JOIN_GROUP = gql`
  mutation joinGroup($input: joinGroupInput) {
    joinGroup(input: $input) {
      profileId
      groupId
    }
  }
`;

describe('joinGroup test', () => {
  let server: ApolloServer;

  beforeAll(() => {
    server = new ApolloServer({
      schema,
      context: async ({ req }) => getApolloTestServerContext(req),
    });
  });

  afterAll(async () => {
    prismaContext.prisma.profile.deleteMany();
    await prismaContext.prisma.$disconnect();
  });

  it('should pass', async () => {
    const profileId = 1;
    const result = await server.executeOperation({
      query: JOIN_GROUP,
      variables: {
        input: { profileId, groupId: 5 },
      },
    });

    expect(result.data?.joinGroup).toBeDefined();
    const foundProfileId = result.data?.joinGroup.profileId;
    expect(profileId).toBeDefined();
    expect(foundProfileId).toEqual(profileId);
  });
});
