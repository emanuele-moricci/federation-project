import { parse, printSchema } from 'graphql';

import * as schemaAstPlugin from '@graphql-codegen/schema-ast';
import { Types } from '@graphql-codegen/plugin-helpers';
import { codegen } from '@graphql-codegen/core';

import schema from '@schema/schema';
import prismaContext from '@config/prisma/prismaContext';

import * as fs from 'fs';
import path from 'path';
import chalk from 'chalk';

async function performCodegen(options: Types.GenerateOptions): Promise<void> {
  const output = await codegen(options);
  fs.writeFile(
    path.join(__dirname, '/graphql/generated/', options.filename),
    output,
    () =>
      console.log(
        `💡 ${chalk.bgCyan('GraphQL > Typescript')} ${chalk.green(
          'Outputs generated!'
        )}`
      )
  );
}

// eslint-disable-next-line import/prefer-default-export
export async function performAstCodegen(): Promise<void> {
  const options: Types.GenerateOptions = {
    config: {
      numericEnums: true,
      contextType: prismaContext,
      useIndexSignature: true,
    },
    documents: [],
    filename: 'schema.graphql',
    schema: parse(printSchema(schema)),
    plugins: [{ 'schema-ast': {} }],
    pluginMap: {
      'schema-ast': schemaAstPlugin,
    },
  };
  performCodegen(options);
}
