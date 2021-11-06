import { Post } from '@prisma/client';

import {
  getAllPosts,
  getPostById,
  getPostsByGroupId,
  getPostsByProfileId,
} from '@src/services/postService';

import { IPostRef, IProfileRef, IGroupRef } from '@fed-schema/Utils/refs';
import { PaginationAndSearchArgs } from 'federation-utils';

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
    profile: ({ profileId }: IProfileRef): any => ({
      // TO CHANGE
      __typename: 'Profile',
      profileId: profileId,
    }),
    group: ({ groupId }: IGroupRef): any => ({
      __typename: 'Group',
      groupId: groupId,
    }),
  },
  // EXTENSIONS
  Profile: {
    posts: async (
      { profileId }: IProfileRef,
      args: PaginationAndSearchArgs
    ): Promise<Post[]> => {
      return getPostsByProfileId(parseInt(profileId), args);
    },
  },
  Group: {
    posts: async (
      { groupId }: IGroupRef,
      args: PaginationAndSearchArgs
    ): Promise<Post[]> => {
      return getPostsByGroupId(parseInt(groupId), args);
    },
  },
};

export default resolver;
