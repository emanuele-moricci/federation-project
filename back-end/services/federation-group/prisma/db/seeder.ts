import { PrismaClient } from '@prisma/client';

import seedGroup from './seeders/group';

const prisma = new PrismaClient();

async function main() {
  await seedGroup();
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
