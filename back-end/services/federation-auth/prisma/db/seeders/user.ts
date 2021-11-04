import bcrypt from 'bcryptjs';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedUsers() {
  const salt = await bcrypt.genSalt(
    parseInt(process.env.AUTH_CRYPT_SALT ?? '10')
  );

  const adminPass = bcrypt.hashSync('Admin!20', salt);
  const userPass = bcrypt.hashSync('User!120', salt);

  await prisma.user.create({
    data: {
      email: 'admin@test.com',
      firstname: 'Federation',
      lastname: 'Admin',
      password: adminPass,
      languageId: 1,
      countryId: 124,
      profileId: 1,
      role: 'ADMIN',
    },
  });

  await prisma.user.create({
    data: {
      email: 'user@test.com',
      firstname: 'Federation',
      lastname: 'User',
      password: userPass,
      languageId: 2,
      countryId: 124,
      profileId: 2,
    },
  });
}

export default seedUsers;
