import SecendHeader from '../conpanents/SecendHeader';
import Logo from '../assets/logo.png'
export default function RestaurantPage() {
  const workingHours = [
    { day: "Dushanba", hours: "06:00 - 00:00" },
    { day: "Seshanba", hours: "06:00 - 00:00" },
    { day: "Chorshanba", hours: "06:00 - 00:00" },
    { day: "Payshanba", hours: "06:00 - 00:00" },
    { day: "Juma", hours: "06:00 - 00:00" },
    { day: "Shanba", hours: "06:00 - 00:00" },
    { day: "Yakshanba", hours: "Dam Olish" }
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
     <SecendHeader name="Biz Haqimizda"/>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <img src={Logo} alt="" />
          </div>

          <h2 className="text-xl font-bold mb-2">FastFod500 Samarqand/Urqut</h2>
          
          <p className="text-center text-gray-500 text-sm leading-relaxed px-2">
            FastFod500 Uzbekistan Urqut. "Biz Fast Food Tayyorlamaymiz, Biz Yaxshi Ovqatni Tezroq Tayyorlashga Harakat Qilamiz!
          </p>
        </div>

        {/* Working Hours Section */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Ish Vaqti</h3>
          
          <div className="space-y-3">
            {workingHours.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-700">{item.day}</span>
                <span className={`font-semibold ${item.hours === "Dam Olish" ? "text-gray-700" : "text-black"}`}>
                  {item.hours}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}