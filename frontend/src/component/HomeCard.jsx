import React from 'react'

const HomeCard = ({name,price,quantity,mrp,offer,image,category,stock}) => {
  return (
    <div className='pb-1 bg-slate-300 text-center'>
        <div className='w-60 h-100'>
            
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
                    {stock ? <p className='bg-slate-200 h-8 text-xl ml-10 mr-10 p-0.5'>Add to cart</p> : <p className='bg-orange-400 h-8 text-xl ml-10 mr-10 p-0.5'>Out of Stock</p>}
            </div>
          
        </div>
    </div>
  )
}

export default HomeCard