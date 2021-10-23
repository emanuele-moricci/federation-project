/**
 *
 * Model Language
 * WRITE A DESCRIPTION HERE
 *
 */
import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import UserType from '@src/graphql/schema/Models/User/User';

import getModelAudit from '@src/graphql/schema/Utils/ModelAudit';

const LanguageType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Language',
  description: 'The Model that represents the Language DB Table',
  fields: () => ({
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
    ...getModelAudit('language'),
  }),
});

export default LanguageType;
