import { User, Security } from '@prisma/client';

import { getAllUsers, getUserById } from '@src/services/userService';
import { getSecurityByUserId } from '@src/services/securityService';
import { IUserRef } from '@fed-schema/Utils/refs';

const resolver = {
  Query: {
    User: async (_source, args): Promise<User[]> => {
      return getAllUsers(args);
    },
  },
  User: {
    __resolveReference: async ({ userId }: IUserRef): Promise<User | null> => {
      return getUserById(parseInt(userId));
    },
    password: (): string => '',
    security: async ({ userId }: IUserRef): Promise<Security | null> => {
      return getSecurityByUserId(parseInt(userId));
    },
  },
};

export default resolver;
