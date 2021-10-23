import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedSecurities() {
  await prisma.security.upsert({
    where: { securityId: 1 },
    update: {},
    create: {
      securityId: 1,
      userId: 1,
    },
  });

  await prisma.security.upsert({
    where: { securityId: 2 },
    update: {},
    create: {
      securityId: 2,
      userId: 2,
    },
  });
}

export default seedSecurities;
