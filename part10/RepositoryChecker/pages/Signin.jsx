import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native'

import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'
import { useField, Formik } from 'formik'

import theme from '../styles/theme'
import Text from '../styles/Text'

import { useMutation } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/mutations'
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: windowHeight,
    backgroundColor: 'white',
    paddingTop: 184,
  },
  fieldContainer: {
    width: '80%',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: theme.colors.background,
    // marginBottom: 8,
    padding: 8,
    paddingLeft: 12,
    width: '100%',
    borderRadius: 12,
  },
  button: {
    backgroundColor: theme.colors.primary,
    width: '80%',
    alignItems: 'center',
    borderRadius: 12,
  },
  text: {
    fontSize: 20,
    padding: 8,
  },
  errorText: {
    color: theme.colors.errorText,
    fontSize: 13,
  },
})

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required!')
    .matches(/^(|.{5,})$/, 'Username must be at least 5 characters'),
  // .required('Username is required!'),
  password: yup
    .string()
    .required('Password is required!')
    .matches(/^(|.{5,})$/, 'Password must be at least 5 characters'),
})

const SigninForm = ({ onSubmit }) => {
  const [usernameField, usernameMeta, usernameHelpers] = useField('username')
  const [passwordField, passwordMeta, passwordHelpers] = useField('password')

  const usernameShowError = usernameMeta.touched && usernameMeta.error
  const passwordShowError = passwordMeta.touched && passwordMeta.error

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <Text>Username:</Text>
        <TextInput
          style={styles.input}
          placeholder="Username..."
          value={usernameField.value}
          onChangeText={(text) => usernameHelpers.setValue(text)}
          error={usernameShowError}
        />
        {usernameShowError && (
          <Text style={styles.errorText}> *{usernameMeta.error}</Text>
        )}
      </View>
      <View style={styles.fieldContainer}>
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password..."
          value={passwordField.value}
          onChangeText={(text) => passwordHelpers.setValue(text)}
          error={passwordShowError}
          secureTextEntry={true}
        />
        {passwordShowError && (
          <Text style={styles.errorText}> *{passwordMeta.error}</Text>
        )}
      </View>
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text fontSize="heading" color="white" style={styles.text}>
          Log In
        </Text>
      </Pressable>
    </View>
  )
}

const Signin = () => {
  // const [signIn] = useSignIn()
  const [authenticate, result] = useMutation(AUTHENTICATE)

  const onSubmit = async (values) => {
    const { username, password } = values
    console.log('=========STARTING=======')
    ///////////////////////////
    // try {
    //   console.log('username (front)', username)
    //   console.log('password (front)', password)
    //   const result = await signIn({ username: username, password: password })
    //   console.log('========DATA START=========')
    //   console.log(result)
    //   console.log('========DATA END===========')
    // } catch (e) {
    //   console.log('========error========')
    //   console.log(e)
    // }

    //test code
    try {
      const credentials = { username: username, password: password }
      console.log('credentials', credentials)
      const res = await authenticate(credentials)
      console.log('result', res)
    } catch (e) {
      console.log('error', e)
    }
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SigninForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default Signin
