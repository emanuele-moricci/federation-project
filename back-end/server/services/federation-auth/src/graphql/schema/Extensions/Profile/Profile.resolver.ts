import { User } from '@prisma/client';

import { getUserByProfileId } from '@src/services/userService';
import { Profile } from '@src/graphql/generated/graphql';
import { IProfileRef } from '@fed-schema/Utils/refs';

const resolver = {
  User: {
    profile: ({ profileId }: IProfileRef): Profile => ({
      __typename: 'Profile',
      profileId,
    }),
  },
  Profile: {
    user: async ({ profileId }: IProfileRef): Promise<User | null> => {
      return getUserByProfileId(parseInt(profileId));
    },
  },
};

export default resolver;
