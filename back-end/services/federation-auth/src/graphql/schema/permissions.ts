import { shield, not } from 'graphql-shield';
import { isAuthenticated } from 'federation-utils';

const permissions = shield({
  Query: {
    me: isAuthenticated,
  },
  Mutation: {
    login: not(isAuthenticated),
    register: not(isAuthenticated),
  },
  User: isAuthenticated,
});

export default permissions;
