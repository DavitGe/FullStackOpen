import React, { useState, useEffect } from 'react'

import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setBlogs, likeBlog } from './reducers/blogsReducer'
import { setUser } from './reducers/userReeducer'

import Blog from './components/Blog'
import Users from './components/Users'
import UserPage from './components/UserPage'
import BlogPage from './components/BlogPage'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import { Container, ListGroup, Alert, Form, Button } from 'react-bootstrap'

import {
    BrowserRouter as Router,
    Switch, Route, useParams

} from 'react-router-dom'
import TopBar from './components/TopBar'

const App = () => {
    const dispatch = useDispatch()

    const notification = useSelector(state => state.notification)
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    const [users, setUsers] = useState([null])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [formIsVisible, setFormIsVisible] = useState(false)


    useEffect(() => {
        blogService.getAll().then(sortedBlogs => {
            sortedBlogs.sort((firstEl, secEl) => {
                if (firstEl.likes > secEl.likes) {
                    return -1
                } else {
                    return 1
                }
            })
            dispatch(setBlogs(sortedBlogs))
        }
        )
    }, [])

    useEffect(async () => {
        const result = await userService.getAll()
        setUsers(result)
    }, [blogs])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
        }
    }, [])

    const logOut = () => {
        dispatch(setUser(null))
        window.localStorage.removeItem('loggedBlogappUser')
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const logUser = await loginService.login({
                username, password,
            })
            dispatch(setUser(logUser))
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(logUser)
            )


            setUsername('')
            setPassword('')
        } catch (exception) {
            console.log(exception)
            dispatch(setNotification('Wrong password or username'))
            setTimeout(() => {
                dispatch(setNotification(''))
            }, 4000)
        }
    }



    if (user) {
        return (

            <Router>
                <TopBar user={user} logOut={logOut} notification={notification} />
                <Container>
                    <Switch className='container'>
                        <Route path='/users/:id'>
                            <UserPage users={users} />
                        </Route>
                        <Route path='/blogs/:id'>
                            <BlogPage blogs={blogs} />
                        </Route>
                        <Route path='/users'>
                            <Users users={users} />
                        </Route>
                        <Route path='/'>
                            <h1 variant='pirmary'>Blogs:</h1>
                            <Togglable buttonText={'Create Blog'} isVisible={formIsVisible} setIsVisible={setFormIsVisible}>
                                <BlogForm
                                    blogService={blogService}
                                    blogs={blogs}
                                    setFormIsVisible={setFormIsVisible}
                                />
                            </Togglable>
                            <ListGroup>
                                {blogs.map(blog =>
                                    <ListGroup.Item>
                                        <Blog key={blog.id} blog={blog} />
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Route>
                    </Switch>
                </Container>
            </Router>
        )
    } else {
        return (
            <Container>
                {notification !== ''
                    ? <Alert variant='danger' className='notification'>{notification}</Alert>
                    : null
                }
                <Form onSubmit={handleLogin}>
                    <Form.Group>
                        <Form.Label>
                            username
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            name="Username"
                            id="userInp"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            name="Password"
                            id="passInp"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </Form.Group>
                    <Button id='logBtn' type="submit">login</Button>
                </Form>
            </Container>
        )
    }
}

export default App