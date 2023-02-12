import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({
  setErrorMessage,
  blogs,
  setBlogs,
  errorNuller,
  addBlogVisibility
}) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleCreate = async e => {
    e.preventDefault()
    try {
      const blog = await blogService.create({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
      })
      addBlogVisibility()
      setErrorMessage([0, `a new blog ${newBlogTitle} by ${newBlogAuthor} added`])
      errorNuller()
      console.log(blogs)
      console.log(blog.data)
      setBlogs(blogs.concat(blog.data))
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
    }
    catch (exception) {
      setErrorMessage([1, 'create blog failed'])
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return(
    <form onSubmit={handleCreate}>
        title:
      <input type="text" name='newTitle' id='newTitle' value={newBlogTitle} onChange={({ target }) => setNewBlogTitle(target.value)}/> <br/>
        author:
      <input type="text" name='newAuthor' id='newAuthor' value={newBlogAuthor} onChange={({ target }) => setNewBlogAuthor(target.value)}/> <br/>
        url:
      <input type="text" name='newUrl' id='newUrl' value={newBlogUrl} onChange={({ target }) => setNewBlogUrl(target.value)}/> <br/>
      <button>create</button>
    </form>
  )
}


export default BlogForm