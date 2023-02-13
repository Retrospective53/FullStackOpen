import { useState } from 'react'
import blogService from '../services/blogs'
import { useNotificationDispatch } from '../hooks/notificationReducer'
import { useMutation, useQueryClient } from 'react-query'

const BlogForm = ({
  errorNuller,
  addBlogVisibility
}) => {
  const notificationDispatch = useNotificationDispatch()
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const queryClient = useQueryClient()
  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: newObject => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat(newObject))
      notificationDispatch({ type: 'SET', payload: [0, `a new blog ${newBlogTitle} by ${newBlogAuthor} added`] })
      errorNuller()
      addBlogVisibility()
      // setBlogs(blogs.concat(blog.data))
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
    },
    onError: (error) => {
      if (error.response.data.error === 'token expired') {
        notificationDispatch({ type: 'SET', payload: [1, `${error.response.data.error}, please login`] })
        errorNuller()
        return
      }
      notificationDispatch({ type: 'SET', payload: [1, 'error unable to create'] })
      errorNuller()
    }
  })

  const handleCreate = async e => {
    e.preventDefault()
    try {
      newBlogMutation.mutate({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
      })
    }
    catch (exception) {
      notificationDispatch({ type: 'SET', payload: [1, 'create blog failed'] })
      setTimeout(() => {
        notificationDispatch({ type: 'NULL' })
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