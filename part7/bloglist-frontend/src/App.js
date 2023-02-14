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
import {
  BrowserRouter as Router,
  Routes, Route, Link } from 'react-router-dom'
import BlogDetails from './components/BlogDetails'
import UserDetails from './components/userDetails'

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const [user, userDispatch] = useContext(UserContext)
  const [users, setUsers] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
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
    }, 5000)
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
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    userDispatch({ type: 'NULL' })
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Log in</button>
        </div>
        <div style={showWhenVisible}>
          <form onSubmit={handleLogin}>
            <h2>Log in to application</h2>
            <div>
              username
              <input type="text" name='username' id='username' value={username} onChange={({ target }) => setUsername(target.value)}/></div>
            <div>
              password
              <input type="text" name='password' id='password' value={password} onChange={({ target }) => setPassword(target.value)}/></div>
            <button id='loginButton'>login</button>
          </form>
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )}

  const addBlogVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }

  const home = () => {

    return(
      <div>
        <Toggable buttonLabel='Create New Blog' ref={blogFormRef}>
          <BlogForm errorNuller={errorNuller} blogs={blogs} addBlogVisibility={addBlogVisibility}/>
        </Toggable>
      </div>
    )
  }

  const navigation = () => {
    const style = {
      display: 'flex',
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
      <div>
        <ul style={style}>
          <li>
            <Link style={linkStyle} to={'/'}>Home</Link>
          </li>
          <li>
            <Link style={linkStyle} to={'/blogs'}>blogs</Link>
          </li>
          <li>
            <Link style={linkStyle} to={'/users'}>users</Link>
          </li>
          <li>{`${user.username} is logged in`}</li>
          <button style={buttonStyle} type='button' onClick={handleLogOut}>Log out</button>
        </ul>
      </div>
    )
  }

  return (
    <Router>
      {user !== null && navigation() }
      <div>
        <Notification message={notification}/>
        {user === null && loginForm()}
        <Routes>
          {blogs && <Route path='/blogs' element={<Blog blogs={blogs}/>}/>}
          <Route path='/users' element={<Users users={users}/>}/>
          <Route path='/blogs/:id' element={<BlogDetails blogs={blogs}/>}/>
          <Route path='/users/:id' element={<UserDetails users={users}/>}/>
          {user !== null && <Route path='/' element={home()}></Route>}
        </Routes>
      </div>
    </Router>
  )
}

export default App