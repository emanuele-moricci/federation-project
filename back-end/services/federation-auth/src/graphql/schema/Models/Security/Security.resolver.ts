import { Security } from '@prisma/client';

import { getSecurityById } from '@src/services/securityService';

import { ISecurityRef } from '@src/../../utils/types/refs';

const resolver = {
  Security: {
    __resolveReference: async ({
      securityId,
    }: ISecurityRef): Promise<Security | null> => {
      return getSecurityById(parseInt(securityId));
    },
  },
};

export default resolver;
