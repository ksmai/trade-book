import bodyParser from 'body-parser';
import express from 'express';
import supertest from 'supertest';

import tradeRouter from '../trade.route';
import * as initTrade from '../init-trade';
import * as approveTrade from '../approve-trade';
import * as completeTrade from '../complete-trade';
import * as withdrawTrade from '../withdraw-trade';
import * as listRequests from '../list-requests';
import * as listPending from '../list-pending';

describe('Trade routes', () => {
  let request;
  const userID = '123awev';
  const tradeID = 'avaverbeb';
  const val = 'awvawev awev';
  const ret = Promise.resolve(val);
  const bookID = 'somebooks';
  const comment = 'somecomments';

  beforeAll(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use((req, res, next) => {
      req.user = { _id: userID };
      next();
    });
    app.use(tradeRouter);
    /* next is required for defining express error handler */
    /* eslint-disable-next-line no-unused-vars */
    app.use((err, req, res, next) => res.sendStatus(400));
    request = supertest(app);
  });

  it('init a trade', done => {
    spyOn(initTrade, 'default').and.returnValue(ret);

    return request
      .post('/trade')
      .send({ bookID, comment })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(initTrade.default).toHaveBeenCalledWith({
          comment,
          book: bookID,
          requester: userID,
        });
        expect(res.body).toEqual({ trade: val });
      })
      .then(done, done.fail);
  });

  it('accept a trade', done => {
    spyOn(approveTrade, 'default').and.returnValue(ret);

    return request
      .put('/trade')
      .send({ tradeID, action: 'accept' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(approveTrade.default).toHaveBeenCalledWith({
          tradeID,
          user: userID,
          approval: true,
        });
        expect(res.body).toEqual({ trade: val });
      })
      .then(done, done.fail);
  });

  it('reject a trade', done => {
    spyOn(approveTrade, 'default').and.returnValue(ret);

    return request
      .put('/trade')
      .send({ tradeID, action: 'reject' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(approveTrade.default).toHaveBeenCalledWith({
          tradeID,
          user: userID,
          approval: false,
        });
        expect(res.body).toEqual({ trade: val });
      })
      .then(done, done.fail);
  });

  it('complete a trade', done => {
    spyOn(completeTrade, 'default').and.returnValue(ret);

    return request
      .put('/trade')
      .send({ tradeID, action: 'complete' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(completeTrade.default).toHaveBeenCalledWith({
          tradeID,
          requester: userID,
        });
        expect(res.body).toEqual({ trade: val });
      })
      .then(done, done.fail);
  });

  it('reject unknown action on trade', done => {
    return request
      .put('/trade')
      .send({ tradeID, action: 'somethingunknowntotheserver' })
      .expect(400)
      .then(done, done.fail);
  });

  it('withdraw a trade', done => {
    spyOn(withdrawTrade, 'default').and.returnValue(ret);

    return request
      .delete('/trade')
      .send({ tradeID })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(withdrawTrade.default).toHaveBeenCalledWith({
          tradeID,
          requester: userID,
        });
        expect(res.body).toEqual({ tradeID });
      })
      .then(done, done.fail);
  });

  it('list initiated requests', done => {
    spyOn(listRequests, 'default').and.returnValue(ret);

    return request
      .get('/trade')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(listRequests.default).toHaveBeenCalledWith({
          requester: userID,
        });
        expect(res.body).toEqual({ trades: val });
      })
      .then(done, done.fail);
  });

  it('list pending requests', done => {
    spyOn(listPending, 'default').and.returnValue(ret);

    return request
      .get('/trade?pending')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(listPending.default).toHaveBeenCalledWith({
          user: userID,
        });
        expect(res.body).toEqual({ trades: val });
      })
      .then(done, done.fail);
  });
});

