import { useParams } from 'react-router-dom'

const UserDetails = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.username}</h2>
      {user.blogs.length === 0 && <div>The user has not yet created a blog.</div>}
      <ul>
        {user.blogs.map(blog =>
          <li key={ blog.id }>
            { blog.title }
          </li>) }
      </ul>
    </div>
  )
}

export default UserDetails