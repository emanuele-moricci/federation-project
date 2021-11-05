import { Security, User } from '@prisma/client';

import { getSecurityById } from '@src/services/securityService';
import { getUserById } from '@src/services/userService';
import { ISecurityRef } from '@fed-schema/Utils/refs';

const resolver = {
  Security: {
    __resolveReference: async ({
      securityId,
    }: ISecurityRef): Promise<Security | null> => {
      return getSecurityById(parseInt(securityId));
    },
    user: async ({ userId }: { userId: number }): Promise<User | null> => {
      return getUserById(userId);
    },
  },
};

export default resolver;
