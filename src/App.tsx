import Header from './conpanents/Header.tsx'
import Swiper from './conpanents/Swiper.tsx'
import Groups from './conpanents/Groups.tsx'

export default function App() {
  return (
    <div className="w-full flex justify-center ">
      <div className='App w-[400px] px-6 py-6 flex flex-col gap-4 relative'>
        <Header />
        <Swiper />
        <Groups />
      </div>
    </div>
  )
}
