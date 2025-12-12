import { BrowserRouter , Routes , Route } from "react-router-dom"
import Home from "./pages/Home"
import Order from './pages/Order'
export default function App() {
  return (
    <div className="w-full flex justify-center bg-white ">
      <div className='App w-[380px] px-6 py-6 flex flex-col gap-4 relative'>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/order" element={<Order />} />
            </Routes>
          </BrowserRouter>
      </div>
    </div>
  )
}
