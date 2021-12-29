import { getCountries } from 'node-countries';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCountries() {
  const countries = getCountries().map(country => ({
    name: country.name,
    alpha2: country.alpha2,
    alpha3: country.alpha3,
  }));

  await prisma.country.createMany({ data: countries });
}

export default seedCountries;
