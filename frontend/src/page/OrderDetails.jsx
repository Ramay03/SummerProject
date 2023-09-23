import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const address = location.state;

  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const OrderDetails = {
    UserId: user._id,
    Amount: totalPrice,
    Quantity: totalQty,
    Payment: "Cash on delivery",
    OrderTime: "",
    OnWayTime: "",
    ShipTime: "",
    FinalTime: "",
    Items: productCartItem,
    Address: address,
    Status:"",
  };

  const handleOrder = async () => {
    if (user.Mobile) {
      const now = new Date();
      OrderDetails.OrderTime = now.toLocaleString();
      OrderDetails.Status = "Ordered";
      console.log("Details", OrderDetails);
      // const stripePromise = await loadStripe(
      //   process.env.REACT_APP_STRIPE_PUBLIC_KEY
      // );

      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(OrderDetails),
        }
      );
      console.log(res)
      if (res.statusCode === 500){
        toast("Error occured");
        return;
      }
      const response = await res.json();
      toast(response.message);
      if(response.alert){
        navigate("/myorder")
      }

      // toast("Redirect to payment Gateway...!");
      // stripePromise.redirectToCheckout({ sessionId: data });
      // navigate("/userorders");
    } else {
      toast("You have not Login!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  return (
    <>
      {/* <div className="max-w-md min-w-[400px] mt-20 container mx-auto border border-black"> */}
      <div className="max-w-md min-w-100 mt-20 container mx-auto border border-black">
        <h2 className="bg-blue-500 text-white text-center p-2 text-lg">
          Order Details
        </h2>
        <div className="flex w-full py-1 text-lg border-b m-1">
          <p className="w-40">Total Qty </p> -
          <p className="ml-auto w-60 font-bold">{totalQty}</p>
        </div>
        <div className="flex w-full py-1 text-lg border-b m-1">
          <p className="w-40">Total Price </p>-
          <p className="ml-auto w-60 font-bold">
            {/* ₹ */}
            <span className="text-red-500">Rs</span> {totalPrice}
          </p>
        </div>
        <div className="flex w-full py-1 text-lg border-b m-1">
          <p className="w-40">Address Details </p>-
          <div className="ml-auto w-60">
            <div className="">
              {address.name} , Mob:{address.mobile}
            </div>
            <div>
              {address.street} , {address.city}{" "}
            </div>
            <div>
              {" "}
              {address.state}, {address.zip}
            </div>
          </div>
        </div>
        <div className="flex w-full py-1 text-lg border-b m-1">
          <p className="w-40">Payment option </p>-
          <p className="ml-auto w-60">
            <span className="">Cash on delivery</span>
          </p>
        </div>
        <button
          className="bg-red-500 w-full text-lg font-bold py-2 text-white"
          onClick={handleOrder}
        >
          Order
        </button>
      </div>
    </>
  );
};

export default Order;
