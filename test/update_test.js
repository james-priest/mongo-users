const assert = require('assert');
const User = require('../src/user');

// We have 5 different ways to update
// Model Class: update, findOneAndUpdate, findByIdAndUpdate
// Model Instance: update, 'set' and 'save'

describe('Update test', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      })
      .catch((err) => console.log(err));
  }

  it('instance type using set n save', (done) => {
    // set n save allows you to update many props before save
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  it('One model instance can update one', (done) => {
    // update one model instance
    assertName(joe.updateOne({ name: 'Alex' }), done);
  });

  it('A model class can update many', (done) => {
    assertName(User.updateMany({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('A model class can update one record', (done) => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('A model class can find a record with an Id and update', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done);
  });
});
