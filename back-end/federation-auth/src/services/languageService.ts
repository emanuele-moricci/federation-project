import { Language } from '@prisma/client';
import prismaContext from '@src/lib/prisma/prismaContext';

/**
 * Function that returns all of the Languages present in the database.
 *
 * @async
 * @function getAllLanguages.
 * @returns {Promise<Language[]>} The Languages List.
 */
export const getAllLanguages = async (): Promise<Language[]> => {
  const languages = await prismaContext.prisma.language.findMany();
  return languages;
};

/**
 * Function that returns a Language by its ID.
 *
 * @param {number} languageId The language ID.
 *
 * @async
 * @function getLanguageById.
 * @returns {Promise<Language | null>} The found Language.
 */
export const getLanguageById = async (
  languageId: number
): Promise<Language | null> => {
  return prismaContext.prisma.language.findUnique({
    where: {
      languageId,
    },
  });
};
