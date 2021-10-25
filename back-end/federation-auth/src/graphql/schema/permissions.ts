import { shield, rule, not } from 'graphql-shield';
import { jwtVerify } from './Utils/JWTToken';

const isAuthenticated = rule({ cache: 'contextual' })(
  async (_parent, _args, { token }, _info) => {
    try {
      const obj = <any>jwtVerify(token);

      return obj !== null;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);

const isAdmin = rule({ cache: 'contextual' })(
  async (_parent, _args, { user }, _info) => {
    return user.role === 'admin';
  }
);

const permissions = shield({
  Query: {
    me: isAuthenticated,
  },
  Mutation: {
    login: not(isAuthenticated),
    register: not(isAuthenticated),
  },
  User: isAuthenticated,
  Language: not(isAuthenticated),
});

export default permissions;
