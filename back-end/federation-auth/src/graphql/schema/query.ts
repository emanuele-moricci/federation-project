import { GraphQLObjectType } from 'graphql';

import getAllUsers, {
  getAllUsersResolver,
} from '@src/graphql/schema/Models/User/queries/GetAllUsers';
import getAllLanguages, {
  getAllLanguagesResolver,
} from '@src/graphql/schema/Models/Language/queries/GetAllLanguages';
import getAllSecurities, {
  getAllSecuritiesResolver,
} from '@src/graphql/schema/Models/Security/queries/GetAllSecurities';
// [ADD NEW QUERY IMPORTS ABOVE] < Needed for generating queries seamlessly

export const queryType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    User: getAllUsers,
    Language: getAllLanguages,
    Security: getAllSecurities,
    // [ADD NEW QUERY TYPES ABOVE] < Needed for generating queries seamlessly

  },
});

const query = {
  User: {
    resolve: getAllUsersResolver,
  },

  Language: {
    resolve: getAllLanguagesResolver,
  },

  Security: {
    resolve: getAllSecuritiesResolver,
  },
  // [ADD NEW QUERY RESOLVERS ABOVE] < Needed for generating queries seamlessly
  
};

export default query;
