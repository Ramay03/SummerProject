import React, { useState } from 'react'
import logo from "../assets/react.svg"
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUserCircle, FaUserAlt } from "react-icons/fa"
import { BsCart } from "react-icons/bs"
import { AiOutlineUser } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from "../redux/userSlice";
import { toast } from 'react-hot-toast';

const Header = () => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false)
  const userData = useSelector((state)=>state.user)
  // console.log("USERDATA", userData)

  const dispatch = useDispatch()

  const handleshowOptions = ()=>{
    setShowOptions(preve => !preve)
  }

  const handleLogout = ()=>{
    dispatch(logoutRedux())
    toast("Logout successfully")
  }

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-slate-200">
      {/* Desktop  */}
      <div className='flex items-center h-full justify-between'>

        <div className='h-12'>
          <img src={logo} className='h-full'></img>
        </div>

        <div className='flex items-center gap-4 md:gap-6'>
          <nav className='flex gap-4 text-1xl text-blue-500 md:gap-7 '>
            <Link to={""}>Home</Link>
            <Link to={"product"}>Products</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>


          {/* <div onClick={handleshowOptions}>
            <div className='text-2xl text-blue-500 relative cursor-pointer' > 
              <FaRegUserCircle />
            </div>
            {showOptions && 
              <div className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                { userData.Name ? 
                  ( <Link to = {"profile"}>Profile</Link>) : ( <Link to = {"login"}>Login</Link>)
                }
                </div>
            }
          </div> */}



          <div>
            { userData.Name ? 
              ( <div className='flex items-center gap-4 md:gap-6'> 
                  <div className='text-2xl text-blue-500 relative cursor-pointer'>
                    <BsCart />
                    <div className='absolute -top-1.5 -right-1.5 text-blue-900 h-4 w-4 rounded-full m-0 p-0 text-sm text-center '>
                      0
                    </div>  
                  </div>
                  <div onClick={handleshowOptions}>
                    <div className='text-2xl text-blue-500 relative cursor-pointer' > 
                      <AiOutlineUser />
                    </div>
                    {showOptions && 
                      <div className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                        <Link to = {"profile"}>Profile</Link>
                        <Link to = {"setting"}>Setting</Link>
                        <p onClick={handleLogout}>Logout</p>
                      </div>
                    }
                  </div>
                </div>
              ) : 
              ( 
                <div className='text-2xl text-blue-500 relative cursor-pointer' > 
                  <Link to = {"/login"}><FaRegUserCircle /></Link>
                </div>
              )
            }
          </div>


        </div>
      </div>

    </header>
  )
}

export default Header