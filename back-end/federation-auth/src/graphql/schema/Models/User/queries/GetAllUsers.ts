import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from 'graphql';
import { IApolloServerContext } from '@config/apollo/IApolloServerContext';

import { User } from '@prisma/client';
import UserType from '@schema/Models/User/User';

import { getAllUsers } from '@services/userService';

import { PaginationArgs, paginationArgs } from '@schema/Utils/QueryArgs';

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
  return await getAllUsers(args as PaginationArgs);
};

const getAllUsersQuery: GraphQLFieldConfig<unknown, IApolloServerContext> = {
  description: 'Get all Users query',
  type: GraphQLList(UserType),
  args: paginationArgs,
  resolve: getAllUsersResolver,
};

export default getAllUsersQuery;
