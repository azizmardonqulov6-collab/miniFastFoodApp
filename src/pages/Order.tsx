import deleteImg from '../assets/image/rent/fluent_delete-24-filled.png'
import BackImg from '../assets/image/rent/mingcute_left-fill.png'
import { useStore } from '../constanta/CardStorage.ts'
import type { Item } from '../constanta/CardStorage.ts'
import { Link } from 'react-router-dom';
import notFOund from '../assets/image/notFound.png'
export default function FoodOrderCart() {
  const { order,  increaseQuantity2, DescreaseQuantity2, getOrderTotal, removeFromOrder }: any = useStore();

  const formatPrice = (price: any) => {
    return price.toLocaleString('uz-UZ');
  };
  const Price = order.map((pro: Item) => {
    return pro.price
  })

  const Order1 = order.map((pro: Item) => {
    return pro.Quontity
  })
  // Handler functions - siz implement qilasiz
  const handleBack = () => {
    // Back navigation logic
  };
  const handleClearCart = () => {
    // Clear cart logic
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
      <div className="w-full h-full  bg-white flex flex-col items-center justify-between">
        {/* Header */}
        <div className="w-full bg-white  flex items-center justify-between border-b-2 border-[#A9BCB6] pb-4">
          <Link to="/"
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <img className='w-[25px]' src={BackImg} alt={BackImg} />
          </Link>
          <h1 className="text-xl text-gray-800">Savatcha</h1>
          <button
            onClick={handleClearCart}
            className="p-2 hover:bg-red-50 rounded-full transition-colors"
          >
            <img className='w-[25px]' src={deleteImg} alt={deleteImg} />
          </button>
        </div>

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
                <p className="text-[#43655A] font-semibold text-base">
                  {formatPrice(item.price)} 000  So'm
                </p>
              </div>

              {/* Quantity Controls */}
              <span className='w-[130px] h-[45px] border-2 border-[#889FA5] rounded-full flex justify-between items-center px-[2px] py-[3px]'>
                <span onClick={() => HandleDec(item.id)} className='w-[40px] h-[40px] rounded-full bg-[#8EA39C] flex justify-center items-center text-white cursor-pointer'>-</span>
                <span>{item.Quontity}</span>
                <span onClick={() => HandleInc(item.id)} className='w-[40px] h-[40px] rounded-full bg-[#43655A]  flex justify-center items-center text-white cursor-pointer'>+</span>
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
        </div>
      </div>
    </div>
  );
}