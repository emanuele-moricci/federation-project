import { prismaContext } from '@config/prismaConfig';
import { Group } from '@prisma/client';

import { PaginationAndSearchArgs } from 'galactagraph-utils';
// import { CreateGroupInput } from '@src/graphql/generated/graphql';

import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-jdenticon-sprites';

/**
 * Function that returns all of the Groups present in the database.
 *
 * @async
 * @function getAllGroups.
 * @returns {Promise<Group[]>} The Groups List.
 */
export const getAllGroups = async ({
  take,
  skip,
}: PaginationAndSearchArgs): Promise<Group[]> => {
  return prismaContext.prisma.group.findMany({ take, skip });
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
  return prismaContext.prisma.group.findUnique({
    where: {
      groupId,
    },
  });
};

/**
 * Function that created a Group with some input data and returns it.
 *
 * @param input The Group input data.
 *
 * @async
 * @function createGroup.
 * @returns {Promise<Group>} The User.
 */
export const createGroup = async ({
  banner,
  ...input
}: any): Promise<Group> => {
  const imgData = createAvatar(style, {
    seed: `${input.name}`,
    dataUri: true,
  });
  const groupBanner =
    banner ??
    'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80';

  return prismaContext.prisma.group.create({
    data: { ...input, banner: groupBanner, avatar: imgData },
  });
};
