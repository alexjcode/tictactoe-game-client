'use strict'

// auto-hide game board

const store = require('../store.js')
const api = require('./api.js')

store.indexGame = 0

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

// GAME LOGIC BEGIN /////////////////////////////////

const isTaken3 = (x, y, z) => {
  return !!x && !!y && !!z
}

const isTakenAll = (game) => {
  let acc = true
  for (let i = 0; i < 9; i++) {
    acc = acc && !!(game.cells[i])
  }
  return acc
}

const winners = (game, x, y, z) => {
  if (
    game.cells[x] === game.cells[y] && game.cells[y] === game.cells[z] &&
    game.cells[x] === game.cells[z] && isTaken3(x, y, z)
  ) {
    // console.log('winners', game.cells[x])
    return game.cells[x]
  } else {
    // console.log('winners', false)
    return false
  }
}

const isWinAny = (game) => {
  return (
    winners(game, 0, 1, 2) || winners(game, 3, 4, 5) ||
    winners(game, 6, 7, 8) || winners(game, 2, 5, 8) ||
    winners(game, 1, 4, 7) || winners(game, 0, 3, 6) ||
    winners(game, 0, 4, 8) || winners(game, 2, 4, 6)
  )
}

const isDraw = (game) => {
  if (!isWinAny(game) && isTakenAll(game)) {
    return 'z'
  } else {
    return false
  }
}

const outcome = (game) => {
  // return 'x'
  return isWinAny(game) || isDraw(game)
}

// GAME LOGIC END ///////////////////////////////////

const indexGameSuccess = (res) => {
  console.log(`Index Game success`, res)
  const grep = $.grep(res.games, obj => obj.id === store.game.id)[0]
  console.log('grep', grep)
  if (outcome(grep)) {
    // popup win/lose/draw
    store.game.over = true
    const data = {
      "game": { // eslint-disable-line
        "cell": { // eslint-disable-line
          "index": store.game.id, // eslint-disable-line
          "value": store.turn // eslint-disable-line
        },
        "over": store.game.over // eslint-disable-line
      }
    }
    store.indexGame = 1
    api.newMove(data)
      .then(newMoveSuccess)
      .catch(index2Failure)
    store.indexGame = 0
  }
  index2Success(res)
  // successMessage(`Index Game Success!! ${store.user.token}`)
}

const indexGameFailure = (error) => {
  console.log(`Index failure`, error)
  failMessage(`Index failure ${store.user.token}`)
}

const index2Success = (res) => {
  let xWins = 0
  let oWins = 0
  let draws = 0
  let totalGames = 0
  res.games.forEach((game) => {
    if (game.over === true) {
      if (outcome(game) === 'x') {
        xWins++
      } else if (outcome(game) === 'o') {
        oWins++
      } else if (outcome(game) === 'z') {
        draws++
      } else {
        totalGames--
      }
      totalGames++
    }
  })
  $('#scorekeeper').text(`${xWins} : ${totalGames}`)
  $('#scorekeeper2').text(`${xWins} Wins, ${oWins} Losses, ${draws} Draws`)
}

const index2Failure = (error) => {
  console.log(`Index failure`, error)
  failMessage(`Index failure ${store.user.token}`)
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

// const showGameFailure = (res) => {
//   failMessage(`Show Game FAILURE! ${store.user.token} [${store.game.id}]`)
// }

const newMoveSuccess = (data) => {
  store.game = data.game
  // console.log(store.game)
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
  // console.log(`update book success`, data)
  successMessage(`New move ${store.user.token} [${store.game.id}]`)
  if (store.indexGame === 1) {
    indexGameSuccess()
  }
}

const newMoveFailure = (error) => {
  console.log(`update book failure`, error)
  failMessage(`Couldn't move. Try again ${store.user.token} [${store.game.id}]`)
}

const loadGameSuccess = (responseData) => {
  store.game = responseData.game
  $('#tt-board').show()
  $('#current-turn').show()
  let cell = 'z'
  let xCells = 0
  let oCells = 0
  for (let i = 0; i < 9; i++) {
    cell = store.game.cells[i]
    if (cell === 'x') {
      $(`div[data-cell-index=${i}]`).html('X')
      xCells++
      // $(`div[data-cell-index=${i}]`).html('<img src="public/images/x.png" alt="x" class="x">')
    } else if (cell === 'o') {
      $(`div[data-cell-index=${i}]`).html('O')
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
  successMessage(`Game Loaded ${store.user.token} [${store.game.id}]`)
  console.log(store)
}

const loadGameFailure = (error) => {
  console.log(`update book failure`, error)
  failMessage(`This game does not exist ${store.user.token} [${store.game.id}]`)
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
  outcome
}
