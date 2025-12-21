import express from "express";
import { Telegraf } from "telegraf";
import cors from "cors";

const BOT_TOKEN = "8471525585:AAFpeJ7E35sjjQULGngqHQmgg2z7cmWTyOg";
const ADMIN_CHAT_ID = "5998041535";

const bot = new Telegraf(BOT_TOKEN);
const app = express();

app.use(cors());
app.use(express.json());

/**
 * Frontend buyurtma yuboradi
 */
app.post("/send-order", async (req, res) => {
  const { orderId, userName, PhoneNom, Adres, userChatId } = req.body;

  const message = `
🧾 YANGI BUYURTMA

🆔 ID: ${orderId}
👤 Ism: ${userName}
📞 Telefon: ${PhoneNom}
📍 Joylashuv:
${Adres}
`;

  try {
    // ✅ USER GA
    await bot.telegram.sendMessage(userChatId, message);

    // ✅ ADMIN GA
    await bot.telegram.sendMessage(ADMIN_CHAT_ID, message);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

bot.launch();
app.listen(3000, () =>
  console.log("🚀 Server 3000-portda ishlayapti")
);
bot.start((ctx) => {
  const chatId = ctx.chat.id;

  ctx.reply(
    `Salom 👋\nBuyurtma berishingiz mumkin.\n\n🆔 Sizning ID: ${chatId}`
  );
});