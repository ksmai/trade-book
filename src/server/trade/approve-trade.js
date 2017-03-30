import Trade from './trade.model';

function approveTrade({ user, approval, tradeID }) {
  const query = {
    _id: tradeID,
    isAccepted: false,
    isRejected: false,
    isCompleted: false,
  };

  return Trade
    .findOne(query)
    .populate('book')
    .exec()
    .then(trade => {
      const found = trade && trade.book.user.toString() === user;
      if(!found) {
        throw new Error(`Trade "${tradeID}" not found`);
      }

      if(approval) {
        trade.isAccepted = true;
      } else {
        trade.isRejected = true;
      }

      return trade.save();
    })
}

export default approveTrade;

