/**
 *
 * Query getAllUsers
 * WRITE A DESCRIPTION HERE
 *
 */
import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from 'graphql';
import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';

import { User } from '@prisma/client';
import UserType from '@src/graphql/schema/Models/User/User';

import { getAllUsers } from '@src/services/userService';
import { shieldedMethod } from '@src/graphql/schema/Utils/JWTToken';

export const getAllUsersResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (_source, _args, { token, user }, _info): Promise<User[]> =>
  shieldedMethod(token, async () => {
    return await getAllUsers();
  });

const getAllUsersQuery: GraphQLFieldConfig<unknown, IApolloServerContext> = {
  description: 'Get all Users query',
  type: GraphQLList(UserType),
  resolve: getAllUsersResolver,
};

export default getAllUsersQuery;
