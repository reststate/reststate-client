# @reststate/client

**This package is no longer maintained.**

A lightweight client for making requests to a JSON:API service.

- It doesn't attempt to provide a way to utilize every possible feature of JSON:API; instead, it offers a core set of functionality sufficient for most apps.
- It doesn't attempt to abstract away the JSON:API object format; instead, it returns JSON:API data as-is.

`@reststate/client` provides a simple Promise-based API suitable for just about any JavaScript application. It doesn't handle persistence, though; for that, wrappers are available for a variety of popular state stores:

- [Vuex](https://github.com/CodingItWrong/vuex-jsonapi)
- [MobX](https://github.com/CodingItWrong/mobx-jsonapi)
- Coming soon: Redux

## Synopsis

```javascript
const resource = new ResourceClient({
  name: 'widgets',
  httpClient: axios.create(...),
});

resource.all()
  .then(widgets => widgets);

resource.create({
  attributes: {
    title: 'My Widget',
  },
});
```

## Installation

```sh
$ npm install --save @reststate/client
```

`@reststate/client` needs to be configured with an `httpClient` object that handles the requests and responses. The easiest way to do this is to provide an `axios` instance configured with your server's base URL, the standard JSON:API content type, and optionally any authentication info your server requires.

```js
import axios from 'axios';
import { ResourceClient } from '@reststate/client';

const token = "FILL_ME";

const httpClient = axios.create({
  baseURL: 'https://jsonapi-sandbox.herokuapp.com',
  headers: {
    'Content-Type': 'application/vnd.api+json',
    'Authentication': `Bearer ${token}`,
  },
});
const client = new ResourceClient({ name: 'widgets', httpClient });

client.all().then(results => console.log(results));
```

## Usage

For more information on usage, see the [`@reststate/client` docs](https://client.reststate.codingitwrong.com).

## License

Apache-2.0
