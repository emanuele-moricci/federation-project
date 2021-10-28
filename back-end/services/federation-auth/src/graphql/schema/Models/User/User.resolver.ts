import { User, Security } from '@prisma/client';

import {
  getAllUsers,
  getUserById,
  getUsersByLanguageId,
} from '@src/services/userService';
import { getSecurityByUserId } from '@src/services/securityService';
import { Language } from '@src/graphql/generated/graphql';

interface IUserRef {
  __typename: 'User';
  userId: string;
  languageId: string;
}

interface ILanguageRef {
  __typename: 'Language';
  languageId: string;
}

const resolver = {
  Query: {
    User: async (_source, args, _context, _info): Promise<User[]> => {
      return await getAllUsers(args);
    },
    me: async (_source, _args, { userData }, _info): Promise<User | null> => {
      return await getUserById(userData?.userId ?? -1);
    },
  },
  User: {
    __resolveReference: async ({ userId }: IUserRef): Promise<User | null> => {
      return getUserById(parseInt(userId));
    },
    security: async ({ userId }: any): Promise<Security | any> => {
      return getSecurityByUserId(userId);
    },
    language: ({ languageId }: IUserRef): Language => ({
      __typename: 'Language',
      languageId: languageId,
    }),
  },
  // EXTENSIONS
  Language: {
    users: async ({ languageId }: ILanguageRef): Promise<User[]> => {
      return getUsersByLanguageId(parseInt(languageId));
    },
  },
};

export default resolver;
