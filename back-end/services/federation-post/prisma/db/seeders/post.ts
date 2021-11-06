import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import faker from 'faker';

async function seedPosts() {
  const postArray = Array.from({ length: 25 }, (_, i) => {
    return {
      title: faker.company.catchPhrase(),
      description: faker.lorem.paragraph(),
      profileId: faker.datatype.number({
        min: 1,
        max: 25,
      }),
      groupId: faker.datatype.number({
        min: 1,
        max: 10,
      }),
      image: faker.image.imageUrl(),
    };
  });

  await prisma.post.createMany({
    data: postArray,
  });
}

export default seedPosts;
