import Book from './book.model';
import findBookInfo from '../book-info/find-book-info';

function addBook({ volumeID, user }) {
  return findBookInfo({ volumeID })
    .then(info => {
      const query = { user, info: info._id };
      const options = {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        runValidators: true,
      };

      return Book.findOneAndUpdate(query, query, options);
    });
}

export default addBook;

