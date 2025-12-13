import { useStore } from '../constanta/CardStorage.ts'
import type { Item } from '../constanta/CardStorage.ts'
import notFOund from '../assets/image/notFound.png'
import { useState } from 'react';
import RemoveInfo from '../conpanents/RemoveInfo.tsx';
import SecendHeader from '../conpanents/SecendHeader.tsx';
export default function FoodOrderCart() {
  const [DelInfo , setDelInfo]= useState<boolean>(false)
  const [name , setName] = useState("Savatcha")
  const { order,  increaseQuantity2, DescreaseQuantity2, getOrderTotal, removeFromOrder ,removeOrder }: any = useStore();
  const formatPrice = (price: any) => {
    return price.toLocaleString('uz-UZ');
  };
  const Price = order.map((pro: Item) => {
    return pro.price
  })

  // Handler functions - siz implement qilasiz
  const handleBack = () :void => {
    setDelInfo(true)
    removeOrder()
  };
  const handleClearCart = () => {
    setDelInfo(true)
  };

  function HandleInc(id: number): void {
    increaseQuantity2(id)
  }
  function HandleDec(id: number): void {
    let item = order.find((pro: any) => {
      return pro.id === id
    })

    if (!item) { return }

    if (item.Quontity > 1) {
      DescreaseQuantity2(id);
    } else {
      removeFromOrder(id)
    }
  }

  const handleCheckout = () => {
    // Proceed to checkout logic
  };

  return (
    <div className="w-full h-screen ">
      <h1 className='text-center text-gray-300 pt-2 pb-5'>@fastfood500bot</h1>
      <div className="w-full h-full  bg-white flex flex-col items-center justify-between">
        {/* Header */}
        <SecendHeader handleBack={handleBack} handleClearCart={handleClearCart} name={name} />

        {/* Order Items */}
        {order.length > 0 ? <div className=" py-3 flex flex-col gap-4 grow">
          {order.map((item: Item) => (
            <div key={item.id} className="bg-white rounded-2xl py-4  flex items-center gap-4 shadow-gray-100 shadow">
              {/* Product Image */}
              <div className="w-20 h-20">
                <img src={item.image} alt={item.image} />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-800 text-sm leading-tight mb-1">
                  {item.name}
                </h3>
                <p className="text-[#43655A] font-semibold text-[13px] text-base">
                  {formatPrice(item.price)} 000  So'm
                </p>
              </div>

              {/* Quantity Controls */}
              <span className='w-[110px] h-[40px] border-2 border-[#889FA5] rounded-full flex justify-between items-center px-[2px] py-[3px]'>
                <span onClick={() => HandleDec(item.id)} className='w-[35px] h-[35px] rounded-full bg-[#8EA39C] flex justify-center items-center text-white cursor-pointer'>-</span>
                <span className='text-[13px]'>{item.Quontity}</span>
                <span onClick={() => HandleInc(item.id)} className='w-[35px] h-[35px] rounded-full bg-[#43655A]  flex justify-center items-center text-white cursor-pointer'>+</span>
              </span>
            </div>
          ))}
        </div>
        : <div className='w-full h-screen flex flex-col grow gap-5 justify-center items-center'>
            <img className='w-[150px]' src={notFOund} alt={notFOund} />
            <h2 className='text-xl'>Hech Narsa Topilmadi</h2>
          </div>
        }

        {/* Footer */}
        <div className="w-full pt-6 bg-white border-t border-[#A9BCB6] ">
          {/* Total */}
          <div className="flex w-full justify-between">
            <div className="flex flex-col mb-4">
              <span className="text-gray-600 text-l">Umumiy</span>
              <span className="text-xl font-bold text-gray-900">
                {getOrderTotal(Price)} 000  So'm
              </span>
            </div>

            {/* Order Button */}
            <button
              onClick={handleCheckout}
              className="w-[150px] h-[50px] bg-[#43655A] rounded-[10px] text-white"
            >
              Davom Etish
            </button>
          </div>

          {/* Bot Tag */}
          <div className="text-center mt-4">
            <span className="text-gray-400 text-sm italic">FastFood500_bot</span>
          </div>
          {DelInfo ? <RemoveInfo setDelInfo={setDelInfo} removeOrder={removeOrder} /> : ""}
        </div>
      </div>
    </div>
  );
}