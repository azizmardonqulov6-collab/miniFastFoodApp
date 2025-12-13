import Delite from '../assets/info/mingcute_close-fill.png'
export default function RemoveInfo({setDelInfo , removeOrder} : any ,)  {
   const  handleBack = () =>{
    setDelInfo(false)
   }
   const DeleteOrder = () =>{
    setDelInfo(false);
    removeOrder()
   }
    return (
        <div className="w-full h-full fixed flex justify-center items-center top-0 left-0">
            <div className="w-[380px] h-screen   relative flex justify-center items-center ">
                <div onClick={handleBack} className="w-full h-full bg-[#00000077] absolute top-0 left-0"></div>
                <div className="flex flex-col gap-8 w-[310px] h-fit py-7 pt-12 justify-center items-center relative bg-amber-50 rounded-[10px]">
                    <span onClick={handleBack} className="w-[30px] h-[30px] rounded-full  absolute right-[5px] top-[5px] bg-[#D9D9D9] text-[#929191] flex justify-center items-center text-xl font-semibold cursor-pointer">
                        <img src={Delite} alt={Delite} />
                    </span>
                    <p className="text-l text-center">Savatdan hamma mahsulotlar o’chirilsinmi?</p>
                    <div className=" flex gap-3">
                        <span onClick={handleBack} className="text-l text-[#929191] px-4 py-3 bg-[#E3E3E3] rounded-[10px] cursor-pointer">Bekor qilish</span>
                        <span onClick={DeleteOrder} className="text-l text-[#ffff] px-7 py-3 bg-[#E03838] rounded-[10px] cursor-pointer">O’chirish</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
