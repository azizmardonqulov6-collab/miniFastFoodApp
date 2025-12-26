import { Swiper, SwiperSlide } from 'swiper/react';
import burgerCombo from '../assets/swiper/burger-conbo.png'
import lavashCombo from '../assets/swiper/lavash-conbo.png'

// SWIPER MODULLARI
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';

const MySwiperComponent = () => {
  return (
    <div className='mb-6 pt-3 relative z-0'>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet custom-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active',
        }}
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="myCustomSwiper"
      >
        <SwiperSlide>
          <div className="w-full h-[280px] flex flex-col text-center justify-start items-center bg-black rounded-[20px] pt-[10px]">
            <div className="flex flex-col">
              <h3 className='text-white text-xl text-center'>Bir Kishilk Kombo</h3>
              <h4 className='text-[#DADDE2] bg-black rounded-xl'>Dvaynoy chiz burger , free va 0.5 cola</h4>
            </div>
            <img className='bottom-[-50px] absolute' src={burgerCombo} alt="Burger Combo" />
            <span className='px-4 py-0 text-white font-bold absolute top-[20px] left-[20px] bg-[#FF6C14] rounded-2xl'>-10%</span>
          </div>
        </SwiperSlide>
        
        <SwiperSlide>
          <div className="w-full h-[280px] flex flex-col text-center justify-start items-center bg-black rounded-[20px] pt-[20px]">
            <div className="flex flex-col gap-1">
              <h3 className='text-white text-xl text-center'>Bir Kishilk Kombo</h3>
              <h4 className='text-[#DADDE2] bg-black rounded-xl'>Dvaynoy chiz burger , free va 0.5 cola</h4>
            </div>
            <img className='bottom-[-50px] absolute' src={lavashCombo} alt="Lavash Combo" />
            <span className='px-4 py-0 text-white font-bold absolute top-[20px] left-[20px] bg-[#FF6C14] rounded-2xl'>-10%</span>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-full h-[280px] flex flex-col text-center justify-center items-center bg-gradient-to-br from-black to-blue-950 rounded-[20px] relative overflow-hidden">
            {/* Orqa fon rasmi */}
            <div className="absolute inset-0 opacity-20">
              <img 
                src="https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&q=80" 
                alt="Delivery background" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Qo'shimcha dekorativ elementlar */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full"></div>
            </div>
            
            <div className="flex flex-col gap-3 z-10 relative">
              <div className="text-6xl">🚚</div>
              <h3 className='text-white text-2xl font-bold text-center drop-shadow-lg'>Yetkazib Berish Bepul!</h3>
              <h4 className='text-white text-lg px-4 drop-shadow-md'>50,000 so'mdan yuqori buyurtmalarga</h4>
              <p className='text-white/90 text-sm mt-2 drop-shadow-md'>Tez va xavfsiz yetkazib berish xizmati</p>
            </div>
            <span className='px-4 py-1 text-white font-bold absolute top-[20px] right-[20px] bg-red-500 rounded-2xl text-sm shadow-lg'>BEPUL</span>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MySwiperComponent;