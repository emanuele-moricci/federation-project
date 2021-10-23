import { Security, prisma } from '@prisma/client';
import prismaContext from '@src/lib/prisma/prismaContext';

export const getAllSecurities = async (): Promise<Security[]> => {
  const securities = await prismaContext.prisma.security.findMany();
  return securities;
};

export const getSecurityById = async (
  securityId: number
): Promise<Security | null> => {
  return prismaContext.prisma.security.findUnique({
    where: {
      securityId,
    },
  });
};

export const getSecurityByUserId = async (
  userId: number
): Promise<Security | null> => {
  return prismaContext.prisma.security.findFirst({
    where: {
      userId,
    },
  });
};

export const createSecurity = async (input): Promise<Security> => {
  const security = await prismaContext.prisma.security.create({
    data: input,
  });
  return security;
};
