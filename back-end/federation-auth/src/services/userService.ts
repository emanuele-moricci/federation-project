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
  return users;
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
  const user = await prismaContext.prisma.user.create({
    data: input,
  });

  await prismaContext.prisma.security.create({
    data: { userId: user.userId },
  });

  return user;
};
