import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-jdenticon-sprites';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const defaultBanner =
  'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80';
let adminAvatar = createAvatar(style, {
  seed: 'fed_admin',
  dataUri: true,
});
let userAvatar = createAvatar(style, {
  seed: 'fed_user',
  dataUri: true,
});

async function seedProfiles() {
  await prisma.profile.create({
    data: {
      bio: "I'm the admin of the platform!",
      username: 'fed_admin',
      address: 'Via delle Nuvole, 1',
      phone: '+39 333 333 333',
      avatar: adminAvatar,
      banner: defaultBanner,
      groups: [1],
    },
  });

  await prisma.profile.create({
    data: {
      bio: "I'm just a simple user!",
      username: 'fed_user',
      address: 'Via delle Pozzanghere, 2',
      phone: '+39 123 456 789',
      avatar: userAvatar,
      banner: defaultBanner,
      groups: [2],
    },
  });
}

export default seedProfiles;
