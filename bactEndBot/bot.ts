import express from "express";
import { Telegraf, Markup } from "telegraf";
import cors from "cors";

const BOT_TOKEN = "8471525585:AAFpeJ7E35sjjQULGngqHQmgg2z7cmWTyOg";
const ADMIN_CHAT_ID = "5998041535";
// TODO: Frontend deploy qilingandan keyin bu URLni o'zgartiring
const WEBAPP_URL = "https://your-app.vercel.app"; // Vercel URL ni bu yerga yozing

const bot = new Telegraf(BOT_TOKEN);
const app = express();

// CORS - Frontend URL ini qo'shing
app.use(cors({
  origin: [
    'https://your-app.vercel.app', // Frontend URL (deploy qilingandan keyin)
    'http://localhost:5173',
    'http://localhost:5174'
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Foydalanuvchilarni saqlash
const users = new Map(); // { phoneNumber: { chatId, name, phone } }

// Asosiy menyu tugmalari
const mainMenu = Markup.keyboard([
  [Markup.button.webApp('🍔 Buyurtma berish', WEBAPP_URL)],
  ['📋 Mening buyurtmalarim'],
  ['📞 Bog\'lanish', 'ℹ️ Ma\'lumot']
]).resize();

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server ishlayapti!',
    timestamp: new Date(),
    users: users.size
  });
});

// Telefon raqam yuborilganda
bot.on('contact', (ctx) => {
  const contact = ctx.message.contact;
  const chatId = ctx.chat.id;
  const phoneNumber = contact.phone_number;
  
  // Foydalanuvchini saqlash
  users.set(phoneNumber, {
    chatId: chatId,
    name: contact.first_name,
    phone: phoneNumber,
    username: ctx.from.username || ''
  });
  
  console.log(`✅ Yangi foydalanuvchi: ${phoneNumber} (ID: ${chatId})`);
  
  ctx.reply(
    `✅ Rahmat ${contact.first_name}!\n\n` +
    `Telefon raqamingiz ro'yxatga olindi.\n` +
    `Endi "🍔 Buyurtma berish" tugmasini bosib buyurtma bering!\n\n` +
    `Buyurtmalar haqida xabarlar shu yerga keladi 🎉`,
    mainMenu
  );
});

// /start komandasi
bot.start((ctx) => {
  const chatId = ctx.chat.id;
  const firstName = ctx.from.first_name;
  
  ctx.reply(
    `Salom 👋 ${firstName}!\n\n` +
    `Mini ilovamizga xush kelibsiz!\n` +
    `Buyurtmalaringiz haqida xabar olish uchun telefon raqamingizni yuboring 👇`,
    Markup.keyboard([
      [Markup.button.contactRequest("📱 Telefon raqamni yuborish")]
    ]).resize().oneTime()
  );
});

// Menu tugmalari uchun javoblar
bot.hears('🍔 Buyurtma berish', (ctx) => {
  ctx.reply(
    `🍔 Mini ilovani ochish uchun tugmani bosing 👇`,
    Markup.inlineKeyboard([
      [Markup.button.webApp('🌐 Mini App ni ochish', WEBAPP_URL)]
    ])
  );
});

bot.hears('📋 Mening buyurtmalarim', (ctx) => {
  ctx.reply(
    `📋 Buyurtmalaringiz tarixi:\n\n` +
    `Hozircha buyurtmalar yo'q.\n\n` +
    `Birinchi buyurtmangizni bering! 😊`
  );
});

bot.hears('📞 Bog\'lanish', (ctx) => {
  ctx.reply(
    `📞 Biz bilan bog'lanish:\n\n` +
    `☎️ Telefon: +998 90 123 45 67\n` +
    `📧 Email: info@fastfood.uz\n` +
    `📍 Manzil: Toshkent sh., Chilonzor tumani\n\n` +
    `⏰ Ish vaqti: 09:00 - 22:00 (har kuni)`
  );
});

bot.hears('ℹ️ Ma\'lumot', (ctx) => {
  ctx.reply(
    `ℹ️ FastFood500 haqida:\n\n` +
    `🍔 Eng mazali taomlar\n` +
    `🚚 Tez yetkazib berish (30-40 daqiqa)\n` +
    `💳 Naqd va onlayn to'lov\n` +
    `⭐️ Sifatli xizmat\n\n` +
    `Buyurtma berish uchun "🍔 Buyurtma berish" tugmasini bosing!`
  );
});

// Boshqa matnlar uchun
bot.on('text', (ctx) => {
  ctx.reply(
    `Kechirasiz, men sizni tushunmadim 🤔\n\n` +
    `Iltimos, quyidagi tugmalardan birini tanlang:`,
    mainMenu
  );
});

// Buyurtma endpoint
app.post("/send-order", async (req, res) => {
  console.log("📥 Request keldi:", req.body);
  
  try {
    const { orderId, userName, PhoneNom, Adres, order } = req.body;

    // PhoneNom ni string ga aylantirish
    const phoneStr = String(PhoneNom || '');

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

    const totalPrice = Array.isArray(order) 
      ? order.reduce((sum, item) => sum + (item.price * (item.Quontity || 1)), 0)
      : 0;

    const adminMessage = `
🧾 YANGI BUYURTMA

🆔 ID: ${orderId}
👤 Ism: ${userName}
📞 Telefon: ${phoneStr}
📍 Manzil: ${Adres}

📋 BUYURTMALAR:
${orderText}

💰 JAMI SUMMA: ${totalPrice} so'm
`;

    const userMessage = `
✅ BUYURTMANGIZ QABUL QILINDI!

🆔 Buyurtma ID: ${orderId}
👤 Ism: ${userName}
📞 Telefon: ${phoneStr}
📍 Manzil: ${Adres}

📋 BUYURTMALAR:
${orderText}

💰 JAMI SUMMA: ${totalPrice} so'm

🕐 Tez orada siz bilan bog'lanamiz!
`;

    // Admin ga yuborish
    console.log("📤 Admin ga xabar yuborilmoqda...");
    await bot.telegram.sendMessage(ADMIN_CHAT_ID, adminMessage);
    console.log("✅ Admin ga yuborildi!");

    // Telefon raqami bo'yicha foydalanuvchini topish
    const cleanPhone = phoneStr.replace(/\D/g, '');
    let userFound = false;
    
    console.log(`🔍 Telefon qidirilmoqda: ${phoneStr} -> Tozalangan: ${cleanPhone}`);
    console.log(`📊 Saqlangan foydalanuvchilar: ${users.size}`);
    
    if (cleanPhone.length >= 9) {
      for (const [savedPhone, userData] of users.entries()) {
        const cleanSavedPhone = savedPhone.replace(/\D/g, '');
        
        console.log(`🔍 Taqqoslash: ${savedPhone} (${cleanSavedPhone}) vs ${phoneStr} (${cleanPhone})`);
        
        // Telefon raqamlari mos kelsa
        if (cleanSavedPhone.includes(cleanPhone) || cleanPhone.includes(cleanSavedPhone)) {
          try {
            console.log(`📤 Foydalanuvchiga (${userData.chatId}) xabar yuborilmoqda...`);
            await bot.telegram.sendMessage(userData.chatId, userMessage, mainMenu);
            console.log("✅ Foydalanuvchiga yuborildi!");
            userFound = true;
            break;
          } catch (userError: any) {
            console.warn("⚠️ Foydalanuvchiga yuborib bo'lmadi:", userError.message);
          }
        }
      }
    }
    
    if (!userFound) {
      console.log("ℹ️ Foydalanuvchi topilmadi yoki botga start bosmagan");
    }

    res.json({ success: true, message: 'Buyurtma qabul qilindi' });
    
  } catch (error: any) {
    console.error("❌ XATOLIK:", error);
    console.error("❌ Stack:", error.stack);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Server xatosi'
    });
  }
});

// Admin uchun - saqlangan foydalanuvchilar
bot.command('users', (ctx) => {
  if (ctx.chat.id.toString() === ADMIN_CHAT_ID) {
    if (users.size === 0) {
      ctx.reply("Hozircha ro'yxatga olingan foydalanuvchilar yo'q");
    } else {
      let userList = `👥 Ro'yxatga olingan foydalanuvchilar (${users.size}):\n\n`;
      users.forEach((userData, phone) => {
        userList += `👤 ${userData.name}\n`;
        userList += `📞 ${phone}\n`;
        userList += `🆔 ${userData.chatId}\n`;
        if (userData.username) userList += `👤 @${userData.username}\n`;
        userList += `\n`;
      });
      ctx.reply(userList);
    }
  } else {
    ctx.reply("Bu komanda faqat admin uchun!");
  }
});

// Menu ni qayta ko'rsatish
bot.command('menu', (ctx) => {
  ctx.reply('📋 Asosiy menyu:', mainMenu);
});

// Server ni ishga tushirish
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT}-portda ishlayapti`);
});

// Bot ni ishga tushirish
bot.launch()
  .then(() => {
    console.log("🤖 Bot muvaffaqiyatli ishga tushdi!");
    console.log("📋 Saqlangan foydalanuvchilar:", users.size);
  })
  .catch((err) => {
    console.error("❌ Bot ishga tushmadi:", err.message);
  });

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));