import { RemoteGraphQLDataSource } from '@apollo/gateway';
import getApolloServerContext from './apollo/apolloServerContext';

import { cryptObject } from 'federation-utils';

export function bounceAuthToFederation(url) {
  return new RemoteGraphQLDataSource({
    url,
    willSendRequest({ request, context }) {
      if (request.http) {
        const hashedContext = cryptObject(
          process.env.FEDERATION_SECRET ?? '',
          context
        );

        request.http.headers.set('Authorization', hashedContext);
      }
    },
  });
}

export const loadContext = async ({ req }) => await getApolloServerContext(req);
