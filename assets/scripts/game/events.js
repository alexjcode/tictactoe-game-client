'use strict'

// const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')
store.turn = 'z'

// let gameID = -1

const onNewGame = () => {
  event.preventDefault()
  api.newGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
  // gameID = store.game.id
  store.turn = 'x'
  $('#current-turn').text(store.turn)
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
//   // const id = event.target.getAttribute('data-cell-index')
//   api.showGame()
//     .then(ui.showGameSuccess)
//     .catch(ui.showGameFailure)
// }

const onNewMove = (event) => {
  event.preventDefault()
  const index = parseInt(event.target.getAttribute('data-cell-index'))
  // turn = $('#current-turn').text()
  const over = false

  const data = {
    "game": {
      "cell": {
        "index": index,
        "value": store.turn
      },
      "over": over
    }
  }

  console.log(data)
  api.newMove(data, store.game.id)
    .then(ui.newMoveSuccess)
    .catch(ui.newMoveFailure)
}

module.exports = {
  onNewGame,
  // onIndexGame,
  // onShowGame,
  onNewMove
}
