'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')

const onNewGame = (event) => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  console.log(formData)
  api.showBook(formData.book.id)
    .then(ui.createBookSuccess)
    .catch(ui.createBookFailure)
}

const onIndexGame = (event) => {
  api.indexBooks()
    // do something on success
    .then(ui.indexBooksSuccess)
    // catch failure
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
