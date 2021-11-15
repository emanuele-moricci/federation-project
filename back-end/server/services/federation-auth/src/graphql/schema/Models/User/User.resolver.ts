import { User, Security } from '@prisma/client';

import {
  getAllUsers,
  getUserById,
  getUsersByLanguageId,
} from '@src/services/userService';
import { getSecurityByUserId } from '@src/services/securityService';
import { IUserRef, ILanguageRef } from '@fed-schema/Utils/refs';

import { Language } from '@src/graphql/generated/graphql';

const resolver = {
  Query: {
    User: async (_source, args): Promise<User[]> => {
      return getAllUsers(args);
    },
    language: ({ languageId }: IUserRef): Language => ({
      __typename: 'Language',
      languageId,
    }),
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
  Language: {
    users: async ({ languageId }: ILanguageRef): Promise<User[]> => {
      return getUsersByLanguageId(parseInt(languageId));
    },
  },
};

export default resolver;
