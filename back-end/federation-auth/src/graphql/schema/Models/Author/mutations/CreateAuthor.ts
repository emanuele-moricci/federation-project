import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { IApolloServerContext } from '@src/lib/interfaces/IApolloServerContext';

import { Author } from '@prisma/client';
import AuthorType from '@src/graphql/schema/Models/Author/Author';

import { createAuthor } from '@src/services/authorService';

export const createAuthorResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (
  _source,
  { input: { username } },
  _context,
  _info
): Promise<Author> => {
  return createAuthor(username);
};

export const CreateAuthorInput: GraphQLInputObjectType = new GraphQLInputObjectType(
  {
    name: 'CreateAuthorInput',
    description: 'Create author input',
    fields: {
      username: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The authors username',
      },
    },
  }
);

const createAuthorMutation: GraphQLFieldConfig<
  unknown,
  IApolloServerContext
> = {
  description: 'create author',
  type: AuthorType,
  args: {
    input: {
      type: CreateAuthorInput,
    },
  },
  resolve: createAuthorResolver,
};

export default createAuthorMutation;
