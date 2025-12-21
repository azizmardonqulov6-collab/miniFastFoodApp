import { FaCheckCircle } from "react-icons/fa";
export default function Secses() {
  return (
    <div className="select w-full h-fit top-[20%] fixed  left-[30%] z-100 hidden  justify-center items-end inset-0 pr-2">
      <div className="w-[350px] h-fit relative  flex  items-center">
        <div className="w-full h-50px flex flex-col gap-1 top-0 shadow-2xl shadow-gray-400 border-y-1 border-gray-300 bg-white pr-4 p-3">
          <div className="flex gap-3">
            <FaCheckCircle className="text-xl text-green-700" />
            <h3 className="text-green-700">Buyurma Qabul qilindi</h3>
          </div>
          <p className="text-sm text-gray-400">Tez orada siz bilan bog'lanishadi</p>
        </div>
      </div>
    </div>
  )
}
