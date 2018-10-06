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
    const records = [
      {
        type: 'widgets',
        id: '1',
      },
    ];
    api.get.mockResolvedValue({
      data: {
        data: records,
      },
    });

    const result = resource.all();

    expect(api.get).toHaveBeenCalledWith('/widgets');
    return expect(result).resolves.toEqual(records);
  });

  it('can find one record', () => {
    const record = {
      type: 'widgets',
      id: '1',
    };
    api.get.mockResolvedValue({
      data: {
        data: record,
      },
    });

    const result = resource.find(1);

    expect(api.get).toHaveBeenCalledWith('/widgets/1');
    return expect(result).resolves.toEqual(record);
  });

  it('can create a record', () => {
    const record = {
      type: 'widgets',
      id: '1',
    };

    const result = resource.create(record);

    expect(api.post).toHaveBeenCalledWith(
      '/widgets',
      { data: record },
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
      '/widgets/1',
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

    expect(api.delete).toHaveBeenCalledWith('/widgets/1');
    return result; // confirm it resolves
  });
});
