'use strict'

const _ = require('lodash')
const Axios = require('axios')
const Qs = require('querystring')

class Fixer {
  constructor(accessKey, options = {}) {
    if (_.isEmpty(accessKey)) {
      throw new Error('Access key required. Provide an access key on initialization: "new Fixer(access_key)"')
    }

    this.accessKey = accessKey

    const base = 'data.fixer.io/api/'
    this.axios = Axios.create({
      baseURL: options.https ? `https://${base}` : `http://${base}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  async symbols() {
    const query = this.prepareQueryParams()
    const url = `symbols?${query}`

    return this.request(url)
  }

  async base(base) {
    return this.latest(undefined, base)
  }

  async latest(symbols, base) {
    const query = this.prepareQueryParams({ symbols, base })
    const url = `latest?${query}`

    return this.request(url)
  }

  async historic(date, symbols, base) {
    const query = this.prepareQueryParams({ symbols, base })
    const url = `${date}?${query}`

    return this.request(url)
  }

  async request(url) {
    const response = await this.axios.get(url)

    if (response.data.success) {
      return response.data
    }

    throw new Error(response.data.error.info)
  }

  prepareQueryParams({ symbols, base }) {
    symbols = this.prepareCurrencySymbols(symbols)

    const options = Object.assign({}, { access_key: this.accessKey }, { symbols, base })
    // remove undefined/null parameters
    const query = _.pickBy(options)

    return Qs.stringify(query)
  }

  prepareCurrencySymbols(symbols) {
    return Array.isArray(symbols) ? symbols.join(',') : symbols
  }
}

module.exports = Fixer
