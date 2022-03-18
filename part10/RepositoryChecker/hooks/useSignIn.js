import { useMutation } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/mutations'

const useSignIn = async () => {
  console.log('===============1=========')
  const [authenticate, result] = useMutation(AUTHENTICATE)
  console.log('===============2=========')
  const signIn = async ({ username, password }) => {
    console.log('===============3================')
    console.log('username', username)
    console.log('password', password)
    return await authenticate({
      username: variables.username,
      password: variables.password,
    })
  }

  return [signIn]
}

export default useSignIn
