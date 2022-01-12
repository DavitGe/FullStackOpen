import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')

  const [notification, setNotification] = useState('')

  const [formIsVisible, setFormIsVisible] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((firstEl, secEl) => {
        if (firstEl.likes > secEl.likes) {
          return -1
        } else {
          return 1
        }
      })
      setBlogs(blogs)
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const logUser = await loginService.login({
        username, password,
      })
      setUser(logUser)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(logUser)
      )


      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setNotification('Wrong password or username')
      setTimeout(() => {
        setNotification('')
      }, 4000)
      console.log('wrong credentials', user)
    }
  }

  if (user) {
    return (
      <>
        <h2>BlogList</h2>
        <p className='notification'>{notification}</p>
        <span>{user.username} logged in</span>
        <button onClick={logOut}>Log Out</button>
        <h3>Create New Blog</h3>
        <Togglable buttonText={'BlogForm'} isVisible={formIsVisible} setIsVisible={setFormIsVisible}>
          <BlogForm
            blogService={blogService}
            setBlogs={setBlogs}
            blogs={blogs}
            setNotification={setNotification}
            setFormIsVisible={setFormIsVisible}
          />
        </Togglable>
        <h3>Blogs</h3>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </>
    )
  } else {
    return (
      <div>
        <p className='notification'>{notification}</p>
        <form onSubmit={handleLogin}>
          <div>
                        username
            <input
              type="text"
              value={username}
              name="Username"
              id="userInp"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
                        password
            <input
              type="password"
              value={password}
              name="Password"
              id="passInp"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='logBtn' type="submit">login</button>
        </form>
      </div>
    )
  }
}

export default App