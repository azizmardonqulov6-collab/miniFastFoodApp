import { OpenStore, useUnser ,useStore } from '../constanta/CardStorage.ts'
import Delite from '../assets/info/close.png'
export default function UserName({setSecses} : any) {
  const {order , removeOrder} = useStore()
  const {  setUserNameOpen, setPhoneOpen , setIsSecses , onSecses , setOnsecses} = OpenStore();
  const { PhoneNom, Adres ,userName }: any = useUnser();
console.log(onSecses)
function SecsesFunc(){
  setSecses(true);
  setTimeout(() => {
  setSecses(false);
  }, 7000);
}
const handleSubmit = async () => {
    if (userName && PhoneNom && Adres && order) {
      setOnsecses()
      setPhoneOpen();
      setUserNameOpen()
      try {
        console.log('📤 Zakaz yuborilmoqda...', {
          userName: userName,
          PhoneNom,
          Adres,
          order
        });
        
        const response = await fetch("https://minifastfood500.azizmardonqulov6.workers.dev/send-order", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            orderId: Date.now(),
            userName: userName,
            PhoneNom: PhoneNom,
            Adres: Adres,
            order: order
          })
        });

        console.log('📥 Server javobi status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Server xatosi:', errorText);
          throw new Error(`Server xatosi: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Server javobi:', data);

        setIsSecses();
        SecsesFunc();
        removeOrder()
        
      } catch (error: any) {
        console.error('❌ Xatolik:', error);
        alert('Buyurtma yuborishda xatolik: ' + error.message);
      }
    } else {
      alert("Ma'lumotlar to'liq emas");
    }
};
  function HandleClose() {
    if (userName) {
      setOnsecses()
      removeOrder()
      setPhoneOpen()
      setUserNameOpen()
    } else {
      setOnsecses()
      removeOrder()
      setPhoneOpen()
      setUserNameOpen()
    }
  }

    return (
        <div className="w-full h-full fixed flex justify-center items-center top-0 left-0">
            <div className="w-[380px] h-screen   relative flex justify-center items-center ">
                <div onClick={HandleClose} className="w-full h-full bg-[#000000b3] absolute top-0 left-0"></div>
                <div className="flex flex-col gap-8 w-[310px] h-fit py-7 pt-12 justify-center items-center relative bg-white rounded-[10px]">
                    <span onClick={HandleClose} className="w-[30px] h-[30px] rounded-full  absolute right-[5px] top-[5px]  flex justify-center items-center text-xl font-semibold cursor-pointer">
                        <img src={Delite} alt={Delite} />
                    </span>
                    <p className="text-l text-center">Savatdagi Hamma Mahsulot aniq zakazz qilinsinmi?</p>
                    <div className=" flex gap-3">
                        <span onClick={handleSubmit} className="text-l text-[#ffff] px-7 py-3 bg-green-600 rounded-[10px] cursor-pointer">Ha</span>
                        <span onClick={HandleClose} className="text-l text-[#929191] px-4 py-3 bg-gray-300 rounded-[10px] cursor-pointer"> Yo'q</span>
                        
                    </div>
                </div>
            </div>
        </div>
    )
};