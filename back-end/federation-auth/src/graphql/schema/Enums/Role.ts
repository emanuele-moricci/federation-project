import { GraphQLEnumType } from 'graphql';

const RoleEnumType = new GraphQLEnumType({
  name: 'Role',
  values: {
    USER: {
      value: 0,
    },
    ADMIN: {
      value: 1,
    },
  },
});

export default RoleEnumType;
