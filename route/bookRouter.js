const express = require('express');
const bookController = require('../controller/bookController');

const router = express.Router();

router
  .route('/')
  .get(bookController.getAllBook)
  .post(bookController.createBook);

router
  .route('/:id')
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

router.route('/publication-year').get(bookController.getBooksPublication);

router.route('/earliest-book').get(bookController.getEarliestBook);

router.route('/author').get(bookController.getBookAuthor);

router.route('/newest-by-name').get(bookController.getNewestBookByname);

router.route('/sorted').get(bookController.getSortedBooks);

router.route('/total').get(bookController.getTotalBooks);
module.exports = router;
