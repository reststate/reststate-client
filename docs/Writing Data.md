# Writing Data

## `create()`

Creates a new record. The object passed in should follow the JSON API object format, but the `type` can be omitted:

```js
widgetResource.create({
  attributes: {
    'name': 'My Widget',
    'creation-date': '2018-10-07',
  },
});
```

This isn't just limited to `attributes`; `relationships` can be passed in too.

## `update()`

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

## `delete({ id })`

Deletes the passed-in record. Only the `id` property is used, so you can pass either a full record or just the ID:

```js
widgetResource.delete({ id: 42 });
```
