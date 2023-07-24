import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    Mobile: "",
    Password: "",
  });

  const userData = useSelector((state) => state);
  // console.log(userData.user)
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
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

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { Mobile, Password } = data;

    if (Mobile && Password) {
      const fetchData = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const ResData = await fetchData.json();
      console.log(ResData);
      
      if (ResData.alert) {
        dispatch(loginRedux(ResData));
        toast(userData.user.Name + " " +ResData.message);
        navigate("/");
        // setTimeout(() => {
        //   navigate("/");
        // }, 1000);
      } else {
        toast(ResData.message);
        navigate("/login");
      }
    }
  };

  return (
    <div className="p-5 md:p-20">
      <div className="w-full max-w-sm bg-slate-200 m-auto flex flex-col p-4">
        <h1 className="text-center text-2xl font-bold">Login</h1>
        <div className=""></div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleOnSubmit}>
          <input
            type="number"
            id="Mobile"
            name="Mobile"
            value={data.Mobile}
            onChange={handleOnChange}
            placeholder={"Mobile"}
            className="mt-3 w-full placeholder-blue-500 bg-slate-300 px-2 py-1 rounded focus-within:outline-slate-600"
          />

          <div className="mt-3 flex px-2 py-1 bg-slate-300 rounded focus-within:border focus-within:border-slate-600">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="Password"
              value={data.Password}
              onChange={handleOnChange}
              placeholder="Password"
              className="w-full bg-slate-300 border-none outline-none placeholder-blue-500"
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiHide /> : <BiShow />}
            </span>
          </div>

          <button className="w-full max-w-[100px] m-auto  bg-orange-300 hover:bg-orange-500 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-2 ">
          Do not have an account ?{" "}
          <Link to={"/register"} className="text-red-500 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
