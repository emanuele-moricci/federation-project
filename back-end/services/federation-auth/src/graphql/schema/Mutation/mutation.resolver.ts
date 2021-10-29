import {
  createUser,
  getUserByEmailAndPassword,
} from '@src/services/userService';

import { jwtSign } from '../Utils/JWTToken';

const resolver = {
  Mutation: {
    login: {
      resolve: async (_, { input }): Promise<{ token: string }> => {
        const user = await getUserByEmailAndPassword(
          input.email,
          input.password
        );

        const token = jwtSign(user);

        return { token };
      },
    },
    register: {
      resolve: async (_, { input }): Promise<{ token: string | null }> => {
        try {
          const user = await createUser(input);
          const token = jwtSign(user);

          return { token };
        } catch (error) {
          console.error(error);
          return { token: null };
        }
      },
    },
  },
};

export default resolver;
