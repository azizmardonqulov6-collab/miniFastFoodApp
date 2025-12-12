import { Swiper, SwiperSlide } from 'swiper/react';
import burgerCombo from '../assets/swiper/burger-conbo.png'
import lavashCombo from '../assets/swiper/lavash-conbo.png'

// SWIPER MODULLARI
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

const MySwiperComponent = () => {
  return (
    <div className='mb-6 pt-3'>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet custom-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active',
        }}
        scrollbar={{ draggable: true }}
        className="myCustomSwiper"
      >
        <SwiperSlide>
          <div className="w-full h-[280px] flex flex-col text-center justify-start items-center bg-black rounded-[20px] relative pt-[20px]">
            <div className="flex flex-col gpa-1 relative z-10">
              <h3 className='text-white text-xl text-center'>Bir Kishilk Kombo</h3>
              <h4 className='text-[#DADDE2] bg-black rounded-xl'>Dvaynoy chiz burger , free va 0.5 cola</h4>
            </div>
            <img className='bottom-[-50px] absolute' src={burgerCombo} alt="Burger Combo 2" />
            <span className='px-4 py-0 text-white font-bold absolute top-[20px] left-[20px] bg-[#FF6C14] rounded-2xl'>-10</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>

          <div className="w-full h-[280px] flex flex-col text-center justify-start items-center bg-black rounded-[20px] relative pt-[20px]">
            <div className="flex flex-col gpa-1 relative z-10">
              <h3 className='text-white text-xl text-center'>Bir Kishilk Kombo</h3>
              <h4 className='text-[#DADDE2] bg-black rounded-xl'>Dvaynoy chiz burger , free va 0.5 cola</h4>
            </div>
            <img className='bottom-[-50px] absolute' src={lavashCombo} alt="Burger Combo 2" />
            <span className='px-4 py-0 text-white font-bold absolute top-[20px] left-[20px] bg-[#FF6C14] rounded-2xl'>-10</span>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MySwiperComponent;