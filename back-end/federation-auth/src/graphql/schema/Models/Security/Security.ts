/**
 *
 * Model Security
 * WRITE A DESCRIPTION HERE
 *
 */
import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import UserType from '@src/graphql/schema/Models/User/User';

import getModelAudit from '@src/graphql/schema/Utils/ModelAudit';

const AuthEnumType = new GraphQLEnumType({
  name: 'AuthType',
  values: {
    PASSWORD: {
      value: 0,
    },
    MFA_CODES: {
      value: 1,
    },
    WEBAUTHN: {
      value: 2,
    },
  },
});

const SecurityType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Security',
  description: 'The Model that represents the Security DB Table',
  fields: () => ({
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
    ...getModelAudit('security'),
  }),
});

export default SecurityType;
