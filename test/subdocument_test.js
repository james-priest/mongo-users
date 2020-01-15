const assert = require('assert');
const User = require('../src/user');

describe('Sub-documents', () => {
  it('can create a sub-document', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'PostTitle' }]
    });

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
  });

  it('Can add a sub-document to an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: []
    });

    joe
      .save()
      .then(User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'New Post' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  it('can delete an existing sub-document', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Title' }]
    });

    joe
      .save()
      .then(User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts[0].remove(); // mongoose shorthand
        return user.save();
      })
      .then(User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
