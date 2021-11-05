/* eslint-disable no-underscore-dangle */
import { ApolloServer, gql } from 'apollo-server-express';

import getApolloServerContext from '@config/apollo/apolloServerTestContext';
import prismaContext from '@config/prisma/prismaContext';
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
      schema: schema,
      context: async ({ req }) => await getApolloServerContext(req),
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

    console.log(result.data);
    expect(result.data?.createProfile).toBeDefined();
    const profileId = result.data?.createProfile.profileId;
    expect(profileId).toBeDefined();
    expect(profileId).not.toBeNull();
  });
});
