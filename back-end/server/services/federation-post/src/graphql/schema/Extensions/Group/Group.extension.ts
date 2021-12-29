import { Post } from '@prisma/client';

import { getPostsByGroupId } from '@src/services/postService';
import { Group } from '@src/graphql/generated/graphql';
import { IGroupRef, IPostRef } from '@fed-schema/Utils/refs';
import {
  ExtensionClass,
  ExtensionResolver,
  ResolveRelationship,
  ConnectRelationship,
} from 'galactagraph-utils/lib/classes';

/**
 * `Group-Post Extension`
 *
 * The Class resolver for the `Group-Post` extension.
 *
 * It uses the @ExtensionResolver decorator to define the `extension` logics for the Class.
 *
 * @interface `ExtensionClass<Group, IGroupRef, Post, IPostRef>`
 * @class `GroupPostExtension`
 *
 * @method `resolve` - The method used to resolve the `Group` model in the `Post` model.
 * @method `connect` - The method used to connect the `Post` model to the `Group` model.
 */
@ExtensionResolver('Group', 'Post')
class GroupPostExtension
  implements ExtensionClass<Group, IGroupRef, Post, IPostRef> {
  @ResolveRelationship('group')
  resolve = ({ groupId }: IPostRef): Group => ({
    __typename: 'Group',
    groupId,
  });

  @ConnectRelationship('posts')
  connect = ({ groupId }: IGroupRef): Promise<Post[]> => {
    return getPostsByGroupId(parseInt(groupId));
  };
}

export default new GroupPostExtension();
