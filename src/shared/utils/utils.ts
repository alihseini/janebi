const shortenTitle = (text:string) => {
  return text.split(' ').slice(0, 3).join(' ');
};

export { shortenTitle};
