import bcrypt from 'bcryptjs';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-jdenticon-sprites';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedUsers() {
  const salt = await bcrypt.genSalt(
    parseInt(process.env.AUTH_CRYPT_SALT ?? '10')
  );

  const adminPass = bcrypt.hashSync('Admin!20', salt);
  const userPass = bcrypt.hashSync('User!120', salt);

  let adminAvatar = createAvatar(style, {
    seed: adminPass,
    dataUri: true,
  });
  let userAvatar = createAvatar(style, {
    seed: userPass,
    dataUri: true,
  });

  await prisma.user.create({
    data: {
      email: 'admin@test.com',
      firstname: 'Federation',
      lastname: 'Admin',
      username: 'fed_admin',
      password: adminPass,
      languageId: 1,
      countryId: 124,
      role: 'ADMIN',
      avatar: adminAvatar,
    },
  });

  await prisma.user.create({
    data: {
      email: 'user@test.com',
      firstname: 'Federation',
      lastname: 'User',
      username: 'fed_user',
      password: userPass,
      languageId: 2,
      countryId: 124,
      avatar: userAvatar,
    },
  });
}

export default seedUsers;
