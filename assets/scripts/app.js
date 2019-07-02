'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const authEvents = require('./auth/events')
const gameEvents = require('./game/events')
const multiClick = 'ontouchstart' in window ? 'touchstart' : 'click'

$(() => {
  $('#tt-board').hide()
  $('#tt-divider').hide()
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#current-turn').hide()
  $('#new-game').hide()
  $('#load-game').hide()
})

$(() => {
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-out').on('submit', authEvents.onSignOut)
  $('#new-game').on('submit', gameEvents.onNewGame)
  $(`div[data-cell-index]`).on(multiClick, gameEvents.onNewMove)
  $('#load-game').on('submit', gameEvents.onLoadGame)
  // $('#index-game').on('submit', gameEvents.onIndexGame)
})
