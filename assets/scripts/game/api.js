'use strict'

const config = require('../config.js') // eslint-disable-line
const store = require('../store.js') // eslint-disable-line

const newGame = () => {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const indexGame = () => {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const showGame = (formData) => {
  return $.ajax({
    url: config.apiUrl + '/games/' + store.game.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const newMove = (formData, gameID) => {
  return $.ajax({
    url: config.apiUrl + '/games/' + gameID,
    data: formData,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  newGame,
  indexGame,
  showGame,
  newMove
}
