import getProduct from "../Product/getProduct";

export default getProductCheckOut = async (data) => {
  const products = await Promise.all(data.map(async (item) => {
    const result = await getProduct(item.idProduct);
    return { ...result, quantity: item.quantity };
  }));
  return products;
};
