import { User, Security } from '@prisma/client';

import {
  getAllUsers,
  getUserById,
  getUsersByLanguageId,
} from '@src/services/userService';
import { getSecurityByUserId } from '@src/services/securityService';
import { Language } from '@src/graphql/generated/graphql';

import authGuard from '@schema/permissions';

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
    User: async (_source, args, context, _info): Promise<User[]> => {
      return authGuard(context) ? getAllUsers(args) : [];
    },
    me: async (_source, _args, context, _info): Promise<User | null> => {
      return authGuard(context)
        ? getUserById(context?.userData?.userId ?? -1)
        : null;
    },
  },
  User: {
    __resolveReference: async ({ userId }: IUserRef): Promise<User | null> => {
      return getUserById(parseInt(userId));
    },
    security: async ({ userId }: any): Promise<Security | null> => {
      return getSecurityByUserId(userId);
    },
    language: ({ languageId }: IUserRef): Language => ({
      __typename: 'Language',
      languageId: languageId,
    }),
  },
  // EXTENSIONS
  Language: {
    users: async (
      { languageId }: ILanguageRef,
      _args,
      context
    ): Promise<User[]> => {
      return authGuard(context)
        ? getUsersByLanguageId(parseInt(languageId))
        : [];
    },
  },
};

export default resolver;
