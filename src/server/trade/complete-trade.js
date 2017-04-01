import Trade from './trade.model';

function completeTrade({ requester, tradeID }) {
  const query = {
    requester,
    _id: tradeID,
    isAccepted: true,
    isRejected: false,
    isCompleted: false,
  };

  const updates = { $set: { isCompleted: true } };

  const options = {
    new: true,
    upsert: false,
    runValidators: true,
  };

  return Trade.findOneAndUpdate(query, updates, options)
    .then(trade => {
      if (!trade) {
        throw new Error(`Trade "${tradeID}" not found`);
      }

      return trade;
    });
}

export default completeTrade;

