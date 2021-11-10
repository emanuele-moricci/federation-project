import bcrypt from 'bcryptjs';
import faker from 'faker';

import { PrismaClient, Role } from '@prisma/client';
const prisma = new PrismaClient();

async function seedUsers() {
  const salt = await bcrypt.genSalt(
    parseInt(process.env.AUTH_CRYPT_SALT ?? '10')
  );

  const adminPass = bcrypt.hashSync('Admin!20', salt);

  const userArray = Array.from({ length: 25 }, (_, i) => {
    const isAdmin = i === 0;
    const userPass = bcrypt.hashSync(faker.internet.password(), salt);

    return {
      email: isAdmin ? 'admin@federation.com' : faker.internet.email(),
      firstname: isAdmin ? 'Federation' : faker.name.firstName(),
      lastname: isAdmin ? 'Admin' : faker.name.lastName(),
      password: isAdmin ? adminPass : userPass,
      languageId: faker.datatype.number({
        min: 1,
        max: 5,
      }),
      countryId: faker.datatype.number({
        min: 1,
        max: 120,
      }),
      profileId: i + 1,
      role: isAdmin ? Role.ADMIN : Role.USER,
    };
  });

  await prisma.user.createMany({
    data: userArray,
  });
}

export default seedUsers;
