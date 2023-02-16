import blogService from '../services/blogs'
import { useQueryClient, useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const BlogDetails = ({ blogs, setUsers, users }) => {
  const [comment, setComment] = useState('')
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

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

  const commentBlogMutation = useMutation(blogService.createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })

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
      setUsers(users.map(u => u.blogs.some(b => b.id === id) ? { ...u, blogs: u.blogs.filter(blog => blog.id !== id) } : u))
    } else {
      return
    }
  }

  const handleComment = async e => {
    e.preventDefault()
    const newObject = {
      id,
      comment: {
        content: comment
      }
    }
    await commentBlogMutation.mutate(newObject)
    setComment('')
  }

  const loggedJSON = window.localStorage.getItem('loggedBlogUser')
  const user = JSON.parse(loggedJSON)

  return(
    <div className='details'>
      {blog && <div>
        <p>Title: {blog.title}</p>
        <p>Author: {blog.author}</p>
        <p>Likes: {blog.likes} <button onClick={handleUpdateLike} className='like'>Like</button></p>
        <p>Url: {blog.url}</p>
        <p>User: {blog.user.username}</p>
        {user.username === blog.user.username && <button onClick={handleBlogDelete}><Link to={'/blogs'}>delete blog</Link></button>}
      </div>}
      <div>
        <h3>comments</h3>
        <form onSubmit={handleComment}>
          <input type="text" onChange={e => setComment(e.target.value)} value={comment}/>
          <button name='comment'>comment</button>
        </form>
        {blog.comments.length === 0 ? <div>no comment found.</div>
          : <ul>
            {blog.comments.map(c =>
              <li key={c.id}>
                {c.content}
              </li>
            )}
          </ul>
        }
      </div>
    </div>
  )
}

export default BlogDetails