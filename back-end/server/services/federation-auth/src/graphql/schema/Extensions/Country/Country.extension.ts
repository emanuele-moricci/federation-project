import { User } from '@prisma/client';

import { getUsersByCountryId } from '@src/services/userService';
import { Country } from '@src/graphql/generated/graphql';
import { IUserRef, ICountryRef } from '@fed-schema/Utils/refs';
import {
  ExtensionClass,
  ExtensionResolver,
  ResolveRelationship,
  ConnectRelationship,
} from 'galactagraph-utils/lib/classes';

/**
 * `Country-User Extension`
 *
 * The Class resolver for the `Country-User` extension.
 *
 * It uses the @ExtensionResolver decorator to define the `extension` logics for the Class.
 *
 * @interface `ExtensionClass<Country, ICountryRef, User, IUserRef>`
 * @class `CountryUserExtension`
 *
 * @method `resolve` - The method used to resolve the `Country` model in the `User` model.
 * @method `connect` - The method used to connect the `User` model to the `Country` model.
 */
@ExtensionResolver('Country', 'User')
class CountryUserExtension
  implements ExtensionClass<Country, ICountryRef, User, IUserRef> {
  @ResolveRelationship('country')
  resolve = ({ countryId }: IUserRef): Country => ({
    __typename: 'Country',
    countryId,
  });

  @ConnectRelationship('users')
  connect = ({ countryId }: ICountryRef): Promise<User[]> => {
    return getUsersByCountryId(parseInt(countryId));
  };
}

export default new CountryUserExtension();
