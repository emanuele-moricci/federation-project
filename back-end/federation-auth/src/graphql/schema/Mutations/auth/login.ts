import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { IApolloServerContext } from '@config/apollo/IApolloServerContext';

import { User } from '@prisma/client';
import UserType from '@src/graphql/schema/Models/User/User';

import { jwtSign } from '@schema/Utils/JWTToken';

import { getUserByEmailAndPassword } from '@services/userService';

/**
 *
 * Mutation login
 *
 */
export const loginResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (_source, { input }, _context, _info): Promise<LoginPayload> => {
  const user = await getUserByEmailAndPassword(input.email, input.password);
  const token = jwtSign(user.userId);

  return {
    token,
    user,
  };
};

export const loginInput: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'loginInput',
  description: 'Login input',
  fields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The user email.',
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The user password.',
    },
  },
});

export type LoginPayload = {
  token: string;
  user: User;
};

export const loginPayload: GraphQLObjectType = new GraphQLObjectType({
  name: 'loginPayload',
  description: 'Login payload',
  fields: {
    token: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The user token.',
    },
    user: {
      type: new GraphQLNonNull(UserType),
      description: 'The user.',
    },
  },
});

const loginMutation: GraphQLFieldConfig<unknown, IApolloServerContext> = {
  description: 'login',
  type: loginPayload,
  args: {
    input: {
      type: loginInput,
    },
  },
  resolve: loginResolver,
};

export default loginMutation;
