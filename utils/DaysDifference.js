export default (from, to) => {
  const time1 = new Date(from).getTime();
  const time2 = new Date(to).getTime();

  const diffInMs = Math.abs(time2 - time1);

  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
};
