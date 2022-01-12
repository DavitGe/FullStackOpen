const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const userExtractor = require('../midlewares/userExtractor')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate("author", { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        console.error("Enter valid ID")
        response.status(400).end()
    }
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findOne({ username: body.author })
    const blog = new Blog({
        title: body.title,
        url: body.url,
        likes: 0,
        author: user.id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    const blog = await Blog.findById(id)

    const body = request.body
    console.log('body', body)
    const user = await User.findOne({ username: body.author })
    console.log('user', user)
    if (!blog) {
        return response.status(204).json({ message: "blog is not existing" })
    } else {
        await Blog.findByIdAndRemove(id)
        return response.status(204).end()
    }
})

blogsRouter.put('/:id', (request, response) => {
    Blog.findById(request.params.id)
        .then(blog => {
            console.log("blog", blog)
            if (!blog) {
                console.error("Wrong ID!")
            } else {
                console.log('likes before:', blog.likes)
                blog.likes += 1
                console.log('likes after:', blog.likes)
                Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
                    .then(() => response.status(200).end())
            }

        })
})


module.exports = blogsRouter