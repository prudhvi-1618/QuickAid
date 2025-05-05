import React from 'react'

const Booking = ({address,addressError,handleBook,isConnected}) => {
  return (
    <div className="form mx-3 my-4 flex justify-center">
              <form action="" className='w-[90vw] m-5 p-2 flex flex-col sm:flex-row gap-5 justify-between'>
                <div className=' sm:w-[50vw]'>
                  <h5 className='w-full text-[16px] text-zinc-500'>From Address</h5>
                  <input type="text"
                    name="fromAddress" id="fromAddress"
                    placeholder='From '
                    className='w-full px-2 py-2 border-2 border-zinc-200 rounded-[5px]'
                    value={address} />
                    <div className="error text-[15px] text-red-600">{addressError}</div>
                </div>
                {/* <div>
                  <h5 className='text-[15px] text-zinc-500'>To Address</h5>
                  <input type="text" name="toAddress" id="toAddress"
                    placeholder='To'
                    className='w-full px-2 py-2 border-2 border-zinc-200 rounded-[5px]' />
                </div> */}
                <button type="submit"
                  onClick={(e)=>handleBook(e)}
                  disabled={!isConnected}
                  className='border-1 px-3 py-[8px] border-zinc-100 bg-zinc-800 text-xl text-zinc-100 rounded-xl'>
                  Book Ambulance
                </button>
              </form>
            </div>
  )
}

export default Booking