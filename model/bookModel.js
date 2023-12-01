const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  author: {
    type: String,
  },
  date_published: {
    type: Date,
  },
});

const Book = mongoose.model('Books', bookSchema);

module.exports = Book;
