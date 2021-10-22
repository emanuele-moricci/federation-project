import { GraphQLResolverMap } from 'apollo-graphql';
import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';

import mutation from '@src/graphql/schema/mutation';
import query from '@src/graphql/schema/query';

import { Author, Book } from '@prisma/client';
import { getAuthorById } from '@src/services/authorService';
import { getBooksByAuthor } from '@src/services/bookService';

const resolvers: GraphQLResolverMap<IApolloServerContext> = {
  Query: query,
  Mutation: mutation,
  Book: {
    author(book: Book): Promise<Author | null> {
      return getAuthorById(book.authorId);
    },
  },
  Author: {
    books(author: Author): Promise<Book[]> {
      return getBooksByAuthor(author.authorId);
    },
  },
};

export default resolvers;
