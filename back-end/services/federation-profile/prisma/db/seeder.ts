import { PrismaClient } from '@prisma/client';

import seedProfiles from './seeders/profile';

const prisma = new PrismaClient();

async function main() {
  await seedProfiles();
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
