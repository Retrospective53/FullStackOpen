import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import userEvent from '@testing-library/user-event'


test('renders blog', () => {
  const blog = {
    title: 'Life is short',
    author: 'Shoko',
    user: {
      username: 'momo'
    }
  }

  render(<Blog blog={blog}/>)

  const element = screen.getByText('Life is short Shoko')
  expect(element).toBeDefined()
})

test('renders whats displayed', () => {
  const blog = {
    title: 'Life is short',
    author: 'Shoko',
    user: {
      username: 'momo'
    }
  }

  const { container } = render(<Blog blog={blog}/>)

  const element = container.querySelector('.details')
  expect(element).toHaveStyle('display: none')
})

test('renders the blog details after show button is clicked', async () => {
  const blog = {
    title: 'Life is short',
    author: 'Shoko',
    user: {
      username: 'momo'
    }
  }

  const { container } = render(<Blog blog={blog}/>)

  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)

  const element = container.querySelector('.details')
  expect(element).not.toHaveStyle('display: none')
})

test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
  const blog = {
    title: 'Life is short',
    author: 'Shoko',
    user: {
      username: 'momo'
    }
  }

  const mockHandler = jest.fn()
  render(<Blog blog={blog} lol={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('Like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

