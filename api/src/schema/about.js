let abooutMessage = 'Task tracker v0.2';

function setMessage(_, { message }) {
  abooutMessage = message;
  console.log(message)
  return abooutMessage;
}

function getMessage() {
  return abooutMessage;
}

module.exports = { getMessage, setMessage };
