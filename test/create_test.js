const assert = require('assert');
const User = require('../src/user'); // represents User model

describe('Creating records', () => {
  // 3 steps...
  it('saves a user', (done) => {
    // 1. create an instance of user
    const joe = new User({ name: 'Joe' });
    // 2. save instance to db
    joe.save().then(() => {
      // 3. verify operation (has joe been saved?)
      assert(!joe.isNew);
      done();
    });
  });
});
