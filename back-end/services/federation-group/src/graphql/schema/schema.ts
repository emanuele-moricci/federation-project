import { applyMiddleware } from "graphql-middleware";
import { GraphQLResolverMap } from "apollo-graphql";
import { buildSubgraphSchema } from "@apollo/subgraph";

import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

import path from "path";

// import permissions from '@fed-schema/permissions';

import { resolvers as customResolvers } from 'federation-utils';

// TYPE DEFINITIONS
const typeDefs = loadFilesSync(path.join(__dirname, "."), {
  recursive: true,
  extensions: ["graphql"],
  ignoreIndex: true,
});
const mergedTypeDefs = mergeTypeDefs(typeDefs);

// RESOLVERS
const resolvers = loadFilesSync(path.join(__dirname, "."), {
  recursive: true,
  extensions: ["resolver.ts"],
  ignoreIndex: true,
});
const mergedResolvers = mergeResolvers([...resolvers, customResolvers]);

// SCHEMA
let schema = buildSubgraphSchema({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers as GraphQLResolverMap<any>,
});
// schema = applyMiddleware(schema, permissions);

export default schema;
