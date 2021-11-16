import { GraphQLSchema } from 'graphql-rate-limit-directive/node_modules/graphql';
import { rateLimitDirective } from 'graphql-rate-limit-directive';

const { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer } =
  rateLimitDirective();

export const rateTypeDefs = rateLimitDirectiveTypeDefs;
export const rateDirective: (schema: any) => any = schema =>
  rateLimitDirectiveTransformer(schema as GraphQLSchema);
