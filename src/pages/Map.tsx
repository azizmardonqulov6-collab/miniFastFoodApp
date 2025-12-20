import MapCom from "../conpanents/MapCom.tsx";
import SecendHeader from "../conpanents/SecendHeader";
import { useStore } from '../constanta/CardStorage.ts'
import { useState } from "react";
import Loader from '../conpanents/Loader.tsx'
export default function Map() {
    const { removeOrder }: any = useStore();
    const [loader, setLoader] = useState<boolean>(true);
    setTimeout(() => {
        setLoader(false)
        console.log(loader);
    }, 2000)
    const handleBack = (): void => {
        removeOrder()
    };

    return (
        <div>
             {loader && <Loader />} 
            <SecendHeader name="Xarita ko’rsatish" handleBack={handleBack} />
            <MapCom />
        </div>
    )
}
