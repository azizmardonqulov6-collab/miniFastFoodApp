import express from "express";
import { Telegraf } from "telegraf";
import cors from "cors";

const BOT_TOKEN = "8471525585:AAFpeJ7E35sjjQULGngqHQmgg2z7cmWTyOg";
const ADMIN_CHAT_ID = "5998041535";

const bot = new Telegraf(BOT_TOKEN);
const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-order", async (req, res) => {
  console.log("📥 Request keldi:", req.body);
  
try {
  const { orderId, userName, PhoneNom, Adres, order } = req.body;

  // Buyurtmalarni formatlash
  let orderText = '';
  if (Array.isArray(order) && order.length > 0) {
    orderText = order.map((item, index) => `
${index + 1}. ${item.name}
   💰 Narxi: ${item.price} so'm
   📦 Soni: ${item.Quontity || 1}
   💵 Jami: ${(item.price * (item.Quontity || 1))} so'm
   📝 Tarkibi: ${item.ingredients || 'Yo\'q'}
`).join('\n');
  } else {
    orderText = 'Buyurtma ma\'lumotlari topilmadi';
  }

  // Umumiy summa hisoblash
  const totalPrice = Array.isArray(order) 
    ? order.reduce((sum, item) => sum + (item.price * (item.Quontity || 1)), 0)
    : 0;

  const message = `
🧾 YANGI BUYURTMA

🆔 ID: ${orderId}
👤 Ism: ${userName}
📞 Telefon: ${PhoneNom}
📍 Manzil: ${Adres}

📋 BUYURTMALAR:
${orderText}

💰 JAMI SUMMA: ${totalPrice} so'm
`;

  console.log("📤 Admin ga xabar yuborilmoqda...");
  
  await bot.telegram.sendMessage(ADMIN_CHAT_ID, message);
  
  console.log("✅ Xabar muvaffaqiyatli yuborildi!");

  res.json({ success: true });
  
} catch (error) {
    console.error("❌ XATOLIK:", error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Server ni ishga tushirish
app.listen(3000, () => {
  console.log("🚀 Server 3000-portda ishlayapti");
});

// Bot ni ishga tushirish
bot.launch()
  .then(() => {
    console.log("🤖 Bot muvaffaqiyatli ishga tushdi!");
  })
  .catch((err) => {
    console.error("❌ Bot ishga tushmadi:", err.message);
  });

// Bot /start komandasi
bot.start((ctx) => {
  const chatId = ctx.chat.id;
  ctx.reply(
    `Salom 👋\nBuyurtma berish uchun websaytga o'ting.\n\n🆔 Sizning Telegram ID: ${chatId}`
  );
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));