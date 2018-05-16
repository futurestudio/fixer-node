# Changelog

## [Unreleased]

### Changed
- tba.


## [2.0.0](https://github.com/fs-opensource/fixer-node/compare/v1.0.0...v2.0.0) - 2018-05-16
The breaking change from `1.0` to `2.0` is that all methods accept an object as parameter
instead of individual parameters. This allows you to pass the parameters of interest.

**Example:**

```js
// request latest rates for a given base rate

// before:
// the first param is "symbols", but we don't necessarily want to specify it
const latest = fixer.latest(undefined, 'USD')

// now:
// add "symbols: 'EUR, AUD'" if you wish, but not necessary
const latest = fixer.latest({ base: 'USD' })
```


### Added
- `2.0.0` release 🚀 🎉
- `.between()` and `.historical()` methods to access historic rates (`.between()` and `.historial()` are aliased and run the same functionality)
- `.fromTo()` and `.convert()` methods to convert between rates (`.fromTo()` and `.convert()` are aliased and run the same functionality)
- `.timeseries()` method to access exchange rates for a time range
- `.fluctuation()` method to access exchange rate changes for a selected time range
- code snippets for new methods in Readme
- all methods accept an `options` object
- tests for new methods

### Updated
- code examples in Readme for existing methods from `1.0`


## [1.0.0](https://github.com/fs-opensource/fixer-node/compare/v0.1.0...v1.0.0) - 2018-05-10

### Added
- `1.0.0` release 🚀 🎉
- access currency symbols
- access rates for custom base currency
- access latest exchange rates
- access exchange rates for historic dates


## 0.1.0 - 2018-05-04

### Added
- early testing release
- access currency symbols
- access rates for custom base currency
- access latest exchange rates
