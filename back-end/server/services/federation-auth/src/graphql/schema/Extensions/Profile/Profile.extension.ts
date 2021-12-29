import { User } from '@prisma/client';

import { getUserByProfileId } from '@src/services/userService';
import { Profile } from '@src/graphql/generated/graphql';
import { IUserRef, IProfileRef } from '@fed-schema/Utils/refs';
import {
  ExtensionClass,
  ExtensionResolver,
  ResolveRelationship,
  ConnectRelationship,
} from 'galactagraph-utils/lib/classes';

/**
 * `Profile-User Extension`
 *
 * The Class resolver for the `Profile-User` extension.
 *
 * It uses the @ExtensionResolver decorator to define the `extension` logics for the Class.
 *
 * @interface `ExtensionClass<Profile, IProfileRef, User, IUserRef>`
 * @class `ProfileUserExtension`
 *
 * @method `resolve` - The method used to resolve the `Profile` model in the `User` model.
 * @method `connect` - The method used to connect the `User` model to the `Profile` model.
 */
@ExtensionResolver('Profile', 'User')
class ProfileUserExtension
  implements ExtensionClass<Profile, IProfileRef, User, IUserRef> {
  @ResolveRelationship('profile')
  resolve = ({ profileId }: IUserRef): Profile => ({
    __typename: 'Profile',
    profileId,
  });

  @ConnectRelationship('users')
  connect = ({ profileId }: IProfileRef): Promise<User | null> => {
    return getUserByProfileId(parseInt(profileId));
  };
}

export default new ProfileUserExtension();
