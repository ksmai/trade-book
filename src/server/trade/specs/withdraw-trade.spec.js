import { Mockgoose } from 'mockgoose';
import mongoose from 'mongoose';

import Trade from '../trade.model';
import withdrawTrade from '../withdraw-trade';
import { testTrade } from '../../test-util';

describe('Withdraw trade controller', () => {
  beforeAll(done => {
    mongoose.Promise = Promise;

    return (new Mockgoose(mongoose))
      .prepareStorage()
      .then(() => mongoose.connect(''))
      .then(done, done.fail);
  }, 120000);

  beforeEach(done => {
    return Trade.remove({})
      .then(() => Trade.create(testTrade))
      .then(done, done.fail);
  });

  afterAll(done => {
    return mongoose
      .disconnect()
      .then(done, done.fail);
  });

  it('withdraw a trade request', done => {
    const tradeID = testTrade._id;
    const requester = testTrade.requester;
    const params = { tradeID, requester };
    const query = { requester, _id: tradeID };

    return Trade
      .find(query)
      .exec()
      .then(trades => {
        expect(trades.length).toEqual(1);

        return withdrawTrade(params);
      })
      .then(() => Trade.find(query).exec())
      .then(trades => {
        expect(trades.length).toEqual(0);
      })
      .then(done, done.fail);
  });
});

