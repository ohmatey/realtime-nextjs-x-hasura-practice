import React from 'react'

import ApolloProvider from '../services/apollo/ApolloProvider'
import { TodosProvider } from '../modules/todos/hooks/useTodos'

const App = ({
  Component,
  pageProps
}) => (
  <ApolloProvider>
    <TodosProvider>
      <Component {...pageProps} />
    </TodosProvider>
  </ApolloProvider>
)

export default App
