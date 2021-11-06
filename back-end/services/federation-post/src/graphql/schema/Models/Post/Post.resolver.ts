import { Post } from '@prisma/client';

import { getAllPosts, getPostById } from '@src/services/postService';

import { IPostRef, IProfileRef, IGroupRef } from '@fed-schema/Utils/refs';

const resolver = {
  Query: {
    Post: async (_source, args): Promise<Post[]> => {
      return await getAllPosts(args);
    },
  },
  Post: {
    __resolveReference: async ({ postId }: IPostRef): Promise<Post | null> => {
      return await getPostById(parseInt(postId));
    },
    profile: ({ profileId }: IProfileRef): any => ({ // TO CHANGE
      __typename: 'Profile',
      profileId: profileId,
    }),
    group: ({ groupId }: IGroupRef): any => ({
      __typename: 'Group',
      groupId: groupId,
    }),
  },
};

export default resolver;
