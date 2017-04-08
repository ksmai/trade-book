import Book from './book.model';

function showOwner({ bookID }) {
  return Book
    .findById(bookID)
    .populate('user', { hash: 0 })
    .exec()
    .then(book => {
      if (!book) {
        throw new Error(`Book "${bookID}" not found.`);
      }

      return book;
    });
}

export default showOwner;

