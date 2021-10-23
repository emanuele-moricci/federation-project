/**
 *
 * Mutation createSecurity
 * WRITE A DESCRIPTION HERE
 *
 */
import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql';
import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';

import { Security } from '@prisma/client'; // ADD THE PRISMA MODEL AND MIGRATE
import SecurityType from '@src/graphql/schema/Models/Security/Security';

import { createSecurity } from '@src/services/securityService';

export const createSecurityResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (_source, { input }, _context, _info): Promise<Security> => {
  return await createSecurity(input);
};

export const CreateSecurityInput: GraphQLInputObjectType = new GraphQLInputObjectType(
  {
    name: 'CreateSecurityInput',
    description: 'Create Security input',
    fields: {
      userId: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The security user.',
      },
    },
  }
);

const createSecurityMutation: GraphQLFieldConfig<
  unknown,
  IApolloServerContext
> = {
  description: 'Create Security',
  type: SecurityType,
  args: {
    input: {
      type: CreateSecurityInput,
    },
  },
  resolve: createSecurityResolver,
};

export default createSecurityMutation;
