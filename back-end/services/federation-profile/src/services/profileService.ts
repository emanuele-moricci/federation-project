import { Profile } from '@prisma/client';
import prismaContext from '@config/prisma/prismaContext';

/**
 * Function that returns all of the Profiles present in the database.
 *
 * @async
 * @function getAllProfiles.
 * @returns {Promise<Profile[]>} The Profiles List.
 */
export const getAllProfiles = async (): Promise<Profile[]> => {
  const profiles = await prismaContext.prisma.profile.findMany();
  return profiles;
};

/**
 * Function that returns a Profile by its ID.
 *
 * @param {number} profileId The profile ID.
 *
 * @async
 * @function getProfileById.
 * @returns {Promise<Profile | null>} The found Profile.
 */
export const getProfileById = async (
  profileId: number
): Promise<Profile | null> => {
  return prismaContext.prisma.profile.findUnique({
    where: {
      profileId,
    },
  });
};
