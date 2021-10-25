import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from 'graphql';
import { IApolloServerContext } from '@config/apollo/IApolloServerContext';

import { Language } from '@prisma/client';
import LanguageType from '@schema/Models/Language/Language';

import { getAllLanguages } from '@services/languageService';

/**
 *
 * Query getAllLanguages
 * WRITE A DESCRIPTION HERE
 *
 */
export const getAllLanguagesResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (_source, _args, _context, _info): Promise<Language[]> => {
  return await getAllLanguages();
};

const getAllLanguagesQuery: GraphQLFieldConfig<
  unknown,
  IApolloServerContext
> = {
  description: 'Get all Languages query',
  type: GraphQLList(LanguageType),
  resolve: getAllLanguagesResolver,
};

export default getAllLanguagesQuery;
