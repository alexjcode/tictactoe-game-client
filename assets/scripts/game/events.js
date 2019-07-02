'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')
const win = require('./win')
store.turn = 'z'
let a = 0
let clicks = 0

const onIndexGame = () => {
  event.preventDefault()
  api.indexGame()
    .then(ui.indexGameSuccess)
    .catch(ui.indexGameFailure)
}

const onNewGame = () => {
  event.preventDefault()
  clicks = 0
  api.newGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
  store.turn = 'x'
  $('#current-turn').text(store.turn)
  onIndexGame()
  clicks++
}

const onLoadGame = (event) => {
  event.preventDefault()
  clicks = 0
  const form = event.target
  const formData = getFormFields(form)
  api.loadGame(formData)
    .then(ui.loadGameSuccess)
    .catch(ui.loadGameFailure)
  onIndexGame()
  clicks++
}

const onNewMove = (event) => {
  event.preventDefault()
  clicks++
  console.log('hiiiiiiiii', a)
  console.log($('#message').text())
  console.log(store.over)
  a++
  const index = parseInt(event.target.getAttribute('data-cell-index'))
  if (index >= 0) {
    if (store.game.cells[index] !== '') {
      ui.failMessage(`That cell is already taken ${store.user.token}`)
    } else {
      store.game.cells[index] = store.turn
      if (win.outcome(store.game)) {
        store.game.over = true
      }
      const data = {
        "game": { // eslint-disable-line
          "cell": { // eslint-disable-line
            "index": index, // eslint-disable-line
            "value": store.turn // eslint-disable-line
          },
          "over": store.game.over // eslint-disable-line
        }
      }
      api.newMove(data)
        .then(ui.newMoveSuccess)
        .catch(ui.newMoveFailure)
    }
  }
  onIndexGame()
}

module.exports = {
  onNewGame,
  onIndexGame,
  onLoadGame,
  onNewMove,
  clicks
}
