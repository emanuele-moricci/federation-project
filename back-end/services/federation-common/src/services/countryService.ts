import prismaContext from '@config/prisma/prismaContext';
import { Country } from '@prisma/client';

import { PaginationAndSearchArgs } from '@fed-schema/Utils/QueryArgs';

/**
 * Function that returns all of the Countries present in the database.
 *
 * @async
 * @function getAllCountries.
 * @returns {Promise<Country[]>} The Countries List.
 */
export const getAllCountries = async ({
  skip,
  take,
}: PaginationAndSearchArgs): Promise<Country[]> => {
  const countries = await prismaContext.prisma.country.findMany({ skip, take });
  return countries;
};

/**
 * Function that returns a Country by its ID.
 *
 * @param {number} countryId The country ID.
 *
 * @async
 * @function getCountryById.
 * @returns {Promise<Country | null>} The found Country.
 */
export const getCountryById = async (
  countryId: number
): Promise<Country | null> => {
  return prismaContext.prisma.country.findUnique({
    where: {
      countryId,
    },
  });
};
