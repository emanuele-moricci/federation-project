import { PrismaClient } from '@prisma/client';

import seedLanguages from './seeders/language';

const prisma = new PrismaClient();

async function main() {
  await seedLanguages();
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
