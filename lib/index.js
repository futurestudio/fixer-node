'use strict'

const _ = require('lodash')
const Axios = require('axios')
const Qs = require('querystring')
const FixerError = require('./fixer-error')

class Fixer {
  constructor (accessKey, options = {}) {
    if (_.isEmpty(accessKey)) {
      throw new Error('Access key required. Provide an access key on initialization: "new Fixer(access_key)"')
    }

    this.accessKey = accessKey

    const { https } = options
    const base = 'data.fixer.io/api/'

    this.axios = Axios.create({
      baseURL: https ? `https://${base}` : `http://${base}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  async symbols () {
    const query = this.prepareQueryParams({})
    const url = `symbols?${query}`

    return this.request(url)
  }

  async base (options) {
    return this.latest(options)
  }

  async latest (options = {}) {
    const { symbols, base } = options
    const query = this.prepareQueryParams({ symbols, base })
    const url = `latest?${query}`

    return this.request(url)
  }

  async forDate ({ date, symbols, base }) {
    const query = this.prepareQueryParams({ symbols, base })
    const url = `${date}?${query}`

    return this.request(url)
  }

  async historical (options) {
    return this.forDate(options)
  }

  async convert ({ amount, from, to, date }) {
    const query = this.prepareQueryParams({ amount, from, to, date })
    const url = `convert?${query}`

    return this.request(url)
  }

  async fromTo (options = {}) {
    return this.convert(options)
  }

  /* eslint-disable-next-line */
  async between ({ start_date, end_date, base, symbols }) {
    const query = this.prepareQueryParams({ start_date, end_date, symbols, base })
    const url = `timeseries?${query}`

    return this.request(url)
  }

  async timeseries (options) {
    return this.between(options)
  }

  /* eslint-disable-next-line */
  async fluctuation ({ start_date, end_date, base, symbols }) {
    const query = this.prepareQueryParams({ start_date, end_date, symbols, base })
    const url = `fluctuation?${query}`

    return this.request(url)
  }

  async request (url) {
    const response = await this.axios.get(url)

    if (response.data.success) {
      return response.data
    }

    throw new FixerError(response.data.error)
  }

  prepareQueryParams (options = {}) {
    const { symbols } = options
    const queryParams = Object.assign({}, options, {
      access_key: this.accessKey,
      symbols: this.prepareCurrencySymbols(symbols)
    })

    // remove undefined/null parameters
    const query = _.pickBy(queryParams)

    return Qs.stringify(query)
  }

  prepareCurrencySymbols (symbols) {
    return Array.isArray(symbols) ? symbols.join(',') : symbols
  }
}

module.exports = Fixer
