import { X } from 'lucide-react';
import { FaRegUser } from "react-icons/fa";
import { useState } from 'react';
import Info from './Info';
import { OpenStore, useUnser ,useStore } from '../constanta/CardStorage.ts'
export default function UserName() {
  const [UserName, setUserNam] = useState("");
  const {order} = useStore()
  const { setIsInfo, isInfo, setUserNameOpen, setPhoneOpen } = OpenStore();
  const { setUserName, PhoneNom, Adres }: any = useUnser();

 const handleSubmit = async () => {
    // Validatsiya
    if (UserName.length <= 3) {
      alert("Ism kamida 4 ta belgidan iborat bo'lishi kerak");
      return;
    }

    if (!PhoneNom || !Adres) {
      alert("Ma'lumotlar to'liq emas. Telefon va manzilni kiriting!");
      return;
    }

    if (!order || order.length === 0) {
      alert("Savatingiz bo'sh!");
      return;
    }

    try {
      const orderData = {
        orderId: Date.now(),
        userName: UserName,
        PhoneNom: PhoneNom,
        Adres: Adres,
        order: order,
        userTelegramId: null, // Agar Telegram ID bo'lsa, shu yerga qo'shing
      };

      console.log('📤 Buyurtma yuborilmoqda...', orderData);

      const response = await fetch(
        "https://telegram-order-bot.azizmardonqulov6.workers.dev/send-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      console.log('📥 Server javobi status:', response.status);

      // Response ni tekshirish
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Server xatosi:', errorText);
        throw new Error(`Server xatosi: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Server javobi:', data);

      if (data.success) {
        alert(`✅ Salom ${UserName}, sizning buyurtmangiz qabul qilindi!\n\nBuyurtma ID: ${data.orderId}\nTez orada siz bilan bog'lanamiz!`);
        
        // State ni yangilash
        setUserName(UserName);
        setUserNameOpen();
        setPhoneOpen();
        
        // Agar kerak bo'lsa, savatchani tozalash
        // clearCart(); // Bu funksiyani qo'shishingiz kerak bo'lishi mumkin
      } else {
        throw new Error(data.error || 'Noma\'lum xato');
      }
      
    } catch (error: any) {
      console.error('❌ Xatolik:', error);
      alert(`Buyurtma yuborishda xatolik yuz berdi:\n${error.message}\n\nIltimos, qaytadan urinib ko'ring!`);
    } 
  };

  function HandleClose() {
    if (UserName.length > 3) {
      setUserName(UserName);
      setUserNameOpen()
    } else {
      setIsInfo()
    }
  }

  return (
    <div className="fixed w-full h-fit bottom-3 left-0 flex justify-center pr-3 ">
      <div className="w-[365px] PhoneNom flex flex-col gap-[12px] border rounded-[30px] bg-white px-4 py-4">
        <div className="flex justify-between items-center">
          <FaRegUser />
          <h2 className='text-[14px]'>Ismingizni kiriting</h2>
          <X onClick={() => HandleClose()} className='text-[14px] cursor-pointer' />
        </div>
        <div className="input w-full flex gap-[30px]">
          <input
            value={UserName}
            onChange={(e) => setUserNam(e.target.value)}
            className='w-full flex-1 h-[50px] bg-[#D9D9D9] text-[#AFA1A1] rounded-[10px] pl-[25px] outline-none'
            placeholder='Aziz'
            type="text"
          />
        </div>
        <div className="button">
          <button
            onClick={() => handleSubmit()}
            className={`w-full rounded-2xl font-semibold text-white transition-all bg-[#43655A] cursor-pointer'
          }`}
            style={{
              height: '56px',
              fontSize: '16px',
              letterSpacing: '0.3px'
            }}
          >
            Kiritish
          </button>
        </div>
      </div>
      {isInfo && <Info insideText=" Ismingizni kiritishingiz zarur chunki daskavka borsa sizni ismingizni bilishi zarur" />}
    </div>
  )
};