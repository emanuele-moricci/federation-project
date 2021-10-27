// import { User } from '@src/graphql/generated/graphql'; TODO: FIX

import { getAllUsers, getUserById } from '@src/services/userService';
import { getLanguageById } from '@src/services/languageService';
import { getSecurityByUserId } from '@src/services/securityService';

interface IUserRef {
  __typename: 'User';
  userId: number;
}

const resolver = {
  Query: {
    User: async (_source, args, _context, _info): Promise<any[]> => {
      return await getAllUsers(args);
    },
    me: async (_source, _args, { userData }, _info): Promise<any> => {
      return await getUserById(userData?.userId ?? -1);
    },
  },
  User: {
    _resolveReference: async ({ userId }: IUserRef): Promise<any> => {
      return getUserById(userId);
    },
    language({ languageId }: any): Promise<any> {
      return getLanguageById(languageId);
    },
    security({ userId }: any): Promise<any> {
      return getSecurityByUserId(userId);
    },
  },
};

export default resolver;
