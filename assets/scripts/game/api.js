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
    method: 'GET'
  })
}

const showGame = (id) => {
  return $.ajax({
    url: config.apiUrl + '/books/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const newMove = (formData) => {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    data: formData,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// const updateBook = (data) => {
//   return $.ajax({
//     url: config.apiUrl + '/books/' + data.book.id,
//     method: 'PATCH',
//     data
//   })
// }

module.exports = {
  newGame,
  indexGame,
  showGame,
  newMove
}
