import Trade from './trade.model';
import BookInfo from '../book-info/book-info.model';

function listRequests({ requester }) {
  return Trade
    .find({ requester })
    .populate('book')
    .exec()
    .then(trades => {
      return BookInfo.populate(trades, { path: 'book.info' });
    });
}

export default listRequests;

