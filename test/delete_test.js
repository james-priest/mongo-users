const assert = require('assert');
const User = require('../src/user');

// We have 4 different ways to remove (delete)
// Model Class: remove, findOneAndRemove, findByIdAndRemove
// Model Instance: remove

describe('Deleting a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });

  it('model instance remove', (done) => {
    // sequential then-ing to remove and test
    joe
      .remove()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      })
      .catch((err) => console.log(err));
  });

  it('class method deleteMany', (done) => {
    // Remove a bunch of records with some given criteria
    User.deleteMany({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      })
      .catch((err) => console.log(err));
  });

  it('class method findOneAndRemove', (done) => {
    // Remove by a specific criteria
    User.findOneAndRemove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      })
      .catch((err) => console.log(err));
  });

  it('class method findByIdAndRemove', (done) => {
    // Remove by _id
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      })
      .catch((err) => console.log(err));
  });
});
