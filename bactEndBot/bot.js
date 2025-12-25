import express from "express";
import { Telegraf, Markup } from "telegraf";
import cors from "cors";

const BOT_TOKEN = "8471525585:AAFpeJ7E35sjjQULGngqHQmgg2z7cmWTyOg";
const ADMIN_CHAT_ID = "5998041535";

const bot = new Telegraf(BOT_TOKEN);
const app = express();

// CORS - Telegram Mini App uchun maxsus sozlamalar
app.use(cors({
  origin: [
    'http://localhost:5173', // Vite dev server
    'http://localhost:5174', // Boshqa portlar
    'https://mini-fast-food-app-jhjr.vercel.app/', // Telegram Mini App URL (agar bo'lsa)
    'minifastfood500.azizmardonqulov6.workers.dev' // Production domain
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // 24 soat
}));

// ✅ OPTIONS so'rovlarini qayta ishlash (PREFLIGHT uchun)
app.options('*', cors());

// ✅ Barcha domainlarni ruxsat berish (TEST uchun)
// app.use(cors()); // Barcha domainlarni qabul qilish

app.use(express.json());

// ... qolgan kodlar

// Preflight so'rovlarini qayta ishlash
app.options('*', cors());

app.use(express.json());

// Foydalanuvchilarni saqlash
const users = new Map();

// TEST Endpoint
app.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Server ishlayapti!',
    timestamp: new Date().toISOString(),
    users: users.size
  });
});

// Buyurtma endpoint
app.post("/send-order", async (req, res) => {
  console.log("📥 Buyurtma keldi:", req.body);

  try {
    const { orderId, userName, PhoneNom, Adres, order, userTelegramId } = req.body;

    if (!userName || !PhoneNom || !Adres) {
      return res.status(400).json({
        success: false,
        error: "Ma'lumotlar to'liq emas"
      });
    }

    const phoneStr = String(PhoneNom || '');

    // Buyurtmalarni formatlash
    let orderText = '';
    let totalPrice = 0;

    if (Array.isArray(order) && order.length > 0) {
      orderText = order.map((item, index) => {
        const quantity = item.Quontity || 1;
        const itemTotal = item.price * quantity;
        totalPrice += itemTotal;

        return `
${index + 1}. ${item.name || 'Noma\'lum'}
   💰 Narxi: ${item.price} 000 so'm
   📦 Soni: ${quantity}
   💵 Jami: ${itemTotal} 000 so'm
   ${item.ingredients ? `📝 Tarkibi: ${item.ingredients}` : ''}
`;
      }).join('\n');
    } else {
      orderText = 'Buyurtma ma\'lumotlari topilmadi';
    }

    const adminMessage = `
🧾 YANGI BUYURTMA

🆔 ID: ${orderId}
👤 Ism: ${userName}
📞 Telefon: ${phoneStr}
📍 Manzil: ${Adres}
${userTelegramId ? `🆔 Telegram ID: ${userTelegramId}` : ''}

📋 BUYURTMALAR:
${orderText}

💰 JAMI SUMMA: ${totalPrice} 000 so'm
⏰ Vaqt: ${new Date().toLocaleString('uz-UZ')}
`;

    const userMessage = `
✅ BUYURTMANGIZ QABUL QILINDI!

🆔 Buyurtma ID: ${orderId}
👤 Ism: ${userName}
📞 Telefon: ${phoneStr}
📍 Manzil: ${Adres}

📋 BUYURTMALAR:
${orderText}

💰 JAMI SUMMA: ${totalPrice} 000 so'm

🕐 Tez orada siz bilan bog'lanamiz!
`;

    // Admin ga yuborish
    console.log("📤 Admin ga xabar yuborilmoqda...");
    await bot.telegram.sendMessage(ADMIN_CHAT_ID, adminMessage);
    console.log("✅ Admin ga yuborildi!");

    // Agar Telegram ID bo'lsa, foydalanuvchiga yuborish
    if (userTelegramId) {
      try {
        await bot.telegram.sendMessage(userTelegramId, userMessage);
        console.log("✅ Foydalanuvchiga Telegram orqali yuborildi!");
      } catch (userError) {
        console.warn("⚠️ Foydalanuvchiga yuborib bo'lmadi:", userError.message);
      }
    }

    // Telefon raqami orqali qidirish
    const cleanPhone = phoneStr.replace(/\D/g, '');
    let userFound = false;

    if (cleanPhone.length >= 9) {
      for (const [savedPhone, userData] of users.entries()) {
        const cleanSavedPhone = savedPhone.replace(/\D/g, '');

        if (cleanSavedPhone.includes(cleanPhone) || cleanPhone.includes(cleanSavedPhone)) {
          try {
            await bot.telegram.sendMessage(userData.chatId, userMessage);
            console.log("✅ Saqlangan foydalanuvchiga yuborildi!");
            userFound = true;
            break;
          } catch (error) {
            console.warn("⚠️ Saqlangan foydalanuvchiga yuborib bo'lmadi:", error.message);
          }
        }
      }
    }

    if (!userFound) {
      console.log("ℹ️ Foydalanuvchi topilmadi yoki botga start bosmagan");
    }

    res.json({
      success: true,
      message: 'Buyurtma qabul qilindi',
      orderId: orderId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("❌ XATOLIK:", error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server xatosi'
    });
  }
});

// Bot kodlari (oldingi kabi)...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT}-portda ishlayapti`);
});

// Bot ni ishga tushirish
const WEBHOOK_PATH = `/telegraf/${BOT_TOKEN}`;
const WEBHOOK_URL = `minifastfood500.azizmardonqulov6.workers.dev${WEBHOOK_PATH}`;

// webhook endpoint
app.use(bot.webhookCallback(WEBHOOK_PATH));

// webhook o‘rnatish
bot.telegram.setWebhook(WEBHOOK_URL)
  .then(() => console.log("✅ Webhook o‘rnatildi"))
  .catch(console.error);

app.post("/webhook", (req, res) => {
  bot.handleUpdate(req.body);
  res.sendStatus(200);
});