import prismaContext from '@config/prisma/prismaContext';

import { Post } from '@prisma/client';

import { PaginationAndSearchArgs } from 'federation-utils';

/**
 * Function that returns all of the Posts present in the database.
 *
 * @async
 * @function getAllPosts.
 * @returns {Promise<Post[]>} The Post List.
 */
export const getAllPosts = async ({
  take,
  skip,
}: PaginationAndSearchArgs): Promise<Post[]> => {
  return await prismaContext.prisma.post.findMany({ take, skip });
};

/**
 * Function that returns a Post by its ID.
 *
 * @param {number} postId The post ID.
 *
 * @async
 * @function getPostById.
 * @returns {Promise<Post | null>} The found Post.
 */
export const getPostById = async (postId: number): Promise<Post | null> => {
  return await prismaContext.prisma.post.findUnique({ where: { postId } });
};
