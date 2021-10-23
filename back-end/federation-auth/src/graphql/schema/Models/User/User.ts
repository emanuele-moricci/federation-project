import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import LanguageType from '@src/graphql/schema/Models/Language/Language';
import SecurityType from '@src/graphql/schema/Models/Security/Security';
import RoleEnumType from '@src/graphql/schema/Enums/Role';

import getModelAudit from '@src/graphql/schema/Utils/ModelAudit';

/**
*
* The Model that maps the User Database Table
*
* @name UserType
* @type {GraphQLObjectType}
*/
const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  description: 'The Model that represents the User DB Table',
  fields: () => ({
    userId: {
      type: GraphQLNonNull(GraphQLID),
      description: 'user id',
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
      description: 'user email',
    },
    password: {
      type: GraphQLNonNull(GraphQLString),
      description: 'user password',
    },
    token: {
      type: GraphQLString,
      description: 'user auth token',
    },
    active: {
      type: GraphQLNonNull(GraphQLBoolean),
      description: 'is user active now?',
    },
    role: {
      type: GraphQLNonNull(RoleEnumType),
      description: 'user role',
    },
    language: {
      type: LanguageType,
      description: 'user language',
    },
    languageId: {
      type: GraphQLNonNull(GraphQLInt),
      description: 'id of the language',
    },
    security: {
      type: SecurityType,
      description: 'user security settings',
    },
    firstname: {
      type: GraphQLNonNull(GraphQLString),
      description: 'user firstname',
    },
    lastname: {
      type: GraphQLNonNull(GraphQLString),
      description: 'user lastname',
    },
    phone: {
      type: GraphQLString,
      description: 'user phone',
    },
    address: {
      type: GraphQLString,
      description: 'user address',
    },
    avatar: {
      type: GraphQLString,
      description: 'user avatar',
    },
    banner: {
      type: GraphQLString,
      description: 'user banner',
    },
    ...getModelAudit('user'),
  }),
});

export default UserType;
