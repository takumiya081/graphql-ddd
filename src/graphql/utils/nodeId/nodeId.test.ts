import {v4 as uuid} from 'uuid';

import {decodeNodeId, encodeNodeId} from './nodeId';

describe('nodeId', () => {
  it('should encode and decode', () => {
    expect.hasAssertions();
    const id = uuid();
    const encodedId = encodeNodeId('Owner', id);
    expect(decodeNodeId(encodedId)).toStrictEqual({
      type: 'Owner',
      id,
    });
  });

  it('should throw error when decode invalid string', () => {
    expect.hasAssertions();
    const encodedId = 'testsetsets';
    expect(() => {
      decodeNodeId(encodedId);
    }).toThrow('id is not valid value');
  });
});
