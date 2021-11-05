import prismaContext from '@config/prisma/prismaContext';
import { Group } from '@prisma/client';

/**
 * Function that returns all of the Groups present in the database.
 *
 * @async
 * @function getAllGroups.
 * @returns {Promise<Group[]>} The Groups List.
 */
export const getAllGroups = async (): Promise<Group[]> => {
  return await prismaContext.prisma.group.findMany();
};

/**
 * Function that returns a Group by its ID.
 *
 * @param {number} groupId The group ID.
 *
 * @async
 * @function getGroupById.
 * @returns {Promise<Group | null>} The found Group.
 */
export const getGroupById = async (groupId: number): Promise<Group | null> => {
  return await prismaContext.prisma.group.findUnique({
    where: {
      groupId,
    },
  });
};
