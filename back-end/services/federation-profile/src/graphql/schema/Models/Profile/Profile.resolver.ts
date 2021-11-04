import { Profile } from '@prisma/client';

import { getProfileById } from '@src/services/profileService';

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
};

export default resolver;
