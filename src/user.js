// Mongoose is a wrapper around the mongo database that makes
//   configuring and working with the db easier
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Model represents all of the data in a single collection.
// When we create a User Model, mongoose will automatically
//   create a collection of users in the database as well.

// Schema is just a small portion of a User Model. It is the part
//   that describes the field names and types
const UserSchema = new Schema({
  name: String
});

// user is created if it doesn't already exist and UserSchema
//   defines the schema that the data must follow
const User = mongoose.model('user', UserSchema);

module.exports = User;