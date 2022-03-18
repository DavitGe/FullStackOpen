import Main from './pages/main'
import { StatusBar } from 'react-native'
import { NativeRouter } from 'react-router-native'

import { ApolloProvider } from '@apollo/client'
import createApolloClient from './utils/apolloClient'

const apolloClient = createApolloClient()

export default function App() {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
          <StatusBar style="auto" />
        </ApolloProvider>
      </NativeRouter>
    </>
  )
}
