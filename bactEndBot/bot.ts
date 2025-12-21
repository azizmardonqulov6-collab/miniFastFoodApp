import express from "express";
import { Telegraf, Markup } from "telegraf";
import cors from "cors";

const BOT_TOKEN = "8471525585:AAFpeJ7E35sjjQULGngqHQmgg2z7cmWTyOg";
const ADMIN_CHAT_ID = "5998041535";
const WEBAPP_URL = "https://mini-fast-food-app.vercel.app/"; // Frontendingiz deploy qilingan URL

const bot = new Telegraf(BOT_TOKEN);
const app = express();

app.use(cors({
  origin: '*', // Yoki aniq URL: 'http://localhost:5173'
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

const users = new Map();

// Asosiy menyu tugmalari - WebApp tugmasi bilan
const mainMenu = Markup.keyboard([
  [Markup.button.webApp('🍔 Buyurtma berish', WEBAPP_URL)],
  ['📋 Mening buyurtmalarim'],
  ['📞 Bog\'lanish', 'ℹ️ Ma\'lumot']
]).resize();

bot.on('contact', (ctx) => {
  const contact = ctx.message.contact;
  const chatId = ctx.chat.id;
  const phoneNumber = contact.phone_number;
  
  users.set(phoneNumber, {
    chatId: chatId,
    name: contact.first_name,
    phone: phoneNumber
  });
  
  console.log(`✅ Yangi foydalanuvchi qo'shildi: ${phoneNumber} (ID: ${chatId})`);
  
  ctx.reply(
    `✅ Rahmat! Sizning telefon raqamingiz ro'yxatga olindi.\n\n` +
    `Endi "🍔 Buyurtma berish" tugmasini bosib buyurtma bering!\n` +
    `Buyurtmalar haqida xabarlar shu yerga keladi! 🎉`,
    mainMenu
  );
});

bot.start((ctx) => {
  const chatId = ctx.chat.id;
  
  ctx.reply(
    `Salom 👋 ${ctx.from.first_name}!\n\n` +
    `Buyurtmalaringiz haqida xabar olish uchun telefon raqamingizni yuboring 👇`,
    Markup.keyboard([
      [Markup.button.contactRequest("📱 Telefon raqamni yuborish")]
    ]).resize().oneTime()
  );
});

// Inline tugma bilan ham qo'shish mumkin
bot.hears('🍔 Buyurtma berish', (ctx) => {
  ctx.reply(
    `🍔 Buyurtma berish uchun tugmani bosing 👇`,
    Markup.inlineKeyboard([
      [Markup.button.webApp('🌐 Mini App da ochish', WEBAPP_URL)]
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
    `📧 Email: info@restaurant.uz\n` +
    `📍 Manzil: Samarqand sh., Urgur tumani\n\n` +
    `Ish vaqti: 24 soat (har kuni)`
  );
});

bot.hears('ℹ️ Ma\'lumot', (ctx) => {
  ctx.reply(
    `ℹ️ Biz haqimizda:\n\n` +
    `🍔 Eng mazali taomlar\n` +
    `🚚 Tez yetkazib berish (30-40 daqiqa)\n` +
    `💳 Naqd va onlayn to'lov\n` +
    `⭐️ Sifatli xizmat\n\n` +
    `Buyurtma berish uchun "🍔 Buyurtma berish" tugmasini bosing!`
  );
});

bot.on('text', (ctx) => {
  ctx.reply(
    `Kechirasiz, men sizni tushunmadim 🤔\n\n` +
    `Iltimos, quyidagi tugmalardan birini tanlang:`,
    mainMenu
  );
});

app.post("/send-order", async (req, res) => {
  console.log("📥 Request keldi:", req.body);
  
  try {
    const { orderId, userName, PhoneNom, Adres, order } = req.body;

    // PhoneNom ni string ga aylantirish
    const phoneStr = String(PhoneNom || '');
    
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

    console.log("📤 Admin ga xabar yuborilmoqda...");
    await bot.telegram.sendMessage(ADMIN_CHAT_ID, adminMessage);
    console.log("✅ Admin ga yuborildi!");

    // Telefon raqamini tozalash (faqat raqamlar)
    const cleanPhone = phoneStr.replace(/\D/g, '');
    let userFound = false;
    
    console.log(`🔍 Telefon raqami: ${phoneStr} -> Tozalangan: ${cleanPhone}`);
    
    if (cleanPhone.length >= 9) { // Telefon raqam mavjud bo'lsa
      for (const [savedPhone, userData] of users.entries()) {
        const cleanSavedPhone = savedPhone.replace(/\D/g, '');
        
        console.log(`🔍 Tekshirilmoqda: ${savedPhone} -> ${cleanSavedPhone}`);
        
        // Telefon raqamlari mos kelsa
        if (cleanSavedPhone.includes(cleanPhone) || cleanPhone.includes(cleanSavedPhone)) {
          try {
            console.log(`📤 Foydalanuvchiga (${userData.chatId}) xabar yuborilmoqda...`);
            await bot.telegram.sendMessage(userData.chatId, userMessage);
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
      console.log(`ℹ️ Saqlangan foydalanuvchilar soni: ${users.size}`);
    }

    res.json({ success: true });
    
  } catch (error: any) {
    console.error("❌ XATOLIK:", error);
    console.error("❌ Stack trace:", error.stack);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

bot.command('users', (ctx) => {
  if (ctx.chat.id.toString() === ADMIN_CHAT_ID) {
    if (users.size === 0) {
      ctx.reply("Hozircha ro'yxatga olingan foydalanuvchilar yo'q");
    } else {
      let userList = `👥 Ro'yxatga olingan foydalanuvchilar (${users.size}):\n\n`;
      users.forEach((userData, phone) => {
        userList += `👤 ${userData.name}\n📞 ${phone}\n🆔 ${userData.chatId}\n\n`;
      });
      ctx.reply(userList);
    }
  }
});

bot.command('menu', (ctx) => {
  ctx.reply('📋 Asosiy menyu:', mainMenu);
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

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));