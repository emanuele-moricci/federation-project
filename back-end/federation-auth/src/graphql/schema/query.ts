import { GraphQLObjectType } from 'graphql';

import getAllBooks, {
  getAllBooksResolver,
} from '@src/graphql/schema/Models/Book/queries/GetAllBooks';
import getAllAuthors, {
  getAllAuthorsResolver,
} from '@src/graphql/schema/Models/Author/queries/GetAllAuthors';
// [ADD NEW QUERY IMPORTS ABOVE] < Needed for generating queries seamlessly

export const queryType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    books: getAllBooks,
    authors: getAllAuthors,
    // [ADD NEW QUERY TYPES ABOVE] < Needed for generating queries seamlessly

  },
});

const query = {
  books: {
    resolve: getAllBooksResolver,
  },
  authors: {
    resolve: getAllAuthorsResolver,
  },
  // [ADD NEW QUERY RESOLVERS ABOVE] < Needed for generating queries seamlessly

};

export default query;
