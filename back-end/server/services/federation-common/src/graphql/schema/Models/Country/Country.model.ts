import { Country } from '@prisma/client';

import { getAllCountries, getCountryById } from '@src/services/countryService';
import { ICountryRef } from '@fed-schema/Utils/refs';

import { PaginationAndSearchArgs } from 'galactagraph-utils';
import { ResolverClass, ModelResolver } from 'galactagraph-utils/lib/classes';

/**
 * `Country Resolver`
 *
 * The Class resolver for the `Country` model.
 *
 * It uses the @ModelResolver decorator to define the `model` logics for the Class.
 *
 * @interface `ResolverClass<Country, ICountryRef>`
 * @class `CountryResolver`
 *
 * @method `reference` - The method used to resolve the `Country` Model reference.
 * @method `get` - The method used to get the list of every `Country` Model.
 */
@ModelResolver('Country')
class CountryResolver implements ResolverClass<Country, ICountryRef> {
  reference = ({ countryId }: ICountryRef) => {
    return getCountryById(parseInt(countryId));
  };

  get = (_source, args: PaginationAndSearchArgs, _context, _info) => {
    return getAllCountries(args);
  };
}

export default new CountryResolver();
