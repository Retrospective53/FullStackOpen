import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const UserDetails = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)

  if (!users || !user) {
    return <div>loading</div>
  }
  return (
    <div>
      <h2>{user.username}</h2> <br />
      <h5>Blog list</h5>
      {user.blogs.length === 0 && <div>The user has not yet created a blog.</div>}
      <ul className='list-group'>
        {user.blogs.map(blog =>
          <li className='list-group-item' key={ blog.id }>
            <Link to={`/blogs/${blog.id}`}>{ blog.title }</Link>
          </li>) }
      </ul>
    </div>
  )
}

export default UserDetails