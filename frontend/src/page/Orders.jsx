import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderData } from "../redux/orderSlice";
import OrderCard from "../component/OrderCard";

export const Orders = () => {
  const [isLoading, setIsLoading] = useState(true); // Loading indicator

  // const [count, setCount] = useState(0);
  const disPatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/order`);
      const resData = await res.json();
      disPatch(setOrderData(resData));
      setIsLoading(false);
    })();
  }, []);

  // const OrderByStatus = {"all":1, "ordered":2, "onway":3, "shipped":4, "delivered":5, "cancelled":6};
  const OrderByStatus = {};

  OrderByStatus["all"] = useSelector((state) => state.order.orderList);

  OrderByStatus["all"].forEach((item) => {
    if (!OrderByStatus[item.Status]) {
      OrderByStatus[item.Status] = [];
    }
    OrderByStatus[item.Status].push(item);
  });

  console.log(OrderByStatus["all"]);

  const [status, setstatus] = useState("all"); // Loading indicator
  function handleOnChange(value) {
    setstatus(value);
  }

  const [selectedRowId, setSelectedRowId] = useState(null);

  const handleOnItems = (id) => {
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
      <div className="flex w-full mt-0.5">
        <button
          onClick={() => handleOnChange("all")}
          className="text-lg w-[25%] text-center justify-center h-10 bg-slate-300 shadow-md hover:text-[20px]"
        >
          <div className="mt-2">All Orders</div>
        </button>
        <button
          onClick={() => handleOnChange("ordered")}
          className="text-lg w-[25%] text-center justify-center h-10 bg-slate-300 shadow-md hover:text-[20px]"
        >
          <div className="mt-2">Confirmed</div>
        </button>
        {/* <button
          onClick={() => handleOnChange("shipped")}
          className="text-lg w-[25%] text-center justify-center h-10 bg-slate-300 shadow-md hover:text-[20px]"
        >
          <div className="mt-2">Shipped</div>
        </button> */}
        <button
          onClick={() => handleOnChange("onway")}
          className="text-lg w-[25%] text-center justify-center h-10 bg-slate-300 shadow-md hover:text-[20px]"
        >
          <div className="mt-2">Out For Delivery</div>
        </button>
        <button
          onClick={() => handleOnChange("delivered")}
          className="text-lg w-[25%] text-center justify-center h-10 bg-slate-300 shadow-md hover:text-[20px]"
        >
          <div className="mt-2">Delivered</div>
        </button>
        <button
          onClick={() => handleOnChange("cancelled")}
          className="text-lg w-[25%] text-center justify-center h-10 bg-slate-300 shadow-md hover:text-[20px]"
        >
          <div className="mt-2">Cancelled</div>
        </button>
      </div>

      <div>{/* {OrderByStatus[status]} */}</div>
      <div className="">
        <table className="w-full">
          <thead>
            <tr className="h-8 bg-yellow-100">
              <th className="w-56">OrderId</th>
              <th className="w-56">UserId</th>
              <th className="w-32">Name</th>
              <th className="w-28">Mobile</th>
              <th className="w-24">Amount</th>
              <th className="w-44">Date and Time</th>
              <th className="w-28">Status</th>
              {/* <th className="w-80">Change Status</th> */}
              <th className="w-20">Details</th>
              <th className="w-120">Address</th>
            </tr>
          </thead>
          
          <tbody>
            {OrderByStatus[status] &&
              OrderByStatus[status].map((item) => {
                return (
                  <>
                    
                    <tr className="h-8 item even:bg-blue-100 odd:bg-blue-200 hover:bg-white-500">
                      <th>{item._id}</th>
                      <th>{item.UserId}</th>
                      <th>{item.Address.name}</th>
                      <th>{item.Address.mobile}</th>
                      <th>{item.Amount}</th>
                      <th>{item.OrderTime}</th>
                      <th>{item.Status}</th>
                      {/* <th></th> */}
                      <th>
                        <button
                          onClick={() => handleOnItems(item._id)}
                          className=""
                        >
                          {selectedRowId == item._id ? (
                            <div>Hide</div>
                          ) : (
                            <div>Items</div>
                          )}
                        </button>
                      </th>
                      <th className="text-[14px]">
                        <div>
                          {item.Address.street}, {item.Address.city}
                        </div>
                        {item.Address.state}, Zip : {item.Address.zip}
                      </th>
                    </tr>

                    <div className="text-center w-full bg-slate-300">
                      {selectedRowId == item._id && (
                        <div className="w-full">
                          <div>
                            {item.Items.map((product) => {
                              return (
                                <>
                                  <div>{product.name}</div>
                                </>
                              );
                            })}
                          </div>
                          <div className="flex gap-4 w-full">
                            <button
                              onClick={() => handleStatusOnWay("shipped")}
                              className="bg-yellow-200 m-auto"
                            >
                              Shipped
                            </button>
                            <button
                              onClick={() => handleStatusOnWay("onway")}
                              className="bg-orange-300 m-auto "
                            >
                              Out for delivery
                            </button>
                            <button
                              onClick={() => handleStatusOnWay("delivered")}
                              className="bg-green-300 m-auto"
                            >
                              Delivered
                            </button>
                            <button
                              onClick={() => handleStatusOnWay("cancelled")}
                              className="bg-red-600 m-auto"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
