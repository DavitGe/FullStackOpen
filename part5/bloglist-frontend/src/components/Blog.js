import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [isVisible, setIsVisible] = useState(false)
  const showWhenVisible = {
    display: isVisible ? '' : 'none'
  }

  const removeBlog = async () => {
    const result = window.confirm('Blog will be deleted permamently')
    if (result) {
      try {
        await blogService.remove(blog.id)
      } catch (e) {
        console.error(e)
      }
    }
  }

  const buttonText = isVisible ? 'hide' : 'show'
  return (
    <div style={blogStyle} className='blogContainer'>
      <b>{blog.title} {JSON.stringify(blog.author.username)}  </b>
      <button onClick={() => { setIsVisible(!isVisible) }}>{buttonText}</button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes <span>{blog.likes}</span>   <button className='likeBtn' onClick={() => { blogService.addLike(blog.id) }}>Like</button></p>
        <p>{JSON.stringify(blog.author.name)}</p>
        <button onClick={removeBlog}>remove</button>
      </div>
    </div >
  )
}

export default Blog