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

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const [user, userDispatch] = useContext(UserContext)
  const [users, setUsers] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)
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
  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON)
  //     setUser(user)
  //     blogService.setToken(user.token)
  //   }
  // }, [])


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

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification}/>
      {user === null && loginForm()}
      {user !== null && (
        <>
          <p>{`${user.username} is logged in`}</p>
          <button type='button' onClick={handleLogOut}>Log out</button>
          <Users users={users}/>
          <Toggable buttonLabel='Create New Blog' ref={blogFormRef}>
            <BlogForm errorNuller={errorNuller} blogs={blogs} addBlogVisibility={addBlogVisibility}/>
          </Toggable>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      )}
      <button onClick={() => console.log(notification)}>log</button>
    </div>
  )
}

export default App