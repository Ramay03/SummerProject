import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Animation.css";

const MyOrder = () => {
  const [isLoading, setIsLoading] = useState(true); // Loading indicator
  const [myOrders, setMyOrders] = useState(); // Loading indicator
  const [selectedRowId, setSelectedRowId] = useState(null);

  // const [count, setCount] = useState(0);
  const userData = useSelector((state) => state.user);
  console.log(userData);
  const disPatch = useDispatch();
  // const productData = useSelector((state) => state.product);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/order/${userData._id}`
      );
      const resData = await res.json();
      setMyOrders(resData);
      setIsLoading(false);
    })();
  }, []);
  console.log(myOrders);

  const handleOnDetails = (id) => {
    if (id == selectedRowId) setSelectedRowId(null);
    else setSelectedRowId(id);
  };

  const StatusDetails = {
    OrderId: "",
    NewStatus: "",
  };
  const handleStatusOnWay = async (value) => {
    console.log(selectedRowId, value);
    StatusDetails.OrderId = selectedRowId;
    StatusDetails.NewStatus = value;
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/status-change`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(StatusDetails),
      }
    );
    if (res.statusCode === 500) return;
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className="pt-10">
            <svg
              aria-hidden="true"
              className="w-8 h-8 m-auto text-gray-200 animate-spin dark:text-gray-300 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </>
      ) : (
        <div className="text-center pb-10">
          <div className="text-center w-full">
            {myOrders.length == 0 ? (
              <div>No Orders </div>
            ) : (
              <div className="pt-8 text-[20px] ">My orders</div>
            )}
            {myOrders.map((item) => {
              return (
                <>
                  <div className="gap-2 bg-white w-[80%] m-auto min-w-[440px] mt-5 flex rounded-md hover:shadow-lg">
                    {selectedRowId != item._id ? (
                      <button
                        onClick={() => handleOnDetails(item._id)}
                        className="w-full min-w-[440px] h-32 rounded-md border border-blue-300"
                      >
                        <div className="h-full w-full bg-white-100 hover:bg-white-500 m-auto flex items-center ">
                          <div className="justify-center items-center text-xs m-auto">
                            <img
                              src={item.Items[0].image}
                              className="min-h-24 max-h-28 min-w-[100px]"
                            ></img>{" "}
                            + {item.Items.length - 1} more items
                          </div>
                          <div className="min-w-[60px] m-auto">
                            Rs-{item.Amount}
                          </div>
                          <div className="min-w-[100px] m-auto">
                            {item.Status}
                            {/* on {item.OrderTime.substring(0, 10)} */}
                          </div>
                        </div>
                      </button>
                    ) : (
                      <>
                        <div className="w-full rounded-md border border-slate-500">
                          <button
                            onClick={() => handleOnDetails(item._id)}
                            className=""
                          >
                            <div className="">Close</div>
                          </button>

                          {/* <div className="animated-line">
                            <div className="color-transition"></div>
                          </div> */}

                          {item.Status != "cancelled" ? (
                            <div className="m-auto ">
                            <div className="flex w-[80%] m-auto">
                              <div className="w-[20%] m-auto">
                                Order Confirmed
                              </div>
                              <div className="w-[20%] m-auto">Shipped</div>
                              <div className="w-[20%] m-auto">
                                Out for Delivery
                              </div>
                              <div className="w-[20%] m-auto">Delivered</div>
                            </div>
                            

                            <div className="flex items-center justify-center w-[60%] m-auto mt-1">
                              <div className="flex items-center justify-center w-2 h-2 bg-green-300 rounded-full"></div>
                              {/* <div className="circle"></div> */}
                              <div className="animated-line">
                              {item.ShipTime == "" && <div className="shipped"></div> }
                              </div>
                              <div className="flex items-center justify-center w-2 h-2 bg-green-300 rounded-full"></div>
                              
                              <div className="animated-line">
                              {item.OnWayTime == "" && <div className="onway"></div> }
                              </div>
                              <div className="flex items-center justify-center w-2 h-2 bg-green-300 rounded-full"></div>
                              
                              <div className="animated-line">
                              {item.FinalTime == "" && <div className="delivered"></div> }
                              </div>
                              <div className="flex items-center justify-center w-2 h-2 bg-green-300 rounded-full"></div>
                              
                            </div>

                            <div className="flex w-[80%] m-auto text-sm mt-1">
                              <div className="w-[25%]">
                                {item.OrderTime.substring(0, 10)}
                              </div>
                              <div className="w-[25%]">
                                {item.ShipTime.substring(0, 10)}
                              </div>
                              <div className="w-[25%]">
                                {item.OnWayTime.substring(0, 10)}
                              </div>
                              <div className="w-[25%]">
                                {item.FinalTime.substring(0, 10)}
                              </div>
                            </div>
                          </div>
                          ) : (
                            <div className="m-auto ">
                              <div className="flex w-[80%] m-auto">
                                <div className="w-[40%] m-auto">
                                  Order Confirmed
                                </div>
                              
                                <div className="w-[40%] m-auto">Cancelled</div>
                              </div>

                              <div className="flex items-center justify-center w-[40%] m-auto mt-1">
                                <div className="flex items-center justify-center w-2 h-2 bg-green-300 rounded-full"></div>
                                <div className="animated-line">
                                  <div className="cancelled"></div>
                                </div>
                                <div className="flex items-center justify-center w-2 h-2 bg-red-700 rounded-full"></div>
                              </div>

                              <div className="flex w-[80%] m-auto text-sm mt-1">
                                <div className="w-[40%] m-auto">
                                  {item.OrderTime.substring(0, 10)}
                                </div>
                                <div className="w-[40%] m-auto">
                                  {item.OrderTime.substring(0, 10)}
                                </div>
                      
                              </div>
                            </div>
                          )}

                          <div className="mt-2">
                            {/* <div className="">{item.Status}</div> */}
                            {/* <div className="">{item.OrderTime}</div> */}
                          </div>
                          <div className="mt-4">
                            Total Amount : Rs {item.Amount}
                          </div>
                          <div>
                            {item.FinalTime != "" ? (
                              <></>
                            ) : (
                              <button
                                onClick={() => handleStatusOnWay("cancelled")}
                                className="bg-red-300 px-2 py-1 rounded"
                              >
                                Cancel this order
                              </button>
                            )}
                          </div>
                          <div className="bg-slate-100 m-auto m-2">
                            <div className="m-2 flex gap-2 justify-center p-3 overflow-scroll scrollbar-none scroll-smooth transition-all">
                              {/* <div className=" items-center pr-4"> Items</div> */}
                              {item.Items.map((product) => {
                                return (
                                  <>
                                    <div className="w-full min-w-[200px] max-w-[200px] sm:min-w-[200px] sm:max-w-[200px] md:min-w-[200px] lg:min-w-[250px] md:max-w-[200px] lg:max-w-[250px] bg-white hover:shadow-lg drop-shadow-lg px-1">
                                      <div className="h-48 flex flex-col justify-center items-center">
                                        <img
                                          src={product.image}
                                          className="h-full"
                                        ></img>
                                      </div>
                                      <h3 className="text-center text-sm min-h-20">
                                        {product.name}
                                      </h3>
                                      <p className="text-center m-auto text-sm">
                                        <span className="text-sm">Rs-</span>
                                        <span className="text-lg font-bold">
                                          {" "}
                                          {product.price}
                                        </span>
                                        <span className="">
                                          /{product.quantity}
                                        </span>
                                        <span className="ml-6">
                                          MRP: {product.mrp}
                                        </span>
                                      </p>
                                      <p className="text-center m-auto text-sm">
                                        <span className="">
                                          Quantity : {product.qty}
                                        </span>
                                        <span className="ml-10 ">
                                          Total : Rs{product.total}
                                        </span>
                                      </p>
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default MyOrder;
