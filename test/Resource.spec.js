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

    it('rejects upon error', () => {
      const error = { dummy: 'data' };
      api.get.mockRejectedValue(error);

      const result = resource.all();

      expect(result).rejects.toEqual(error);
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

    it('rejects upon error', () => {
      const error = { dummy: 'data' };
      api.get.mockRejectedValue(error);

      const result = resource.find({ id: 1 });

      expect(result).rejects.toEqual(error);
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

    it('rejects upon error', () => {
      const error = { dummy: 'data' };
      api.get.mockRejectedValue(error);

      const result = resource.where({ filter });

      expect(result).rejects.toEqual(error);
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

    it('rejects upon error', () => {
      const error = { dummy: 'data' };
      api.get.mockRejectedValue(error);

      const result = resource.related({ parent });

      expect(result).rejects.toEqual(error);
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

      expect(api.post).toHaveBeenCalledWith('widgets', expectedRequestBody);
      return expect(result).resolves.toEqual(responseBody);
    });

    it('rejects upon error', () => {
      const error = { dummy: 'data' };
      api.post.mockRejectedValue(error);

      const result = resource.create(record);

      return expect(result).rejects.toEqual(error);
    });
  });

  describe('update', () => {
    it('can update a record', () => {
      const responseBody = { data: record };
      api.patch.mockResolvedValue({ data: responseBody });

      const result = resource.update(record);

      expect(api.patch).toHaveBeenCalledWith('widgets/1', { data: record });
      return expect(result).resolves.toEqual(responseBody);
    });

    it('rejects upon error', () => {
      const error = { dummy: 'data' };
      api.patch.mockRejectedValue(error);

      const result = resource.update(record);

      return expect(result).rejects.toEqual(error);
    });
  });

  describe('delete', () => {
    it('can delete a record', () => {
      const result = resource.delete(record);

      expect(api.delete).toHaveBeenCalledWith('widgets/1');
      return result; // confirm it resolves
    });

    it('rejects upon error', () => {
      const error = { dummy: 'data' };
      api.delete.mockRejectedValue(error);

      const result = resource.delete(record);

      return expect(result).rejects.toEqual(error);
    });
  });
});
