import { gql } from '@apollo/client'

// export const AUTHENTICATE = gql`
//   mutation Mutation({$username: String, $password: String}) {
//     authenticate({username: $username, password: $password}) {
//       accessToken
//     }
//   }
// `

export const AUTHENTICATE = gql`
  mutation Mutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`
