const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>
        <p>{blog.title} {blog.author}</p>
        <p>{blog.likes}</p>
        <p>{blog.url}</p>
      </div>
    </div>
  )
}

export default Blog