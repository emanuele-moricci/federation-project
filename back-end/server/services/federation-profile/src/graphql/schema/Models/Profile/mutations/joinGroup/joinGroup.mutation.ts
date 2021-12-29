import {
  JoinGroupPayload,
  JoinGroupInput,
} from '@src/graphql/generated/graphql';
import { joinGroup } from '@src/services/profileService';

import {
  MutationResolver,
  OperationClass,
} from 'galactagraph-utils/lib/classes';

/**
 * `JoinGroup Mutation`
 *
 * The Class resolver for the `JoinGroup` mutation.
 *
 * It uses the @MutationResolver decorator to define the `mutation` logics for the Class.
 *
 * @interface `OperationClass<JoinGroupPayload>`
 * @class `JoinGroupMutation`
 *
 * @method `resolve` - The method used to resolve the `JoinGroup` mutation logics.
 */
@MutationResolver('joinGroup')
class JoinGroupMutation implements OperationClass<JoinGroupPayload> {
  resolve = async (
    _source,
    { input: { profileId, groupId } }: { input: JoinGroupInput },
    _context,
    _info
  ): Promise<JoinGroupPayload | null> => {
    try {
      await joinGroup(profileId, groupId);

      return { profileId, groupId };
    } catch (error) {
      console.error(error);
      return { profileId: -1, groupId: -1 };
    }
  };
}

export default new JoinGroupMutation();
