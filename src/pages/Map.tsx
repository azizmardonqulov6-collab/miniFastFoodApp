import MapCom from "../conpanents/MapCom.tsx";
import SecendHeader from "../conpanents/SecendHeader";
import { useStore } from '../constanta/CardStorage.ts'
export default function Map() {
    const { removeOrder }: any = useStore();
    const handleBack = (): void => {
        removeOrder()
    };

    return (
        <div>
            <SecendHeader name="Xarita ko’rsatish" handleBack={handleBack} />
            <MapCom />
        </div>
    )
}
