import jwt from 'jsonwebtoken';

export const jwtSign = (userId: number): string =>
  jwt.sign({ userId }, process.env.AUTH_JWT_SECRET ?? '', { expiresIn: '3d' });

export const jwtVerify = (token: string): string | object =>
  jwt.verify(token, process.env.AUTH_JWT_SECRET ?? '', {});

export const shieldedMethod = (token: string | null, callback: () => any) => {
  jwtVerify(token ?? '');

  return callback();
};
