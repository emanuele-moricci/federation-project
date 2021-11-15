import { User } from '@prisma/client';

import { getUsersByCountryId } from '@src/services/userService';
import { Country } from '@src/graphql/generated/graphql';
import { ICountryRef } from '@fed-schema/Utils/refs';

const resolver = {
  User: {
    country: ({ countryId }: ICountryRef): Country => ({
      __typename: 'Country',
      countryId,
    }),
  },
  Country: {
    users: async ({ countryId }: ICountryRef): Promise<User[]> => {
      return getUsersByCountryId(parseInt(countryId));
    },
  },
};

export default resolver;
