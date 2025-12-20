import loaderGif from '../assets/loader/foodGif.gif' 
export default function Loader({loader} : any) {
  return (
    <div className={`select w-full h-screen fixed left-0 z-100 flex  justify-center items-end inset-0 pr-[10px] ${loader ? 'top-0' : 'top-[-100vh]'}`}>
      <div className="w-[370px] h-full relative bg-white flex justify-center items-center ">
          <span className='w-[300px] h-[300px] flex flex-col justify-center items-center'>
            <img className='w-[370px] ' src={loaderGif} alt={loaderGif} />
            <span className='text-center text-xl'>Yuklanmoqda ...</span>
          </span>
      </div>
    </div>
  )
}
