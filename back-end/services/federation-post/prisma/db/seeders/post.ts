import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedPosts() {
  await prisma.post.create({
    data: {
      title: 'Awesome Post 1',
      description: 'This is the first post',
      profileId: 1,
      groupId: 1,
    },
  });

  await prisma.post.create({
    data: {
      title: 'Awesome Post 2',
      description: 'This is the second post',
      profileId: 2,
      groupId: 2,
    },
  });
}

export default seedPosts;
