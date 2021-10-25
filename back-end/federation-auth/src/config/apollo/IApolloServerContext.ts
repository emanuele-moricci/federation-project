import { User } from '@prisma/client';

import { IPrismaContext } from '@config/prisma/IPrismaContext';

export interface IApolloServerContext {
  prismaContext: IPrismaContext;
  token: string | null;
  user: User | null;
}
