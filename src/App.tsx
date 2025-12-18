import { BrowserRouter , Routes , Route } from "react-router-dom"
import Home from "./pages/Home"
import Order from './pages/Order'
import Map from "./pages/Map"
import { useState } from "react"
export default function App() {
  return (
    <div className="w-full flex justify-center  bg-white ">
      <div className='App w-[380px] px-2 py-6 flex flex-col gap-4 relative'>
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
