const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')


let books = [
    {
        title: 'Tom Soyer',
        author: 'Luka Shagidze',
        published: 2012,
        genres: ['Adventure', 'Comedy'],
        id: "3d594650-3436-11e9-bc57-8b80ba54c431"
    },
    {
        title: 'Philosspy and relligion',
        author: 'Mzia Daraselia',
        published: 2017,
        genres: ['Scientist', 'Mistic'],
        id: '3d599470-3436-11e9-bc57-8b80ba54c431'
    },
    {
        title: '80.000 killometers underwated',
        author: 'Luka Shagidze',
        published: 2019,
        genres: ['Adventure', 'Fantasy'],
        id: '3d599471-3436-11e9-bc57-8b80ba54c431'
    }
]

let authors = [
    {
        name: 'Luka Shagidze',
        born: '2003',
        bookCount: 2
    },
    {
        name: 'Mzia Daraselia',
        born: '1943',
        bookCount: 1
    }
]

const typeDefs = gql`
    type Book {
      title: String!
      author: String!
      published: Int!
      genres: [String!]! 
      id: ID!
    }

    type Author {
        name: String!
        bookCount: Int!
        born: Int
    }
  
    type Query {
      bookCount: Int!
      allBooks(author: String, genre: String): [Book]
      authorCount: Int!
      allAuthors: [Author!]!
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]! 
        ): Book
        setBornTo(
            name: String!
            born: Int!
        ): Author
    }

  `

const resolvers = {
    Query: {
        bookCount: () => books.length,
        allBooks: (root, args) => {
            var bookList = books
            if (args.author) {
                bookList = bookList.filter(book => book.author === args.author)
            }
            if (args.genre) {
                bookList = bookList.filter(book => book.genres.includes(args.genre))
            }

            return bookList
        },
        authorCount: () => authors.length,
        allAuthors: () => authors

    },
    Book: {
        title: (root) => root.title,
        author: (root) => root.author,
        published: (root) => root.published,
        genres: (root) => root.genres,
        id: (root) => root.id,
    },
    Author: {
        name: (root) => root.name,
        born: (root) => root.born,
        bookCount: (root) => root.bookCount
    },
    Mutation: {
        addBook: (root, args) => {
            const book = { ...args, id: uuid() }
            books = books.concat(book)
            var author = authors.find(author => author.name === book.author)

            if (author) {
                author.bookCount += 1
                authors = authors.map(x => {
                    if (x.name === author.name) {
                        return author
                    }
                    return x
                })
            } else {
                author = { name: args.author, bookCount: 1 }
                authors = authors.concat(author)
            }
            return book
        },
        setBornTo: (root, args) => {
            var author = authors.find(author => author.name === args.name)
            author.born = args.born
            authors = authors.map(x => {
                if (x.name === args.name) {
                    return author
                }
                return x
            })
            return author
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})