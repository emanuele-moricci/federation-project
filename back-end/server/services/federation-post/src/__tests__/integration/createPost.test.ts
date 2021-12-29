/* eslint-disable no-underscore-dangle */
import { ApolloServer, gql } from 'apollo-server-express';

import { getApolloTestServerContext } from '@config/apolloConfig';
import { prismaContext } from '@config/prismaConfig';
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
      schema,
      context: async ({ req }) => getApolloTestServerContext(req),
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
