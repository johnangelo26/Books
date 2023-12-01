const ServerApiVersion = require('mongodb');
const mongoose = require('mongoose');

const dbUri =
  'mongodb+srv://angelocasiano:Casiano0426@books.ldeu0up.mongodb.net/booksDB?retryWrites=true&w=majority';

module.exports = () => {
  return mongoose.connect(dbUri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
};

mongoose.connect(dbUri);
