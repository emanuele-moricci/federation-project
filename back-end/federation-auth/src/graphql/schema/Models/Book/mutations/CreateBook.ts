import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';

import { Book } from '@prisma/client';
import BookType from '@src/graphql/schema/Models/Book/Book';

import { createBook } from '@src/services/bookService';

export const createBookResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (
  _source,
  { input: { title, authorId } },
  _context,
  _info
): Promise<Book> => {
  return createBook(title, authorId);
};

export const CreateBookInput: GraphQLInputObjectType = new GraphQLInputObjectType(
  {
    name: 'CreateBookInput',
    description: 'Create book input',
    fields: {
      title: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The books title.',
      },
      authorId: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The authors id.',
      },
    },
  }
);

const createBookMutation: GraphQLFieldConfig<unknown, IApolloServerContext> = {
  description: 'Create book',
  type: BookType,
  args: {
    input: {
      type: CreateBookInput,
    },
  },
  resolve: createBookResolver,
};

export default createBookMutation;
