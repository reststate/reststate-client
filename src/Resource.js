class Resource {
  constructor({ name, api }) {
    this.name = name;
    this.api = api;
  }

  all() {
    return this.api
      .get(`/${this.name}`)
      .then(response => response.data.data);
  }

  find(id) {
    return this.api
      .get(`/${this.name}/${id}`)
      .then(response => response.data.data);
  }

  create(record) {
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
