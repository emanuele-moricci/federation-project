import { Security, User } from '@prisma/client';

import { getSecurityById } from '@src/services/securityService';
import { getUserById } from '@src/services/userService';
import { ISecurityRef } from '@fed-schema/Utils/refs';

import { ResolverClass, ModelResolver } from 'galactagraph-utils/lib/classes';

/**
 * `Security Resolver`
 *
 * The Class resolver for the `Security` model.
 *
 * It uses the @ModelResolver decorator to define the `model` logics for the Class.
 *
 * @interface `ResolverClass<Security, ISecurityRef>`
 * @class `SecurityResolver`
 *
 * @method `reference` - The method used to resolve the `Security` Model reference.
 * @method `user` - The method used to get the list of every `User` Model connected.
 */
@ModelResolver('Security')
class SecurityResolver implements ResolverClass<Security, ISecurityRef> {
  reference = ({ securityId }: ISecurityRef) => {
    return getSecurityById(parseInt(securityId));
  };

  user = async ({ userId }: { userId: number }): Promise<User | null> => {
    return getUserById(userId);
  };
}

export default new SecurityResolver();
