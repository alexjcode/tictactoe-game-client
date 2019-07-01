'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')
store.turn = 'z'

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

const onLoadGame = (event) => {
  event.preventDefault()
  // const id = event.target.getAttribute('data-cell-index')
  const form = event.target
  const formData = getFormFields(form)
  api.loadGame(formData)
    .then(ui.loadGameSuccess)
    // .catch(ui.showGameFailure)
}

const onNewMove = (event) => {
  event.preventDefault()
  const index = parseInt(event.target.getAttribute('data-cell-index'))
  console.log(index)
  console.log(index >= 0)
  if (!(index >= 0)) {
    return store.game
  } else {
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
    console.log('before api', data)
    const storeCells = store.game.cells
    console.log('storecells: ', storeCells)
    const dataIndex = data.game.cell.index
    console.log('index', dataIndex)
    if (store.game.cells[index] !== '' && store.game.cells !== ['', '', '', '', '', '', '', '', '']) {
      ui.failMessage(`That cell is already taken ${store.user.token}`)
    } else {
      api.newMove(data)
        .then(ui.newMoveSuccess)
        .catch(ui.newMoveFailure)
    }
  }
}

module.exports = {
  onNewGame,
  // onIndexGame,
  onLoadGame,
  onNewMove
}
