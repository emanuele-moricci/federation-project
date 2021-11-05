import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-jdenticon-sprites';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedGroups() {
  const defaultBanner =
    'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80';
  let avatar = createAvatar(style, {
    seed: 'amazing_group',
    dataUri: true,
  });

  await prisma.group.create({
    data: {
      name: 'Amazing Group 1',
      bio: 'This is a group for amazing people',
      avatar,
      banner: defaultBanner,
      members: [2],
    },
  });
}

export default seedGroups;
