import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedUsers() {
  await prisma.user.upsert({
    where: { userId: 1 },
    update: {},
    create: {
      userId: 1,
      email: 'admin@test.com',
      firstname: 'Federation',
      lastname: 'Admin',
      password: 'Admin!20',
      languageId: 1,
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { userId: 2 },
    update: {},
    create: {
      userId: 2,
      email: 'user@test.com',
      firstname: 'Federation',
      lastname: 'User',
      password: 'User?!20',
      languageId: 2,
    },
  });
}

export default seedUsers;
