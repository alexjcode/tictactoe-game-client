'use strict'

// auto-hide game board

const store = require('../store.js')
const win = require('./win')
// const events = require('./events')

let xIndex = 0
let oIndex = 0
let drawsIndex = 0
let totalGamesIndex = 0

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

const resetScore = () => {
  store.xWins = 0
  store.oWins = 0
  store.draws = 0
  store.totalGames = 0
}

const score = (input) => {
  xIndex = 0
  oIndex = 0
  drawsIndex = 0
  totalGamesIndex = 0
  for (let i = 0; i < input.length; i++) {
    const game = input[i]
    if (game.over === true) {
      if (win.outcome(game) === 'x') {
        xIndex++
      } else if (win.outcome(game) === 'o') {
        oIndex++
      } else if (win.outcome(game) === 'z') {
        drawsIndex++
      } else {
        totalGamesIndex--
      }
      totalGamesIndex++
    }
  }
}

const indexGameSuccess = (res) => {
  score(res.games)
  $('#message').text(`${xIndex} Wins, ${oIndex} Losses, ${drawsIndex} Draws [ ${totalGamesIndex} Total Games ]`)
}

const indexGameFailure = (error) => {
  console.log(`Index failure`, error)
  failMessage(`Index failure`)
}

const newGameSuccess = (responseData) => {
  store.game = responseData.game
  $('#tt-board').show()
  $('#current-turn').show()
  $('#tt-divider').show()
  for (let i = 0; i < 9; i++) {
    $(`div[data-cell-index=${i}]`).html('')
  }
  successMessage(`New game begin [${store.game.id}]`)
}

const newGameFailure = () => {
  failMessage(`New game failure`)
}

const newMoveSuccess = (data) => {
  store.game = data.game
  let cell = 'z'
  for (let i = 0; i < 9; i++) {
    cell = store.game.cells[i]
    if (cell === 'x') {
      // Add 'x' image to clicked cell
      $(`div[data-cell-index=${i}]`).html('<img src="public/images/x2.png" alt="x" class="ltr x">')
    } else if (cell === 'o') {
      // Add 'o' image to clicked cell
      $(`div[data-cell-index=${i}]`).html('<img src="public/images/o.png" alt="o" class="ltr o">')
    }
  }
  if (store.turn === 'x') {
    store.turn = 'o'
  } else if (store.turn === 'o' || store.turn === 'z') {
    store.turn = 'x'
  }
  $('#current-turn').text(store.turn)
  successMessage(`New move [${store.game.id}]`)
  const winning = win.outcome(store.game)
  if (winning === 'z') {
    successMessage(`This match ends in a draw`)
    $('#tt-board').hide()
    $('#current-turn').hide()
    $('#tt-divider').hide()
    store.totalGames++
    store.draws++
    $('#scorekeeper').text(`${store.xWins} : ${store.totalGames}`)
    $('#scorekeeper2').text(`${store.xWins} Wins, ${store.oWins} Losses, ${store.draws} Draws`)
  } else if (winning) {
    successMessage(`${winning} is the victor`)
    $('#tt-board').hide()
    $('#current-turn').hide()
    $('#tt-divider').hide()
    store.totalGames++
    if (winning === 'x') {
      store.xWins++
    } else if (winning === 'o') {
      store.oWins++
    }
    $('#scorekeeper').text(`${store.xWins} : ${store.totalGames}`)
    $('#scorekeeper2').text(`${store.xWins} Wins, ${store.oWins} Losses, ${store.draws} Draws`)
  }
}

const newMoveFailure = () => {
  failMessage(`Couldn't move. Try again [${store.game.id}]`)
}

const loadGameSuccess = (responseData) => {
  store.game = responseData.game
  $('#tt-board').show()
  $('#current-turn').show()
  $('#tt-divider').show()
  let cell = 'z'
  let xCells = 0
  let oCells = 0
  for (let i = 0; i < 9; i++) {
    cell = store.game.cells[i]
    if (cell === 'x') {
      // Add 'x' image to clicked cell
      $(`div[data-cell-index=${i}]`).html('<img src="public/images/x2.png" alt="x" class="ltr x">')
      xCells++
    } else if (cell === 'o') {
      // Add 'o' image to clicked cell
      $(`div[data-cell-index=${i}]`).html('<img src="public/images/o.png" alt="o" class="ltr o">')
      oCells++
    }
  }
  if (oCells === xCells) {
    store.turn = 'x'
  } else if (xCells > oCells) {
    store.turn = 'o'
  } else {
    store.turn = 'z'
  }
  successMessage(`Game Loaded [${store.game.id}]`)
}

const loadGameFailure = () => {
  failMessage(`Invalid game request [${store.game.id}]`)
}

module.exports = {
  failMessage,
  successMessage,
  newGameSuccess,
  newGameFailure,
  indexGameSuccess,
  indexGameFailure,
  newMoveSuccess,
  newMoveFailure,
  loadGameSuccess,
  loadGameFailure,
  resetScore
}
