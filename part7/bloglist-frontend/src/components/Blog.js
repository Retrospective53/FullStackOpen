import { Link } from 'react-router-dom'

const Blog = ({ blogs }) => {
  const blogStyle = {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: 5,
    boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease-in-out',
    textDecoration: 'none',
    color: '#333'
  }

  if (!blogs) {
    return <div>loading</div>
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Blog Posts</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', flexDirection: 'column' }}>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Link to={`/blogs/${blog.id}`} key={blog.id} style={blogStyle} className='blog'>
            <h3 style={{ marginBottom: 5 }}>{blog.title}</h3>
            <p style={{ color: '#666', marginBottom: 5 }}>By {blog.author}</p>
            <p style={{ color: '#999', fontSize: 14, marginTop: 5 }}>{blog.likes} likes</p>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Blog
