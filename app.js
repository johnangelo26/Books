const express = require('express');
const morgan = require('morgan');
const connectDb = require('./server');

const bookRouter = require('./route/bookRouter');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/book', bookRouter);

connectDb()
  .then(() => {
    console.log('DB connection Succesful');
    app.listen(3000, () => {
      console.log('Server Running at Port 3000..');
    });
  })
  .catch((err) => console.log(err));
