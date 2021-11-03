import { IApolloServerContext } from '@config/apollo/IApolloServerContext';
import prismaContext from '@config/prisma/prismaContext';

import { createDecipheriv, createHash } from 'crypto';

const getApolloServerContext = async (req): Promise<IApolloServerContext> => {
  const auth = req?.headers?.authorization ?? null;
  if (!auth) return { prismaContext, userData: null };

  const iv = auth.split(':')[0];
  const hash = auth.split(':')[1];
  const key = createHash('sha256')
    .update(process.env.FEDERATION_SECRET ?? '')
    .digest('base64')
    .substr(0, 32);
  const decipher = createDecipheriv('aes-256-ctr', key, Buffer.from(iv, 'hex'));

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash, 'hex')),
    decipher.final(),
  ]);

  const userData = auth ? JSON.parse(decrpyted.toString()) : null;

  return {
    prismaContext,
    userData,
  };
};

export default getApolloServerContext;
