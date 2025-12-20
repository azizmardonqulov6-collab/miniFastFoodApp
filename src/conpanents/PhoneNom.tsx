import { useState } from 'react';
import { X } from 'lucide-react';
import { FaPhone } from "react-icons/fa6";
import { OpenStore } from '../constanta/CardStorage.ts'
import Info from './Info.tsx';
import { useUnser } from '../constanta/CardStorage.ts'

export default function PhoneInputModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode] = useState('+998');
  const { isInfo, setIsInfo, setPhoneOpen, setOrderBottomFalse,  setUserNameOpen , userNameOpen }: any = OpenStore()
  const { setPhoneNom }: any = useUnser();
  const handlePhoneChange = (e: any) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 9) {
      setPhoneNumber(value);
      console.log(isOpen)
    }
  };

  const formatPhoneNumber = (num: any) => {
    if (!num) return '';
    const cleaned = num.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
    }
    return num;
  };

  const handleSubmit = () => {
    if (phoneNumber.length === 9) {
      setIsOpen(false);
      setPhoneNom(phoneNumber);
      setOrderBottomFalse()
      setUserNameOpen()
      console.log(userNameOpen);
      console.log('Telefon nomer:' + countryCode + phoneNumber);
      alert(`Telefon nomer saqlandi: ${countryCode} ${formatPhoneNumber(phoneNumber)}`);

    }
  };
  function handleInfo() {
    if (phoneNumber.length === 9) {
      setPhoneOpen()
      setUserNameOpen()
      setPhoneNom(phoneNumber);
    } else {
      setIsInfo()
    }
  }

  return (
    <div className="fixed w-full h-fit bottom-3 left-0 flex justify-center pr-3 ">
      <div className="w-[365px] PhoneNom flex flex-col gap-[12px] border rounded-[30px] bg-white px-4 py-4">
        <div className="flex justify-between items-center">
          <FaPhone />
          <h2 className='text-[14px]'>Telefon Nomeringiz</h2>
          <X onClick={() => handleInfo()} className='text-[14px] cursor-pointer' />
        </div>
        <div className="input w-full flex gap-[30px]">
          <span className='w-[70px] h-[50px] bg-[#43655A] text-white flex justify-center items-center rounded-[10px]'>+998</span>
          <input
            value={formatPhoneNumber(phoneNumber)}
            onChange={handlePhoneChange}
            className='flex-1 h-[50px] bg-[#D9D9D9] text-[#AFA1A1] rounded-[10px] pl-[25px] outline-none'
            placeholder='99 505 22 21'
            type="text"
            maxLength={12}
          />
        </div>
        <div className="button">
          <button
            onClick={handleSubmit}
            disabled={phoneNumber.length !== 9}
            className={`w-full rounded-2xl font-semibold text-white transition-all ${phoneNumber.length === 9
                ? 'bg-[#43655A] hover:bg-[#43655Add] cursor-pointer'
                : 'bg-[#43655Add] cursor-not-allowed'
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
      {isInfo && <Info insideText="Telefon Nomeringiz  kiritishingiz zarur chunki daskavka borsa sizga zakazingiz kelgani haqida aytadi" />}
    </div>
  );
}