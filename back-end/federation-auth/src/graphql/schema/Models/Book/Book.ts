import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} from 'graphql';

import AuthorType from '@src/graphql/schema/Models/Author/Author';

const BookType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Book',
  description: 'A book',
  fields: () => ({
    bookId: {
      type: GraphQLNonNull(GraphQLID),
      description: 'id of the book',
    },
    title: {
      type: GraphQLString,
      description: 'title of book',
    },
    author: {
      type: AuthorType,
      description: 'author of book',
    },
    authorId: {
      type: GraphQLInt,
      description: 'id of the author',
    },
  }),
});

export default BookType;
