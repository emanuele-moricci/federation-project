import { PrismaClient } from '@prisma/client';

import seedSecurities from './seeders/security';
import seedUsers from './seeders/user';

const prisma = new PrismaClient();

async function main() {
  await seedUsers();
  await seedSecurities();
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
