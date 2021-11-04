import { User, Security } from '@prisma/client';

import {
  getAllUsers,
  getUserById,
  getUsersByCountryId,
  getUsersByLanguageId,
  getUserByProfileId,
} from '@src/services/userService';
import { getSecurityByUserId } from '@src/services/securityService';
import { Language, Country, Profile } from '@src/graphql/generated/graphql';
import {
  IUserRef,
  ILanguageRef,
  ICountryRef,
  IProfileRef,
} from '@fed-schema/Utils/refs';

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
    profile: ({ profileId }: IProfileRef): Profile => ({
      __typename: 'Profile',
      profileId: profileId,
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
  Profile: {
    user: async ({ profileId }: IProfileRef): Promise<User | null> => {
      return getUserByProfileId(parseInt(profileId));
    },
  },
};

export default resolver;
