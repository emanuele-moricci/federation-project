import { PrismaClient } from '@prisma/client';
import seedPosts from './seeders/post';

const prisma = new PrismaClient();

async function main() {
  // ADD YOUR MODEL SEEDERS HERE
  await seedPosts();
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
