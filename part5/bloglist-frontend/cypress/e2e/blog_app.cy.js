Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogUser', JSON.stringify(body))
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}`
    }
  })
})

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Chiyoda Momo',
      username: 'momo',
      password: 'shamiko'
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in').click()
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
    cy.contains('cancel')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'momo', password: 'shamiko' })
      cy.visit('http://localhost:3000')
      cy.contains('momo is logged in')
      cy.contains('Create New Blog')
    })

    it('fails with wrong credentials', function() {
      cy.visit('http://localhost:3000')
      cy.contains('Log in').click()
      cy.get('#username').type('mahoushoujo')
      cy.get('#password').type('shamii')
      cy.contains('login').click()
      cy.contains('Wrong Credentials')
      cy.get('.messageNotif').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'momo', password: 'shamiko' })
      cy.visit('http://localhost:3000')
    })

    it('A blog can be created', function() {
      cy.contains('Create New Blog').click()
      cy.get('#newTitle').type('Life is short')
      cy.get('#newAuthor').type('Shoko')
      cy.get('#newUrl').type('www.aaa.com')
      cy.contains('create').click()
      cy.contains('Life is short')
      cy.contains('show')
    })

    it('Users can like a blog', function() {
      cy.contains('Create New Blog').click()
      cy.get('#newTitle').type('Life is short')
      cy.get('#newAuthor').type('Shoko')
      cy.get('#newUrl').type('www.aaa.com')
      cy.contains('create').click()
      cy.contains('show').click()
      cy.contains('Like').click()
      cy.contains('Likes: 1')
    })

    describe('deletion of a blog', function() {
      beforeEach( function() {
        cy.createBlog({ title:'Boundary', author: 'momomo', url: 'www.aaa.com' })
      }

      )
      it('User can delete the blog', function() {
        cy.visit('http://localhost:3000')
        cy.contains('show').click()
        cy.contains('delete blog').click()
        cy.get('html').should('not.contain', 'Title: Life is short')
      })

      it('other users but the creator do not see the delete button', function() {
        cy.contains('Log out').click()
        const user = {
          name: 'Gap',
          username: 'Yukari',
          password: 'gensokyo'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.login({ username: 'Yukari', password: 'gensokyo' })

        cy.visit('http://localhost:3000')
        cy.contains('show').click()
        cy.get('html').should('not.contain', 'delete blog')
      })
    })
    it.only('the blogs are ordered according to likes with the blog with the most likes being first', function() {
      cy.createBlog({ title:'Boundary', author: 'momomo', url: 'www.aaa.com', likes: 1000 })
      cy.createBlog({ title:'Tenshii', author: 'momomo', url: 'www.aaa.com', likes: 500 })
      cy.createBlog({ title:'Kasenn', author: 'momomo', url: 'www.aaa.com', likes: 100 })
      cy.visit('http://localhost:3000')

      cy.get('.blog').eq(0).should('contain', 'Boundary')
      cy.get('.blog').eq(1).should('contain', 'Tenshii')
    })
  })
})