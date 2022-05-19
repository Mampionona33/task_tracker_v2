let prompedMsg = '';
const setMessage = (_, { message }) => {
  prompedMsg = message;
  return prompedMsg;
};

const getMessage = () => prompedMsg;
module.exports = { setMessage, getMessage };
