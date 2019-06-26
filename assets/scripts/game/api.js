'use strict'

const config = require('../config.js') // eslint-disable-line
const store = require('../store.js') // eslint-disable-line

const newGame = formData => {
  return $.ajax({
    url: config.authApiUrl + '/sign-up',
    data: formData,
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const thisMove = formData => {
  return $.ajax({
    url: config.authApiUrl + '/change-password',
    data: formData,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// const signIn = formData => {
//   return $.ajax({
//     url: config.authApiUrl + '/sign-in',
//     data: formData,
//     method: 'POST'
//   })
// }

// const changePassword = formData => {
//   return $.ajax({
//     url: config.authApiUrl + '/change-password',
//     data: formData,
//     method: 'PATCH',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     }
//   })
// }

// const signOut = () => {
//   return $.ajax({
//     url: config.authApiUrl + '/sign-out',
//     method: 'DELETE',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     }
//   })
// }

module.exports = {
  newGame,
  thisMove
}
