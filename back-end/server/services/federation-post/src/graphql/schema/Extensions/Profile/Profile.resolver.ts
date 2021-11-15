import { Post } from '@prisma/client';

import { getPostsByProfileId } from '@src/services/postService';

import { IProfileRef } from '@fed-schema/Utils/refs';
import { Profile } from '@src/graphql/generated/graphql';
import { PaginationAndSearchArgs } from 'federation-utils';

const resolver = {
  Post: {
    profile: ({ profileId }: IProfileRef): Profile => ({
      __typename: 'Profile',
      profileId,
    }),
  },
  Profile: {
    posts: async (
      { profileId }: IProfileRef,
      args: PaginationAndSearchArgs
    ): Promise<Post[]> => {
      return getPostsByProfileId(parseInt(profileId), args);
    },
  },
};

export default resolver;
