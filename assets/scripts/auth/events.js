'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')

const onCreateExample = (event) => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.createExample(formData)
    .then(ui.createExampleSuccessful)
    .catch(ui.createExampleFailure)
}

module.exports = {
  onCreateExample
}
