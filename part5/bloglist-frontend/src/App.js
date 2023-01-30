import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: message[0] === 0 ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return(
    <div className='messageNotif' style={notificationStyle}>
      {message[1]}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [showAll, setShowAll] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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

  const handleCreate = async e => {
    e.preventDefault()
    try {
      const blog = await blogService.create({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
      })
      setErrorMessage([0, `a new blog ${newBlogTitle} by ${newBlogAuthor} added`])
      errorNuller()
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
    }
    catch (exception) {
      setErrorMessage([1, 'create blog failed'])
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
      <form onSubmit={handleLogin}>
        <h2>Log in to application</h2>
        <div>
          username 
          <input type="text" name='username' value={username} onChange={({target}) => setUsername(target.value)}/></div>
        <div>
          password 
          <input type="text" name='password' value={password} onChange={({target}) => setPassword(target.value)}/></div>
        <button>submit</button>
      </form>
  )

  return (
    <div>
      <Notification message={errorMessage}/>
      {user === null && loginForm()}
      {user !== null && (
        <>
          <p>{`${user.username} is logged in`}</p>
          <button type='button' onClick={handleLogOut}>Log out</button>
          <form onSubmit={handleCreate}>
            title:
            <input type="text" name='newTitle' value={newBlogTitle} onChange={({target}) => setNewBlogTitle(target.value)}/> <br/>
            author:
            <input type="text" name='newAuthor' value={newBlogAuthor} onChange={({target}) => setNewBlogAuthor(target.value)}/> <br/>
            url:
            <input type="text" name='newUrl' value={newBlogUrl} onChange={({target}) => setNewBlogUrl(target.value)}/> <br/>
            <button>create</button>
          </form>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
            )}
        </>
      )}
      <button type='button' onClick={() => console.log(`${username} and ${password}`)}>log</button>
      <button type='button' onClick={() => console.log(newBlog)}>log newBlog</button>
    </div>
  )
}

export default App