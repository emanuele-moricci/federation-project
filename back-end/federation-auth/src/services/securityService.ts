import { Security } from '@prisma/client';
import prismaContext from '@src/lib/prisma/prismaContext';

/**
 * Function that returns all of the Securities present in the database.
 *
 * @async
 * @function getAllSecurities.
 * @returns {Promise<Security[]>} The Securities List.
 */
export const getAllSecurities = async (): Promise<Security[]> => {
  const securities = await prismaContext.prisma.security.findMany();
  return securities;
};

/**
 * Function that returns a Security by its ID.
 *
 * @param {number} securityId The security ID.
 *
 * @async
 * @function getSecurityById.
 * @returns {Promise<Security | null>} The found Security.
 */
export const getSecurityById = async (
  securityId: number
): Promise<Security | null> => {
  return prismaContext.prisma.security.findUnique({
    where: {
      securityId,
    },
  });
};

/**
 * Function that returns the Security data of a User.
 *
 * @param {number} userId The user ID.
 *
 * @async
 * @function getSecurityByUserId.
 * @returns {Promise<Security | null>} The Security data.
 */
export const getSecurityByUserId = async (
  userId: number
): Promise<Security | null> => {
  return prismaContext.prisma.security.findFirst({
    where: {
      userId,
    },
  });
};

/**
 * Function that created a Security with some input data and returns it.
 *
 * @param input The Security input data.
 *
 * @async
 * @function createSecurity.
 * @returns {Promise<Security>} The Security data.
 */
export const createSecurity = async (input): Promise<Security> => {
  const security = await prismaContext.prisma.security.create({
    data: input,
  });
  return security;
};
