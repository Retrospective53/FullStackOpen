const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
    response.json(blogs)
})

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.startsWith('Bearer ')) {
//         console.log(authorization)
//         return authorization.replace('Bearer ', '')
//     }
//     return null
// }

blogRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user
    console.log(user)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    if (!blog.likes || blog.likes < 0) {
        blog.likes = 0
    } 

    if (!blog.url || !blog.title) {
        response.status(400).send('Bad Request: title or url properties missing')
        return
    }
    const savedBlog = await blog.save()
    console.log(savedBlog)
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    console.log(request.params.id)
    if (blog.user.toString() !== user.id.toString()) {
        return response.status(401).json({ error: 'invalid id'})
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blogLikes = {
        likes: body.likes
    }

    const updatedLikes = await Blog.findByIdAndUpdate(request.params.id, blogLikes, {new: true})
    response.json(updatedLikes)
    console.log(updatedLikes)

})

module.exports = blogRouter