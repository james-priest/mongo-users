const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: String,
  // createdDate: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

const Comment = new mongoose.model('comment', CommentSchema);

module.exports = Comment;
