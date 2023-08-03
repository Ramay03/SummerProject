import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem,increaseQty } from "../redux/productSlice";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CategoryCard = ({id,name,price,quantity,mrp,offer,image,category,stock}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    const handleAddCartProduct = (e) => {
      if(user.Mobile){
        dispatch(addCartItem({
        _id : id,
        name : name,
        price : price,
        quantity : quantity,
        mrp : mrp,
        offer : offer,
        image : image,
        category : category,
        stock : stock,
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
    <div className='w-full min-w-[300px] max-w-[300px] sm:min-w-[200px] sm:max-w-[200px] md:min-w-[200px] lg:min-w-[250px] md:max-w-[200px] lg:max-w-[250px] bg-white hover:shadow-lg drop-shadow-lg px-1'>
        {offer ? <div className='bg-green-200 text-left absolute p-1'><span className='text-xl'>{offer}</span> OFF</div> : <div></div>}
        <div className='h-48 flex flex-col justify-center items-center'> 
            <img src = {image} className='h-full'></img>
        </div>
        <h3 className='font-semibold text-center text-lg min-h-20'>{name}</h3>
        <p className='text-center mt-1'>
            <span className='font-semibold'>Rs-</span>
            <span className='text-xl font-bold'> {price}</span>
            <span className='text-sm'>/{quantity}</span>
            <span className='ml-10 '>MRP: {mrp}</span>
        </p>
        <button className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 w-full" onClick={handleAddCartProduct}>
            Add to Cart
        </button>
    </div>
  )
}

export default CategoryCard