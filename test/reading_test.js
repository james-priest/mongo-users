const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe;

  // insert User record with name of joe for testing purposes
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });

  it('finds all users with a name of Joe', (done) => {
    User.find({ name: 'Joe' }).then((users) => {
      // Must call toString() bcz _id is ObjectId("5e1df729b....")
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });

  it('find a user with a particular id', (done) => {
    User.findOne({ _id: joe._id }).then((user) => {
      assert(user.name === 'Joe');
      done();
    });
  });
});
