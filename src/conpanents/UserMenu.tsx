import logo from '../assets/logo.png'
import userIcon from '../assets/menu/user.png'
import mapIcon from '../assets/menu/map.png'
import orderIcon from '../assets/menu/order.png'
import infoIcon from '../assets/menu/info.png'
import phoneIcon from '../assets/menu/phone.png'
import { OpenStore } from '../constanta/CardStorage'
const SideMenuExact = () => {
    const {isMenu , setIsMenu} : any = OpenStore();
    return (
        <div className={`fixed top-0  z-100 w-full h-screen flex justify-center ${isMenu ? "left-0" : "left-[-150%]"}`}>
            <div className="w-[380px] flex flex-row-reverse">
             {isMenu && (
                <div
                    onClick={() => setIsMenu(false)}
                    className="w-1/4 bg-[#000000ba]"
                />
            )}

            {/* Side Menu - rasmdagi dizayn bilan */}
            <div
                className={`w-3/4  h-full  bg-gray-50  transform transition-transform duration-300  ${isMenu ? 'translate-x-0' : '-translate-x-[150%]'}`}
                style={{
                    background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
                    boxShadow: '4px 0 15px rgba(0,0,0,0.1)'
                }}
            >
                {/* Header with number */}
                <div className="flex items-center justify-center pt-4">
                    <img className='h-fit' src={logo} alt={logo} />
                </div>

                {/* Menu items container */}
                <div className="p-4">
                    {/* Menu items list - rasmdagi tartibda */}
                    <div className="w-full flex flex-col gap-3">
                        {/* Item 1 with number */}
                        <div className="w-full py-4 px-1 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 text-sm w-8"><img src={userIcon} alt={userIcon} /></span>
                                <span className="text-gray-800 text-[16px]">Shaxsiy Ma'lumotlarim</span>
                            </div>
                        </div>

                        {/* Other items without numbers */}
                        <div className=" py-4 px-1 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer ">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 text-sm w-6"><img src={orderIcon} alt={orderIcon} /></span>
                                <span className="text-gray-800">Buyurtmalarim</span>
                            </div>
                        </div>

                        <div className="w-full py-4 px-1 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer ">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 text-sm w-6"><img src={mapIcon} alt={mapIcon} /></span>
                                <span className="text-gray-800">Joylashuvim</span>
                            </div>
                        </div>

                        <div className="w-full py-4 px-1 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 text-sm w-6"><img src={infoIcon} alt={infoIcon} /></span>
                                <span className="text-gray-800">Biz Haqimizda</span>
                            </div>
                        </div>

                        {/* Contact with phone number */}
                        <div className="w-full py-2 px-1 border border-gray-200 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer  flex items-center gap-2">
                            <span><img src={phoneIcon} alt={phoneIcon} /></span>
                            <div className="">
                                <span className="text-gray-800">Aloqa uchun</span>
                                <div className=" font-medium text-sm mt-1 pl-1">
                                    +7 747 540 70 78
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Separator line */}
                    <div className="my-8">
                        <div className="border-t border-gray-400"></div>
                    </div>

                    {/* Settings section */}
                    <div className="text-center py-4">
                        <div className="text-xl font-semibold  tracking-wide">
                            Settings
                        </div>
                    </div>
                </div>

                {/* Simple close button */}
                <button
                    onClick={() => setIsMenu()}
                    className="absolute top-2 right-5 w-[30px] h-[30px] flex justify-center items-center text-white text-2xl hover:text-gray-300   bg-red-500 rounded-full"
                >
                    ×
                </button>
            </div>
            </div>
        </div>
    );
};

export default SideMenuExact;