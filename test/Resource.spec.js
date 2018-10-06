import Resource from '../src/Resource';

describe('Resource', () => {
  const name = 'widgets';
  let api;
  let resource;

  beforeEach(() => {
    api = {
      get: jest.fn(),
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
});
