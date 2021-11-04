import { shield } from 'graphql-shield';
import { isAuthenticated } from 'federation-utils';

const permissions = shield({});

export default permissions;
