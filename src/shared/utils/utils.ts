const shortenTitle = (text) => {
  return text.split(' ').slice(0, 3).join(' ');
};

const shortenDesc = (text) => {
  return text.split(' ').slice(0, 10).join(' ');
};

export { shortenTitle, shortenDesc };
