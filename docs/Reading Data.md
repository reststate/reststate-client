# Reading Data

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

## Options

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
