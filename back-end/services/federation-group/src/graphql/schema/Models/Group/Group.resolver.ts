import { Group } from '@prisma/client';

import {
  getAllGroups,
  getGroupById,
  getGroupsByProfileId,
} from '@src/services/groupService';
import { IProfileRef } from '@fed-schema/Utils/refs';

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
  // EXTENSIONS
  Profile: {
    groups: async ({ profileId }: IProfileRef): Promise<any> => {
      // TODO: CHANGE
      return getGroupsByProfileId(parseInt(profileId));
    },
  },
};

export default resolver;
