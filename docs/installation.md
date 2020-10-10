# Installation

```sh
$ npm install --save @reststate/client
```

`@reststate/client` needs to be configured with an `httpClient` object that handles the requests and responses. The easiest way to do this is to provide an `axios` instance configured with your server's base URL, the standard JSON:API content type, and optionally any authentication info your server requires.

```js
import axios from 'axios';
import { ResourceClient } from '@reststate/client';

const token = ...;

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
