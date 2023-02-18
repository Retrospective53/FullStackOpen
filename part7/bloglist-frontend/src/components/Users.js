import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = ({ users }) => {
  return(
    <div>
      <h2>Users</h2>
      <Table striped className='table'>
        <tbody>
          <tr>
            <th>user</th>
            <th>blogs created</th>
          </tr>
          {users && users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users