import { Profile } from '@prisma/client';
import { Group } from '@src/graphql/generated/graphql';

import { getMembersOfGroup } from '@src/services/profileService';
import { IProfileRef, IGroupRef } from '@fed-schema/Utils/refs';

const resolver = {
  Query: {},
  Profile: {
    groups: ({ groups }: IProfileRef): Group[] =>
      groups.map(id => ({
        __typename: 'Group',
        groupId: id,
      })),
  },
  Group: {
    members: async ({ groupId }: IGroupRef): Promise<Profile[]> => {
      return getMembersOfGroup(parseInt(groupId));
    },
  },
};

export default resolver;
