import { shield, rule, not } from 'graphql-shield';

const isAuthenticated = rule({ cache: 'contextual' })(
  async (_parent, _args, { userData }, _info) => {
    return userData && Object.keys(userData).length > 0
      ? userData.userId !== null
      : false;
  }
);

const isAdmin = rule({ cache: 'contextual' })(
  async (_parent, _args, { userData }, _info) => {
    return userData.role === 'ADMIN';
  }
);

const alwaysAllow = rule({ cache: 'contextual' })(
  async (_parent, _args, _context, _info) => true
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
  Language: alwaysAllow,
});

export default permissions;
