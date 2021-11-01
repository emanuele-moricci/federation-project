import { User } from '@prisma/client';

import { getUserById } from '@src/services/userService';

import authGuard from '@fed-schema/permissions';

const resolver = {
  Query: {
    me: async (_source, _args, context, _info): Promise<User | null> => {
      return authGuard(context)
        ? getUserById(context?.userData?.userId ?? -1)
        : null;
    },
  },
};

export default resolver;
