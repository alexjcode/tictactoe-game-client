'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')

const onNewGame = () => {
  event.preventDefault()
  // console.log('')
  api.newGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
}

const onIndexGame = (event) => {
  api.indexBooks()
    .then(ui.indexBooksSuccess)
    .catch(ui.indexBooksFailure)
}

const onShowGame = (event) => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  console.log(formData)
  api.showBook(formData.book.id)
    .then(ui.showBookSuccess)
    .catch(ui.showBookFailure)
}

const onNewMove = (event) => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  console.log(formData)
  api.updateBook(formData, formData.book.id)
    .then(ui.updateBookSuccess)
    .catch(ui.updateBookFailure)
}

module.exports = {
  onNewGame,
  onIndexGame,
  onShowGame,
  onNewMove
}
