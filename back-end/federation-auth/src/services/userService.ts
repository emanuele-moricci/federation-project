import bcrypt from 'bcryptjs';

import prismaContext from '@src/lib/prisma/prismaContext';
import { User } from '@prisma/client';

/**
 * Function that returns all of the Users present in the database.
 *
 * @async
 * @function getAllUsers.
 * @returns {Promise<User[]>} The Users List.
 */
export const getAllUsers = async (): Promise<User[]> => {
  const users = await prismaContext.prisma.user.findMany();
  return users.map(u => ({ ...u, password: '' }));
};

/**
 * Function that returns a User by its ID.
 *
 * @param {number} userId The user ID.
 *
 * @async
 * @function getUserById.
 * @returns {Promise<User | null>} The found User.
 */
export const getUserById = async (userId: number): Promise<User | null> => {
  return prismaContext.prisma.user.findUnique({
    where: {
      userId,
    },
  });
};

/**
 * Function that returns a User by its unique email.
 *
 * @param {string} email The user email.
 *
 * @async
 * @function getUserByEmail.
 * @returns {Promise<User | null>} The found User.
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
  return prismaContext.prisma.user.findUnique({
    where: {
      email,
    },
  });
};

/**
 * Function that returns a list of Users with the same language.
 *
 * @param {number} languageId The language ID.
 *
 * @async
 * @function getUsersByLanguageId.
 * @returns {Promise<User[]>} The Users list.
 */
export const getUsersByLanguageId = async (
  languageId: number
): Promise<User[]> => {
  return prismaContext.prisma.user.findMany({
    where: {
      languageId,
    },
  });
};

/**
 * Function that created a User with some input data and returns it.
 *
 * @param input The User input data.
 *
 * @async
 * @function createUser.
 * @returns {Promise<User[]>} The User.
 */
export const createUser = async (input): Promise<User> => {
  const salt = await bcrypt.genSalt(
    parseInt(process.env.AUTH_CRYPT_SALT ?? '10')
  );
  const hashedPass = await bcrypt.hash(input.password, salt);

  const user = await prismaContext.prisma.user.create({
    data: { ...input, password: hashedPass },
  });

  await prismaContext.prisma.security.create({
    data: { userId: user.userId },
  });

  return user;
};
