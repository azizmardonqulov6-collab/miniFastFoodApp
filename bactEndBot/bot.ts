import express from "express";
import { Telegraf } from "telegraf";
import cors from "cors";

const BOT_TOKEN = "8471525585:AAFpeJ7E35sjjQULGngqHQmgg2z7cmWTyOg";
const ADMIN_CHAT_ID = "5998041535";

const bot = new Telegraf(BOT_TOKEN);
const app = express();

app.use(cors());
app.use(express.json());

// Foydalanuvchilarning chat ID larini saqlash
const userChatIds = new Map();

app.post("/send-order", async (req, res) => {
  console.log("📥 Request keldi:", req.body);
  
  try {
    const { orderId, userName, PhoneNom, Adres, order, userTelegramId } = req.body;

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
    }

    const totalPrice = Array.isArray(order) 
      ? order.reduce((sum, item) => sum + (item.price * (item.Quontity || 1)), 0)
      : 0;

    const adminMessage = `
🧾 YANGI BUYURTMA

🆔 ID: ${orderId}
👤 Ism: ${userName}
📞 Telefon: ${PhoneNom}
📍 Manzil: ${Adres}

📋 BUYURTMALAR:
${orderText}

💰 JAMI SUMMA: ${totalPrice} so'm
`;

    const userMessage = `
✅ BUYURTMANGIZ QABUL QILINDI!

🆔 Buyurtma ID: ${orderId}
👤 Ism: ${userName}
📞 Telefon: ${PhoneNom}
📍 Manzil: ${Adres}

📋 BUYURTMALAR:
${orderText}

💰 JAMI SUMMA: ${totalPrice} so'm

🕐 Tez orada siz bilan bog'lanamiz!
`;

    console.log("📤 Admin ga xabar yuborilmoqda...");
    await bot.telegram.sendMessage(ADMIN_CHAT_ID, adminMessage);
    console.log("✅ Admin ga yuborildi!");

    // Foydalanuvchiga ham yuborish
    if (userTelegramId) {
      try {
        console.log(`📤 Foydalanuvchiga (${userTelegramId}) xabar yuborilmoqda...`);
        await bot.telegram.sendMessage(userTelegramId, userMessage);
        console.log("✅ Foydalanuvchiga yuborildi!");
      } catch (userError) {
        console.warn("⚠️ Foydalanuvchiga yuborib bo'lmadi:", userError);
      }
    } else {
      console.log("ℹ️ Foydalanuvchi Telegram ID si yo'q");
    }

    res.json({ success: true });
    
  } catch (error) {
    console.error("❌ XATOLIK:", error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server 3000-portda ishlayapti");
});

bot.launch()
  .then(() => {
    console.log("🤖 Bot muvaffaqiyatli ishga tushdi!");
  })
  .catch((err) => {
    console.error("❌ Bot ishga tushmadi:", err.message);
  });

// /start komandasi - foydalanuvchi o'z ID sini oladi
bot.start((ctx) => {
  const chatId = ctx.chat.id;
  ctx.reply(
    `Salom 👋 ${ctx.from.first_name}!\n\n` +
    `Buyurtma berish uchun websaytga o'ting va quyidagi ID ni kiriting:\n\n` +
    `🆔 Sizning Telegram ID: <code>${chatId}</code>\n\n` +
    `(ID ustiga bosib nusxalang)`,
    { parse_mode: 'HTML' }
  );
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));