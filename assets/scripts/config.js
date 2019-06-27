'use strict'

let apiUrl
const apiUrls = {
  development: 'https://tic-tac-toe-wdi.herokuapp.com/',
  production: 'https://tic-tac-toe-wdi-production.herokuapp.com'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

// EXPORTS //////////////////////////////

module.exports = {
  apiUrl
}
