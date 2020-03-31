const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique Id', () => {
  it('should generate an unique Id', () => {
    const id = generateUniqueId();

    expect(id).toHaveLength(8);
  } )
} )