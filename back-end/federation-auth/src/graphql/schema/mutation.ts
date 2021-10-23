import { GraphQLObjectType } from 'graphql';

import createUser, {
  createUserResolver,
} from '@src/graphql/schema/Models/User/mutations/CreateUser';
import createSecurity, {
  createSecurityResolver,
} from '@src/graphql/schema/Models/Security/mutations/CreateSecurity';
// [ADD NEW MUTATION IMPORTS ABOVE] < Needed for generating mutations seamlessly

export const mutationType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: createUser,
    createSecurity: createSecurity,
    // [ADD NEW MUTATION TYPES ABOVE] < Needed for generating mutations seamlessly

  },
});

const mutation = {
  createUser: {
    resolve: createUserResolver,
  },
  createSecurity: {
    resolve: createSecurityResolver,
  },
  // [ADD NEW MUTATION RESOLVERS ABOVE] < Needed for generating mutations seamlessly
  
};

export default mutation;
