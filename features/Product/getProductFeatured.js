import getAllProduct from "./getAllProduct";

export default getProductFeatures = async ()  => {
    const products = await getAllProduct();

    const sortedProducts1 =products.sort((a,b) => b.star - a.star);
    const sortedProducts2 = sortedProducts1.sort((a,b) => b.number - a.number);
    const topProducts = sortedProducts2.slice(0, 5);
    return topProducts;
} 