/**
 *
 * Mutation createUser
 * WRITE A DESCRIPTION HERE
 *
 */
import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';

import { User } from '@prisma/client';
import UserType from '@src/graphql/schema/Models/User/User';

import { createUser } from '@src/services/userService';

export const createUserResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (_source, { input }, _context, _info): Promise<User> => {
  return createUser(input);
};

export const CreateUserInput: GraphQLInputObjectType = new GraphQLInputObjectType(
  {
    name: 'CreateUserInput',
    description: 'Create User input',
    fields: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The user email.',
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The user password.',
      },
      languageId: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The language id.',
      },
      firstname: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The user first name.',
      },
      lastname: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The user last name.',
      },
    },
  }
);

const createUserMutation: GraphQLFieldConfig<unknown, IApolloServerContext> = {
  description: 'Create User',
  type: UserType,
  args: {
    input: {
      type: CreateUserInput,
    },
  },
  resolve: createUserResolver,
};

export default createUserMutation;
