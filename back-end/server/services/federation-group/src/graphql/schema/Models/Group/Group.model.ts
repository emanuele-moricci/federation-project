import { Group } from '@prisma/client';

import {
  createGroup,
  getAllGroups,
  getGroupById,
} from '@src/services/groupService';

import { IGroupRef } from '@fed-schema/Utils/refs';
import { CreateGroupInput } from '@src/graphql/generated/graphql';

import { PaginationAndSearchArgs } from 'galactagraph-utils';
import { ResolverClass, ModelResolver } from 'galactagraph-utils/lib/classes';

/**
 * `Group Resolver`
 *
 * The Class resolver for the `Group` model.
 *
 * It uses the @ModelResolver decorator to define the `model` logics for the Class.
 *
 * @interface `ResolverClass<Group, IGroupRef>`
 * @class `GroupResolver`
 *
 * @method `reference` - The method used to resolve the `Group` Model reference.
 * @method `get` - The method used to get the list of every `Group` Model.
 * @method `set` - The method used to create a `Group` Model.
 */
@ModelResolver('Group')
class GroupResolver implements ResolverClass<Group, IGroupRef> {
  reference = ({ groupId }: IGroupRef) => {
    return getGroupById(parseInt(groupId));
  };

  get = (_source, args: PaginationAndSearchArgs, _context, _info) => {
    return getAllGroups(args);
  };

  set = (_source, { input }: { input: CreateGroupInput }, _context, _info) => {
    return createGroup(input);
  };
}

export default new GroupResolver();
