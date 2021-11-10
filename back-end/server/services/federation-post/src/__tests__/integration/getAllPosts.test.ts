/* eslint-disable no-underscore-dangle */
import { ApolloServer, gql } from 'apollo-server-express';

import { getApolloTestServerContext } from '@config/apolloConfig';
import { prismaContext } from '@config/prismaConfig';
import schema from '@fed-schema/schema';

const GETALL_POSTS_QUERY = gql`
  query getAllPosts {
    Post {
      __typename
      postId
      title
      description
    }
  }
`;

describe('getAllPosts test', () => {
  let server: ApolloServer;

  beforeAll(() => {
    server = new ApolloServer({
      schema: schema,
      context: async ({ req }) => await getApolloTestServerContext(req),
    });
  });

  afterAll(async () => {
    prismaContext.prisma.post.deleteMany();
    await prismaContext.prisma.$disconnect();
  });

  it('should pass', async () => {
    const result = await server.executeOperation({
      query: GETALL_POSTS_QUERY,
    });

    expect(result.data).toBeDefined();
    expect(result?.data?.Post).toBeDefined();
    const getAllPosts = result?.data?.Post;
    expect(getAllPosts.length).toBeGreaterThan(0);
  });
});
