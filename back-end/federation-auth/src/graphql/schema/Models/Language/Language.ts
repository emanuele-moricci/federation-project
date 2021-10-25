import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import UserType from '@schema/Models/User/User';

import getModelWithAudit from '@schema/Utils/ModelAudit';

/**
 *
 * The Model that maps the Language Database Table
 *
 * @name LanguageType
 * @type {GraphQLObjectType}
 */
const LanguageType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Language',
  description: 'The Model that represents the Language DB Table',
  fields: () =>
    getModelWithAudit({
      languageId: {
        type: GraphQLNonNull(GraphQLID),
        description: 'language id',
      },
      code: {
        type: GraphQLNonNull(GraphQLString),
        description: 'language code',
      },
      name: {
        type: GraphQLNonNull(GraphQLString),
        description: 'language name',
      },
      native: {
        type: GraphQLNonNull(GraphQLString),
        description: 'language native',
      },
      users: {
        type: GraphQLList(UserType),
        description: 'user security settings',
      },
    }),
});

export default LanguageType;
