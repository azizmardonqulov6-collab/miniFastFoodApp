import Header from '../conpanents/Header.tsx'
import Swiper from '../conpanents/Swiper.tsx'
import Groups from '../conpanents/Groups.tsx'

export default function Home() {
  return (
    <div className='px-3'>
        <h1 className='text-center text-gray-300 pt-2  pb-5'>@fastfood500bot</h1>
        <Header />
        <Swiper />
        <Groups />
    </div>
  )
}
