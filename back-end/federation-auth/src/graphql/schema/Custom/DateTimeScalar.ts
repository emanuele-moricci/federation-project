import { GraphQLScalarType } from 'graphql';

const DateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
});

export default DateTimeScalar;
