import { Profile } from '@prisma/client';

import { getProfileById } from '@src/services/profileService';
import { IProfileRef } from '@fed-schema/Utils/refs';

const resolver = {
  Query: {},
  Profile: {
    __resolveReference: async ({
      profileId,
    }: IProfileRef): Promise<Profile | null> => {
      return getProfileById(parseInt(profileId));
    },
  },
};

export default resolver;
