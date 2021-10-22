import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLList } from 'graphql';
import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';

import { Author } from '@prisma/client';
import AuthorType from '@src/graphql/schema/Models/Author/Author';
import { getAllAuthors } from '@src/services/authorService';

export const getAllAuthorsResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (_source, _args, _context, _info): Promise<Author[]> =>
  await getAllAuthors();

const getAllAuthorsQuery: GraphQLFieldConfig<unknown, IApolloServerContext> = {
  description: 'Get all authors query',
  type: GraphQLList(AuthorType),
  resolve: getAllAuthorsResolver,
};

export default getAllAuthorsQuery;
