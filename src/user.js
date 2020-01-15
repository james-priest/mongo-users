// Mongoose is a wrapper around the mongo database that makes
//   configuring and working with the db easier
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

// User Model represents all of the data in a single collection.
// When we create a User Model, mongoose will automatically
//   create a collection of users in the database as well.

// Schema is just a small portion of a User Model. It is the part
//   that describes the field names and types
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    }
  },
  posts: [PostSchema],
  likes: Number
});

// Virtual properties are defined separately on the UserSchema
UserSchema.virtual('postCount').get(function() {
  // must use function keyword for `this` to refer to user model
  return this.posts.length;
});

// user is created if it doesn't already exist and UserSchema
//   defines the schema that the data must follow
const User = mongoose.model('user', UserSchema);

module.exports = User;
