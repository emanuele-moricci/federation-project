/* eslint-disable no-underscore-dangle */
import { ApolloServer, gql } from 'apollo-server-express';

import getApolloServerContext from '@config/apollo/apolloServerTestContext';
import prismaContext from '@config/prisma/prismaContext';
import schema from '@fed-schema/schema';

const CREATE_POST = gql`
  mutation createPost($input: createPostInput) {
    createPost(input: $input) {
      postId
    }
  }
`;

describe('createPost test', () => {
  let server: ApolloServer;

  beforeAll(() => {
    server = new ApolloServer({
      schema: schema,
      context: async ({ req }) => await getApolloServerContext(req),
    });
  });

  afterAll(async () => {
    prismaContext.prisma.post.deleteMany();
    await prismaContext.prisma.$disconnect();
  });

  it('should pass', async () => {
    const profileId = 1;
    const groupId = 1;
    const title = 'test title';
    const description = 'test description';

    const result = await server.executeOperation({
      query: CREATE_POST,
      variables: {
        input: { profileId, groupId, title, description },
      },
    });

    expect(result.data?.createPost).toBeDefined();
    const post = result.data?.createPost;
    expect(post).toBeDefined();
    expect(post).not.toBeNull();
  });
});
