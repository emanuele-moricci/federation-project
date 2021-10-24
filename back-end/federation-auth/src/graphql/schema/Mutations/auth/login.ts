import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '@prisma/client';
import UserType from '@src/graphql/schema/Models/User/User';

import { getUserByEmail } from '@src/services/userService';

/**
 *
 * Mutation login
 *
 */
export const loginResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (_source, { input }, _context, _info): Promise<LoginPayload> => {
  const user = await getUserByEmail(input.email);
  if (!user) throw new Error('[EMAIL] Error');

  if (!(await bcrypt.compare(input.password, user.password)))
    throw new Error('[PASSWORD] Error');

  const token = jwt.sign(
    { userId: user.userId },
    process.env.AUTH_JWT_SECRET ?? ''
  );

  return {
    token,
    user: {
      ...user,
      password: '',
    },
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
