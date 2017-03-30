import Book from './book.model';
import findBookInfo from '../book-info/find-book-info';

function showOwners({ volumeID }) {
  return findBookInfo({ volumeID })
    .then(info => {
      return Book
        .find({ info: info._id })
        .populate('user', { hash: 0 })
        .exec() 
    });
}

export default showOwners;

