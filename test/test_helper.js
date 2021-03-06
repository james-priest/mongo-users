const mongoose = require('mongoose');

// executed only one time for all test suite
before((done) => {
  mongoose.connect('mongodb://localhost/users_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  mongoose.connection
    .once('open', () => {
      done();
    })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

// Mocha hook function executed before each test
beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  // Direct reference to collection of users in the database
  // This is an async operation so we call done when complete
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        // Call done to signal next test
        done();
      });
    });
  });
});
