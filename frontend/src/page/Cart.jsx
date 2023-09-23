import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/CartProduct";
import emptyCartImage from "../assets/empty.gif";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const handlePayment = async () => {
    if (user.Mobile) {
      navigate("/address")
      // const stripePromise = await loadStripe(
      //   process.env.REACT_APP_STRIPE_PUBLIC_KEY
      // );
      // const res = await fetch(
      //   `${import.meta.env.VITE_SERVER_URL}/create-checkout-session`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "content-type": "application/json",
      //     },
      //     body: JSON.stringify(productCartItem),
      //   }
      // );
      // if (res.statusCode === 500) return;

      // const data = await res.json();
      // console.log(data);

      // toast("Redirect to payment Gateway...!");
      // stripePromise.redirectToCheckout({ sessionId: data });
    } 
    else {
      toast("You have not Login!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };
  

  return (
    <>
      <div className="">
        {productCartItem[0] ? (
          <div className="w-[90%] container pt-5 mx-auto pb-10">
            <div className="w-[100%] bg-slate-100 items-center justify-center mx-auto">
              <div className="text-lg md:text-2xl font-bold text-slate-600 text-center">
                Shopping Cart
              </div>

              <div className="mt-1">
                {/* display cart items  */}
                <div className="flex flex-wrap gap-2 items-center justify-center p-2">
                  {productCartItem.map((item) => {
                    return (
                      <CartProduct
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        image={item.image}
                        category={item.category}
                        qty={item.qty}
                        total={item.total}
                        price={item.price}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="max-w-md min-w-[400px] mt-8 text-center container mx-auto border border-black">
              <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
              <div className="flex w-full py-1 text-lg border-b m-1">
                <p>Total Qty :</p>
                <p className="ml-auto w-32 font-bold">{totalQty}</p>
              </div>
              <div className="flex w-full py-1 text-lg border-b m-1">
                <p>Total Price :</p>
                <p className="ml-auto w-32 font-bold">
                  {/* ₹ */}
                  <span className="text-red-500">Rs</span> {totalPrice}
                </p>
              </div>
              <button
                className="bg-red-500 w-full text-lg font-bold py-2 text-white"
                onClick={handlePayment}
              >
                Proceed for order
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full bg-white items-center flex-col ">
              <img src={emptyCartImage} className="w-full max-w-xs pt-16" />
              <p className="text-slate-500 text-3xl font-bold mb-2">Empty Cart</p>
              <Link
                to="/"
                className="bg-yellow-500 py-1 mt-2 mb-5 rounded hover:bg-yellow-600 "
              >
                <span className="p-2">Add Products</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
