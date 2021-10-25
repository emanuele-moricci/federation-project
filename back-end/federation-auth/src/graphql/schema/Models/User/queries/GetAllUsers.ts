import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLList,
  GraphQLString,
} from 'graphql';
import { IApolloServerContext } from '@config/apollo/IApolloServerContext';

import { User } from '@prisma/client';
import UserType from '@schema/Models/User/User';

import { getAllUsers } from '@services/userService';

import { paginationArgs } from '@schema/Utils/QueryArgs';

/**
 *
 * Query getAllUsers
 * WRITE A DESCRIPTION HERE
 *
 */
export const getAllUsersResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (_source, args, _context, _info): Promise<User[]> => {
  return await getAllUsers(args);
};

const getAllUsersQuery: GraphQLFieldConfig<unknown, IApolloServerContext> = {
  description: 'Get all Users query',
  type: GraphQLList(UserType),
  args: {
    ...paginationArgs,
    username: { type: GraphQLString, description: 'username string' },
  },
  resolve: getAllUsersResolver,
};

export default getAllUsersQuery;
