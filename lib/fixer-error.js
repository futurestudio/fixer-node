'use strict'

class FixerError extends Error {
  constructor(err) {
    super(err.info || 'Request failed')

    this.info = err.info
    this.code = err.code
    this.type = err.type
  }
}

module.exports = FixerError
