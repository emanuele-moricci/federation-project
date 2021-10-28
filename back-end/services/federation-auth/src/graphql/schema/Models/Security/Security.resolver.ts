import { Security, User } from '@prisma/client';

import { getSecurityById } from '@src/services/securityService';
import { getUserById } from '@src/services/userService';

import { ISecurityRef } from '@src/../../utils/types/refs';

const resolver = {
  Security: {
    __resolveReference: async ({
      securityId,
    }: ISecurityRef): Promise<Security | null> => {
      return getSecurityById(parseInt(securityId));
    },
    user: async ({ userId }: any): Promise<User | null> => {
      return getUserById(userId);
    },
  },
};

export default resolver;
