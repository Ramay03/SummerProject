import { useEffect, useState } from "react";
import "./App.css";
import Header from "./component/Header";
import Register from "./page/Register";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setProductData } from "./redux/productSlice";

function App() {
  const [count, setCount] = useState(0);
  const disPatch = useDispatch();
  const productData = useSelector((state)=>state.product)

  useEffect(()=>{
    (async()=>{
      const res = await fetch (`${import.meta.env.VITE_SERVER_URL}/product`)
      const resData = await res.json()
      disPatch(setProductData(resData))
    })()
  },[])
 
  
  return (
    <>
      <Toaster/>
      <div>
        <Header />
        <main className="pt-16 bg-slate-500 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
