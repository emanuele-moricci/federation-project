import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedProfiles() {
  await prisma.profile.create({
    data: {
      bio: "I'm the admin of the platform!",
    },
  });

  await prisma.profile.create({
    data: {
      bio: "I'm just a simple user!",
    },
  });
}

export default seedProfiles;
