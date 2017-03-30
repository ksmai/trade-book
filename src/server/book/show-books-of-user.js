import Book from './book.model';

function showBooksOfUser({ user }) {
  return Book
    .find({ user })
    .populate('info')
    .exec();
}

export default showBooksOfUser;

