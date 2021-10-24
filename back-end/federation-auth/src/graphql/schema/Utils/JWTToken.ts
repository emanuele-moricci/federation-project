import jwt from 'jsonwebtoken';

export const jwtSign = (userId: number): string =>
  jwt.sign({ userId }, process.env.AUTH_JWT_SECRET ?? '');

export const jwtVerify = (token: string): string | object =>
  jwt.verify(token, process.env.AUTH_JWT_SECRET ?? '');
