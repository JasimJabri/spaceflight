import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

export function getApolloClient() {
	return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_WPGRAPHQL_URL,
    }),
    cache: new InMemoryCache(),
  })
}
