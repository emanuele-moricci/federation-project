import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import DateTimeScalar from '@src/graphql/schema/Custom/DateTimeScalar';

const getModelAudit = name => {
  return {
    created_at: {
      type: GraphQLNonNull(DateTimeScalar),
      description: 'created at',
    },
    updated_at: {
      type: GraphQLNonNull(DateTimeScalar),
      description: 'updated at',
    },
    deleted: {
      type: GraphQLNonNull(GraphQLBoolean),
      description: `is ${name} deleted?`,
    },
  };
};

export default getModelAudit;
