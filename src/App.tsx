import { BrowserRouter , Routes , Route } from "react-router-dom"
import Home from "./pages/Home"
import Order from './pages/Order'
import Map from "./pages/Map"
import Loader from "./conpanents/Loader"
import { useState  } from "react"
export default function App() {
  const [loader , setLoader] = useState<boolean>(true);
  setTimeout(() =>{
    setLoader(false)
    console.log(loader);
  } , 3000)


  return (
    <div className="w-full flex justify-center  bg-white ">
      <div className='App w-[380px] px-2 py-6 flex flex-col gap-4 relative'>
        <Loader loader={loader} />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home  />} />
              <Route path="/order" element={<Order />} />
              <Route path="/map" element={<Map  />} />
            </Routes>
          </BrowserRouter>
      </div>
    </div>
  )
}
