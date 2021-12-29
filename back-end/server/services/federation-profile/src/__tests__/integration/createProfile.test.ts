/* eslint-disable no-underscore-dangle */
import { ApolloServer, gql } from 'apollo-server-express';

import { getApolloTestServerContext } from '@config/apolloConfig';
import { prismaContext } from '@config/prismaConfig';
import schema from '@fed-schema/schema';

const CREATE_PROFILE = gql`
  mutation createProfile($input: createProfileInput) {
    createProfile(input: $input) {
      profileId
    }
  }
`;

describe('createProfile test', () => {
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
    const result = await server.executeOperation({
      query: CREATE_PROFILE,
      variables: {
        input: { bio: 'test bio' },
      },
    });

    expect(result.data?.createProfile).toBeDefined();
    const profileId = result.data?.createProfile.profileId;
    expect(profileId).toBeDefined();
    expect(profileId).not.toBeNull();
  });
});
