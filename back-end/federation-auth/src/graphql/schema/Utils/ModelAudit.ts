import { GraphQLBoolean, GraphQLFieldConfigMap, GraphQLNonNull } from 'graphql';
import DateTimeScalar from '@schema/Custom/DateTimeScalar';

const getModelWithAudit = (
  fieldsObject: GraphQLFieldConfigMap<any, any>
): GraphQLFieldConfigMap<any, any> => {
  return {
    ...fieldsObject,
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
      description: `deleted row`,
    },
  };
};

export default getModelWithAudit;
