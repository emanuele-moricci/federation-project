import { User, Security } from '@prisma/client';

import {
  getAllUsers,
  getUserById,
  getUsersByCountryId,
  getUsersByLanguageId,
} from '@src/services/userService';
import { getSecurityByUserId } from '@src/services/securityService';
import { Language, Country } from '@src/graphql/generated/graphql';
import { IUserRef, ILanguageRef, ICountryRef } from '@fed-schema/Utils/refs';

import authGuard from '@fed-schema/permissions';

const resolver = {
  Query: {
    User: async (_source, args, context, _info): Promise<User[]> => {
      return authGuard(context) ? getAllUsers(args) : [];
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
    country: ({ countryId }: ICountryRef): Country => ({
      __typename: 'Country',
      countryId: countryId,
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
  Country: {
    users: async (
      { countryId }: ICountryRef,
      _args,
      context
    ): Promise<User[]> => {
      return authGuard(context) ? getUsersByCountryId(parseInt(countryId)) : [];
    },
  },
};

export default resolver;
