import MapImg from '../assets/map/map.png'
import { useState } from 'react';
import MapPicker from './MapPicker';

interface Location {
    lat: number;
    lng: number;
}

export default function MapCom() {
    const [openMap, setOpenMap] = useState(false);
    const [location, setLocation] = useState<Location | null>(null);

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
                        className='w-full h-[50px] rounded-[10px] font-medium flex justify-center items-center text-[#43655A] border-2 border-[#43655A] cursor-pointer hover:bg-[#43655A] hover:text-white transition-colors'
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
                                console.log("Tanlandi:", pos);
                            }}
                        />
                    </div>
                )}

                {location && (
                    <div className="flex flex-col gap-4">
                        <div className='w-full h-[50px] rounded-[10px] font-medium flex justify-center items-center text-white bg-[#43655A]'>
                            ✓ Joylashuv tanlandi
                        </div>
                        <p className="text-center text-gray-600">
                            Koordinatalar: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                        </p>
                        <button
                            onClick={() => {
                                setLocation(null);
                                setOpenMap(true);
                            }}
                            className='w-full h-[50px] rounded-[10px] font-medium flex justify-center items-center text-[#43655A] border-2 border-[#43655A] cursor-pointer hover:bg-[#43655A] hover:text-white transition-colors'
                        >
                            🔄 Joylashuvni o'zgartirish
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}