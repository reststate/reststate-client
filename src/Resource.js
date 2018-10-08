function filterQueryString(obj) {
  return Object.keys(obj)
    .map(k => `filter[${k}]=${encodeURIComponent(obj[k])}`)
    .join('&');
}

const getOptionsQuery = (optionsObject = {}) => (
  optionsObject.include ? `include=${optionsObject.include}` : ''
);

const relatedResourceUrl = ({ parent, relationship }) => (
  `${parent.type}/${parent.id}/${relationship}`
);

const extractData = response => response.data;

class Resource {
  constructor({ name, httpClient }) {
    this.name = name;
    this.api = httpClient;
  }

  all({ options } = {}) {
    const url = `${this.name}?${getOptionsQuery(options)}`;

    return this.api.get(url)
      .then(extractData);
  }

  find(id, { options } = {}) {
    const url = `${this.name}/${id}?${getOptionsQuery(options)}`;

    return this.api.get(url)
      .then(extractData);
  }

  where(criteria, { options } = {}) {
    const queryString = filterQueryString(criteria);
    return this.api
      .get(`${this.name}?${queryString}&${getOptionsQuery(options)}`)
      .then(extractData);
  }

  related({ parent, relationship = this.name, options }) {
    const baseUrl = relatedResourceUrl({ parent, relationship });
    const url = `${baseUrl}?${getOptionsQuery(options)}`;
    return this.api.get(url)
      .then(extractData);
  }

  create(partialRecord) {
    const record = Object.assign({},
      partialRecord,
      { type: this.name },
    );
    const requestData = { data: record };
    return this.api
      .post(`${this.name}`, requestData)
      .then(extractData);
  }

  update(record) {
    // http://jsonapi.org/faq/#wheres-put
    const requestData = { data: record };
    return this.api
      .patch(`${this.name}/${record.id}`, requestData)
      .then(extractData);
  }

  delete(record) {
    return this.api
      .delete(`${this.name}/${record.id}`);
  }
}

module.exports = Resource;
