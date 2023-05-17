export default getProductFeatures = async ( data)  => {
    const sortedProducts =data.sort((a,b) => b.star - a.star);
    const topProducts = sortedProducts.slice(0, 5);
    return topProducts;
} 