import { Mockgoose } from 'mockgoose';
import mongoose from 'mongoose';

import Trade from '../trade.model';
import completeTrade from '../complete-trade';
import { testTrade } from '../../test-util';

describe('Complete trade controller', () => {
  beforeAll(done => {
    mongoose.Promise = Promise;

    return (new Mockgoose(mongoose))
      .prepareStorage()
      .then(() => mongoose.connect(''))
      .then(done, done.fail);
  }, 120000);

  beforeEach(done => {
    const adaptedTrade = {
      ...testTrade,
      isAccepted: true,
    };

    return Trade.remove({})
      .then(() => Trade.create(adaptedTrade))
      .then(done, done.fail);
  });

  afterAll(done => {
    return mongoose
      .disconnect()
      .then(done, done.fail);
  });

  it('complete a trade', done => {
    const { requester, _id: tradeID } = testTrade;

    return completeTrade({ requester, tradeID })
      .then(done, done.fail);
  });

  it('cannot complete the same trade twice', done => {
    const { requester, _id: tradeID } = testTrade;

    return completeTrade({ requester, tradeID })
      .then(() => completeTrade({ requester, tradeID }), done.fail)
      .then(done.fail, done);
  });
});

