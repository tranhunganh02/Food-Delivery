export default getPriceOrder = async (data) => {
  const total = data.reduce((acc, cur) => acc + parseFloat(cur.total), 0);

  return total;
};
