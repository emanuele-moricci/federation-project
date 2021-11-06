import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedPosts() {
  await prisma.post.create({
    data: {},
  });
}

export default seedPosts;
