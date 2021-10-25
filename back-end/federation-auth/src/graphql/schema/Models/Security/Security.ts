import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import UserType from '@schema/Models/User/User';
import AuthEnumType from '@schema/Enums/AuthType';

import getModelWithAudit from '@schema/Utils/ModelAudit';

/**
 *
 * The Model that maps the Security Database Table
 *
 * @name SecurityType
 * @type {GraphQLObjectType}
 */
const SecurityType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Security',
  description: 'The Model that represents the Security DB Table',
  fields: () =>
    getModelWithAudit({
      securityId: {
        type: GraphQLNonNull(GraphQLID),
        description: 'security id',
      },
      type: {
        type: GraphQLNonNull(AuthEnumType),
        description: 'security auth type',
      },
      secret: {
        type: GraphQLNonNull(GraphQLString),
        description: 'security secret',
      },
      recovery: {
        type: GraphQLNonNull(GraphQLString),
        description: 'security recovery',
      },
      auxiliary: {
        type: GraphQLNonNull(GraphQLString),
        description: 'security auxiliary',
      },
      metadata: {
        type: GraphQLNonNull(GraphQLString),
        description: 'security metadata',
      },
      user: {
        type: UserType,
        description: 'security user',
      },
      userId: {
        type: GraphQLNonNull(GraphQLInt),
        description: 'id of the user',
      },
    }),
});

export default SecurityType;
