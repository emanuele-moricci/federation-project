import { verify } from "jsonwebtoken";

import { IApolloServerContext } from "@config/apollo/IApolloServerContext";

const getApolloServerContext = async (
  req
): Promise<IApolloServerContext | null> => {
  const token = req?.headers?.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;
  let userData = null;

  try {
    userData = <any>verify(token, process.env.AUTH_JWT_SECRET ?? "", {});
  } catch (error) {}

  return userData;
};

export default getApolloServerContext;
