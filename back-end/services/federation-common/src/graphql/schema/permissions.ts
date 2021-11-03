import { shield } from 'graphql-shield';
import { alwaysAllow } from 'federation-utils';

const permissions = shield({
  Country: alwaysAllow,
  Language: alwaysAllow,
});

export default permissions;
