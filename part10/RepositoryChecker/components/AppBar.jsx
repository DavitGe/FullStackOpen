import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native'
import { Link } from 'react-router-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#24292e',
    width: '100%',
    flexDirection: 'row',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 12,
  },
  // ...
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
        </Pressable>
        <Pressable>
          <Link to="/signin">
            <Text style={styles.text}>Sign In</Text>
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  )
}

export default AppBar
