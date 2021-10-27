import { User } from '@prisma/client';

import { IPrismaContext } from '@config/prisma/IPrismaContext';

export interface IApolloServerContext {
  prismaContext: IPrismaContext;
  userData: { userId: number; role: string } | null;
}
