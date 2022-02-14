//require('dotenv').config()
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')

const Book = require('./models/book.js')
const Author = require('./models/author.js')
const User = require('./models/user')

mongoose.connect('mongodb+srv://admin:123@cluster0.qpmeg.mongodb.net/library?retryWrites=true&w=majority')
    .then(console.log('connected to MongoDB'))
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

var books = []
Book.find({})
    .then(result => books = result)

var authors = []
Author.find({})
    .then(result => authors = result)

const typeDefs = gql`
    type Book {
      title: String!
      author: Author!
      published: Int!
      genres: [String!]! 
      id: ID!
    }

    type Author {
        name: String!
        bookCount: Int!
        born: Int
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }
  
    type Query {
      bookCount: Int!
      allBooks(author: String, genre: String): [Book]
      authorCount: Int!
      allAuthors: [Author!]!
      me: User
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
        createUser(
            username: String!
            favoriteGenre: String
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }
    
    type Subscription {
        bookAdded: Book!
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
        allAuthors: () => authors,
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Book: {
        title: (root) => root.title,
        author: async (root) => {
            const author = await Author.findById(root.author)
            return author
        },
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
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                return null
            }
            var author = await Author.findOne({ name: args.author })
            if (!author) {
                author = new Author({ name: args.author, born: null, bookCount: 0 })
                try {
                    await author.save()
                    author = await Author.findOne({ name: args.author })
                } catch (e) {
                    throw new UserInputError(e.message, {
                        invalidArgs: args,
                    })
                }
            }
            const book = new Book({ ...args, author: author })
            try {
                await book.save()
                author.bookCount += 1
                await author.save()

            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args,
                })
            }

            pubsub.publish('BOOK_ADDED', { bookAdded: Book })

            return book
        },
        setBornTo: async (root, args, context) => {
            if (!context.currentUser) {
                return null
            }
            var author = await Author.findOne({ name: args.name })

            if (!author) {
                return null
            }

            author.born = args.born
            try {
                author.save()
            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args,
                })
            }

            return author
        },
        createUser: (root, args) => {
            const user = new User({ ...args })
            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            if (!user || args.password !== 'secret') {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    },

    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`subscriptions ready at ${subscriptionsUrl}`)
})