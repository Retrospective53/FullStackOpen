const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
    response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findById(body.userId)
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.userId === undefined ? undefined : user._id
    })

    if (!blog.likes || blog.likes < 0) {
        blog.likes = 0
    } 

    if (!blog.url || !blog.title) {
        response.status(400).send('Bad Request: title or url properties missing')
        return
    }
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
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