import Resource from '../src/Resource';

describe('Resource', () => {
  const name = 'widgets';
  let api;
  let resource;

  const record = {
    type: 'widgets',
    id: '1',
  };
  const records = [record];
  const optionsWithInclude = {
    include: 'comments',
  };

  beforeEach(() => {
    api = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    };
    resource = new Resource({ httpClient: api, name });
  });

  describe('all', () => {
    it('can retrieve all records', () => {
      const expectedResult = { data: records };
      api.get.mockResolvedValue({ data: expectedResult });

      const result = resource.all();

      expect(api.get).toHaveBeenCalledWith('widgets?');
      return expect(result).resolves.toEqual(expectedResult);
    });

    it('can request included records', () => {
      const expectedResult = { data: records };
      api.get.mockResolvedValue({ data: expectedResult });

      const result = resource.all({ options: optionsWithInclude });

      expect(api.get).toHaveBeenCalledWith('widgets?include=comments');
    });
  });

  describe('find', () => {
    it('can find one record', () => {
      const expectedResponse = { data: record };
      api.get.mockResolvedValue({ data: expectedResponse });

      const result = resource.find({ id: 1 });

      expect(api.get).toHaveBeenCalledWith('widgets/1?');
      return expect(result).resolves.toEqual(expectedResponse);
    });

    it('can request included records', () => {
      const expectedResponse = { data: record };
      api.get.mockResolvedValue({ data: expectedResponse });

      const result = resource.find({ id: 1, options: optionsWithInclude });

      expect(api.get).toHaveBeenCalledWith('widgets/1?include=comments');
    });
  });

  describe('where', () => {
    const filter = {
      status: 'draft',
    };

    it('can find records by criteria', () => {
      const expectedResponse = { data: records };
      api.get.mockResolvedValue({ data: expectedResponse });

      const result = resource.where({ filter });

      expect(api.get).toHaveBeenCalledWith('widgets?filter[status]=draft&');
      return expect(result).resolves.toEqual(expectedResponse);
    });

    it('can request included records', () => {
      const expectedResponse = { data: records };
      api.get.mockResolvedValue({ data: expectedResponse });

      const result = resource.where({ filter, options: optionsWithInclude });

      expect(api.get).toHaveBeenCalledWith(
        'widgets?filter[status]=draft&include=comments',
      );
    });
  });

  describe('related', () => {
    const parent = {
      type: 'users',
      id: '1',
    };

    it('can find related records', () => {
      const expectedResponse = { data: records };
      api.get.mockResolvedValue({ data: expectedResponse });

      const result = resource.related({ parent });

      expect(api.get).toHaveBeenCalledWith('users/1/widgets?');
      return expect(result).resolves.toEqual(expectedResponse);
    });

    it('can find related records with a different relationship name', () => {
      const expectedResponse = { data: records };
      api.get.mockResolvedValue({ data: expectedResponse });

      const relationship = 'purchased-widgets';
      const result = resource.related({ parent, relationship });

      expect(api.get).toHaveBeenCalledWith('users/1/purchased-widgets?');
      return expect(result).resolves.toEqual(expectedResponse);
    });

    it('can request included records', () => {
      const expectedResponse = { data: records };
      api.get.mockResolvedValue({ data: expectedResponse });

      const result = resource.related({ parent, options: optionsWithInclude });

      expect(api.get).toHaveBeenCalledWith('users/1/widgets?include=comments');
    });
  });

  describe('create', () => {
    it('can create a record', () => {
      const expectedRequestBody = {
        data: {
          type: 'widgets',
          ...record,
        },
      };

      const responseBody = { data: record };
      api.post.mockResolvedValue({ data: responseBody });

      const result = resource.create(record);

      expect(api.post).toHaveBeenCalledWith(
        'widgets',
        expectedRequestBody,
      );
      return expect(result).resolves.toEqual(responseBody);
    });

    it('rejects with creation errors', () => {
      const responseBody = {
        errors: [
          {
            title: "can't be blank",
            detail: "title - can't be blank",
            code: '100',
            source: {
              pointer: '/data/attributes/title',
            },
            status: '422',
          },
        ],
      };
      api.post.mockRejectedValue({ data: responseBody });

      const result = resource.create(record);

      return expect(result).rejects.toEqual(responseBody);
    });
  });

  describe('update', () => {
    it('can update a record', () => {
      const responseBody = { data: record };
      api.patch.mockResolvedValue({ data: responseBody });

      const result = resource.update(record);

      expect(api.patch).toHaveBeenCalledWith(
        'widgets/1',
        { data: record },
      );
      return expect(result).resolves.toEqual(responseBody);
    });

    it('rejects with update errors', () => {
      const responseBody = {
        errors: [
          {
            title: "can't be blank",
            detail: "title - can't be blank",
            code: '100',
            source: {
              pointer: '/data/attributes/title',
            },
            status: '422',
          },
        ],
      };
      api.patch.mockRejectedValue({ data: responseBody });

      const result = resource.update(record);

      return expect(result).rejects.toEqual(responseBody);
    });
  });

  it('can delete a record', () => {
    const result = resource.delete(record);

    expect(api.delete).toHaveBeenCalledWith('widgets/1');
    return result; // confirm it resolves
  });
});
