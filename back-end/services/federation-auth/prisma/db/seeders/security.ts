import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedSecurities() {
  await prisma.security.create({
    data: {
      userId: 1,
    },
  });

  await prisma.security.create({
    data: {
      userId: 2,
    },
  });
}

export default seedSecurities;
