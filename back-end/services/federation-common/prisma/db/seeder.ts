import { PrismaClient } from '@prisma/client';

import seedLanguages from './seeders/language';
import seedCountries from './seeders/country';
// [ADD NEW SEEDER IMPORTS ABOVE] <- DO NOT REMOVE - Needed for the generator to create seeders seamlessly

const prisma = new PrismaClient();

async function main() {
  await seedLanguages();
  await seedCountries();
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
