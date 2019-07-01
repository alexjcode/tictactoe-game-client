'use strict'

// auto-hide game board

const store = require('../store.js')

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

const newGameSuccess = (responseData) => {
  store.game = responseData.game
  $('#tt-board').show()
  $('#current-turn').show()
  for (let i = 0; i < 9; i++) {
    $(`div[data-cell-index=${i}]`).html('')
  }
  successMessage(`New game begin ${store.user.token} [${store.game.id}]`)
  console.log(store)
}

const newGameFailure = () => {
  failMessage(`New game failure ${store.user.token}`)
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
  successMessage(`Index Game Success!! ${store.user.token} [${store.game.id}]`)
}

const indexGameFailure = (error) => {
  console.log(`Index books failure`, error)
  failMessage(`Index Game Failure!! Try again... ${store.user.token} [${store.game.id}]`)
}

// const showGameSuccess = (data) => {
//   successMessage(`Show Game Success!! Noice. ${store.user.token} [${store.game.id}]`)
// }
//
// const showGameFailure = (res) => {
//   failMessage(`Show Game FAILURE! ${store.user.token} [${store.game.id}]`)
// }

const newMoveSuccess = (data) => {
  store.game = data.game
  console.log(store.game)
  let cell = 'z'
  for (let i = 0; i < 9; i++) {
    cell = store.game.cells[i]
    if (cell === 'x') {
      $(`div[data-cell-index=${i}]`).html('X')
      // $(`div[data-cell-index=${i}]`).html('<img src="public/images/x.png" alt="x" class="x">')
    } else if (cell === 'o') {
      $(`div[data-cell-index=${i}]`).html('O')
    }
  }
  if (store.turn === 'x') {
    store.turn = 'o'
  } else if (store.turn === 'o' || store.turn === 'z') {
    store.turn = 'x'
  }
  $('#current-turn').text(store.turn)
  console.log(store.turn)
  console.log(`update book success`, data)
  successMessage(`New move success!! Noice. ${store.user.token} [${store.game.id}]`)
}

const newMoveFailure = (error) => {
  console.log(`update book failure`, error)
  failMessage(`New move failure!! Try again ${store.user.token} [${store.game.id}]`)
}

module.exports = {
  newGameSuccess,
  newGameFailure,
  indexGameSuccess,
  indexGameFailure,
  failMessage,
  successMessage,
  // showGameSuccess,
  // showGameFailure,
  newMoveSuccess,
  newMoveFailure
}
