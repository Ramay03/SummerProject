import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    Name: "",
    Mobile: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prevValue) => !prevValue);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  // console.log(import.meta.env.VITE_SERVER_DOMAIN)

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { Name, Mobile, Email, Password, ConfirmPassword } = data;
    if (Name && Mobile && Email && Password && ConfirmPassword) {
      if (Password === ConfirmPassword) {
        // console.log(JSON.stringify(data))

        const fetchData = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/register`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const ResData = await fetchData.json();
        // alert(ResData.message);
        toast(ResData.message);
        if (ResData.alert) {
          // If not present already
          navigate("/");
        } else {
          navigate("/register");
        }
      } else {
        // alert("password and confirm password differs");
        toast("password and confirm password differs");
      }
    } else {
      toast("Please enter required fields");
    }
  };

  return (
    <div className="p-5 md:p-20">
      <div className="w-full max-w-sm bg-slate-200 m-auto flex flex-col p-4">
        <h1 className="text-center text-2xl font-bold">Register</h1>

        <form className="w-full py-3 flex flex-col" onSubmit={handleOnSubmit}>
          <input
            type={"text"}
            id="Name"
            name="Name"
            value={data.Name}
            onChange={handleOnChange}
            placeholder={"Name"}
            className="mt-3 w-full placeholder-blue-500 bg-slate-300 px-2 py-1 rounded focus-within:outline-slate-600"
          />
          <input
            type="number"
            id="Mobile"
            name="Mobile"
            value={data.Mobile}
            onChange={handleOnChange}
            placeholder={"Mobile Number"}
            className="mt-3 w-full placeholder-blue-500 bg-slate-300 px-2 py-1 rounded focus-within:outline-slate-600"
          />
          <input
            type={"email"}
            id="email"
            name="Email"
            value={data.Email}
            onChange={handleOnChange}
            placeholder={"Email"}
            className="mt-3 w-full placeholder-blue-500 bg-slate-300 px-2 py-1 rounded focus-within:outline-slate-600"
          />

          <div className="mt-3 flex px-2 py-1 bg-slate-300 rounded focus-within:border focus-within:border-slate-600">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="Password"
              value={data.Password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="w-full bg-slate-300 border-none outline-none placeholder-blue-500"
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <div className="flex px-2 py-1 bg-slate-300 rounded mt-3 focus-within:border focus-within:border-slate-600">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="ConfirmPassword"
              placeholder="Confirm Password"
              value={data.ConfirmPassword}
              onChange={handleOnChange}
              className="w-full bg-slate-300 border-none outline-none placeholder-blue-500"
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiHide /> : <BiShow />}
            </span>
          </div>

          <button className="w-full max-w-[100px] m-auto  bg-orange-300 hover:bg-orange-500 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Submit
          </button>
        </form>

        <p className="text-center text-sm mt-2 ">
          Already have account ?{" "}
          <Link to={"/login"} className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
