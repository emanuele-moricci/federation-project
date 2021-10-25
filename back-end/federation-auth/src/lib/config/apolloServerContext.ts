import { User } from '@prisma/client';
import { jwtVerify } from '@src/graphql/schema/Utils/JWTToken';

import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';
import prismaContext from '@src/lib/prisma/prismaContext';
import { getUserById } from '@src/services/userService';

const getApolloServerContext = async (req): Promise<IApolloServerContext> => {
  const token = req?.headers?.authorization
    ? req.headers.authorization.split(' ')[1]
    : null;
  let user: User | null = null;

  try {
    const { userId } = <any>jwtVerify(token);
    user = await getUserById(userId);
  } catch (error) {}

  return {
    prismaContext,
    token,
    user,
  };
};

export default getApolloServerContext;
