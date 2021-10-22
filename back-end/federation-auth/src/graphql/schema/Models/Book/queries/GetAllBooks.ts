import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from 'graphql';
import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';

import { Book } from '@prisma/client';
import BookType from '@src/graphql/schema/Models/Book/Book';
import { getAllBooks } from '@src/services/bookService';

export const getAllBooksResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (_source, _args, _context, _info): Promise<Book[]> =>
  await getAllBooks();

const getAllBooksQuery: GraphQLFieldConfig<unknown, IApolloServerContext> = {
  description: 'Get all books query',
  type: GraphQLList(BookType),
  resolve: getAllBooksResolver,
};

export default getAllBooksQuery;
