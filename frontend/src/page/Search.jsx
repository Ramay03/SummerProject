import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import "./Search.css";
import { useSelector } from "react-redux";
import HomeCard from "../component/HomeCard";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Home from "./Home";

const Search = () => {
  const navigate = useNavigate();
  const productData = useSelector((state) => state.product.productList);

  const [keyword, setKeyword] = useState("");
  const [matchedElements, setMatchedElements] = useState(productData);

  const handleSearchSubmit = (e) => {
    const lowercaseKeyword = keyword.toLowerCase();
    const matchingList = productData.filter(
      (item) =>
        item.name.toLowerCase().includes(lowercaseKeyword) ||
        item.category.toLowerCase().includes(lowercaseKeyword) ||
        item.offer.toLowerCase().includes(lowercaseKeyword) ||
        item.searchword.toLowerCase().includes(lowercaseKeyword) 
    );
    setMatchedElements(matchingList);

    navigate("", {
      state: {
        dataKey: matchingList,
      },
    });
    console.log(matchingList);
  };

  return (
    <div className="h-screen bg-slate-200">
      <div className="search-header ">
        <div className="search-bar">
          <input
            className="search-input"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search"
          ></input>

          <button onClick={handleSearchSubmit} className="search-btn">
            <div className="icon">
              <HiOutlineSearch />
            </div>
          </button>
        </div>
      </div>

      <div className="mt-1 p-2 md:p-4 bg-slate-200">
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {matchedElements &&
            matchedElements.map((item) => {
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
      </div>
    </div>
  );
};

export default Search;
