import bcrypt from 'bcryptjs';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedUsers() {
  const salt = await bcrypt.genSalt(
    parseInt(process.env.AUTH_CRYPT_SALT ?? '10')
  );

  const adminPass = bcrypt.hashSync('Admin!20', salt);
  const userPass = bcrypt.hashSync('User!120', salt);

  await prisma.user.upsert({
    where: { userId: 1 },
    update: {},
    create: {
      userId: 1,
      email: 'admin@test.com',
      firstname: 'Federation',
      lastname: 'Admin',
      password: adminPass,
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
      password: userPass,
      languageId: 2,
    },
  });
}

export default seedUsers;
