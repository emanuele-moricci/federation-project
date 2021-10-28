import { DateTimeResolver } from 'graphql-scalars';

const customResolvers = {
  DateTime: DateTimeResolver,
};

export default customResolvers;
