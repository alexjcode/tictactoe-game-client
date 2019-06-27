'use strict'

// auto-hide game board

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
  successMessage('New game begin')
}

const newGameFailure = () => {
  failMessage('New game failure')
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
  console.log('Index Game success', data)
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
  $('#message').text('Index Game Success!!')
  $('#message').css('color', 'green')
  $('#message').show()
  // hideMessaging()
}

const indexGameFailure = (error) => {
  console.log('Index books failure', error)
  $('#message').text('Index Game Failure!! Try again...')
  $('#message').css('color', 'red')
  $('#message').show()
  // hideMessaging()
}

const showGameSuccess = (data) => {
  $('#books-display').html(`
    <h4>Title: ${data.book.title}</h4>
    <p>Author: ${data.book.author}</p>
    <p>ID: ${data.book.id}</p>
    <br>
  `)
  $('#message').text('Show Game Success!! Noice.')
  $('#message').css('color', 'green')
  $('#message').show()
  // hideMessaging()
  $('form').trigger('reset')
}

const showGameFailure = (res) => {
  $('#books-display').html('')
  $('#message').text('Show Game FAILURE!')
  $('#message').css('color', 'red')
  $('#message').show()
  // hideMessaging()
  $('form').trigger('reset')
}

const newMoveSuccess = (data) => {
  console.log('update book success', data)
  $('#message').text('Update Game Success!! Noice.')
  $('#message').css('color', 'green')
  $('#message').show()
  // hideMessaging()
  $('form').trigger('reset')
}

const newMoveFailure = (error) => {
  console.log('update book failure', error)
  $('#message').text('Index Game Failure!! Try again...')
  $('#message').css('color', 'red')
  $('#message').show()
  // hideMessaging()
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
