import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedLanguages() {
  await prisma.language.upsert({
    where: { languageId: 1 },
    update: {},
    create: {
      code: 'en',
      name: 'English',
      native: 'English',
    },
  });

  await prisma.language.upsert({
    where: { languageId: 2 },
    update: {},
    create: {
      code: 'it',
      name: 'Italian',
      native: 'Italiano',
    },
  });

  await prisma.language.upsert({
    where: { languageId: 3 },
    update: {},
    create: {
      code: 'es',
      name: 'Spanish',
      native: 'Español',
    },
  });

  await prisma.language.upsert({
    where: { languageId: 4 },
    update: {},
    create: {
      code: 'fr',
      name: 'French',
      native: 'Français',
    },
  });

  await prisma.language.upsert({
    where: { languageId: 5 },
    update: {},
    create: {
      code: 'de',
      name: 'German',
      native: 'Deutsch',
    },
  });
}

export default seedLanguages;
