import { LoginPayload, RegisterPayload } from '@src/graphql/generated/graphql';

import {
  createUser,
  getUserByEmailAndPassword,
} from '@src/services/userService';

import { signToken } from 'federation-utils';

const resolver = {
  Mutation: {
    login: {
      resolve: async (_, { input }): Promise<LoginPayload> => {
        const { userId, role } = await getUserByEmailAndPassword(
          input.email,
          input.password
        );

        const token = signToken(
          { userId, role },
          process.env.AUTH_JWT_SECRET ?? ''
        );

        return { token };
      },
    },
    register: {
      resolve: async (_, { input }): Promise<RegisterPayload> => {
        try {
          const { userId, role } = await createUser(input);
          const token = signToken(
            { userId, role },
            process.env.AUTH_JWT_SECRET ?? ''
          );

          return { token };
        } catch (error) {
          console.error(error);
          return { token: '' };
        }
      },
    },
  },
};

export default resolver;
