import { React, useRef } from "react";
import { useSelector } from "react-redux";
import HomeCard from "../component/HomeCard";
import CategoryCard from "../component/CategoryCard";
import { GrNext, GrPrevious } from "react-icons/gr";
import CategoryWise from "../component/CategoryWise";

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

  return (
    <div className="p-2 md:p-4 bg-slate-200 ">
      <div className="flex flex-wrap gap-5 items-center justify-center">
        {productData[0] &&
          productData.map((item) => {
            return (
              <HomeCard
                id={item._id}
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

      <div className="">
        {Object.keys(DataByCategory).map((category) => (
          <div className="mt-4">
            <CategoryWise
              categoryProduct = {DataByCategory[category]}
              category = {category}
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default Home;


