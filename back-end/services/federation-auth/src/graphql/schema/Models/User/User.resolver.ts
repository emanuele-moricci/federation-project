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

const resolver = {
  Query: {
    User: async (_source, args): Promise<User[]> => {
      return getAllUsers(args);
    },
  },
  User: {
    __resolveReference: async ({ userId }: IUserRef): Promise<User | null> => {
      return getUserById(parseInt(userId));
    },
    security: async ({ userId }: IUserRef): Promise<Security | null> => {
      return getSecurityByUserId(parseInt(userId));
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
    users: async ({ languageId }: ILanguageRef): Promise<User[]> => {
      return getUsersByLanguageId(parseInt(languageId));
    },
  },
  Country: {
    users: async ({ countryId }: ICountryRef): Promise<User[]> => {
      return getUsersByCountryId(parseInt(countryId));
    },
  },
};

export default resolver;
