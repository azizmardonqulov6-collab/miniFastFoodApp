import deleteImg from '../assets/image/rent/fluent_delete-24-filled.png'
import BackImg from '../assets/image/rent/mingcute_left-fill.png'
import { Link } from "react-router-dom"
export default function SecendHeader({ handleBack, handleClearCart, name }: any | string) {
    return (
        <div className="w-full bg-white  flex items-center justify-between border-b-2 border-[#A9BCB6] pb-4">
            <Link to="/"
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
                <img className='w-[25px]' src={BackImg} alt={BackImg} />
            </Link>
            <h1 className="text-xl text-gray-800">{name}</h1>
            {name == "Savatcha" ? <button
                onClick={handleClearCart}
                className="p-2 hover:bg-red-50 rounded-full transition-colors"
            >
                <img className='w-[25px]' src={deleteImg} alt={deleteImg} />
            </button>           
             : <span></span>}
        </div>
    )
}
