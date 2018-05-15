'use strict'

const Lab = require('lab')
const Code = require('code')
const Nock = require('nock')
const Fixer = require('../lib/index')

const { describe, it } = (exports.lab = Lab.script())

describe('fixer.io:', () => {
  it('fails to initialize the library without access token', async () => {
    const fn = () => new Fixer()
    Code.expect(fn).to.throw(Error)
  })

  it('fails to initialize the library with an empty access token', async () => {
    const fn = () => new Fixer()
    Code.expect(fn).to.throw(Error)
  })

  it('initializes the library with a valid access token', async () => {
    const fn = () => new Fixer('access_token')
    Code.expect(fn).to.not.throw()
  })

  it('uses http as baseUrl by default', async () => {
    const fixer = new Fixer('access_token')

    Code.expect(fixer.axios).to.exist()
    Code.expect(fixer.axios.defaults.baseURL)
      .to.include('http')
      .and.to.not.include('https')
  })

  it('uses the https option to set the baseUrl to https', async () => {
    const fixer = new Fixer('access_token', { https: true })

    Code.expect(fixer.axios).to.exist()
    Code.expect(fixer.axios.defaults.baseURL).to.include('https')
  })

  it('fetches a list of currency symbols', async () => {
    const fixer = new Fixer('access_token')

    const nock = Nock(fixer.axios.defaults.baseURL)
      .get('/symbols?access_key=access_token')
      .reply(200, { success: true, symbols: { EUR: 'Euro' } })

    const symbols = await fixer.symbols()

    Code.expect(symbols).to.exist()
    Code.expect(symbols.success).to.equal(true)
    Code.expect(symbols.symbols).to.exist()

    nock.done()
  })

  it('fetches exchange rates for a base currency', async () => {
    const fixer = new Fixer('access_token')

    const nock = Nock(fixer.axios.defaults.baseURL)
      .get('/latest?base=EUR&access_key=access_token')
      .reply(200, { success: true, base: 'EUR', rates: { USD: 1.23456 } })

    const base = await fixer.base({ base: 'EUR' })

    Code.expect(base).to.exist()
    Code.expect(base.success).to.equal(true)
    Code.expect(base.rates).to.exist()

    nock.done()
  })

  it('fetches the latest exchange rates', async () => {
    const fixer = new Fixer('access_token')

    const nock = Nock(fixer.axios.defaults.baseURL)
      .get('/latest?access_key=access_token')
      .reply(200, { success: true, base: 'EUR', rates: { USD: 1.23456 } })

    const latest = await fixer.latest()

    Code.expect(latest).to.exist()
    Code.expect(latest.success).to.equal(true)
    Code.expect(latest.rates).to.exist()

    nock.done()
  })

  it('fetches the latest exchange rates for symbols as string', async () => {
    const fixer = new Fixer('access_token')

    const nock = Nock(fixer.axios.defaults.baseURL)
      .get(`/latest?symbols=${encodeURIComponent('USD,AUD')}&access_key=access_token`)
      .reply(200, { success: true, base: 'EUR', rates: { USD: 1.23456, AUD: 9.87654 } })

    const asString = await fixer.latest({ symbols: 'USD,AUD' })

    Code.expect(asString).to.exist()
    Code.expect(asString.success).to.equal(true)
    Code.expect(asString.rates).to.exist()
    Code.expect(asString.rates['USD']).to.exist()
    Code.expect(asString.rates['AUD']).to.exist()

    nock.done()
  })

  it('fetches the latest exchange rates for symbols as list', async () => {
    const fixer = new Fixer('access_token')

    const nock = Nock(fixer.axios.defaults.baseURL)
      .get(`/latest?symbols=${encodeURIComponent('USD,AUD')}&access_key=access_token`)
      .reply(200, { success: true, base: 'EUR', rates: { USD: 1.23456, AUD: 9.87654 } })

    const asList = await fixer.latest({ symbols: ['USD', 'AUD'] })

    Code.expect(asList).to.exist()
    Code.expect(asList.success).to.equal(true)
    Code.expect(asList.rates).to.exist()
    Code.expect(asList.rates['USD']).to.exist()
    Code.expect(asList.rates['AUD']).to.exist()

    nock.done()
  })

  it('fetches historic exchange rates with "forDate"', async () => {
    const fixer = new Fixer('access_token')

    const nock = Nock(fixer.axios.defaults.baseURL)
      .get('/2018-05-05?access_key=access_token')
      .reply(200, { success: true, base: 'EUR', rates: { USD: 1.23456 } })

    const response = await fixer.historical({ date: '2018-05-05' })

    Code.expect(response).to.exist()
    Code.expect(response.success).to.equal(true)
    Code.expect(response.rates).to.exist()

    nock.done()
  })

  it('converts exchange rates', async () => {
    const fixer = new Fixer('access_token')

    const nock = Nock(fixer.axios.defaults.baseURL)
      .get('/convert?amount=25&from=GBP&to=JPY&access_key=access_token')
      .reply(200, {
        success: true,
        query: { from: 'GBP', to: 'JPY', amount: 25 },
        info: { timestamp: 1519328414, rate: 148.972231 },
        historical: '',
        date: '2018-02-22',
        result: 3724.305775
      })

    const response = await fixer.fromTo({ from: 'GBP', to: 'JPY', amount: 25 })

    Code.expect(response).to.exist()
    Code.expect(response.success).to.equal(true)
    Code.expect(response.result).to.exist()

    nock.done()
  })

  it('fetches timeseries exchange rates', async () => {
    const fixer = new Fixer('access_token')

    const nock = Nock(fixer.axios.defaults.baseURL)
      .get('/timeseries?start_date=2018-05-05&end_date=2018-05-07&access_key=access_token')
      .reply(200, {
        success: true,
        timeseries: true,
        start_date: '2018-05-05',
        end_date: '2018-05-07',
        base: 'EUR',
        rates: {
          '2018-05-05': { USD: 1.322891, AUD: 1.278047, CAD: 1.302303 },
          '2018-05-06': { USD: 1.315066, AUD: 1.274202, CAD: 1.299083 },
          '2018-05-07': { USD: 1.314491, AUD: 1.280135, CAD: 1.296868 }
        }
      })

    const response = await fixer.timeseries({ start_date: '2018-05-05', end_date: '2018-05-07' })

    Code.expect(response).to.exist()
    Code.expect(response.success).to.equal(true)
    Code.expect(response.timeseries).to.equal(true)
    Code.expect(response.rates).to.exist()

    nock.done()
  })

  it('fetches fluctuation exchange rates', async () => {
    const fixer = new Fixer('access_token')

    const nock = Nock(fixer.axios.defaults.baseURL)
      .get('/fluctuation?start_date=2018-05-05&end_date=2018-05-07&access_key=access_token')
      .reply(200, {
        success: true,
        fluctuation: true,
        start_date: '2018-02-25',
        end_date: '2018-02-26',
        base: 'EUR',
        rates: {
          USD: { start_rate: 1.228952, end_rate: 1.232735, change: 0.0038, change_pct: 0.3078 },
          JPY: { start_rate: 131.587611, end_rate: 131.651142, change: 0.0635, change_pct: 0.0483 }
        }
      })

    const response = await fixer.fluctuation({ start_date: '2018-05-05', end_date: '2018-05-07' })

    Code.expect(response).to.exist()
    Code.expect(response.success).to.equal(true)
    Code.expect(response.fluctuation).to.equal(true)
    Code.expect(response.rates).to.exist()

    nock.done()
  })

  it('throws for invalid requests', async () => {
    const fixer = new Fixer('access_token')

    const nock = Nock(fixer.axios.defaults.baseURL)
      .get('/latest?access_key=access_token')
      .reply(200, { success: false, error: { code: 123, info: 'Invalid request', type: 'invalid_request_reason' } })

    try {
      const response = await fixer.latest()
      Code.expect(response).to.not.exist()
    } catch (err) {
      Code.expect(err).to.exist()
      Code.expect(err.code).to.exist()
      Code.expect(err.info).to.exist()
      Code.expect(err.type).to.exist()
    }

    nock.done()
  })

  it('throws with fallback error message', async () => {
    const fixer = new Fixer('access_token')

    const nock = Nock(fixer.axios.defaults.baseURL)
      .get('/latest?access_key=access_token')
      .reply(200, { success: false, error: { code: 987 } })

    try {
      const response = await fixer.latest()
      Code.expect(response).to.not.exist()
    } catch (err) {
      Code.expect(err).to.exist()
      Code.expect(err.message).to.exist()
    }

    nock.done()
  })
})
