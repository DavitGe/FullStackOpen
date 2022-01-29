import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogsReducer'

import { Button, Form } from 'react-bootstrap'

const BlogForm = ({
    blogService,
    setFormIsVisible
}) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = async (event) => {
        event.preventDefault()
        try {
            const newBlog = await blogService.addBlog({
                title, url, author
            })
            dispatch(createBlog(newBlog))
            setTitle('')
            setUrl('')
            setAuthor('')
            setFormIsVisible(false)
            dispatch(setNotification('Blog is created'))
            setTimeout(() => {
                setNotification('')
                console.log('GANULDA')
            }, 4000)
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <Form onSubmit={handleCreateBlog}>
            <Form.Group className="mb-3" >
                <Form.Label>Title</Form.Label>
                <Form.Control
                    id='title'
                    type='text'
                    name='title'
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />

            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Author</Form.Label>
                <Form.Control
                    id='author'
                    type='text'
                    name='author'
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>URL</Form.Label>
                <Form.Control
                    id='url'
                    type='text'
                    name='url'
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                />
            </Form.Group>

            <Button variant="success" type='submit'>Create Blog</Button>
        </Form>
    )
}

export default BlogForm