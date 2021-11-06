/* eslint-disable no-underscore-dangle */
import { ApolloServer, gql } from 'apollo-server-express';

import getApolloServerContext from '@config/apollo/apolloServerTestContext';
import prismaContext from '@config/prisma/prismaContext';
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
      context: async ({ req }) => await getApolloServerContext(req),
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
