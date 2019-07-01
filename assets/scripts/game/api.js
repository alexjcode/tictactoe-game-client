'use strict'

const config = require('../config.js')
const store = require('../store.js')

const newGame = () => {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// const indexGame = () => {
//   return $.ajax({
//     url: config.apiUrl + '/games',
//     method: 'GET',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     }
//   })
// }

// const showGame = (data) => {
//   return $.ajax({
//     url: config.apiUrl + '/games/' + store.game.id,
//     method: 'GET',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     }
//   })
// }

const newMove = (data) => {
  // console.log('store.game', store.game)
  // console.log('data.game', data.game)
  const storeCells = store.game.cells
  console.log('storecells: ', storeCells)
  const dataIndex = data.game.cell.index
  console.log('index', dataIndex)
  console.log('if api', data)
  console.log('else api', data)
  return $.ajax({
    url: config.apiUrl + '/games/' + store.game.id,
    data: data,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  newGame,
  // indexGame,
  // showGame,
  newMove
}
