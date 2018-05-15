# fixer-node

A Node.js SDK to interact with the [fixer.io](https://fixer.io) API for currency conversion and exchange rates.

For release notes, see the [CHANGELOG](https://github.com/fs-opensource/fixer-node/blob/master/CHANGELOG.md).


<p align="left">
    <a href="https://travis-ci.org/fs-opensource/fixer-node"><img src="https://camo.githubusercontent.com/9f56ef242c6f588f74f39f0bd61c1acd34d853af/68747470733a2f2f7472617669732d63692e6f72672f66732d6f70656e736f757263652f686170692d67656f2d6c6f636174652e7376673f6272616e63683d6d6173746572" alt="Build Status" data-canonical-src="https://travis-ci.org/fs-opensource/fixer-node.svg?branch=master" style="max-width:100%;"></a>
    <a href="https://snyk.io/test/github/fs-opensource/fixer-node"><img src="https://snyk.io/test/github/fs-opensource/fixer-node/badge.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/fs-opensource/fixer-node" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/fixer-node"><img src="https://img.shields.io/npm/v/fixer-node.svg" alt="fixer-node Version" data-canonical-src="https://img.shields.io/npm/v/fixer-node.svg" style="max-width:100%;"></a>
</p>

------

<p align="center"><sup>The <a href="https://futurestud.io">Future Studio University</a> supports development of this Node.js library 🚀</sup>
<br><b>
Join the <a href="https://futurestud.io/university">Future Studio University and Skyrocket in Node.js</a></b>
</p>

------


## Requirements
> **Node.js v8 (or newer)**

`fixer-node` uses async/await which requires **Node.js v8 or newer**.


## Installation
Add `fixer-node` as a dependency to your project:

```bash
# NPM v5 users, this way is yours
npm i fixer-node

# you’re using NPM v4:
npm i -S fixer-node
```


## Usage
Initialize an instance of `fixer-node` and pass your fixer.io access key as an argument:

```js
const Fixer = require('fixer-node')
const fixer = new Fixer('access-key')
```


### Options
The constructor of `fixer-node` requires an access key as the first argument.

The second argument is an `options` object allowing the following properties:

- `https:` (boolean) set the fixer.io API base URL to either `https` or `http`; default: `http`

```js
const Fixer = require('fixer-node')
const fixer = new Fixer('access-key', {
  https: true
})
```

## Error Handling
`fixer-node` throws a custom error instance: [FixerError](https://github.com/fs-opensource/fixer-node/blob/master/lib/fixer-error.js).

The `FixerError` contains the fixer.io API related error properties for `info`, `code`, and `type`.
The error message is derived from the `info` property.

```js
const Fixer = require('node-fixer')
const fixer = new Fixer('api-key')

try {
  const data = fixer.base('USD')
} catch (err) {
  const info = err.info // is the same as err.message, e.g. "Your monthly API request volume has been reached. Please upgrade your plan"
  const code = err.code // is the fixer.io API code, e.g. "201" which represents "An invalid base currency has been entered."
}
```

Find more details on errors in the [fixer.io API docs](https://fixer.io/documentation#errors).


## API (aka "how to use this lib")
`fixer-node` supports all fixer.io API endpoints. Here’s an overview on how to use the methods.

### Symbols
Request a list of currency symbols.
This is a mapping between the currency shortcut (EUR) and full name (Euro).

```js
const data = await fixer.symbols()
```


### Latest
Request the latest exchange rates.

The `.latest()` method accepts two parameters:

1. `symbols`: (string) a list of symbols you want the exchange rates for (this reduces the response payload)
2. `base`: (string) the base currency

```js
// get the latest rates for all currencies
const latest = await fixer.latest()

// get the latest rates for selected currencies
const latest = await fixer.latest({ symbols: 'EUR, USD, AUD' })

// get the latest rates for selected currencies and base
const latest = await fixer.latest({ symbols: 'EUR, USD', base: 'AUD' })
```


### Base
Request exchange rates for a given base.

```js
// get all rates for a selected base
const latest = await fixer.base('AUD')
```


### Historic
Request historic exchange rates for a given day.

```js
// get exchange rates for May 9th, 2018
const latest = await fixer.forDate({ date: '2018-05-09' })

// with symbols
const latest = await fixer.forDate({ date: '2018-05-09', symbols: 'USD, EUR, AUD' })

// with symbols and base
const latest = await fixer.forDate({ date: '2018-05-09', symbols: 'EUR, AUD', base: 'USD' })
```


### Convert
Convert an amount from one currency to another.

The `.convert()` method is aliased as `fromTo()`.
Use both, `.convert()` and `.fromTo()`, for the same operation.

```js
// 25 from GBP to JPY
const convert = await fixer.convert({ from: 'GBP', to: 'JPY', amount: 25 })

// 25 from GBP to JPY on 2018-05-08
const convert = await fixer.fromTo({ from: 'GBP', to: 'JPY', amount: 25, date: '2018-05-08' })
```


### Time-Series
Historical exchange rates between two dates.

The `.timeseries()` method is aliased as `between()`.
Use both, `.timeseries()` and `.between()`, for the same operation.


```js
// start - end
const timeseries = await fixer.timeseries({ start_date: '2018-05-05', end_date: '2018-05-08' })

// start - end with base and symbols
const timeseries = await fixer.between({ start_date: '2018-05-05', end_date: '2018-05-08', symbols: 'EUR, USD', base: 'AUD' })
```


### Fluctuation
Retrieve information about how currencies fluctuate on a day-to-day basis.

```js
// start - end
const fluctuation = await fixer.fluctuation({ start_date: '2018-05-05', end_date: '2018-05-08' })

// start - end with base and symbols
const fluctuation = await fixer.fluctuation({ start_date: '2018-05-05', end_date: '2018-05-08', symbols: 'EUR, USD', base: 'AUD' })
```


## Feature Requests
Do you miss a feature? Please don’t hesitate to
[create an issue](https://github.com/fs-opensource/fixer-node/issues) with a short description of your desired addition to this plugin.


## Links & Resources

- [fixer.io](https://fixer.io): exchange rate and currency conversion


## Contributing

1.  Create a fork
2.  Create your feature branch: `git checkout -b my-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request 🚀


## License

MIT © [Future Studio](https://futurestud.io)

---

> [futurestud.io](https://futurestud.io) &nbsp;&middot;&nbsp;
> GitHub [@fs-opensource](https://github.com/fs-opensource/) &nbsp;&middot;&nbsp;
> Twitter [@futurestud_io](https://twitter.com/futurestud_io)
