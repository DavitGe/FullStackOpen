import React, { useState } from 'react'

const BlogForm = ({
  blogService,
  setBlogs,
  blogs,
  setNotification,
  setFormIsVisible
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.addBlog({
        title, url, author
      })
      setBlogs([...blogs, newBlog])
      setTitle('')
      setUrl('')
      setAuthor('')
      setFormIsVisible(false)
      setNotification('Blog is created')
      setTimeout(() => {
        setNotification('')
      }, 4000)
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <form onSubmit={handleCreateBlog}>
      <span>title: </span>
      <input
        id='title'
        type='text'
        name='title'
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      /><br />
      <span>author: </span>
      <input
        id='author'
        type='text'
        name='author'
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      /><br />
      <span>url: </span>
      <input
        id='url'
        type='text'
        name='url'
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      /><br />
      <button type='submit'>Create Blog</button>
    </form>
  )
}

export default BlogForm