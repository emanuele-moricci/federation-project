import { Post } from '@prisma/client';

import { getPostsByProfileId } from '@src/services/postService';

import { IProfileRef, IPostRef } from '@fed-schema/Utils/refs';
import { Profile } from '@src/graphql/generated/graphql';
import { PaginationAndSearchArgs } from 'galactagraph-utils';
import {
  ExtensionClass,
  ExtensionResolver,
  ResolveRelationship,
  ConnectRelationship,
} from 'galactagraph-utils/lib/classes';

/**
 * `Profile-Post Extension`
 *
 * The Class resolver for the `Profile-Post` extension.
 *
 * It uses the @ExtensionResolver decorator to define the `extension` logics for the Class.
 *
 * @interface `ExtensionClass<Profile, IProfileRef, Post, IPostRef>`
 * @class `ProfilePostExtension`
 *
 * @method `resolve` - The method used to resolve the `Profile` model in the `Post` model.
 * @method `connect` - The method used to connect the `Post` model to the `Profile` model.
 */
@ExtensionResolver('Profile', 'Post')
class ProfilePostExtension
  implements ExtensionClass<Profile, IProfileRef, Post, IPostRef> {
  @ResolveRelationship('profile')
  resolve = ({ profileId }: IPostRef): Profile => ({
    __typename: 'Profile',
    profileId,
  });

  @ConnectRelationship('posts')
  connect = ({ profileId }: IProfileRef): Promise<Post[]> => {
    return getPostsByProfileId(parseInt(profileId));
  };
}

export default new ProfilePostExtension();
