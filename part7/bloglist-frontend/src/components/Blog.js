import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import BlogDetails from './BlogDetails'


const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <Router>
      <div style={blogStyle} className='blog'>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      </div>

      <Routes>
        <Route path='/blogs/:id' element={<BlogDetails blog={blog}/>}/>
      </Routes>
    </Router>
  )
}

export default Blog