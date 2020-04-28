import React from 'react'
import { ApolloProvider } from 'react-apollo'

import makeApolloClient from './makeApolloClient'

const ApolloProviderC = ({
  children
}) => {
  const client = makeApolloClient()

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

export default ApolloProviderC
