import SecendHeader from '../conpanents/SecendHeader';
import { useState, useEffect } from 'react'
import { LuMoveRight } from "react-icons/lu";
import { useStore } from '../constanta/CardStorage.ts'
import diriver from '../assets/image/diriver.png'
import bag from '../assets/image/bag.png'
import bagWhite from '../assets/image/bag-white.png'
import PhoneNom from '../conpanents/PhoneNom.tsx'
import { Link, useParams } from 'react-router-dom';
import { OpenStore } from '../constanta/CardStorage.ts'

export default function Groups() {
    const tg = (window as any).Telegram.WebApp;

    useEffect(() => {
        tg.ready();
        tg.expand();

        if (tg.isVersionAtLeast('7.7')) {
            tg.disableVerticalSwipes();
        }
    }, [tg]);

    const [popApp, setPopApp] = useState(false);
    const [selectCot, setSelectCot] = useState<any[]>([]); 
    const [catName, setCatName] = useState<String>(""); 
    const { products, addToOrder, addSelect, selected, increaseQuantity, DescreaseQuantity, getOrderTotal }: any = useStore();
    const { phoneOpen, orderBottom, setOrderBottomTrue }: any = OpenStore()

    const { id } = useParams<{ id: string }>();

    // useEffect ni yuqoriga ko'chirdik
    useEffect(() => {
        if (id) {
            const foundVan = products.find((item: any) => item.id === Number(id));
            if (foundVan) {
                setSelectCot(foundVan.items || []); // items massivini olish
                setCatName(foundVan.name)
            }
        }
    }, [id, products]); // products ni dependency ga qo'shdik
    function HandleClick(item: any): void {
        addSelect(item);
        setPopApp(true);
    }

    function HandleDelite() {
        setPopApp(false);
    }

    function HandleInc(id: number): void {
        increaseQuantity(id)
    }

    function HandleDec(id: number): void {
        let item = selected.find((pro: any) => {
            return pro.id === id
        })

        if (!item) { return }

        if (item.Quontity > 1) {
            DescreaseQuantity(id);
        } else {
            console.log("Quantity 1 dan pastga tushmaydi");
        }
    }

    function HandleSubmit() {
        selected.forEach((pro: any) => {
            addToOrder(pro);
        })
        setPopApp(false)
        getOrderTotal()
        setOrderBottomTrue()
    }

    return (
        <div className="px-2">
            <div className="">
                <SecendHeader name={catName} />
            </div>
            <div className="w-full flex flex-col gap-10 counter ">
                {
                    selectCot.length > 0 && (
                        <div className='combolar-container Group flex flex-col gap-2 '>
                            <div className="w-fit cards flex flex-wrap gap-3 items-center justify-center">
                                {selectCot.map((item: any) => {
                                    return <div key={item.id}  onClick={() => HandleClick(item)}  className='w-[150px] h-fit flex flex-col gap-4 pt-4 pt-[70px]'>
                                            <div className="flex flex-col justify-center items-center gap-5 border-3 border-[#889FA5] rounded-[16px]">
                                                <div className="img h-[50px]">
                                                    <img className='w-[150px] h-fit relative -top-[60px]' src={item.image} alt={item.name} />
                                                </div>
                                                <div className="lable flex flex-col py-4 gap-1 text-center px-2">
                                                    <h3 className='text-[11px] text-black w-full'>{item.ingredients}</h3>
                                                    <h2 className='text-[12px] font-bold w-full'>{item.name}</h2>
                                                </div>
                                            </div>
                                            <span className='w-full py-3 bg-[#43655A] flex justify-center items-center text-white rounded-[16px]'>{item.price} 000</span>
                                        </div>
                                })}
                            </div>
                        </div>
                    )
                }

                <div className={`select w-full h-screen fixed left-0 z-50 flex justify-center items-end inset-0 transition-all duration-300 ${popApp ? "top-0" : "top-[-150vh]"}`}>
                    <div className="w-[380px] h-screen relative top-0 flex items-end">
                        <div onClick={() => HandleDelite()} className="w-full h-full bg-[#00000066] absolute left-0 top-0 cursor-pointer"></div>
                        {selected.map((pro: any) => {
                            return <div key={pro.id} className="PopApp w-full h-fit flex flex-col relative">
                                <div className="img w-full py-3 bg-[#DADDE2] rounded-t-[37px] flex justify-center">
                                    <img className='w-[220px]' src={pro.image} alt={pro.name} />
                                </div>
                                <div className="PopApp-lable w-full flex flex-col gap-[3px] h-max bg-white pt-[15px] px-[10px] rounded-b-[37px]">
                                    <h2 className='text-[18px] text-[#43655A]'>{pro.name}</h2>
                                    <h3 className='text-[17px] text-[#889FA5]'>{pro.ingredients}</h3>

                                    <span className='text-[17px] pt-2 pb-2'>{pro.price * pro.Quontity} 000 So'm</span>
                                    <span className='flex items-center gap-2 text-[17px]'>
                                        <img className='w-[35px]' src={diriver} alt="delivery" /> Dastavka bepul
                                    </span>
                                    <div className="w-full flex gap-2 justify-between py-[15px]">
                                        <span className='w-1/2 h-[54px] border-2 border-[#889FA5] rounded-full flex justify-between items-center px-[2px] py-[3px]'>
                                            <span onClick={() => HandleDec(pro.id)} className='w-[47px] h-[47px] rounded-full bg-[#8EA39C] flex justify-center items-center text-white cursor-pointer'>-</span>
                                            <span>{pro.Quontity}</span>
                                            <span onClick={() => HandleInc(pro.id)} className='w-[47px] h-[47px] rounded-full bg-[#43655A] flex justify-center items-center text-white cursor-pointer'>+</span>
                                        </span>
                                        <span onClick={() => HandleSubmit()} className='w-1/2 flex justify-between items-center px-[14px] bg-[#43655A] rounded-full text-[15px] text-white cursor-pointer'>
                                            <img className='w-[21px] h-fit' src={bag} alt="bag" /> Savatga solish
                                        </span>
                                    </div>
                                </div>
                                <span onClick={() => HandleDelite()} className='w-[40px] h-[40px] absolute top-[-5px] right-[10px] flex justify-center items-center font-bold text-xl bg-[red] text-white rounded-full cursor-pointer'>x</span>
                            </div>
                        })}
                    </div>
                </div>

                {orderBottom && <div className='order flex flex-col gap-3 fixed bottom-5 w-[350px]'>
                    <div className="order-rent bg-white border-1 border-[#43655A] px-5 py-3 rounded-[30px] flex flex-col gap-3">
                        <div className="flex justify-between items-center cursor-pointer">
                            <img className='w-[20px]' src={diriver} alt="delivery" />
                            <h3>Dastavka Bepul</h3>
                            <LuMoveRight />
                        </div>
                        <div className="cur">
                            <Link to="/order" className='w-full h-[50px] rounded-[10px] flex justify-between items-center bg-[#43655A] px-5'>
                                <img className='w-[20px] h-fit' src={bagWhite} alt="bag" />
                                <div className="text-white text-[17px]">{getOrderTotal()} 000 so'm</div>
                                <span></span>
                            </Link>
                        </div>
                        <h3 className='text-center text-[13px]'>Savatga solib rasmiylashtiring</h3>
                    </div>
                </div>}

                {phoneOpen && <PhoneNom />}
            </div>
        </div>
    )
}