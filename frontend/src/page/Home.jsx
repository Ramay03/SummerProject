import React from "react";
import { useSelector } from "react-redux";
import HomeCard from "../component/HomeCard";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const productCart = productData.slice();
  console.log(productCart);
  return (
    <div className="p-2 md:p-4 bg-slate-200 ">
      <div className="flex flex-wrap gap-5 items-center justify-center">
        {productCart[0] &&
          productCart.map((item) => {
            return (
              <HomeCard
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                mrp={item.mrp}
                offer={item.offer}
                image={item.image}
                category={item.category}
                stock={item.stock}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
