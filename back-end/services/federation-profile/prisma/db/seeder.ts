import { PrismaClient } from '@prisma/client';

import seedProfiles from './seeders/profile';
// [ADD NEW SEEDER IMPORTS ABOVE] <- DO NOT REMOVE - Needed for the generator to create seeders seamlessly

const prisma = new PrismaClient();

async function main() {
  await seedProfiles();
  // [ADD NEW SEEDERS ABOVE] <- DO NOT REMOVE - Needed for the generator to create seeders seamlessly
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
