export default class Resource {
  constructor({ name, api }) {
    this.name = name;
    this.api = api;
  }

  all() {
    return this.api
      .get(`/${this.name}`)
      .then(response => response.data.data);
  }
}
