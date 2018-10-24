# @reststate/client

A lightweight client for making requests to a JSON API service.

- It doesn't attempt to provide a way to utilize every possible feature of JSON API; instead, it offers a core set of functionality sufficient for most apps.
- It doesn't attempt to abstract away the JSON API object format; instead, it returns JSON API data as-is.

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

## License

Apache-2.0
