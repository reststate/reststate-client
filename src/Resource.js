function filterQueryString(obj) {
  return Object.keys(obj)
    .map(k => `filter[${k}]=${encodeURIComponent(obj[k])}`)
    .join('&');
}

const getOptionsQuery = (optionsObject = {}) => (
  optionsObject.include ? `include=${optionsObject.include}` : ''
);

class Resource {
  constructor({ name, api }) {
    this.name = name;
    this.api = api;
  }

  all({ options } = {}) {
    const url = `/${this.name}?${getOptionsQuery(options)}`;

    return this.api.get(url)
      .then(response => response.data);
  }

  find(id, { options } = {}) {
    const url = `/${this.name}/${id}?${getOptionsQuery(options)}`;

    return this.api.get(url)
      .then(response => response.data);
  }

  where(criteria, { options } = {}) {
    const queryString = filterQueryString(criteria);
    return this.api
      .get(`/${this.name}?${queryString}&${getOptionsQuery(options)}`)
      .then(response => response.data);
  }

  create(partialRecord) {
    const record = Object.assign({},
      partialRecord,
      { type: this.name },
    );
    const requestData = { data: record };
    return this.api
      .post(`/${this.name}`, requestData);
  }

  update(record) {
    const requestData = { data: record };
    return this.api
      .patch(`/${this.name}/${record.id}`, requestData);
  }

  delete(record) {
    return this.api
      .delete(`/${this.name}/${record.id}`);
  }
}

module.exports = Resource;
