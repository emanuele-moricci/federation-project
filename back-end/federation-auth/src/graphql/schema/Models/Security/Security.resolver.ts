// import { Security } from '@src/graphql/generated/graphql'; TODO: FIX

import {
  getSecurityById,
  getSecurityByUserId,
} from '@src/services/securityService';

interface ISecurityRef {
  __typename: 'Security';
  securityId: number;
}

const resolver = {
  Security: {
    _resolveReference: async ({ securityId }: ISecurityRef): Promise<any> => {
      return getSecurityById(securityId);
    },
    user({ userId }: any): Promise<any> {
      return getSecurityByUserId(userId);
    },
  },
};

export default resolver;
