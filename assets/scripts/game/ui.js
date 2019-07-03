'use strict'

// auto-hide game board

const store = require('../store.js')
const win = require('./win')
// const events = require('./events')
let xWins = 0
let oWins = 0
let draws = 0
let totalGames = 0

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
  xWins = 0
  oWins = 0
  draws = 0
  totalGames = 0
}

// const score = (input) => {
//   let xWinz = 0
//   let oWinz = 0
//   let drawz = 0
//   totalGames = 0
//   for (let i = 0; i < input.length; i++) {
//     const game = input[i]
//     if (game.over === true) {
//       if (win.outcome(game) === 'x') {
//         xWinz++
//       } else if (win.outcome(game) === 'o') {
//         oWinz++
//       } else if (win.outcome(game) === 'z') {
//         drawz++
//       } else {
//         totalGames--
//       }
//       totalGames++
//     }
//   }
// }

// const indexGameSuccess = (res) => {
//   score(res.games)
//   if (!store.game.cells || store.game.over !== false) {
//     $('#scorekeeper').text(`${xWins} : ${totalGames}`)
//     $('#scorekeeper2').text(`${xWins} Wins, ${oWins} Losses, ${draws} Draws`)
//   }
// }
//
// const indexGameFailure = () => {
//   // console.log(`Index failure`, error)
//   failMessage(`Index failure`)
// }

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
      // $(`div[data-cell-index=${i}]`).html('X')
      $(`div[data-cell-index=${i}]`).html('<img src="public/images/x2.png" alt="x" class="ltr x">')
    } else if (cell === 'o') {
      // $(`div[data-cell-index=${i}]`).html('O')
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
  // score(store.game)
  const winning = win.outcome(store.game)
  if (winning === 'z') {
    successMessage(`This match ends in a draw`)
    $('#tt-board').hide()
    $('#current-turn').hide()
    $('#tt-divider').hide()
    totalGames++
    draws++
    $('#scorekeeper').text(`${xWins} : ${totalGames}`)
    $('#scorekeeper2').text(`${xWins} Wins, ${oWins} Losses, ${draws} Draws`)
  } else if (winning) {
    successMessage(`${winning} is the victor`)
    $('#tt-board').hide()
    $('#current-turn').hide()
    $('#tt-divider').hide()
    totalGames++
    if (winning === 'x') {
      xWins++
    } else if (winning === 'o') {
      oWins++
    }
    $('#scorekeeper').text(`${xWins} : ${totalGames}`)
    $('#scorekeeper2').text(`${xWins} Wins, ${oWins} Losses, ${draws} Draws`)
  }
}

const newMoveFailure = () => {
  // console.log(`new move failure`, error)
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
      // $(`div[data-cell-index=${i}]`).html('X')
      $(`div[data-cell-index=${i}]`).html('<img src="public/images/x2.png" alt="x" class="ltr x">')
      xCells++
    } else if (cell === 'o') {
      // $(`div[data-cell-index=${i}]`).html('O')
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
  // console.log(store)
}

const loadGameFailure = () => {
  // console.log(`update book failure`, error)
  failMessage(`This game does not exist [${store.game.id}]`)
}

module.exports = {
  failMessage,
  successMessage,
  newGameSuccess,
  newGameFailure,
  // indexGameSuccess,
  // indexGameFailure,
  newMoveSuccess,
  newMoveFailure,
  loadGameSuccess,
  loadGameFailure,
  resetScore
}
