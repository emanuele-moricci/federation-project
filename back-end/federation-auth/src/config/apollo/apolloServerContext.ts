import { User } from '@prisma/client';
import { jwtVerify } from '@schema/Utils/JWTToken';

import { IApolloServerContext } from '@config/apollo/IApolloServerContext';
import prismaContext from '@config/prisma/prismaContext';
import { getUserById } from '@services/userService';

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
