import { User, prisma } from '@prisma/client';
import prismaContext from '@src/lib/prisma/prismaContext';

export const getAllUsers = async (): Promise<User[]> => {
  const users = await prismaContext.prisma.user.findMany();
  return users;
};

export const getUserById = async (userId: number): Promise<User | null> => {
  return prismaContext.prisma.user.findUnique({
    where: {
      userId,
    },
  });
};

export const getUsersByLanguage = async (
  languageId: number
): Promise<User[]> => {
  return prismaContext.prisma.user.findMany({
    where: {
      languageId,
    },
  });
};

export const createUser = async (input): Promise<User> => {
  const user = await prismaContext.prisma.user.create({
    data: input,
  });
  return user;
};
