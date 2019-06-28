'use strict'

// const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
let turn = 'z'
const store = require('../store.js') // eslint-disable-line
// let gameID = -1

const onNewGame = () => {
  event.preventDefault()
  api.newGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
  // gameID = store.game.id
  turn = 'x'
  $('#current-turn').text(turn)
  // console.log(store)
}

// const onIndexGame = (event) => {
//   const id = event.target.getAttribute('data-cell-index')
//   const data = {
//     game: {
//       cell: {
//         index: id,
//         value: turn
//       }
//     }
//   }
//
//   api.indexBooks(data)
//     .then(ui.indexGameSuccess)
//     .catch(ui.indexGameFailure)
// }
//
// const onShowGame = (event) => {
//   event.preventDefault()
//   const formData = getFormFields(event.target)
//   console.log(formData)
//   api.showBook(formData.book.id)
//     .then(ui.showGameSuccess)
//     .catch(ui.showGameFailure)
// }

const onNewMove = (event) => {
  event.preventDefault()
  const index = event.target.getAttribute('data-cell-index')
  // turn = $('#current-turn').text()
  const over = false
  const data = JSON.stringify({
    game: {
      cell: {
        index: index,
        value: turn
      },
      over: over
    }
  })
  // console.log(formData)
  api.newMove(data, store.game.id)
    .then(ui.newMoveSuccess)
    .catch(ui.newMoveFailure)
  if (turn === 'x') {
    turn = 'o'
  } else if (turn === 'o' || turn === 'z') {
    turn = 'x'
  }
  $('#current-turn').text(turn)
  console.log(turn)
}

module.exports = {
  onNewGame,
  // onIndexGame,
  // onShowGame
  onNewMove
}
