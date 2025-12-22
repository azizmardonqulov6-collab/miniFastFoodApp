import { X } from 'lucide-react';
import { FaRegUser } from "react-icons/fa";
import { useState, useEffect } from 'react';
import Info from './Info';
import { OpenStore, useUnser, useStore } from '../constanta/CardStorage.ts';
import type {TelegramWebApp} from '../constanta/Interface.ts'

// Type guard
const isTelegramWebAppAvailable = (): boolean => {
  if (typeof window === 'undefined') return false;
  const telegram = (window as any).Telegram;
  return !!(telegram && telegram.WebApp);
};

// Telegram Web App olish
const getTelegramWebApp = (): TelegramWebApp | null => {
  if (!isTelegramWebAppAvailable()) return null;
  return (window as any).Telegram.WebApp;
};

export default function UserName() {
  const [UserName, setUserNam] = useState("");
  const { order } = useStore();
  const { setIsInfo, isInfo, setUserNameOpen } = OpenStore();
  const { setUserName, PhoneNom, Adres } : any = useUnser();
  const [loading, setLoading] = useState(false);
  const [isInTelegram, setIsInTelegram] = useState(false);

  // Telegram muhitini aniqlash
  useEffect(() => {
    const checkTelegram = () => {
      if (isTelegramWebAppAvailable()) {
        setIsInTelegram(true);
        const webApp = getTelegramWebApp();
        if (webApp) {
          webApp.ready();
          webApp.expand();
        }
      }
    };
    
    checkTelegram();
  }, []);

  // Telegram ma'lumotlarini olish
  const getTelegramData = () => {
    if (!isInTelegram) return null;
    
    const webApp = getTelegramWebApp();
    if (!webApp) return null;

    return {
      telegramId: webApp.initDataUnsafe?.user?.id,
      firstName: webApp.initDataUnsafe?.user?.first_name || '',
      lastName: webApp.initDataUnsafe?.user?.last_name || '',
      username: webApp.initDataUnsafe?.user?.username || ''
    };
  };

  // Backend URL aniqlash
  const getBackendUrl = () => {
    // Agar local development bo'lsa
    if (process.env.NODE_ENV  === 'development' ) {
      return 'http://localhost:3000';
    }
    // Production bo'lsa
    return 'https://your-backend-url.vercel.app'; // O'z backend URL'ingizni qo'ying
  };

  const handleSubmit = async () => {
    if (UserName.length < 3) {
      setIsInfo();
      return;
    }

    if (!setUserNameOpen) {
      console.error('setUserNameOpen function is not defined');
      return;
    }

    setUserNameOpen();
    
    if (!UserName || !PhoneNom || !Adres || !order || order.length === 0) {
      const message = "Iltimos, barcha maydonlarni to'ldiring va buyurtma qo'shing!";
      
      if (isInTelegram) {
        const webApp = getTelegramWebApp();
        webApp?.showAlert(message);
      } else {
        alert(message);
      }
      return;
    }

    setLoading(true);
    
    try {
      const telegramData = getTelegramData();
      const backendUrl = getBackendUrl();
      
      const orderData = {
        orderId: Date.now(),
        userName: UserName,
        PhoneNom: PhoneNom,
        Adres: Adres,
        order: order.map((item: any) => ({
          ...item,
          price: Number(item.price) || 0,
          Quontity: Number(item.Quontity) || 1
        })),
        userTelegramId: telegramData?.telegramId || null,
        telegramData: telegramData
      };

      console.log("📤 Buyurtma yuborilmoqda:", orderData);

      const response = await fetch(`${backendUrl}/send-order`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      console.log("📥 Javob statusi:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Server xatosi:", errorText);
        throw new Error(`Server xatosi: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Javob:', data);
      
      if (data.success) {
        const successMessage = `Salom ${UserName}, buyurtmangiz qabul qilindi!\nID: ${data.orderId}`;
        alert(successMessage)
        
        // Telegram Mini App da
        if (isInTelegram) {
          const webApp = getTelegramWebApp();
          if (webApp) {
            webApp.showAlert(successMessage, () => {
              webApp.close();
            });
          }
        } else {
          // Oddiy brauzerda
          alert(successMessage);
        }
        
        // LocalStorage ga saqlash
        try {
          const previousOrders = JSON.parse(localStorage.getItem('myOrders') || '[]');
          previousOrders.push({
            ...orderData,
            status: 'qabul qilindi',
            date: new Date().toISOString()
          });
          localStorage.setItem('myOrders', JSON.stringify(previousOrders));
        } catch (storageError) {
          console.warn('LocalStorage ga saqlashda xatolik:', storageError);
        }
        
        // Usernameni saqlash
        if (setUserName) {
          setUserName(UserName);
        }
        
      } else {
        throw new Error(data.error || 'Noma\'lum xatolik');
      }
      
    } catch (error: any) {
      console.error('❌ Xatolik:', error);
      
      const errorMessage = `Buyurtma yuborishda xatolik: ${error.message}`;
      
      if (isInTelegram) {
        const webApp = getTelegramWebApp();
        webApp?.showAlert(errorMessage);
      } else {
        alert(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  function HandleClose() {
    if (UserName.length > 3 && setUserName) {
      setUserName(UserName);
      if (setUserNameOpen) {
        setUserNameOpen();
      }
    } else {
      setIsInfo();
    }
  }

  return (
    <div className="fixed w-full h-fit bottom-3 left-0 flex justify-center pr-3">
      <div className="w-[365px] flex flex-col gap-[12px] border rounded-[30px] bg-white px-4 py-4">
        <div className="flex justify-between items-center">
          <FaRegUser />
          <h2 className='text-[14px]'>Ismingizni kiriting</h2>
          <X onClick={HandleClose} className='text-[14px] cursor-pointer' />
        </div>
        <div className="input w-full">
          <input
            value={UserName}
            onChange={(e) => setUserNam(e.target.value)}
            className='w-full h-[50px] bg-[#D9D9D9] text-[#AFA1A1] rounded-[10px] pl-[25px] outline-none'
            placeholder='Aziz'
            type="text"
            minLength={3}
            required
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
        </div>
        <div className="button">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full rounded-2xl font-semibold text-white transition-all 
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#43655A] hover:bg-[#365048] cursor-pointer'}`}
            style={{
              height: '56px',
              fontSize: '16px',
              letterSpacing: '0.3px'
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Yuborilmoqda...
              </span>
            ) : 'Kiritish'}
          </button>
        </div>
      </div>
      {isInfo && (
        <Info insideText="Ismingizni kiritishingiz zarur chunki daskavka borsa sizni ismingizni bilishi zarur" />
      )}
    </div>
  );
}