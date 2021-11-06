import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-jdenticon-sprites';

import faker from 'faker';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedProfiles() {
  const defaultBanner =
    'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80';

  const profileArray = Array.from({ length: 25 }, (_, i) => {
    const isAdmin = i === 0;
    let avatar = createAvatar(style, {
      seed: faker.lorem.sentence(),
      dataUri: true,
    });

    const groups = Array.from(
      { length: Math.floor(Math.random() * 5) + 1 },
      () => Math.floor(Math.random() * 25)
    );
    const uniqueGroups = [...new Set(groups)];

    return {
      profileId: i + 1,
      bio: faker.lorem.sentence(),
      username: isAdmin ? 'fed_admin' : faker.internet.userName(),
      address: faker.address.streetAddress(),
      phone: faker.phone.phoneNumber(),
      avatar: avatar,
      banner: defaultBanner,
      groups: uniqueGroups,
    };
  });

  await prisma.profile.createMany({
    data: profileArray,
  });
}

export default seedProfiles;
