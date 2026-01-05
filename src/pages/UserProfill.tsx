import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SecendHeader from '../conpanents/SecendHeader';
import Map from '../assets/map/map.png';
import { useUnser, useStore } from '../constanta/CardStorage.ts';
import notFound from '../assets/image/notFound.png';

export default function UserProfileForm() {
  const { id } = useParams();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const { order }: any = useStore();
  const { userName, PhoneNom, Adres }: any = useUnser();

  const handleSubmit = () => {
    console.log('O\'zgartirish:', { phone, name });
    alert('Ma\'lumotlar saqlandi!');
  };

  const formatPrice = (price: any) => {
    return price.toLocaleString('uz-UZ');
  };

  useEffect(() => {
    setName(userName);
    setPhone(PhoneNom);
  }, [order, userName, PhoneNom]);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <SecendHeader name="User Profill" />

      {/* User Info Section - faqat userName da ko'rinadi */}
      <div className={`px-4 pt-8 h-1/2 flex-col gap-4 justify-center ${id === 'unserName' ? 'flex' : 'hidden'}`}>
        {/* Phone Input */}
        <div>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-7 py-4 bg-gray-100 rounded-lg text-[#B1BDC5] text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="+998 99 505 22 21"
          />
        </div>

        {/* Name Input */}
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-7 py-4 bg-gray-100 rounded-lg text-[#B1BDC5] text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Mardonqulov Aziz"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-[#B1BDC5] text-gray-600 rounded-lg text-base font-medium transition-colors"
          >
            O'zgartirish
          </button>
        </div>
      </div>
      <div className={`px-4 pt-4 space-y-3 pb-20 ${id === 'order' ? 'flex flex-col' : 'hidden'}`}>
        {order.length > 0 ? <div>
          {order.map((order: any) => (
          <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
            {/* Quantity */}
            <div className="w-8 text-center">
              <span className="text-sm font-medium text-gray-700">{order.Quontity}</span>
            </div>

            {/* Product Image */}
            <div className="w-20 h-20 flex-shrink-0 bg-yellow-50 rounded-lg flex items-center justify-center text-4xl">
              <img src={order.image} alt={order.image} />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-normal text-gray-900 mb-1 leading-tight">
                {order.name}
              </h3>
              <p className="text-base font-semibold text-gray-900">
                {formatPrice(order.price)}  000 so'm
              </p>
            </div>
          </div>
        ))}
        </div> : <div className="notFound w-full  flex flex-col items-start">
          <div className='w-full  flex flex-col grow gap-5 pt-10 justify-center items-center'>
            <img className='w-[150px]' src={notFound} alt={notFound} />
            <h2 className='text-xl'>Hech Narsa Topilmadi</h2>
          </div>
        </div>}

      </div>

      {/* Location Section - faqat locate da ko'rinadi */}
      <div className={`flex-col items-center justify-center px-8 py-16 ${id === 'locate' ? 'flex' : 'hidden'}`}>
        {/* Map with Location Pin Illustration */}
        <div className="">
          {Adres ? <div>
            <div className="relative mb-8">
              <img src={Map} alt="map" />
            </div>

            <div className="text-center">
              <p className="text-base leading-relaxed text-gray-800">
                <span className="font-medium">Samarqand Urgut </span>
                <br />
                <span className="font-medium">Ургут Ургутский район</span>
                <br />
                <span className="font-medium">
                  Xaritada{' '}
                  <a className="text-blue-500" href={Adres}>
                    Bosing
                  </a>
                </span>
              </p>
            </div>
          </div>
             : <div className="notFound w-full  flex flex-col items-start">
              <div className='w-full flex flex-col grow gap-5 justify-center items-center'>
                <img className='w-[150px]' src={notFound} alt={notFound} />
                <h2 className='text-xl'>Hech Narsa Topilmadi</h2>
              </div>
            </div>}
        </div>
      </div>
    </div>
  );
}