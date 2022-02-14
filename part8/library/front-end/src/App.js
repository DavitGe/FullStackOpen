
import React, { useState } from 'react'

import { gql, useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'


const ALL_AUTHORS = gql`
    query query{
        allAuthors {
            name
            born
            bookCount
        }
    }
`
const ALL_BOOKS = gql`
query query{
  allBooks {
    title
    author
    published
  }
}
`


const App = () => {
    const [page, setPage] = useState('authors')
    const authorsRes = useQuery(ALL_AUTHORS)
    const booksRes = useQuery(ALL_BOOKS)
    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('add')}>add book</button>
            </div>

            <Authors
                show={page === 'authors'}
                data={authorsRes.data}
            />

            <Books
                show={page === 'books'}
                data={booksRes.data}
            />

            <NewBook
                show={page === 'add'}
            />

        </div>
    )
}

export default App