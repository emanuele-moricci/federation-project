import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from 'graphql';
import { IApolloServerContext } from '@config/apollo/IApolloServerContext';

import { User } from '@prisma/client';
import UserType from '@schema/Models/User/User';

import { getAllUsers } from '@services/userService';

/**
 *
 * Query getAllUsers
 * WRITE A DESCRIPTION HERE
 *
 */
export const getAllUsersResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (_source, _args, _context, _info): Promise<User[]> => {
  return await getAllUsers();
};

const getAllUsersQuery: GraphQLFieldConfig<unknown, IApolloServerContext> = {
  description: 'Get all Users query',
  type: GraphQLList(UserType),
  resolve: getAllUsersResolver,
};

export default getAllUsersQuery;
