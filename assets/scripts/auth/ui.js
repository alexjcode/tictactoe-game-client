'use strict'

const store = require('../store.js')
// const win = require('../game/win')
// const events = require('./events')

const successMessage = message => {
  $('#message').text(message)
  $('#message').removeClass('failure')
  $('#message').addClass('success')
  $('form').trigger('reset')
}

const failMessage = message => {
  $('#message').text(message)
  $('#message').removeClass('success')
  $('#message').addClass('failure')
  $('form').trigger('reset')
}

const signUpSuccessful = responseData => {
  successMessage('You signed up successfully!')
  // $('#sign-up').hide()
}

const signUpFailure = () => {
  failMessage('Sign up failure')
}

const signInSuccessful = responseData => {
  // store user token
  store.user = responseData.user
  store.xWins = 0
  store.oWins = 0
  store.draws = 0
  store.totalGames = 0
  successMessage(`You signed in successfully!`)
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#sign-out').show()
  $('#change-password').show()
  $('#new-game').show()
  $('#load-game').show()
  $('#index-game').show()
}

const signInFailure = () => {
  failMessage('Sign in failure')
}

const changePasswordSuccessful = responseData => {
  successMessage('Password changed successfully!')
}

const changePasswordFailure = () => {
  failMessage('Password change failure')
}

const signOutSuccessful = () => {
  store.xWins = 0
  store.oWins = 0
  store.draws = 0
  store.totalGames = 0
  $('#scorekeeper').text('')
  $('#scorekeeper2').text('')
  successMessage('Signed out successfully!')
  $('#sign-up').show()
  $('#sign-in').show()
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#tt-board').hide()
  $('#current-turn').hide()
  $('#new-game').hide()
  $('#load-game').hide()
  $('#tt-divider').hide()
  $('#index-game').hide()
}

const signOutFailure = () => {
  failMessage('Sign out failure')
}

module.exports = {
  signUpSuccessful,
  signUpFailure,
  signInSuccessful,
  signInFailure,
  changePasswordSuccessful,
  changePasswordFailure,
  signOutSuccessful,
  signOutFailure,
  failMessage,
  successMessage
}
