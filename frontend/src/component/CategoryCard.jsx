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
    <div className='w-full min-w-[300px] bg-white hover:shadow-lg drop-shadow-lg px-4'>
        <div className='h-48 flex flex-col justify-center items-center'> 
            <img src = {image} className='h-full'></img>
        </div>
        <h3 className='font-semibold text-center text-lg'>{name}</h3>
        <p className='font-bold'>
            <span className=''>Rs</span>
            <span>{price}</span>
        </p>
        <button className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 w-full" onClick={handleAddCartProduct}>
            Add to Cart
        </button>
    </div>
  )
}

export default CategoryCard