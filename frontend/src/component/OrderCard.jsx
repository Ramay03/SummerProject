import React from 'react'

const OrderCard = (order) => {
   const OrderDetails = order.order
    console.log(OrderDetails)
  return (
    <>
    <div className='w-full min-w-[280px] max-w-[280px] min-h-[300px] bg-white hover:shadow-lg drop-shadow-lg px-1'>
      <h3 className='font-semibold text-center text-lg'>{OrderDetails.Amount}</h3>
      
        <div className="">
            {OrderDetails.Address.name} {OrderDetails.Address.mobile}
        </div> 

    </div>
  </>
  )
}

export default OrderCard
