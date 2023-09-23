import React, { useRef } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import CategoryCard from "../component/CategoryCard";
import HomeCard from "./HomeCard";

const CategoryWise = ({ categoryProduct, category }) => {
  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 400;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 400;
  };

  return (
    <div>
      <div className="flex w-full items-center">
        <h2 className="font-bold text-2xl text-slate-800 mb-2"> {category} </h2>
        <div className="ml-auto flex gap-4">
          <button
            onClick={preveProduct}
            className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
          >
            <GrPrevious />
          </button>
          <button
            onClick={nextProduct}
            className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
          >
            <GrNext />
          </button>
        </div>
      </div>

      <div
        className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
        ref={slideProductRef}
      >
        {categoryProduct.map((item) => {
          return (
            <CategoryCard
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
    </div>
  );
};

export default CategoryWise;
