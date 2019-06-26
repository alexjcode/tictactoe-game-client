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

const isWin = (x, y, z) => {
  return (
    mark(x) === mark(y) && mark(y) === mark(z) &&
    mark(x) === mark(z) && isTaken3(x, y, z)
  )
}

const isWinAny = () => {
  return (
    isWin(0, 1, 2) || isWin(3, 4, 5) || isWin(6, 7, 8) || isWin(2, 5, 8) ||
    isWin(1, 4, 7) || isWin(0, 3, 6) || isWin(0, 4, 8) || isWin(2, 4, 6)
  )
}

const isDraw = () => {
  return (!isWinAny() && isTakenAll())
}

const outcome = (x, y, z) => { // eslint-disable-line
  if (isWinAny()) {
    console.log('win')
  } else if (isDraw()) {
    console.log('draw')
  } else {}
}

// if (
//   ttt[0]
// ) {
//   console.log('win')
// } else if ()
