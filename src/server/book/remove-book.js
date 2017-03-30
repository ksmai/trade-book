import Book from './book.model';

function removeBook({ user, bookID }) {
  return Book.remove({ user, _id: bookID });
}

export default removeBook;

