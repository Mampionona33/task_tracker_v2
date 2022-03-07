const formatNbr = (input) => {
  return input < 10 ? `0${input}` : input;
};

const formatTimer = (input) => {
  if (input === '000') {
    return '00';
  } else {
    return input.toString().padStart(2, '0');
  }
};

export { formatNbr, formatTimer };
