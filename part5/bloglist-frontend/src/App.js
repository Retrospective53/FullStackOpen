import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )}, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const errorNuller = () => {
    setTimeout(() => {
      setErrorMessage(null)
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
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setErrorMessage([1, 'Wrong Credentials'])
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
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
              <input type="text" name='username' value={username} onChange={({ target }) => setUsername(target.value)}/></div>
            <div>
              password
              <input type="text" name='password' value={password} onChange={({ target }) => setPassword(target.value)}/></div>
            <button>submit</button>
          </form>
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )}

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage}/>
      {user === null && loginForm()}
      {user !== null && (
        <>
          <p>{`${user.username} is logged in`}</p>
          <button type='button' onClick={handleLogOut}>Log out</button>
          <Toggable buttonLabel='Create New Blog'>
            <BlogForm setErrorMessage={setErrorMessage} errorNuller={errorNuller} blogs={blogs} setBlogs={setBlogs}/>
          </Toggable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      )}
    </div>
  )
}

export default App