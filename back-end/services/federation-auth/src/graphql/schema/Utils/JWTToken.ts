import jwt from 'jsonwebtoken';

export const jwtSign = (user: any): string =>
  jwt.sign(
    { userId: user.userId, role: user.role },
    process.env.AUTH_JWT_SECRET ?? '',
    { expiresIn: '3d' }
  );
