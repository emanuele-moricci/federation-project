import { Post } from '@prisma/client';

import { getAllPosts, getPostById } from '@src/services/postService';

interface IPostRef {
  __typename: 'Post';
  postId: string;
}

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
  },
};

export default resolver;
