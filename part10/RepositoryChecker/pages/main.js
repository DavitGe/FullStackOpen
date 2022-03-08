import { Route, Routes, Navigate } from 'react-router-native'
import { StyleSheet, View, StatusBar, Dimensions } from 'react-native'
import AppBar from '../components/AppBar'
import RepositoryList from './RepositoryList'
import theme from '../styles/theme'
import Signin from './Signin'

const screenHeight = Dimensions.get('screen').height
const windowHeight = Dimensions.get('window').height
const navbarHeight = screenHeight - windowHeight + StatusBar.currentHeight

export default function Main() {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<Signin />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    paddingBottom: navbarHeight,
  },
})
