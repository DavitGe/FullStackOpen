import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog, addComment } from '../reducers/blogsReducer'
import blogService from '../services/blogs'

import { Button, ListGroup } from 'react-bootstrap'

const BlogPage = (props) => {
    const id = useParams().id
    const blog = props.blogs.find(blog => blog.id.toString() === id)
    const dispatch = useDispatch()

    const [comment, setComment] = useState('')
    var index = 0

    if (!blog) {
        return null
    }

    const likeBlogHandler = () => {
        blogService.addLike(blog.id)
        dispatch(likeBlog(blog.id))
    }

    const removeBlogHandler = async () => {
        const result = window.confirm('Blog will be deleted permamently')
        if (result) {
            try {
                await blogService.remove(blog.id)
                dispatch(removeBlog(blog.id))
            } catch (e) {
                console.error(e)
            }
        }
    }

    const addCommentHandler = async (event) => {
        event.preventDefault()
        dispatch(addComment({ id: blog.id, comment: comment }))
        await blogService.addComment({
            id: blog.id,
            comment: comment
        })
        setComment('')
    }

    return (
        <div>
            <h1>{blog.title}</h1>
            <p>{blog.url}</p>
            <p>{blog.likes} likes <Button onClick={likeBlogHandler}>Like</Button></p>
            <p>added by {blog.author.username}</p>
            <Button onClick={removeBlogHandler} variant="danger">remove</Button>{'  '}
            <Link to='/'><Button variant="secondary">Go Back</Button></Link>
            <ListGroup>
                <h3>Comments: </h3>
                {blog.comments.map(comment => {
                    index += 1
                    return (<ListGroup.Item key={index} >{comment}</ListGroup.Item>)
                })}
            </ListGroup>
            <input placeholder='comment' value={comment} onChange={(e) => setComment(e.target.value)} />{'  '}
            <Button onClick={addCommentHandler}>Add comment</Button>
        </div>
    )
}

export default BlogPage