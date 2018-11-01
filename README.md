# @reststate/client

[![CircleCI](https://circleci.com/gh/reststate/reststate-client.svg?style=svg)](https://circleci.com/gh/reststate/reststate-client)

A lightweight client for making requests to a JSON:API service.

- It doesn't attempt to provide a way to utilize every possible feature of JSON:API; instead, it offers a core set of functionality sufficient for most apps.
- It doesn't attempt to abstract away the JSON:API object format; instead, it returns JSON:API data as-is.

`@reststate/client` provides a simple Promise-based API suitable for just about any JavaScript application. It doesn't handle persistence, though; for that, wrappers are available for a variety of popular state stores:

- [Vuex](https://github.com/CodingItWrong/vuex-jsonapi)
- [MobX](https://github.com/CodingItWrong/mobx-jsonapi)
- Coming soon: Redux

## Synopsis

```javascript
const resource = new Resource({
  name: 'widgets',
  httpClient: axios.create(...),
});

resource.loadAll()
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

## Usage

`@reststate/client` needs to be configured with an `httpClient` object that handles the requests and responses. The easiest way to do this is to provide an `axios` instance configured with your server's base URL, the standard JSON:API content type, and optionally any authentication info your server requires.

```js
import axios from 'axios';
import { Resource } from '@reststate/client';

const token = ...;

const httpClient = axios.create({
  baseUrl: 'https://sandboxapi.codingitwrong.com',
  headers: {
    'Content-Type': 'application/vnd+api.json',
    'Authentication': `Bearer ${token}`,
  },
});
const client = new Resource({ name: 'widgets', httpClient });

client.all().then(results => console.log(results));
```

## Methods

### Reading

`all({ options? }?)`

`find(id, { options? }?)`

`where(criteria, { options? }?)`

`related({ parent, relationship?, options? })`

Loads data of *this* resource type, related to the `parent`. For example, if you want to find a user's widgets:

```js
const parent = { type: 'users', id: 1 };
const widgetResource = new Resource({ name = 'widgets', ... });

widgetResource.related({ parent }); // Requests to users/1/widgets
```

The relationship name by default is the name of this resource. To override this, pass a `relationship` property:

```js
const parent = { type: 'users', id: 1 };

widgetResource.related({ parent, relationship: 'purchased-widgets' });
// Requests to users/1/purchased-widgets
```

#### Options

All read methods take an optional `options` property, consisting of an object of additional options to pass.

Currently the only option supported is `include`. This specifies which relationships to include in the returned values:

```js
widgetResource.all({
  options: {
    include: 'comments',
  },
});

// requests to widgets?include=comments
```

Future support for sort and pagination options is planned.

### Writing

`create()`

Creates a new record. The object passed in should follow the JSON:API object format, but the `type` can be omitted:

```js
widgetResource.create({
  attributes: {
    'name': 'My Widget',
    'creation-date': '2018-10-07',
  },
});
```

This isn't just limited to `attributes`; `relationships` can be passed in too.

`update()`

Updates a record. The record with updated data can be passed in; the URL the request is made to comes from the ID of that record. The `type` argument is ignored, so it can be omitted if you're constructing the argument object by hand:

```js
widgetResource.update({
  id: '42',
  attributes: {
    name: 'My Updated Widget',
  },
});
```

This isn't just limited to `attributes`; `relationships` can be passed in too.

`delete({ id })`

Deletes the passed-in record. Only the `id` property is used, so you can pass either a full record or just the ID:

```js
widgetResource.delete({ id: 42 });
```

## License

Apache-2.0
