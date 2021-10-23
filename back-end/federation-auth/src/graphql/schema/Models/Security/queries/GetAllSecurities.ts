/**
 *
 * Query getAllSecurities
 * WRITE A DESCRIPTION HERE
 *
 */
import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from 'graphql';
import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';

import { Security } from '@prisma/client'; // ADD THE PRISMA MODEL AND MIGRATE
import SecurityType from '@src/graphql/schema/Models/Security/Security';

import { getAllSecurities } from '@src/services/securityService';

export const getAllSecuritiesResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (_source, _args, _context, _info): Promise<Security[]> => {
  return await getAllSecurities();
};

const getAllSecuritiesQuery: GraphQLFieldConfig<
  unknown,
  IApolloServerContext
> = {
  description: 'Get all Securities query',
  type: GraphQLList(SecurityType),
  resolve: getAllSecuritiesResolver,
};

export default getAllSecuritiesQuery;
