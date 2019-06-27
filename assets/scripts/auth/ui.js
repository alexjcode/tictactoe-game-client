'use strict'

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

const store = require('../store.js')

const signUpSuccessful = responseData => {
  successMessage('You signed up successfully!')
  $('#sign-up').hide()
}

const signUpFailure = () => {
  failMessage('Sign up failure')
}

const signInSuccessful = responseData => {
  console.log('responseData is', responseData)
  successMessage('You signed in successfully!')
  // store user token
  store.user = responseData.user
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#sign-out').show()
  $('#change-password').show()
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
  successMessage('Signed out successfully!')
  $('#sign-up').show()
  $('#sign-in').show()
  $('#change-password').hide()
  $('#sign-out').hide()
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
  signOutFailure
}
