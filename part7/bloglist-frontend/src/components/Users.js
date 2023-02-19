import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = ({ users }) => {
  return(
    <div className="p-4">
      <h2 className="mb-4">Users</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`} className="text-decoration-none">{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users