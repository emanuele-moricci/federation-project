import { Country } from '@prisma/client';

import { getAllCountries, getCountryById } from '@src/services/countryService';

interface ICountryRef {
  __typename: 'Country';
  countryId: string;
}

const resolver = {
  Query: {
    Country: async (_source, _args, _context, _info): Promise<Country[]> => {
      return await getAllCountries();
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
