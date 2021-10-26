import { Security } from '@prisma/client';
import prismaContext from '@config/prisma/prismaContext';

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
