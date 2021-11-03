import { verifyToken } from 'federation-utils';

import { IApolloServerContext } from '@config/apollo/IApolloServerContext';

const getApolloServerContext = async (
  req
): Promise<IApolloServerContext | null> => {
  const token = req?.headers?.authorization
    ? req.headers.authorization.split(' ')[1]
    : null;

  return token ? verifyToken(token, process.env.AUTH_JWT_SECRET ?? '') : {};
};

export default getApolloServerContext;
