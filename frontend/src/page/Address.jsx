import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    // Address data
    name: "",
    mobile: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAddress((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  // console.log(import.meta.env.VITE_SERVER_DOMAIN)

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { name, mobile, street, city, state, zip } = address;
    if (name && mobile && street && city && state) {
      // console.log(address)
      navigate('/orderdetails', { state: address});
      // const fetchData = await fetch(
      //   `${import.meta.env.VITE_SERVER_URL}/register`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "content-type": "application/json",
      //     },
      //     body: JSON.stringify(data),
      //   }
      // );

      // const ResData = await fetchData.json();
      // // alert(ResData.message);
      // toast(ResData.message);
      // if (ResData.alert) {
      //   // If not present already
      //   navigate("/");
      // } else {
      //   navigate("/register");
      // }
    } else {
      toast("Please enter required fields");
    }
  };
  return (
    <div className="p-5 md:p-20">
      <div className="w-full max-w-sm bg-slate-200 m-auto flex flex-col p-4">
        <h1 className="text-center text-2xl font-bold">Add Address</h1>

        <form className="w-full py-3 flex flex-col" onSubmit={handleOnSubmit}>
          <input
            type={"text"}
            id="name"
            name="name"
            value={address.name}
            onChange={handleOnChange}
            placeholder={"Name"}
            className="mt-3 w-full placeholder-blue-500 bg-slate-300 px-2 py-1 rounded focus-within:outline-slate-600"
          />
          <input
            type="number"
            id="mobile"
            name="mobile"
            value={address.mobile}
            onChange={handleOnChange}
            placeholder={"Mobile Number"}
            className="mt-3 w-full placeholder-blue-500 bg-slate-300 px-2 py-1 rounded focus-within:outline-slate-600"
          />
          <input
            type={"text"}
            id="street"
            name="street"
            value={address.street}
            onChange={handleOnChange}
            placeholder={"Street"}
            className="mt-3 w-full placeholder-blue-500 bg-slate-300 px-2 py-1 rounded focus-within:outline-slate-600"
          />
          <input
            type={"text"}
            id="city"
            name="city"
            value={address.city}
            onChange={handleOnChange}
            placeholder={"City"}
            className="mt-3 w-full placeholder-blue-500 bg-slate-300 px-2 py-1 rounded focus-within:outline-slate-600"
          />

          <input
            type="text"
            id="state"
            name="state"
            value={address.state}
            onChange={handleOnChange}
            placeholder="State"
            className="mt-3 w-full placeholder-blue-500 bg-slate-300 px-2 py-1 rounded focus-within:outline-slate-600"
          />

          <input
            type="text"
            id="zip"
            name="zip"
            value={address.zip}
            onChange={handleOnChange}
            placeholder="Pin code"
            className="mt-3 w-full placeholder-blue-500 bg-slate-300 px-2 py-1 rounded focus-within:outline-slate-600"
          />

          <button className="w-full m-auto  bg-orange-300 hover:bg-orange-500 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Deliver to this address
          </button>
        </form>
      </div>
    </div>
  );
};

export default Address;
