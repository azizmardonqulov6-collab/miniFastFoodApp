import { useState } from 'react';
import SecendHeader from '../conpanents/SecendHeader';

export default function UserProfileForm() {
  const [phone, setPhone] = useState('+998 99 505 22 21');
  const [name, setName] = useState('Mardonqulov Aziz');

  const handleSubmit = () => {
    console.log('O\'zgartirish:', { phone, name });
    alert('Ma\'lumotlar saqlandi!');
  };
  const formatPrice = (price : any) => {
    return price.toLocaleString('uz-UZ');
  };
    const [orders] = useState([
    { id: 1, name: 'Bir plastik Burger Kombo', price: 55000, quantity: 1, image: '🍔' },
    { id: 2, name: 'Bir Plastik Burger Kombo', price: 55000, quantity: 1, image: '🍔' },
    { id: 3, name: 'Bir Kichik Burger Kombo', price: 55000, quantity: 1, image: '🍔' }
  ]);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <SecendHeader name="User Profill" />

      {/* Form Content */}
      <div className="px-4 pt-8 h-1/2  flex-col gap-4 justify-center hidden">
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
            className="w-full py-4 bg-[#B1BDC5] text-gray-600 rounded-lg text-base font-medium  transition-colors"
          >
            O'zgartirish
          </button>
        </div>
      </div>
           {/* Order History Items */}
      <div className="px-4 pt-4 space-y-3 pb-20">
        {orders.map((order : any) => (
          <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
            {/* Quantity */}
            <div className="w-8 text-center">
              <span className="text-sm font-medium text-gray-700">{order.quantity}</span>
            </div>

            {/* Product Image */}
            <div className="w-20 h-20 flex-shrink-0 bg-yellow-50 rounded-lg flex items-center justify-center text-4xl">
              {order.image}
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-normal text-gray-900 mb-1 leading-tight">
                {order.name}
              </h3>
              <p className="text-base font-semibold text-gray-900">
                {formatPrice(order.price)}
              </p>
            </div>
          </div>
        ))}
    </div>
    </div>
  );
}