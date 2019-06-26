'use strict'

const ttt = [
  { id: 0, isTaken: false, mark: undefined },
  { id: 1, isTaken: false, mark: undefined },
  { id: 2, isTaken: false, mark: undefined },
  { id: 3, isTaken: false, mark: undefined },
  { id: 4, isTaken: false, mark: undefined },
  { id: 5, isTaken: false, mark: undefined },
  { id: 6, isTaken: false, mark: undefined },
  { id: 7, isTaken: false, mark: undefined },
  { id: 8, isTaken: false, mark: undefined }
]

const mark = (num) => {
  return ttt[num].mark
}

const isTaken = (num) => {
  return ttt[num].isTaken
}

const isTaken3 = (x, y, z) => {
  return isTaken(x) && isTaken(y) && isTaken(z)
}

const isTakenAll = () => {
  let acc = true
  for (let i = 0; i < 9; i++) {
    acc = acc && isTaken(i)
  }
}

const isWin = (x, y, z) => { // eslint-disable-line
  return (
    mark(x) === mark(y) && mark(y) === mark(z) &&
    mark(x) === mark(z) && isTaken3(x, y, z)
  )
}

// GAME LOGIC ///////////////////////////////////

const winners = (x, y, z) => {
  if (
    mark(x) === mark(y) && mark(y) === mark(z) &&
    mark(x) === mark(z) && isTaken3(x, y, z)
  ) {
    return [mark(x), x, y, z]
  } else {
    return false
  }
}

const isWinAny = () => {
  return (
    winners(0, 1, 2) || winners(3, 4, 5) || winners(6, 7, 8) || winners(2, 5, 8) ||
    winners(1, 4, 7) || winners(0, 3, 6) || winners(0, 4, 8) || winners(2, 4, 6)
  )
}

const isDraw = () => {
  return (!isWinAny() && isTakenAll())
}

// GAME LOGIC ///////////////////////////////////

const outcome = (x, y, z) => { // eslint-disable-line
  if (isWinAny()) {
    console.log('win')
  } else if (isDraw()) {
    console.log('draw')
  }
}

// if (
//   ttt[0]
// ) {
//   console.log('win')
// } else if ()
