'use strict'

const store = require('./store.js')
const win = require('./game/win')
// const events = require('./events')

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

const signUpSuccessful = responseData => {
  successMessage('You signed up successfully!')
  // $('#sign-up').hide()
}

const signUpFailure = () => {
  failMessage('Sign up failure')
}

const signInSuccessful = responseData => {
  // console.log('responseData is', responseData)
  // store user token
  store.user = responseData.user
  store.xWins = 0
  store.oWins = 0
  store.draws = 0
  store.totalGames = 0
  successMessage(`You signed in successfully!`)
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#sign-out').show()
  $('#change-password').show()
  $('#new-game').show()
  $('#load-game').show()
}

const signInFailure = () => {
  failMessage('Sign in failure')
}

const changePasswordSuccessful = responseData => {
  successMessage('Password changed successfully!')
}

const changePasswordFailure = () => {
  failMessage('Password change failure')
}

const signOutSuccessful = () => {
  store.xWins = 0
  store.oWins = 0
  store.draws = 0
  store.totalGames = 0
  $('#scorekeeper').text('')
  $('#scorekeeper2').text('')
  successMessage('Signed out successfully!')
  $('#sign-up').show()
  $('#sign-in').show()
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#tt-board').hide()
  $('#current-turn').hide()
  $('#new-game').hide()
  $('#load-game').hide()
  $('#tt-divider').hide()
}

const signOutFailure = () => {
  failMessage('Sign out failure')
}

const resetScore = () => {
  store.xWins = 0
  store.oWins = 0
  store.draws = 0
  store.totalGames = 0
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
  signUpSuccessful,
  signUpFailure,
  signInSuccessful,
  signInFailure,
  changePasswordSuccessful,
  changePasswordFailure,
  signOutSuccessful,
  signOutFailure,
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
