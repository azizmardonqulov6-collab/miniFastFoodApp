import closeImg from '../assets/info/close.png'
import infoIcon from '../assets/info/Vector.png'
export default function Info() {
    return (
        <div className="w-full h-screen fixed left-0 top-0 flex justify-center items-center pr-2 z-1">
            <div className="w-[370px] h-full relative flex justify-center items-center">
                <div className="absolute w-full h-full  left-0 top-0 bg-[#000000b5]"></div>
                <div className="w-[277px] h-[172px] bg-white rounded-[30px] relative z-2 flex flex-col p-4 gap-3 justify-center items-center">
                    <span className='absolute right-2 top-2'>
                        <img src={closeImg} alt={closeImg} />
                    </span>
                        <div className="">
                            <img src={infoIcon} alt={infoIcon} />
                        </div>
                        <div className="">
                            <p className="text-center text-[15px]">
                                Telefon Nomeringiz  kiritishingiz
                                zarur chunki daskavka borsa sizga
                                zakazingiz kelgani haqida aytadi
                            </p>
                        </div>
                </div>
            </div>
        </div>
    )
}
