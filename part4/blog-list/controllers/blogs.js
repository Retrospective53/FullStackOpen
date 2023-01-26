const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    if (!blog.likes || blog.likes < 0) {
        blog.likes = 0
    } 

    if (!blog.url || !blog.title) {
        response.status(400).send('Bad Request: title or url properties missing')
        return
    }
    const result = await blog.save()
    response.status(201).json(result)
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