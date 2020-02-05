const Tonic = require('@optoolco/tonic')
const mode = require('../mode')

class TonicForm extends Tonic {
  static isNumber (s) {
    return !isNaN(Number(s))
  }

  static getPropertyValue (o = {}, path = '') {
    const parts = path.split('.')
    let value = o

    for (const p of parts) {
      if (!value) return null
      value = value[p]
    }

    return value
  }

  static setPropertyValue (o = {}, path = '', v) {
    const parts = path.split('.')
    let value = o

    const last = parts.pop()
    if (!last) return

    for (let i = 0; i < parts.length; i++) {
      const p = parts[i]
      const next = parts[i + 1] || last

      if (!value[p]) {
        value[p] = TonicForm.isNumber(next) ? [] : {}
      }

      value = value[p]
    }

    value[last] = v
    return o
  }

  setData (data) {
    this.value = data
  }

  getData () {
    return this.value
  }

  getElements () {
    return [...this.querySelectorAll('[data-key]')]
  }

  get value () {
    const elements = this.getElements()
    const data = {}

    for (const element of elements) {
      TonicForm.setPropertyValue(data, element.dataset.key, element.value)
    }

    return data
  }

  set value (data) {
    if (typeof data !== 'object') return

    const elements = this.getElements()

    for (const element of elements) {
      const value = TonicForm.getPropertyValue(data, element.dataset.key)
      if (!value) continue

      element.value = value
    }
  }

  render () {
    return this.html`
      ${this.childNodes}
    `
  }
}

module.exports = { TonicForm }