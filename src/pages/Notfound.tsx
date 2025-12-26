import SecendHeader from "../conpanents/SecendHeader";
import notFOund from '../assets/image/notFound.png'

export default function notFound() {
    return (
        // Not found page
        <div className="notFound w-full h-screen flex flex-col items-start">
               <SecendHeader name="Eror 404" />
                <div className='w-full h-screen flex flex-col grow gap-5 justify-center items-center'>
                    <img className='w-[150px]' src={notFOund} alt={notFOund} />
                    <h2 className='text-xl'>Hech Narsa Topilmadi</h2>
                </div>
        </div>
    )
}
