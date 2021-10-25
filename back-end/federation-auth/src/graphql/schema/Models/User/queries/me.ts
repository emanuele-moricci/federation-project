import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from 'graphql';
import { IApolloServerContext } from '@config/apollo/IApolloServerContext';

import { User } from '@prisma/client';
import UserType from '@schema/Models/User/User';

import { getUserById } from '@services/userService';

/**
 *
 * Query me
 *
 */
export const meResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (_source, _args, { user }, _info): Promise<User | null> => {
  return await getUserById(user?.userId ?? -1);
};

const meQuery: GraphQLFieldConfig<unknown, IApolloServerContext> = {
  description: 'Get me query',
  type: UserType,
  resolve: meResolver,
};

export default meQuery;
