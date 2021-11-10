import { Profile } from '@prisma/client';
import { prismaContext } from '@config/prismaConfig';

import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-jdenticon-sprites';

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

/**
 * Function that returns a list of Profiles that are members of a group.
 *
 * @param {number} groupId The group ID.
 *
 * @async
 * @function getProfileById.
 * @returns {Promise<Profile[]>} The found Members.
 */
export const getMembersOfGroup = async (
  groupId: number
): Promise<Profile[]> => {
  return prismaContext.prisma.profile.findMany({
    where: {
      groups: {
        has: groupId,
      },
    },
  });
};

/**
 * Function that created a Profile with some input data and returns it.
 *
 * @param input The Profile input data.
 *
 * @async
 * @function createProfile.
 * @returns {Promise<Profile>} The User.
 */
export const createProfile = async (input): Promise<Profile> => {
  let imgData = createAvatar(style, {
    seed: `${input.username}`,
    dataUri: true,
  });

  return prismaContext.prisma.profile.create({
    data: { ...input, avatar: imgData },
  });
};

/**
 * Function that allows a Profile to join a Group.
 *
 * @param input The Profile&Group input data.
 *
 * @async
 * @function joinGroup.
 * @returns {Promise<{ profileId: number, groupId: number}>} The Profile&Group data.
 */
export const joinGroup = async (
  profileId: number,
  groupId: number
): Promise<Profile> => {
  const profile = await prismaContext.prisma.profile.findUnique({
    where: {
      profileId,
    },
  });

  if (!profile) throw Error('Profile not found');
  else if (profile.groups.some(g => g === groupId))
    throw Error('Profile already in group');

  return prismaContext.prisma.profile.update({
    where: {
      profileId,
    },
    data: {
      groups: {
        push: groupId,
      },
    },
  });
};
