import MapImg from '../assets/map/map.png'
import { useEffect, useState } from 'react';
import MapPicker from './MapPicker';
import { Link } from 'react-router-dom';
import { OpenStore , useUnser } from '../constanta/CardStorage';

interface Location {
  lat: number;
  lng: number;
}

export default function MapCom() {
  const [openMap, setOpenMap] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [address, setAddres] = useState<string>("");

  // ✅ Zustand store TO‘G‘RI JOYDA
  const {setOnsecses , setOrderBottomFalse , setCollect} = OpenStore();
  const { setAddress , Adres } : any = useUnser()
  async function getAddressFromCoords(lat: number, lon: number) {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
    );
    const data = await res.json();

    const road = data.address?.road;
    const neighbourhood = data.address?.neighbourhood;
    const city = data.address?.city || data.address?.town || data.address?.village;
    const county = data.address?.county;

    if (road) {
      setAddres(road);
    } else if (neighbourhood) {
      setAddres(neighbourhood);
    } else {
      setAddres(`${city || ""} ${county || ""}`.trim());
    }
  }

  // 📌 faqat location o‘zgarganda ishlaydi
  useEffect(() => {
    if (location) {
      getAddressFromCoords(location.lat, location.lng);
      setAddress(location.lat, location.lng)
      console.log(Adres);
    }
  }, [location]);

  const handleCLick = () =>{
      setOnsecses()
      setOrderBottomFalse()
      setCollect()
  }

  return (
    <div className='w-full h-screen flex flex-col gap-14'>
      <div className="flex gap-7 flex-col">
        <img src={MapImg} alt="Map illustration" />
        <div className="text-center">
          <h2 className='text-2xl'>Joylashuvni Kiritish</h2>
          <h3 className='text-xl'>Zakaz qayerga borishini kiritish</h3>
        </div>
      </div>

      <div className="w-full">
        {!openMap && !location && (
          <button
            onClick={() => setOpenMap(true)}
            className='w-full h-[50px] rounded-[10px] font-medium flex justify-center items-center text-[#43655A] border-2 border-[#43655A]'
          >
            📍 Joylashuv kiritish
          </button>
        )}

        {openMap && (
          <div className="fixed inset-0 z-50 bg-white">
            <MapPicker
              onSelect={(pos: Location) => {
                setLocation(pos);
                setOpenMap(false);
              }}
            />
          </div>
        )}

        {location && (
          <div className="flex flex-col gap-4">
            {/* ✅ MUAMMO SHU YERDA HAL BO‘LDI */}
            <Link
              to="/"
              onClick={handleCLick}
              className='w-full h-[50px] rounded-[10px] font-medium flex justify-center items-center text-white bg-[#43655A]'
            >
              Joylashuv tanlandi
            </Link>

            <p className="text-center text-gray-600">
              📍 {address || "Manzil aniqlanmoqda..."}
            </p>

            <p className="text-center text-gray-500 text-sm">
              Koordinatalar: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
            </p>

            <button
              onClick={() => {
                setLocation(null);
                setOpenMap(true);
              }}
              className='w-full h-[50px] rounded-[10px] font-medium flex justify-center items-center text-[#43655A] border-2 border-[#43655A]'
            >
              🔄 Joylashuvni o‘zgartirish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
