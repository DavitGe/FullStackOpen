import Main from './pages/main'
import { StatusBar } from 'react-native'
import { NativeRouter } from 'react-router-native'

export default function App() {
  return (
    <>
      <NativeRouter>
        <Main />
        <StatusBar style="auto" />
      </NativeRouter>
    </>
  )
}
