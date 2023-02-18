import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import userService from '../services/users'
import { useNotificationDispatch } from '../hooks/notificationReducer'

const RegisterForm = ({ users, setUsers }) => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useNotificationDispatch()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const newUser = await userService.createUser({
        username,
        name,
        password
      })
      setUsers([...users, newUser])
      navigate('/')
      dispatch({ type: 'SET', payload: [0, 'account succesfully created!'] })
      setTimeout(() => {
        dispatch({ type: 'NULL' })
      }, 3000)
    } catch (exception) {
      dispatch({ type: 'SET', payload: [1, `${exception.response.data.error}`] })
      setTimeout(() => {
        dispatch({ type: 'NULL' })
      }, 3000)
      console.log(exception.response.data.error)
    }
  }
  return(
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <h2>Register</h2>
          <div>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name='username' id='username' value={username} onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name='name' id='name' value={name} onChange={({ target }) => setName(target.value)}/>
          </div>
          <div>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name='password' id='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <Button type='submit' className='primary' id='loginButton'>Register</Button>
          <p><Link to={'/'}>Back to Login Form</Link></p>
        </Form.Group>
      </Form>
    </div>
  )
}

export default RegisterForm