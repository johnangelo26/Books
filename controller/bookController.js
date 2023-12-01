const Book = require('../model/bookModel');

exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        book: newBook,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getAllBook = async (req, res) => {
  try {
    const allBooks = await Book.find();

    res.status(200).json({
      status: 'success',
      result: allBooks.length,
      data: {
        allBooks,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        book: book,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: 'Successfully Deleted!',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getBooksPublication = async (req, res) => {
  try {
    const allBooks = await Book.find();

    console.log('All Books:', allBooks);

    if (!allBooks || allBooks.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No books found',
      });
    }

    const publicationYears = allBooks
      .filter((book) => book.date_published)
      .map((book) => new Date(book.date_published).getFullYear());

    console.log('Publication Years:', publicationYears);

    if (publicationYears.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No publication years found for the books',
      });
    }

    const totalYears = publicationYears.reduce((acc, year) => acc + year, 0);
    const averageYear = totalYears / publicationYears.length;
    console.log(averageYear);

    res.status(200).json({
      status: 'success',
      data: {
        averagePublicationYear: averageYear,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getEarliestBook = async (req, res) => {
  try {
    const allBooks = await Book.find();

    if (!allBooks || allBooks.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No books found',
      });
    }

    const earliestBook = allBooks.reduce((earliest, current) => {
      const earliestYear = earliest.date_published
        ? new Date(earliest.date_published).getFullYear()
        : Infinity;
      const currentYear = current.date_published
        ? new Date(current.date_published).getFullYear()
        : Infinity;

      return earliestYear < currentYear ? earliest : current;
    });

    res.status(200).json({
      status: 'success',
      data: {
        earliestBook,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getBookAuthor = async (req, res) => {
  try {
    const authorName = req.query.author;

    if (!authorName) {
      return res.status(400).json({
        status: 'fail',
        message: 'Author parameter is missing in the request',
      });
    }

    const booksByAuthor = await Book.find({ author: authorName });

    if (!booksByAuthor || booksByAuthor.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No books found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        booksByAuthor,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getNewestBookByname = async (req, res) => {
  try {
    const allBooks = await Book.find();

    if (!allBooks || allBooks.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No books found',
      });
    }

    const newestBook = allBooks.reduce((newest, current) => {
      const newestYear = newest.date_published
        ? new Date(newest.date_published).getFullYear()
        : -Infinity;
      const currentYear = current.date_published
        ? new Date(current.date_published).getFullYear()
        : -Infinity;

      return newestYear > currentYear ? newest : current;
    });

    if (!newestBook) {
      return res.status(404).json({
        status: 'error',
        message: 'No books found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        newestBook,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getSortedBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();

    if (!allBooks || allBooks.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No books found',
      });
    }

    const sortedBooks = allBooks.sort((a, b) => {
      const yearA = a.date_published
        ? new Date(a.date_published).getFullYear()
        : -Infinity;
      const yearB = b.date_published
        ? new Date(b.date_published).getFullYear()
        : -Infinity;

      return yearA - yearB;
    });

    res.status(200).json({
      status: 'success',
      data: {
        sortedBooks,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTotalBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();

    if (!allBooks || allBooks.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No books found',
      });
    }

    const totalBooksCount = allBooks.length;

    res.status(200).json({
      status: 'success',
      data: {
        totalBooksCount,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
