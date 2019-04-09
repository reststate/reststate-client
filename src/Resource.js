function filterQueryString(obj) {
  return Object.keys(obj)
    .map(k => `filter[${k}]=${encodeURIComponent(obj[k])}`)
    .join('&');
}

const getOptionsQuery = (optionsObject = {}) =>
  Object.keys(optionsObject)
    .map(k => `${k}=${encodeURIComponent(optionsObject[k])}`)
    .join('&');

const relatedResourceUrl = ({ parent, relationship }) => {
  const builtUrl = `${parent.type}/${parent.id}/${relationship}`;

  if (
    parent.relationships &&
    Object.keys(parent.relationships).includes(relationship)
  ) {
    return (
      (parent.relationships[relationship].links &&
        parent.relationships[relationship].links.related) ||
      builtUrl
    );
  }
  return builtUrl;
};

const extractData = response => response.data;

const extractErrorResponse = error => {
  if (error && error.response) {
    throw error.response;
  } else {
    throw error;
  }
};

class Resource {
  constructor({ name, httpClient }) {
    this.name = name;
    this.api = httpClient;
  }

  all({ options = {} } = {}) {
    let url;

    if (options.url) {
      ({ url } = options);
    } else {
      url = `${this.name}?${getOptionsQuery(options)}`;
    }

    return this.api
      .get(url)
      .then(extractData)
      .catch(extractErrorResponse);
  }

  find({ id, options } = {}) {
    const url = `${this.name}/${id}?${getOptionsQuery(options)}`;

    return this.api
      .get(url)
      .then(extractData)
      .catch(extractErrorResponse);
  }

  where({ filter, options } = {}) {
    const queryString = filterQueryString(filter);
    return this.api
      .get(`${this.name}?${queryString}&${getOptionsQuery(options)}`)
      .then(extractData)
      .catch(extractErrorResponse);
  }

  related({ parent, relationship = this.name, options }) {
    const baseUrl = relatedResourceUrl({ parent, relationship });
    const url = `${baseUrl}?${getOptionsQuery(options)}`;
    return this.api
      .get(url)
      .then(extractData)
      .catch(extractErrorResponse);
  }

  create(partialRecord) {
    const record = Object.assign({}, partialRecord, { type: this.name });
    const requestData = { data: record };
    return this.api
      .post(`${this.name}`, requestData)
      .then(extractData)
      .catch(extractErrorResponse);
  }

  update(record) {
    // http://jsonapi.org/faq/#wheres-put
    const requestData = { data: record };
    return this.api
      .patch(`${this.name}/${record.id}`, requestData)
      .then(extractData)
      .catch(extractErrorResponse);
  }

  delete({ id }) {
    return this.api.delete(`${this.name}/${id}`).catch(extractErrorResponse);
  }
}

module.exports = Resource;
