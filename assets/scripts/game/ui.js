'use strict'

// auto-hide game board

const store = require('../store.js') // eslint-disable-line

const successMessage = message => {
  $('#message').text(message)
  $('#message').removeClass('failure')
  $('#message').addClass('success')
  $('form').trigger('reset')
}

const failMessage = message => {
  $('#message').text(message)
  $('#message').removeClass('success')
  $('#message').addClass('failure')
  $('form').trigger('reset')
}

const newGameSuccess = () => {
  $('#tt-board').show()
  successMessage(`New game begin ${store.user.token}`)
}

const newGameFailure = () => {
  failMessage(`New game failure`)
}

const indexGameSuccess = (data) => {
  console.log(`Index Game success`, data)
  $('#books-display').html('') // clear
  data.books.forEach((book) => {
    const bookHtml = (`
      <h4>Title: ${book.title}</h4>
      <p>Author: ${book.author}</p>
      <p>ID: ${book.id}</p>
      <br>
    `)
    $('#books-display').append(bookHtml)
  })
  successMessage.text(`Index Game Success!! ${store.user.token}`)
}

const indexGameFailure = (error) => {
  console.log(`Index books failure`, error)
  failMessage(`Index Game Failure!! Try again... ${store.user.token}`)
}

const showGameSuccess = (data) => {
  $('#books-display').html(`
    <h4>Title: ${data.book.title}</h4>
    <p>Author: ${data.book.author}</p>
    <p>ID: ${data.book.id}</p>
    <br>
  `)
  successMessage.text(`Show Game Success!! Noice. ${store.user.token}`)
}

const showGameFailure = (res) => {
  failMessage.text(`Show Game FAILURE! ${store.user.token}`)
}

const newMoveSuccess = (data) => {
  console.log(`update book success`, data)
  successMessage(`New move success!! Noice. ${store.user.token}`)
}

const newMoveFailure = (error) => {
  console.log(`update book failure`, error)
  failMessage(`New move failure!! Try again ${store.user.token}`)
}

module.exports = {
  newGameSuccess,
  newGameFailure,
  indexGameSuccess,
  indexGameFailure,
  showGameSuccess,
  showGameFailure,
  newMoveSuccess,
  newMoveFailure
}
