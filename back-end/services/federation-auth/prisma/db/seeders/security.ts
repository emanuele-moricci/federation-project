import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedSecurities() {
  const securityArray = Array.from({ length: 25 }, (_, i) => {
    return {
      userId: i + 1,
    };
  });

  await prisma.security.createMany({
    data: securityArray,
  });
}

export default seedSecurities;
