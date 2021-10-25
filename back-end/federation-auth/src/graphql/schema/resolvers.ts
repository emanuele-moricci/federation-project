import { GraphQLResolverMap } from 'apollo-graphql';
import { IApolloServerContext } from '@src/config/apollo/IApolloServerContext';

import mutation from '@schema/mutation';
import query from '@schema/query';

import { User, Language, Security } from '@prisma/client';
import { getLanguageById } from '@services/languageService';
import { getSecurityByUserId } from '@services/securityService';
import { getUsersByLanguageId, getUserById } from '@services/userService';

//CUSTOM TYPES
import DateTimeScalar from '@schema/Custom/DateTimeScalar';

const resolvers: GraphQLResolverMap<IApolloServerContext> = {
  Query: query,
  Mutation: mutation,
  DateTime: DateTimeScalar,
  User: {
    language({ languageId }: User): Promise<Language | null> {
      return getLanguageById(languageId);
    },
    security({ userId }: User): Promise<Security | null> {
      return getSecurityByUserId(userId);
    },
  },
  Language: {
    users({ languageId }: Language): Promise<User[]> {
      return getUsersByLanguageId(languageId);
    },
  },
  Security: {
    user({ userId }: Security): Promise<User | null> {
      return getUserById(userId);
    },
  },
};

export default resolvers;
