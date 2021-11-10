import { Country } from '@prisma/client';

import { getAllCountries, getCountryById } from '@src/services/countryService';
import { ICountryRef } from '@fed-schema/Utils/refs';

const resolver = {
  Query: {
    Country: async (_source, args, _context, _info): Promise<Country[]> => {
      return await getAllCountries(args);
    },
  },
  Country: {
    __resolveReference: async ({
      countryId,
    }: ICountryRef): Promise<Country | null> => {
      return await getCountryById(parseInt(countryId));
    },
  },
};

export default resolver;
