# Reading Data

## all

To retrieve all of the records for a resource, call the `all()` method. The method returns a promise that will resolve to the records:

```javascript
resource.all().then(widgets => console.log(widgets));
```

## find

To retrieve a single record by ID, call the `find()` method:

```javascript
resource.find({ id: 42 }).then(widget => console.log(widget));
```

## where

To filter/query for records based on certain criteria, use the `where` method, passing it an object of filter keys and values to send to the server:

```javascript
const filter = {
  category: 'whizbang',
};
resource.where({ filter }).then(widgets => console.log(widgets));
```

## related

Finally, to load records related via JSON:API relationships, use the `related` method. A nested resource URL is constructed like `categories/27/widgets`. (In the future we will look into using HATEOAS to let the server tell us the relationship URL).

```javascript
const parent = {
  type: 'category',
  id: 27,
};

resource.related({ parent }).then(widgets => console.log(widgets));
```

By default, the name of the relationship on `parent` is assumed to be the same as the name of the other model: in this case, `widgets`. In cases where the names are not the same, you can explicitly pass the relationship name:

```javascript
const parent = {
  type: 'categories',
  id: 27,
};

const relationship = 'purchased-widgets';

resource
  .related({ parent, relationship })
  .then(widgets => console.log(widgets));
```

## Options

All read methods take an optional `options` property, consisting of an object of additional options to pass. Each key/value pair in the object is translated into a query string parameter key/value pair:

```js
resource.all({
  options: {
    include: 'comments',
  },
});

// requests to widgets?include=comments
```
