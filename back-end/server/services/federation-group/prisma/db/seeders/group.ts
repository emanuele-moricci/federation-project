import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-jdenticon-sprites';

import faker from 'faker';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedGroups() {
  const defaultBanner =
    'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80';

  const groupArray = Array.from({ length: 10 }, (_, i) => {
    let avatar = createAvatar(style, {
      seed: faker.lorem.sentence(),
      dataUri: true,
    });

    return {
      name: faker.company.companyName(),
      bio: faker.company.catchPhrase(),
      avatar: avatar,
      banner: defaultBanner,
    };
  });

  await prisma.group.createMany({
    data: groupArray,
  });
}

export default seedGroups;
