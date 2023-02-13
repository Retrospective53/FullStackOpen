import { useState } from 'react'
import blogService from '../services/blogs'
import { useQueryClient, useMutation } from 'react-query'

const Blog = ({ blog }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const queryClient = useQueryClient()
  const updateBlogMutation = useMutation(blogService.updateLike, {
    onSuccess: () => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.map(b => b.id === blog.id ? { ...b, likes: b.likes + 1 } : b))
    }
  })

  const blogDeletion = useMutation(blogService.deleteBlog, {
    onSuccess: id => {
      const blogs = queryClient.getQueryData('blogs')
      console.log(blogs.filter(b => b.id !== id))
      console.log(id)
      queryClient.setQueriesData('blogs', blogs.filter(b => b.id !== id))
    }
  })


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const handleUpdateLike = () => {
    // await blogService.updateLike(blog.id, blog)
    // increaseLike(blog)
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const handleBlogDelete = async () => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`) === true) {
      // await blogService.deleteBlog(blog.id)
      // handleDelete(blog)
      blogDeletion.mutate(blog.id)
    } else {
      return
    }
  }

  const loggedJSON = window.localStorage.getItem('loggedBlogUser')
  const user = JSON.parse(loggedJSON)


  return(
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setBlogVisible(!blogVisible)}>show</button>
      </div>
      <div style={showWhenVisible} className='details'>
        <button onClick={() => setBlogVisible(!blogVisible)}>hide</button>
        <p>Title: {blog.title}</p>
        <p>Author: {blog.author}</p>
        <p>Likes: {blog.likes} <button onClick={handleUpdateLike} className='like'>Like</button></p>
        <p>Url: {blog.url}</p>
        <p>User: {blog.user.username}</p>
        {user.username === blog.user.username && <button onClick={handleBlogDelete}>delete blog</button>}
      </div>
    </div>
  )
}

export default Blog