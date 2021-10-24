import { User } from '@prisma/client';

import { IPrismaContext } from '@src/lib/interfaces/IPrismaContext';

export interface IApolloServerContext {
  prismaContext: IPrismaContext;
  token: string | null;
  user: User | null;
}
