import {
  CreateGroupPayload,
  CreateGroupInput,
} from '@src/graphql/generated/graphql';
import { createGroup } from '@src/services/groupService';

const resolver = {
  Mutation: {
    createGroup: async (
      _,
      { input }: { input: CreateGroupInput }
    ): Promise<CreateGroupPayload> => {
      const { groupId } = await createGroup(input);

      return { groupId };
    },
  },
};

export default resolver;
