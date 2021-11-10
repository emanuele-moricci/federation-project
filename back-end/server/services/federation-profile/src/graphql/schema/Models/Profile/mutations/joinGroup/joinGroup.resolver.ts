import {
  JoinGroupPayload,
  JoinGroupInput,
} from '@src/graphql/generated/graphql';
import { joinGroup } from '@src/services/profileService';

const resolver = {
  Mutation: {
    joinGroup: async (
      _,
      { input: { profileId, groupId } }: { input: JoinGroupInput }
    ): Promise<JoinGroupPayload> => {
      const result = await joinGroup(profileId, groupId);

      return { profileId, groupId };
    },
  },
};

export default resolver;
