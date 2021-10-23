import { GraphQLEnumType } from 'graphql';

const AuthEnumType = new GraphQLEnumType({
  name: 'AuthType',
  values: {
    PASSWORD: {
      value: 0,
    },
    MFA_CODES: {
      value: 1,
    },
    WEBAUTHN: {
      value: 2,
    },
  },
});

export default AuthEnumType;
