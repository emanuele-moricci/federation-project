import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from 'graphql';

import BookType from '@src/graphql/schema/Models/Book/Book';

const AuthorType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Author',
  description: 'An author',
  fields: () => ({
    authorId: {
      type: GraphQLNonNull(GraphQLID),
      description: 'id of the author',
    },
    username: {
      type: GraphQLString,
      description: 'authors username',
    },
    books: {
      type: GraphQLList(BookType),
      description: 'list of authors books',
    },
  }),
});

export default AuthorType;
