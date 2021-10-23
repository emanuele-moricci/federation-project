import { Language, prisma } from '@prisma/client';
import prismaContext from '@src/lib/prisma/prismaContext';

export const getAllLanguages = async (): Promise<Language[]> => {
  const languages = await prismaContext.prisma.language.findMany();
  return languages;
};

export const getLanguageById = async (
  languageId: number
): Promise<Language | null> => {
  return prismaContext.prisma.language.findUnique({
    where: {
      languageId,
    },
  });
};
