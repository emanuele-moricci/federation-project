import { RemoteGraphQLDataSource } from "@apollo/gateway";
import getApolloServerContext from "./apollo/apolloServerContext";

export function bounceAuthToFederation(url) {
  return new RemoteGraphQLDataSource({
    url,
    willSendRequest({ request, context }) {
      if (request.http) {
        request.http.headers.set("Authorization", JSON.stringify(context));
      }
    },
  });
}

export const loadContext = async ({ req }) => await getApolloServerContext(req);
