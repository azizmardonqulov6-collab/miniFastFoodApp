import { FaCheckCircle } from "react-icons/fa";
import { useUnser } from '../constanta/CardStorage'
export default function Secses({Secsess} : any) {
  const {userName} : any = useUnser();
  return (
    <div className={`select w-full fixed h-fit top-[10%]  z-100 justify-center items-end inset-0 pr-2 transition duration-75 ${Secsess ? "fixed  left-[38%]" : "left-[-100%]"}`}>
      <div className="w-[350px] h-fit relative   flex  items-center">
        <div className="w-full h-50px flex flex-col gap-1 top-0 shadow shadow-gray-200 border-y-1 border-gray-300 bg-white pr-4 p-3">
          <div className="flex gap-3">
            <FaCheckCircle className="text-xl text-green-700" />
            <h3 className="text-green-700 text-l">Buyurma Qabul qilindi {userName}</h3>
          </div>
          <p className="text-sm text-gray-400">Tez orada siz bilan bog'lanishadi</p>
        </div>
      </div>
    </div>
  )
}
