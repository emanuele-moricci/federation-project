import { RemoteGraphQLDataSource } from '@apollo/gateway';
import getApolloServerContext from './apollo/apolloServerContext';

import { createCipheriv, randomBytes, createHash } from 'crypto';

export function bounceAuthToFederation(url) {
  return new RemoteGraphQLDataSource({
    url,
    willSendRequest({ request, context }) {
      if (request.http) {
        const iv = randomBytes(16);
        let key = createHash('sha256')
          .update(process.env.FEDERATION_SECRET ?? '')
          .digest('base64')
          .substr(0, 32);
        const cipher = createCipheriv('aes-256-ctr', key, iv);

        const hashedContext = Buffer.concat([
          cipher.update(JSON.stringify(context)),
          cipher.final(),
        ]);

        request.http.headers.set(
          'Authorization',
          `${iv.toString('hex')}:${hashedContext.toString('hex')}`
        );
      }
    },
  });
}

export const loadContext = async ({ req }) => await getApolloServerContext(req);
