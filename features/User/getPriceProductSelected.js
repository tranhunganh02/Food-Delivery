import getProduct from "../Product/getProduct";

export default getPriceProductSelected = async (data) => {
  const products = await Promise.all(data.map(async (item) => await getProduct(item.idProduct)));
  const total = products.reduce((acc, curr, index) => acc + curr.price * data[index].quantity, 0);

  return total;
}