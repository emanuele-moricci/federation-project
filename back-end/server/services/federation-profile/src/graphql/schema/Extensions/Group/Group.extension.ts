import { Profile } from '@prisma/client';
import { Group } from '@src/graphql/generated/graphql';

import { getMembersOfGroup } from '@src/services/profileService';
import { IProfileRef, IGroupRef } from '@fed-schema/Utils/refs';

import {
  ExtensionClass,
  ExtensionResolver,
  ResolveRelationship,
  ConnectRelationship,
} from 'galactagraph-utils/lib/classes';

/**
 * `Group-Profile Extension`
 *
 * The Class resolver for the `Group-Profile` extension.
 *
 * It uses the @ExtensionResolver decorator to define the `extension` logics for the Class.
 *
 * @interface `ExtensionClass<Group, IGroupRef, Profile, IProfileRef>`
 * @class `GroupProfileExtension`
 *
 * @method `resolve` - The method used to resolve the `Group` model in the `Profile` model.
 * @method `connect` - The method used to connect the `Profile` model to the `Group` model.
 */
@ExtensionResolver('Group', 'Profile')
class GroupProfileExtension
  implements ExtensionClass<Group, IGroupRef, Profile, IProfileRef> {
  @ResolveRelationship('groups')
  resolve = ({ groups }: IProfileRef): Group[] =>
    groups.map(id => ({
      __typename: 'Group',
      groupId: id,
    }));

  @ConnectRelationship('profiles')
  connect = ({ groupId }: IGroupRef): Promise<Profile[]> => {
    return getMembersOfGroup(parseInt(groupId));
  };
}

export default new GroupProfileExtension();
