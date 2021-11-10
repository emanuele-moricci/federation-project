import { Profile } from '@prisma/client';
import { Group } from '@src/graphql/generated/graphql';

import {
  getMembersOfGroup,
  getProfileById,
} from '@src/services/profileService';
import { IProfileRef, IGroupRef } from '@fed-schema/Utils/refs';

const resolver = {
  Query: {},
  Profile: {
    __resolveReference: async ({
      profileId,
    }: IProfileRef): Promise<Profile | null> => {
      return await getProfileById(parseInt(profileId));
    },
    groups: ({ groups }: IProfileRef): Group[] =>
      groups.map(id => ({
        __typename: 'Group',
        groupId: id,
      })),
  },
  // EXTENSIONS
  Group: {
    members: async ({ groupId }: IGroupRef): Promise<Profile[]> => {
      return getMembersOfGroup(parseInt(groupId));
    },
  },
};

export default resolver;
