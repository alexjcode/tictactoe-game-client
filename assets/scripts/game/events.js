'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')
store.turn = 'z'

const onIndexGame = () => {
  event.preventDefault()
  api.indexGame()
    .then(ui.indexGameSuccess)
    .catch(ui.indexGameFailure)
}

const onNewGame = () => {
  event.preventDefault()
  api.newGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
  store.turn = 'x'
  $('#current-turn').text(store.turn)
  onIndexGame()
}

const onLoadGame = (event) => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.loadGame(formData)
    .then(ui.loadGameSuccess)
    .catch(ui.loadGameFailure)
  onIndexGame()
}

const onNewMove = (event) => {
  event.preventDefault()
  const index = parseInt(event.target.getAttribute('data-cell-index'))
  // console.log(index)
  // console.log(index >= 0)
  if (!(index >= 0)) {
    return store.game
  } else {
    const data = {
      "game": { // eslint-disable-line
        "cell": { // eslint-disable-line
          "index": index, // eslint-disable-line
          "value": store.turn // eslint-disable-line
        },
        "over": store.game.over // eslint-disable-line
      }
    }
    if (store.game.cells[index] !== '' && store.game.cells !== ['', '', '', '', '', '', '', '', '']) {
      ui.failMessage(`That cell is already taken ${store.user.token}`)
    } else {
      api.newMove(data)
        .then(ui.newMoveSuccess)
        .catch(ui.newMoveFailure)
      console.log('store.game', store.game)
      console.log('outcome', ui.outcome(store.game))
      console.log('DATA 2', data)
    }
    // const res = api.indexGame() // .responseJSON // .games
    // console.log('response data', res)
    // console.log('res.responseJSON', res.games)
    // console.log('typeof response data', typeof res)
  }
  onIndexGame()
}

module.exports = {
  onNewGame,
  onIndexGame,
  onLoadGame,
  onNewMove
}
