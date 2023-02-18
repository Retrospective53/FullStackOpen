import { useState, useEffect, useRef, useContext } from 'react'
import NotificationContext from './hooks/notificationReducer'
import UserContext from './hooks/userContext'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'
import Users from './components/Users'
import { useQuery } from 'react-query'
import { Routes, Route, Link } from 'react-router-dom'
import BlogDetails from './components/BlogDetails'
import UserDetails from './components/userDetails'
import RegisterForm from './components/RegisterForm'
import { Form, Button } from 'react-bootstrap'
import './styles/app.css'

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const [user, userDispatch] = useContext(UserContext)
  const [users, setUsers] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    userService.getUsers()
      .then(response => {
        setUsers(response)
      })
      .catch(error => console.error(error))
  }, [])

  const queryBlogs = useQuery('blogs', blogService.getAll, { refetchOnWindowFocus: false })
  if (queryBlogs.isLoading) {
    return <div>loading data...</div>
  }
  const blogs = queryBlogs.data
  // console.log(result)
  // useEffect(() => {
  //   if (result.data) {
  //     setBlogs(result.data)
  //   }
  // }, [result.data])

  const errorNuller = () => {
    setTimeout(() => {
      notificationDispatch({ type: 'NULL' })
    }, 3000)
  }

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: 'SET', payload: user })
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      notificationDispatch({ type: 'SET',payload: [1, 'Wrong Credentials'] })
      setTimeout(() => {
        notificationDispatch({ type: 'NULL' })
      }, 3000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    userDispatch({ type: 'NULL' })
  }

  const loginForm = () => {
    // const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    // const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div id='loginContainer'>
        {/* <div style={hideWhenVisible}>
          <Button variant='dark' onClick={() => setLoginVisible(true)}>Log in</Button>
        </div> */}
        <div id='login' className='d-flex align-items-center justify-content-center'>
          <Form onSubmit={handleLogin}>
            <Form.Group>
              <h2>Login</h2>
              <div>
                <Form.Label>username</Form.Label>
                <Form.Control type="text" name='username' id='username' value={username} onChange={({ target }) => setUsername(target.value)}/></div>
              <div>
                <Form.Label>password</Form.Label>
                <Form.Control type="password" name='password' id='password' value={password} onChange={({ target }) => setPassword(target.value)}/></div>
              <Button type='submit' className='primary' id='loginButton'>login</Button>
              {/* <Button type='button' className='btn btn-secondary' onClick={() => setLoginVisible(false)}>cancel</Button> */}
            </Form.Group>
            <Link to={'/register'}>Create an account</Link>
          </Form>
        </div>
      </div>
    )}

  const addBlogVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }
  // console.log(users)
  // console.log(user)
  const home = () => {

    return(
      <div>
        <Toggable buttonLabel='Create New Blog' ref={blogFormRef}>
          <BlogForm errorNuller={errorNuller} blogs={blogs} addBlogVisibility={addBlogVisibility} users={users} setUsers={setUsers} user={user}/>
        </Toggable>
      </div>
    )
  }

  const navigation = () => {
    const style = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f2f2f2',
      padding: '10px 20px',
      borderBottom: '1px solid #ccc',
      listStyleType: 'none',
      margin: '0',
      fontSize: '1.2rem'
    }

    const linkStyle = {
      textDecoration: 'none',
      color: '#333',
      marginRight: '20px',
      cursor: 'pointer'
    }

    const buttonStyle = {
      backgroundColor: '#333',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '10px',
      cursor: 'pointer'
    }
    return(
      <div id='navigation'>
        <ul style={style} className='d-flex justify-content-between'>
          <div className='d-flex flex-row'>
            <li>
              <Link style={linkStyle} to={'/home'}>Home</Link>
            </li>
            <li>
              <Link style={linkStyle} to={'/blogs'}>Blogs</Link>
            </li>
            <li>
              <Link style={linkStyle} to={'/users'}>Users</Link>
            </li>
            <li>{`${user.username} is logged in`}</li>
          </div>
          <Link to={'/'}><button style={buttonStyle} type='button' onClick={handleLogOut}>Log out</button></Link>
        </ul>
      </div>
    )
  }

  return (
    <>
      <div id='lol' className='d-flex flex-column justify-content-start align-items-stretch'>
        { user !== null && navigation() }
        <Notification message={notification}/>
        <div id='lolz'>
          <div id='home' className='container d-flex flex-column align-items-stretch justify-content-center'>
            <Routes>
              {user !== null && (blogs && <Route path='/blogs' element={<Blog blogs={blogs}/>}/>)}
              {user !== null && (blogs && <Route path='/users' element={<Users users={users}/>}/>)}
              {user !== null && <Route path='/blogs/:id' element={<BlogDetails blogs={blogs} setUsers={setUsers} users={users}/>}/>}
              {user !== null && <Route path='/users/:id' element={<UserDetails users={users}/>}/>}
              {user !== null && <Route path='/home' element={home()}/>}
              {user === null && <Route path='/' element={loginForm()}/>}
              <Route path='/register' element={<RegisterForm setUsers={setUsers} users={users}/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}

export default App