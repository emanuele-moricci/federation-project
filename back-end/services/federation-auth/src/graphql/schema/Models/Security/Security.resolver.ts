import { Security } from '@prisma/client';

import { getSecurityById } from '@src/services/securityService';

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
  },
};

export default resolver;
