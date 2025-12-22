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

// Bot /start komandasi
bot.start((ctx) => {
  const chatId = ctx.chat.id;
  ctx.reply(
    `Salom 👋\nBuyurtma berish uchun websaytga o'ting.\n\n🆔 Sizning Telegram ID: ${chatId}`
  );
});

// Bot xatolarini qayta ishlash
bot.catch((err, ctx) => {
  console.error(`❌ Bot xatosi ${ctx.updateType}:`, err);
});

// Server va botni ishga tushirish
async function startServer() {
  try {
    // Botni ishga tushirish
    await bot.launch();
    console.log("🤖 Bot muvaffaqiyatli ishga tushdi!");

    // Serverni ishga tushirish
    const PORT = process.env.PORT || 3000;
    const HOST = '0.0.0.0'; // Render uchun muhim
    
    app.listen(PORT , HOST, () => {
      console.log(`🚀 Server ${HOST}:${PORT} da ishlayapti`);
    });
    
  } catch (error) {
    console.error("❌ Server ishga tushmadi:", error);
    process.exit(1);
  }
}

// Graceful shutdown
process.once('SIGINT', () => {
  console.log("🛑 SIGINT signal qabul qilindi, server yopilmoqda...");
  bot.stop('SIGINT');
  process.exit(0);
});

process.once('SIGTERM', () => {
  console.log("🛑 SIGTERM signal qabul qilindi, server yopilmoqda...");
  bot.stop('SIGTERM');
  process.exit(0);
});

// Ishga tushirish
startServer();