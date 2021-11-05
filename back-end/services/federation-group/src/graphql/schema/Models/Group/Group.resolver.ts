import { Group } from '@prisma/client';

import { getAllGroups, getGroupById } from '@src/services/groupService';

interface IGroupRef {
  __typename: 'Group';
  groupId: string;
}

const resolver = {
  Query: {
    Group: async (_source, _args, _context, _info): Promise<Group[]> => {
      return await getAllGroups();
    },
  },
  Group: {
    __resolveReference: async ({
      groupId,
    }: IGroupRef): Promise<Group | null> => {
      return await getGroupById(parseInt(groupId));
    },
  },
};

export default resolver;
