import { GraphQLResolverMap } from 'apollo-graphql';
import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';

import mutation from '@src/graphql/schema/mutation';
import query from '@src/graphql/schema/query';

import { User, Language, Security } from '@prisma/client';
import { getLanguageById } from '@src/services/languageService';
import { getSecurityByUserId } from '@src/services/securityService';
import { getUsersByLanguageId, getUserById } from '@src/services/userService';

//CUSTOM TYPES
import DateTimeScalar from '@src/graphql/schema/Custom/DateTimeScalar';

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
