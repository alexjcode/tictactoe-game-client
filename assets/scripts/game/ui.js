'use strict'

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

const store = require('../store.js')

const newGameSuccess = () => {
  successMessage('You signed up successfully!')
}

const newGameFailure = () => {
  failMessage('Sign up failure')
}

// const newGameSuccess = (data) => {
//   $('#message').text('Create Books Success!! Noice.')
//   $('#message').css('color', 'green')
//   $('#message').show()
//   hideMessaging()
//   $('form').trigger('reset')
// }
//
// const newGameFailure = (res) => {
//   $('#books-display').html('')
//   $('#message').text('Show Book FAILURE!')
//   $('#message').css('color', 'red')
//   $('#message').show()
//   hideMessaging()
//   $('form').trigger('reset')
// }

const indexGameSuccess = (data) => {
  console.log('index books success', data)
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
  $('#message').text('Index Books Success!! Noice.')
  $('#message').css('color', 'green')
  $('#message').show()
  hideMessaging()
}

const indexGameFailure = (error) => {
  console.log('index books failure', error)
  $('#message').text('Index Books Failure!! Try again...')
  $('#message').css('color', 'red')
  $('#message').show()
  hideMessaging()
}

const showGameSuccess = (data) => {
  // builing html to display single book
  $('#books-display').html(`
    <h4>Title: ${data.book.title}</h4>
    <p>Author: ${data.book.author}</p>
    <p>ID: ${data.book.id}</p>
    <br>
  `)
  $('#message').text('Show Books Success!! Noice.')
  $('#message').css('color', 'green')
  $('#message').show()
  hideMessaging()
  $('form').trigger('reset')
}

const showGameFailure = (res) => {
  $('#books-display').html('')
  $('#message').text('Show Book FAILURE!')
  $('#message').css('color', 'red')
  $('#message').show()
  hideMessaging()
  $('form').trigger('reset')
}

const newMoveSuccess = (data) => {
  console.log('update book success', data)
  $('#message').text('Update Books Success!! Noice.')
  $('#message').css('color', 'green')
  $('#message').show()
  hideMessaging()
  $('form').trigger('reset')
}

const newMoveFailure = (error) => {
  console.log('update book failure', error)
  $('#message').text('Index Books Failure!! Try again...')
  $('#message').css('color', 'red')
  $('#message').show()
  hideMessaging()
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
