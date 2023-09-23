import { useEffect, useState } from "react";
import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setProductData } from "./redux/productSlice";

function App() {

  const [count, setCount] = useState(0);
  const disPatch = useDispatch();
  const productData = useSelector((state) => state.product);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/product`);
      const resData = await res.json();
      disPatch(setProductData(resData));
    })();
  }, []);

  return (
    <>
      <Toaster />
      <div className="bg-slate-200 h-screen overflow-auto relative">
        <Header />
        {/* <main className="pt-14 min-h-[calc(100vh)]"> */}
        <main className="mt-14 min-h-[70%]">
            <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
