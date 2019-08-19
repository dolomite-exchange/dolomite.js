# Dolomite JS

Javascript library for interacting with the Dolomite Exchange API and Slate API

## Install

```shell
npm install dolomite --save
```

## Getting Started

```javascript
// import packages
import exchange from 'dolomite/exchange';
import slate from 'dolomite/slate';

// configure them with your API keys
exchange.configure({ apiKey: 'EXCHANGE_API_KEY' });
slate.configure({ apiKey: 'SLATE_API_KEY' });

// make requests to the API
exchange.markets.getAll().then(markets => console.log(markets));
slate.wallets.getHoldings('0x0000000000000000000000000000000000000000')
  .then(holdings => console.log(holdings));
```

## Development

Clone the repository and install `npm`, then install the dependencies

```shell
npm install
```

Start the `Development Server` which will automatically build your code for ES5 compliance and put it into the `lib_dev` directory

```shell
npm start
```

Run tests. Running `npm start` in a separate tab along with the tests is highly reccomended as this allows for live reloading

```shell
npm test
```

**NOTE:** if `npm start` or `npm test` are giving you trouble, you may have to globally install gulp with `npm install -g gulp` 

Read more about developing services for the Dolomite Exchange Service in our [Development Docs](docs/DEVDOC.md)

## Release

Increment the `version` in `package.json` and then run

```shell
npm run release
```

This will place the updated ES5 compliant code into the `lib` directory, which is the directory used by npm
