import Resource from '../src/Resource';

describe('Resource', () => {
  const name = 'widgets';
  let api;
  let resource;

  beforeEach(() => {
    api = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    };
    resource = new Resource({ httpClient: api, name });
  });

  it('can retrieve all records', () => {
    const expectedResult = {
      data: [
        {
          type: 'widgets',
          id: '1',
        },
      ],
    };
    api.get.mockResolvedValue({ data: expectedResult });

    const result = resource.all();

    expect(api.get).toHaveBeenCalledWith('widgets?');
    return expect(result).resolves.toEqual(expectedResult);
  });

  it('can retrieve related records', () => {
    const expectedResult = {
      data: [
        {
          type: 'widgets',
          id: '1',
        },
      ],
    };
    api.get.mockResolvedValue({ data: expectedResult });

    const result = resource.all({
      options: {
        include: 'comments',
      },
    });

    expect(api.get).toHaveBeenCalledWith('widgets?include=comments');
    return expect(result).resolves.toEqual(expectedResult);
  });

  it('can find one record', () => {
    const expectedResponse = {
      data: {
        type: 'widgets',
        id: '1',
      },
    };
    api.get.mockResolvedValue({ data: expectedResponse });

    const result = resource.find(1);

    expect(api.get).toHaveBeenCalledWith('widgets/1?');
    return expect(result).resolves.toEqual(expectedResponse);
  });

  it('can find records by criteria', () => {
    const expectedResponse = {
      data: [
        {
          type: 'widgets',
          id: '1',
        },
      ],
    };
    const filter = {
      status: 'draft',
    };

    api.get.mockResolvedValue({ data: expectedResponse });

    const result = resource.where(filter);

    expect(api.get).toHaveBeenCalledWith('widgets?filter[status]=draft&');
    return expect(result).resolves.toEqual(expectedResponse);
  });

  it('can find related records', () => {
    const expectedResponse = {
      data: [
        {
          type: 'widgets',
          id: '1',
        },
      ],
    };
    const filter = {
      status: 'draft',
    };

    api.get.mockResolvedValue({ data: expectedResponse });

    const parent = {
      type: 'users',
      id: '1',
    };

    const result = resource.related({ parent });

    expect(api.get).toHaveBeenCalledWith('users/1/widgets?');
    return expect(result).resolves.toEqual(expectedResponse);
  });

  it('can find related records with a different relationship name', () => {
    const expectedResponse = {
      data: [
        {
          type: 'widgets',
          id: '1',
        },
      ],
    };
    const filter = {
      status: 'draft',
    };

    api.get.mockResolvedValue({ data: expectedResponse });

    const parent = {
      type: 'users',
      id: '1',
    };

    const relationship = 'purchased-widgets';

    const result = resource.related({ parent, relationship });

    expect(api.get).toHaveBeenCalledWith('users/1/purchased-widgets?');
    return expect(result).resolves.toEqual(expectedResponse);
  });

  it('can create a record', () => {
    const record = {
      attributes: {
        name: 'Foo',
      },
    };

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

  it('can update a record', () => {
    const record = {
      type: 'widgets',
      id: '1',
    };
    const responseBody = { data: record };
    api.patch.mockResolvedValue({ data: responseBody });

    const result = resource.update(record);

    expect(api.patch).toHaveBeenCalledWith(
      'widgets/1',
      { data: record },
    );
    return expect(result).resolves.toEqual(responseBody);
  });

  it('can delete a record', () => {
    const record = {
      type: 'widgets',
      id: '1',
    };

    const result = resource.delete(record);

    expect(api.delete).toHaveBeenCalledWith('widgets/1');
    return result; // confirm it resolves
  });
});
