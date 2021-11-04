import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedProfiles() {
  await prisma.profile.create({
    data: {},
  });

  await prisma.profile.create({
    data: {},
  });
}

export default seedProfiles;
