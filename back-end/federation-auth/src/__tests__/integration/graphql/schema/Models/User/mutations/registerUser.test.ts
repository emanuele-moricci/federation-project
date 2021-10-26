/* eslint-disable no-underscore-dangle */
import { ApolloServer, gql } from 'apollo-server-express';

import getApolloServerContext from '@config/apollo/apolloServerContext';
import prismaContext from '@config/prisma/prismaContext';
import schema from '@schema/schema';

const REGISTER_USER = gql`
  mutation register($input: registerInput) {
    register(input: $input) {
      token
    }
  }
`;

const ME_QUERY = gql`
  query me {
    me {
      userId
      email
    }
  }
`;

describe('register test', () => {
  let server: ApolloServer;

  beforeAll(() => {
    server = new ApolloServer({
      schema: schema,
      context: async ({ req }) => await getApolloServerContext({ req }),
    });
  });

  afterAll(async () => {
    prismaContext.prisma.user.deleteMany();
    await prismaContext.prisma.$disconnect();
  });

  it('should pass', async () => {
    const email = 'jest@test.com';
    const result = await server.executeOperation({
      query: REGISTER_USER,
      variables: {
        input: {
          email: email,
          password: 'Jest!120',
          languageId: 1,
          firstname: 'Jest',
          lastname: 'Federation',
        },
      },
    });

    expect(result.data).toBeDefined();
    expect(result?.data?.register).toBeDefined();
    const token = result?.data?.register?.token;
    expect(token).not.toBeNull();

    const authServer = new ApolloServer({
      schema: schema,
      context: async ({ req }) =>
        await getApolloServerContext({
          headers: { authorization: `Bearer ${token}` },
        }),
    });

    const meQuery = await authServer.executeOperation({
      query: ME_QUERY,
    });

    expect(meQuery.data).toBeDefined();
    expect(meQuery?.data?.me).toBeDefined();
    const me = meQuery?.data?.me;
    expect(me.email).toEqual(email);
  });
});
