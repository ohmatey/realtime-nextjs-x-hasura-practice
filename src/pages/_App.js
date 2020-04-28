import React from 'react'

import ApolloProvider from '../services/apollo/ApolloProvider'

const App = ({
  Component,
  pageProps
}) => (
  <ApolloProvider>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default App;
