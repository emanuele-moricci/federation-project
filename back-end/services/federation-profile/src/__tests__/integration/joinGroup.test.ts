/* eslint-disable no-underscore-dangle */
import { ApolloServer, gql } from 'apollo-server-express';

import getApolloServerContext from '@config/apollo/apolloServerTestContext';
import prismaContext from '@config/prisma/prismaContext';
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
      schema: schema,
      context: async ({ req }) => await getApolloServerContext(req),
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
