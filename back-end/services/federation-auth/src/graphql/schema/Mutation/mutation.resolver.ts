import { LoginPayload, RegisterPayload } from '@src/graphql/generated/graphql';

import {
  createUser,
  getUserByEmailAndPassword,
} from '@src/services/userService';

import { jwtSign } from '../Utils/JWTToken';

const resolver = {
  Mutation: {
    login: {
      resolve: async (_, { input }): Promise<LoginPayload> => {
        const user = await getUserByEmailAndPassword(
          input.email,
          input.password
        );

        const token = jwtSign(user);

        return { token };
      },
    },
    register: {
      resolve: async (_, { input }): Promise<RegisterPayload> => {
        try {
          const user = await createUser(input);
          const token = jwtSign(user);

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
