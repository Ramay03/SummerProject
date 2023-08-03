import React, { useState } from "react";
import { useSelector } from "react-redux";
import HomeCard from "../component/HomeCard";
import CategoryWise from "../component/CategoryWise";
import CategoryCard from "../component/CategoryCard";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const DataByCategory = {};

  // Loop through the data array and group items based on the "category" property
  productData.forEach((item) => {
    if (!DataByCategory[item.category]) {
      DataByCategory[item.category] = [];
    }
    DataByCategory[item.category].push(item);
  });

  const keyWord = "best";
  const bestSeller = productData.filter((item) =>
    item.searchword.toLowerCase().includes(keyWord)
  );

  return (
    <>
      <div className="p-2 md:p-4 bg-slate-200">

        <div className="">
          <CategoryWise categoryProduct={bestSeller} category={"Best Seller"} />
        </div>

        <div className="">
          {Object.keys(DataByCategory).map((category) => (
            <div className="mt-4">
              <CategoryWise
                categoryProduct={DataByCategory[category]}
                category={category}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
