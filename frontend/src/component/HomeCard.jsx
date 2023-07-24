import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem,increaseQty } from "../redux/productSlice";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const HomeCard = ({id,name,price,quantity,mrp,offer,image,category,stock}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  // console.log("USER: ",user)
  const handleAddCartProduct = (e) => {
    if(user.Mobile){
      dispatch(addCartItem({
        _id : id,
        name : name,
        price : price,
        mrp : mrp,
        category : category,
        image : image,
        offer : offer
      }))
    }
    else{
      toast("Please Login")
      setTimeout(()=>{
        navigate("/login")
      },1000)
    }
  };

  return (
    <div className='pb-1 bg-slate-300 text-center'>
        <div className='w-80 h-100'>
            
            {offer ? <div className='bg-green-200 text-left absolute p-1'><span className='text-xl'>{offer}</span> OFF</div> : <div></div>}
            
            <img src = {image} className='w-60 h-60 p-1' />
            <h1 className=''>{name}</h1>
            <div className='p-1'>
              <span className='ml-0'>Rs</span>
              <span className='text-xl md:text-xl lg:text-2xl font-mono'>{price}</span>
              <span className='text-sm'>/{quantity}</span>
              <span className='ml-5'>MRP: {mrp}</span>
            </div>
            <div className='text-center'>
                    {stock ? 
                    <div>
                      <button onClick={handleAddCartProduct} className='bg-slate-200 h-8 text-xl ml-10 mr-10 p-0.5'>Add to cart</button> 
                    </div>
                    : <p className='bg-orange-400 h-8 text-xl ml-10 mr-10 p-0.5'>Out of Stock</p>}
            </div>
          
        </div>
    </div>
  )
}

export default HomeCard