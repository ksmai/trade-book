import Trade from './trade.model';

function withdrawTrade({ tradeID, requester }) {
  return Trade.remove({ requester, _id: tradeID, isCompleted: false });
}

export default withdrawTrade;

