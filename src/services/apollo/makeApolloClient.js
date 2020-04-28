import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-fetch'
import { split, ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const ssrMode = !process.browser
if (ssrMode) {
  global.fetch = fetch
}

// Update the GraphQL endpoint to any instance of GraphQL that you like
const GRAPHQL_URL = `http://localhost:8080/v1/graphql`
const WS_URL = `ws://localhost:8080/v1/graphql`  // process.env.HASURA_CONNECTION

const makeApolloClient = () => {
  const httpLink = new createHttpLink({
    uri: GRAPHQL_URL
  })
  const middlewareLink = new ApolloLink((operation, forward) => {
    return forward(operation)
  })

  let clientLink = httpLink

  const link = middlewareLink.concat(httpLink)

  if (!ssrMode) {
    const wsLink = new WebSocketLink({
      uri: WS_URL,
      lazy: true,
      options: {
        lazy: true,
        reconnect: true
      }
    })

    clientLink = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      wsLink,
      link
    )
  }

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: ssrMode, // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([clientLink]),
    cache: new InMemoryCache().restore({}),
  })
}

export default makeApolloClient
