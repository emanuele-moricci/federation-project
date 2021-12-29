import { Post } from '@prisma/client';

import {
  createPost,
  getAllPosts,
  getPostById,
} from '@src/services/postService';

import { IPostRef } from '@fed-schema/Utils/refs';
import { CreatePostInput } from '@src/graphql/generated/graphql';

import { PaginationAndSearchArgs } from 'galactagraph-utils';
import { ResolverClass, ModelResolver } from 'galactagraph-utils/lib/classes';

/**
 * `Post Resolver`
 *
 * The Class resolver for the `Post` model.
 *
 * It uses the @ModelResolver decorator to define the `model` logics for the Class.
 *
 * @interface `ResolverClass<Post, IPostRef>`
 * @class `PostResolver`
 *
 * @method `reference` - The method used to resolve the `Post` Model reference.
 * @method `get` - The method used to get the list of every `Post` Model.
 * @method `set` - The method used to create a `Post` Model.
 */
@ModelResolver('Post')
class PostResolver implements ResolverClass<Post, IPostRef> {
  reference = ({ postId }: IPostRef) => {
    return getPostById(parseInt(postId));
  };

  get = (_source, args: PaginationAndSearchArgs, _context, _info) => {
    return getAllPosts(args);
  };

  set = (_source, { input }: { input: CreatePostInput }, _context, _info) => {
    return createPost(input);
  };
}

export default new PostResolver();
