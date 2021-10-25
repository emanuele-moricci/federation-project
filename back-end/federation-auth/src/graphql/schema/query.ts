import { GraphQLObjectType } from 'graphql';

import me, { meResolver } from '@schema/Models/User/queries/me';
// AUTO-GENERATED MODEL IMPORTS
import getAllUsers, {
  getAllUsersResolver,
} from '@schema/Models/User/queries/GetAllUsers';
import getAllLanguages, {
  getAllLanguagesResolver,
} from '@schema/Models/Language/queries/GetAllLanguages';
// [ADD NEW QUERY IMPORTS ABOVE] < Needed for generating queries seamlessly

export const queryType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    me: me,
    // AUTO-GENERATED MODEL TYPES
    User: getAllUsers,
    Language: getAllLanguages,
    // [ADD NEW QUERY TYPES ABOVE] < Needed for generating queries seamlessly
  },
});

const query = {
  me: {
    resolve: meResolver,
  },
  // AUTO-GENERATED MODEL RESOLVERS
  User: {
    resolve: getAllUsersResolver,
  },

  Language: {
    resolve: getAllLanguagesResolver,
  },

  // [ADD NEW QUERY RESOLVERS ABOVE] < Needed for generating queries seamlessly
};

export default query;
