import { X } from 'lucide-react';
import { FaRegUser } from "react-icons/fa";
import { useState } from 'react';
import Info from './Info';
import { OpenStore, useUnser } from '../constanta/CardStorage.ts'
export default function UserName() {
  const [UserName, setUserNam] = useState("");
  const { setIsInfo, isInfo, setOnsecses} = OpenStore();
  const { setUserName , userName , PhoneNom}: any = useUnser();

const handleSubmit = () => {
  if (UserName.length > 3) {
    setOnsecses()
    setUserName(UserName);
    console.log(userName , PhoneNom)
  } else {
    alert("Ism kamida 4 ta belgidan iborat bo'lishi kerak");
  }
};
  function HandleClose() {
    if (UserName.length > 3) {
      setUserName(UserName);
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