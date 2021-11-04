import { Profile } from '@prisma/client';

import { getAllProfiles, getProfileById } from '@src/services/profileService';

interface IProfileRef {
  __typename: 'Profile';
  profileId: string;
}

const resolver = {
  Query: {
    Profile: async (_source, _args, _context, _info): Promise<Profile[]> => {
      return await getAllProfiles();
    },
  },
  Profile: {
    __resolveReference: async ({
      profileId,
    }: IProfileRef): Promise<Profile | null> => {
      return await getProfileById(parseInt(profileId));
    },
  },
};

export default resolver;
