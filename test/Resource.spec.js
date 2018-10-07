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
    resource = new Resource({ api, name });
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

    const result = resource.create(record);

    expect(api.post).toHaveBeenCalledWith(
      'widgets',
      expectedRequestBody,
    );
    return result; // confirm it resolves
  });

  it('can update a record', () => {
    const record = {
      type: 'widgets',
      id: '1',
    };

    const result = resource.update(record);

    expect(api.patch).toHaveBeenCalledWith(
      'widgets/1',
      { data: record },
    );
    return result; // confirm it resolves
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
