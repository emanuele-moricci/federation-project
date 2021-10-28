import { Security, User } from '@prisma/client';

import { getSecurityById } from '@src/services/securityService';
import { getUserById } from '@src/services/userService';

interface ISecurityRef {
  __typename: 'Security';
  securityId: string;
}

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
