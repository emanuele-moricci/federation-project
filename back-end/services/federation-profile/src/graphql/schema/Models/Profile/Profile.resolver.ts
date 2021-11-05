import { Profile } from '@prisma/client';

import {
  getMembersOfGroup,
  getProfileById,
} from '@src/services/profileService';
import { IProfileRef, IGroupRef } from '../../Utils/refs';

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
