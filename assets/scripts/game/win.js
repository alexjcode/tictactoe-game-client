'use strict'

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
    game.cells[x] === game.cells[z] && isTaken3(game.cells[x], game.cells[y], game.cells[y])
  ) {
    // console.log('winners', game.cells[x])
    return game.cells[x]
  } else {
    // console.log('winners', false)
    return false
  }
}

const isWinAny = (game) => {
  // console.log(game.cells)
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

module.exports = {
  outcome
}
