import { Profile } from '@prisma/client';

import { createProfile, getProfileById } from '@src/services/profileService';
import { IProfileRef } from '@fed-schema/Utils/refs';

import { ResolverClass, ModelResolver } from 'galactagraph-utils/lib/classes';
import { CreateProfileInput } from '@src/graphql/generated/graphql';

/**
 * `Profile Resolver`
 *
 * The Class resolver for the `Profile` model.
 *
 * It uses the @ModelResolver decorator to define the `model` logics for the Class.
 *
 * @interface `ResolverClass<Profile, IProfileRef>`
 * @class `ProfileResolver`
 *
 * @method `reference` - The method used to resolve the `Profile` Model reference.
 * @method `set` - The method used to create a `Profile` Model.
 */
@ModelResolver('Profile')
class ProfileResolver implements ResolverClass<Profile, IProfileRef> {
  reference = ({ profileId }: IProfileRef) => {
    return getProfileById(parseInt(profileId));
  };

  set = (
    _source,
    { input }: { input: CreateProfileInput },
    _context,
    _info
  ) => {
    return createProfile(input);
  };
}

export default new ProfileResolver();
