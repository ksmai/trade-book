import testUser from './test-user';
import testBook from './test-book';

const testTrade = {
  _id: '58dcf2e469a9b39b105d99c6',
  book: testBook._id,
  requester: testUser._id,
  isAccepted: false,
  isRejected: false,
  isCompleted: false,
  comment: 'Awesome deal isnt it',
};

export default testTrade;

