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

blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body
    const user = await User.findById(request.user.id)

    const blog = new Blog({
        title: body.title,
        url: body.url,
        likes: body.likes,
        author: user._id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const id = request.params.id
    const blog = await Blog.findById(id)

    if (!(request.token || request.user.id)) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (!blog) {
        return response.status(204).json({ message: "blog is not existing" })
    }
    if (blog.author.toString() === request.user.id.toString()) {
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