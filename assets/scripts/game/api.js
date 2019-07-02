'use strict'

const config = require('../config.js')
const store = require('../store.js')

const indexGame = () => {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const newGame = () => {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const loadGame = (data) => {
  // console.log(data)
  return $.ajax({
    url: config.apiUrl + '/games/' + data.games.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const newMove = (data) => {
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
  indexGame,
  loadGame,
  newMove
}
