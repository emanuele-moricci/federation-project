import { GraphQLObjectType } from 'graphql';

import createBook, {
  createBookResolver,
} from '@src/graphql/schema/Models/Book/mutations/CreateBook';
import createAuthor, {
  createAuthorResolver,
} from '@src/graphql/schema/Models/Author/mutations/CreateAuthor';
// [ADD NEW MUTATION IMPORTS ABOVE] < Needed for generating mutations seamlessly

export const mutationType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createBook: createBook,
    createAuthor: createAuthor,
    // [ADD NEW MUTATION TYPES ABOVE] < Needed for generating mutations seamlessly

  },
});

const mutation = {
  createBook: {
    resolve: createBookResolver,
  },
  createAuthor: {
    resolve: createAuthorResolver,
  },
  // [ADD NEW MUTATION RESOLVERS ABOVE] < Needed for generating mutations seamlessly
  
};

export default mutation;
