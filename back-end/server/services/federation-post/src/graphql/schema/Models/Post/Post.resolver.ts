import { Post } from '@prisma/client';

import { getAllPosts, getPostById } from '@src/services/postService';

import { IPostRef } from '@fed-schema/Utils/refs';

const resolver = {
  Query: {
    Post: async (_source, args): Promise<Post[]> => {
      return getAllPosts(args);
    },
  },
  Post: {
    __resolveReference: async ({ postId }: IPostRef): Promise<Post | null> => {
      return getPostById(parseInt(postId));
    },
  },
};

export default resolver;
