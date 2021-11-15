import { Post } from '@prisma/client';

import { getPostsByGroupId } from '@src/services/postService';
import { Group } from '@src/graphql/generated/graphql';
import { IGroupRef } from '@fed-schema/Utils/refs';
import { PaginationAndSearchArgs } from 'federation-utils';

const resolver = {
  Post: {
    group: ({ groupId }: IGroupRef): Group => ({
      __typename: 'Group',
      groupId,
    }),
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
