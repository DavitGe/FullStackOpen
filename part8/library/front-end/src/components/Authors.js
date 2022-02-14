
import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const CHANGE_BORN = gql`
mutation Mutation($name: String!, $born: Int!) {
  setBornTo(name: $name, born: $born) {
    name
    born
  }
}
`

const Authors = (props) => {

    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [setBornTo] = useMutation(CHANGE_BORN)

    if (!props.show) {
        return null
    }
    var authors = []
    if (props.data && props.data.allAuthors) {
        authors = props.data.allAuthors
    }



    const submitHandler = (event) => {
        event.preventDefault()

        setBornTo({ variables: { name, born: Number(born) } })
        setName('')
        setBorn('')
    }
    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            born
                        </th>
                        <th>
                            books
                        </th>
                    </tr>
                    {authors.map(a =>
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <h2>Set birthYear</h2>
            <form onSubmit={submitHandler}>
                <div>
                    name:
                    <select
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    >
                        {
                            authors.map(a => <option key={a.name}>{a.name}</option>)
                        }
                    </select>
                </div>
                <div>
                    born:
                    <input
                        onChange={(e) => setBorn(e.target.value)}
                        value={born}
                    />
                </div>
                <button type='submit'>Set born</button>
            </form>
        </div>
    )
}

export default Authors
