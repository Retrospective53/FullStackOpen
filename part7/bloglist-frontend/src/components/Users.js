import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import UserDetails from './userDetails'

const Users = ({ users }) => {
  return(
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          <Router>
            {users && users.map(user =>
              <tr key={user.id}>
                <Link to={`/users/${user.id}`}>
                  <td>{user.username}</td>
                </Link>
                <td>{user.blogs.length}</td>
              </tr>
            )}
            <Routes>
              <Route path='/users/:id' element={<UserDetails users={users}/>}></Route>
            </Routes>
          </Router>
        </tbody>
      </table>
    </div>
  )
}

export default Users