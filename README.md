# fixer-node

*This library is currently work in progress. All features work, but aren't covered with tests yet. We'll add those in the next days. Thank you!*

------

<p align="center"><sup>The <a href="https://futurestud.io">Future Studio University</a> supports development of this Node.js library 🚀</sup>
<br><b>
Join the <a href="https://futurestud.io/university">Future Studio University and Skyrocket in Node.js</a></b>
</p>

------


## Introduction
Node.js library to access the [fixer.io](https://fixer.io) API.


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
Initialize an instance of `fixer-node` and pass your fixer.io access key as an argument

```js
const Fixer = require('fixer-node')
const fixer = new Fixer('access-key')

// list of currency symbols (mapping between shortcut and full name, e.g. EUR: Euro)
const data = await fixer.symbols()
console.log(data.symbols)

// get the latest rates for all currencies
const latest = await fixer.latest()
console.log(latest.rates)
console.log(latest.rates['EUR']) // for EUR

// get the latest rates for selected currencies
const latest = await fixer.latest('EUR, USD, AUD')
console.log(latest.rates) // contains the three rates
console.log(latest.rates['EUR']) // for EUR

// get the latest rates for selected currencies and base
const latest = await fixer.latest('EUR, USD', 'AUD')
console.log(latest.rates) // contains the two rates EUR, USD for base AUD
console.log(latest.rates['EUR']) // for EUR

// get all rates for a selected base
const latest = await fixer.base('AUD')
console.log(latest.rates)
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
