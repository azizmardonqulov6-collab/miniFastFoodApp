import closeImg from '../assets/info/close.png'
import infoIcon from '../assets/info/Vector.png'
import { OpenStore } from '../constanta/CardStorage'
export default function Info({insideText} : any) {
    const {setIsInfo} : any = OpenStore()
    return (
        <div className="select w-full h-screen fixed  left-0 z-100 flex  justify-center items-end inset-0 pr-2 ">
            <div className="w-[370px] h-full relative  flex justify-center items-center">
                <div className="absolute w-full h-full  left-0 top-0 bg-[#000000b5] z-2"></div>
                <div className="w-[277px] h-[172px] bg-white rounded-[30px] relative z-2 flex flex-col p-4 gap-3 justify-center items-center">
                    <span onClick={() => setIsInfo()} className='absolute right-2 top-2 cursor-pointer'>
                        <img src={closeImg} alt={closeImg} />
                    </span>
                        <div className="">
                            <img src={infoIcon} alt={infoIcon} />
                        </div>
                        <div className="">
                            <p className="text-center text-[15px]">
                                {insideText}
                            </p>
                        </div>
                </div>
            </div>
        </div>
    )
}
