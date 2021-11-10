import {
  CreatePostPayload,
  CreatePostInput,
} from '@src/graphql/generated/graphql';
import { createPost } from '@src/services/postService';

const resolver = {
  Mutation: {
    createPost: async (
      _,
      { input }: { input: CreatePostInput }
    ): Promise<CreatePostPayload> => {
      const { postId } = await createPost(input);

      return { postId };
    },
  },
};

export default resolver;
