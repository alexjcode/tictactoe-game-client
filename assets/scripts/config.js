'use strict'

// AUTH /////////////////////////////////

// let authApiUrl
// const authApiUrls = {
//   production: 'https://wdi-library-api.herokuapp.com',
//   development: 'https://wdi-library-api.herokuapp.com'
//   // development: 'http://localhost:4741'
// }
//
// if (window.location.hostname === 'localhost') {
//   authApiUrl = authApiUrls.development
// } else {
//   authApiUrl = authApiUrls.production
// }

// GAME /////////////////////////////////

let gameApiUrl
const gameApiUrls = {
  development: 'https://tic-tac-toe-wdi.herokuapp.com/',
  production: 'https://tic-tac-toe-wdi-production.herokuapp.com'
  // development: 'http://localhost:4741'
}

if (window.location.hostname === 'localhost') {
  gameApiUrl = gameApiUrls.development
} else {
  gameApiUrl = gameApiUrls.production
}

// EXPORTS //////////////////////////////

module.exports = {
  // authApiUrl,
  gameApiUrl
}
