import { Security } from '@prisma/client';
import { prismaContext } from '@config/prismaConfig';

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
 * Function that returns the Security data by Id.
 *
 * @param {number} securityId The user ID.
 *
 * @async
 * @function getSecurityById.
 * @returns {Promise<Security | null>} The Security data.
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
