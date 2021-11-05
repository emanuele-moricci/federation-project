import { Profile } from '@prisma/client';

import {
  getMembersOfGroup,
  getProfileById,
} from '@src/services/profileService';
import { IGroupRef } from '../../Utils/refs';

interface IProfileRef {
  __typename: 'Profile';
  profileId: string;
}

const resolver = {
  Query: {},
  Profile: {
    __resolveReference: async ({
      profileId,
    }: IProfileRef): Promise<Profile | null> => {
      return await getProfileById(parseInt(profileId));
    },
  },
  // EXTENSIONS
  Group: {
    members: async ({ groupId }: IGroupRef): Promise<Profile[]> => {
      return getMembersOfGroup(parseInt(groupId));
    },
  },
};

export default resolver;
