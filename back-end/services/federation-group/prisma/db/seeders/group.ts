import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedGroups() {
  await prisma.group.create({
    data: {},
  });
}

export default seedGroups;
