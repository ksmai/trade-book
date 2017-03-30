import BookInfo from './book-info.model';

function listBooks({ skip = 0, limit = 10 } = {}) {
  return BookInfo
    .find({})
    .sort({ title: 1 })
    .skip(skip)
    .limit(limit)
    .exec();
}

export default listBooks;

