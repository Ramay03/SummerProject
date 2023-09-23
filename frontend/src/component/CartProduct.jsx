import React from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteCartItem,increaseQty,decreaseQty } from "../redux/productSlice";

const CartProduct = ({ id, name, image, category, qty, total, price }) => {
    const dispatch = useDispatch()

  return (
    <div className="max-w-[35%] min-w-[400px] bg-slate-200 p-2 flex gap-4 rounded border border-slate-300">
      <div className="max-h-38 min-h-38 max-w-44 min-w-44 bg-white rounded overflow-hidden">
        <img src={image} className="h-36 w-44 object-cover" />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-600  capitalize text-lg md:text-xl">
            {name}
          </h3>
          <div className="cursor-pointer text-slate-700 hover:text-red-500" onClick={()=>dispatch(deleteCartItem(id))}>
            <AiOutlineDelete />
          </div>
        </div>
        {/* <p className=" text-slate-500  font-medium ">{category}</p> */}
        <p className=" font-bold text-base">
          <span className="text-red-500 ">Rs </span>
          <span>{price}</span>
        </p>
        <div className="flex justify-between ">
          <div className="flex gap-3 items-center">
            <button onClick={()=>dispatch(increaseQty(id))} className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1 ">
              <TbPlus />
            </button>
            <p className="font-semibold p-1">{qty}</p>
            <button
              onClick={()=>dispatch(decreaseQty(id))}
              className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1 "
            >
              <TbMinus />
            </button>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <p>Total :</p>
            {/* ₹ */}
            <p><span className="text-red-500">Rs</span>-{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;