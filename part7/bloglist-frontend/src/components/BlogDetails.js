import blogService from '../services/blogs'
import { useQueryClient, useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useUserValue } from '../hooks/userContext'
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap'

const BlogDetails = ({ blogs, setUsers, users }) => {
  const user = useUserValue()
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
    const findUser = users.find(u => u.username === user.username)
    const newObject = {
      id,
      comment: {
        content: comment,
        author: findUser.id
      }
    }
    await commentBlogMutation.mutate(newObject)
    setComment('')
  }
  console.log(blog)
  // const loggedJSON = window.localStorage.getItem('loggedBlogUser')
  // const user = JSON.parse(loggedJSON)

  const commentBox = () => {
    return(
      <Container className="mt-3">
        <Row>
          <Col>
            <h4>Comments ({blog.comments.length})</h4>
            {blog.comments.length === 0 ? (
              <div>No comments found.</div>
            ) : (
              <ListGroup>
                {blog.comments.map((c) => (
                  <ListGroup.Item key={c.id}>
                    <div>
                      <strong>{!c.author ? 'Anonymous   ' : `${users.find((u) => u.id === c.author).username}   `}</strong>
                      <span className="float-right">{new Date(c.created_at).toLocaleString()}</span>
                    </div>
                    <div>{c.content}</div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
            <Form className="mt-3" onSubmit={handleComment}>
              <Form.Group>
                <Form.Label>Leave a comment:</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={e => setComment(e.target.value)} value={comment}/>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
  return(
    <Container className="details">
      {blog && (
        <Row>
          <Col>
            <h2>{blog.title}</h2>
            <p>Author: {blog.author}</p>
            <p>Likes: {blog.likes} <Button variant="primary" onClick={handleUpdateLike} className="like">Like</Button></p>
            <p>Url: {blog.url}</p>
            <p>User: {blog.user.username}</p>
            {user.username === blog.user.username && <Button variant="danger" onClick={handleBlogDelete}><Link style={{ textDecoration: 'none', color: 'white' }} to='/blogs'>delete blog</Link></Button>}
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          {commentBox()}
        </Col>
      </Row>
    </Container>
  )
}

export default BlogDetails