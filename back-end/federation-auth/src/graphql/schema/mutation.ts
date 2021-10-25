import { GraphQLObjectType } from 'graphql';

import login, { loginResolver } from '@schema/Mutations/auth/login';
import register, { registerResolver } from '@schema/Mutations/auth/register';

// AUTO-GENERATED MODEL IMPORTS

// [ADD NEW MUTATION IMPORTS ABOVE] < Needed for generating mutations seamlessly

export const mutationType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login: login,
    register: register,
    // AUTO-GENERATED MODEL TYPES

    // [ADD NEW MUTATION TYPES ABOVE] < Needed for generating mutations seamlessly
  },
});

const mutation = {
  login: {
    resolve: loginResolver,
  },
  register: {
    resolve: registerResolver,
  },
  // AUTO-GENERATED MODEL RESOLVERS

  // [ADD NEW MUTATION RESOLVERS ABOVE] < Needed for generating mutations seamlessly
};

export default mutation;
