import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [showAll, setShowAll] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
      <form onSubmit={handleLogin}>
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
      {user === null && loginForm()}
      <button type='button' onClick={() => console.log(`${username} and ${password}`)}>log</button>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App