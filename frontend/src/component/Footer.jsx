import React from "react";
import logo from "../assets/K-Mart.png";

const Footer = () => {
  return (
    <>
      <div className="bg-purple-900 flex min-h-[22%]">
        <div className="m-auto w-[50%]">
          <img src={logo} className="min-h-28 max-h-36 w-80 m-auto"></img>
        </div>
        <div className="m-auto w-[50%] text-center">
            <div>K-MART, A kirana store</div>
            <div>Bazar Chowk Sodalpur</div>
            <div>Dist-Harda, Madhya Pradesh</div>
            <div>Mob-7523784576</div>
            <div>Created by - Ramay</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
