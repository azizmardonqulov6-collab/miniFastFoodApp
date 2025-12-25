// worker.js - Cloudflare Worker
const BOT_TOKEN = '8471525585:AAFpeJ7E35sjjQULGngqHQmgg2z7cmWTyOg';
const ADMIN_CHAT_ID = '5998041535';

// CORS headers - barcha so'rovlar uchun
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Yoki 'http://localhost:5173'
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

// Telegram API orqali xabar yuborish
async function sendTelegramMessage(chatId, text) {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
      }),
    });

    const result = await response.json();
    
    if (!result.ok) {
      console.error('Telegram API xatosi:', result);
      throw new Error(result.description || 'Telegram xatosi');
    }
    
    return result;
  } catch (error) {
    console.error('sendTelegramMessage xatosi:', error);
    throw error;
  }
}

// Buyurtmani formatlash
function formatOrder(order) {
  if (!Array.isArray(order) || order.length === 0) {
    return { orderText: 'Buyurtma ma\'lumotlari topilmadi', totalPrice: 0 };
  }

  let totalPrice = 0;
  const orderText = order
    .map((item, index) => {
      const quantity = item.Quontity || 1;
      const itemTotal = item.price * quantity;
      totalPrice += itemTotal;

      return `${index + 1}. ${item.name || "Noma'lum"}
   💰 Narxi: ${item.price} 000 so'm
   📦 Soni: ${quantity}
   💵 Jami: ${itemTotal} 000 so'm${item.ingredients ? `
   📝 Tarkibi: ${item.ingredients}` : ''}`;
    })
    .join('\n\n');

  return { orderText, totalPrice };
}

// Buyurtmani qayta ishlash
async function handleOrder(data, env) {
  try {
    const { orderId, userName, PhoneNom, Adres, order, userTelegramId } = data;

    // Validatsiya
    if (!userName || !PhoneNom || !Adres) {
      throw new Error("Ma'lumotlar to'liq emas");
    }

    const phoneStr = String(PhoneNom || '');
    const { orderText, totalPrice } = formatOrder(order);

    // Admin uchun xabar
    const adminMessage = `🧾 <b>YANGI BUYURTMA</b>

🆔 ID: ${orderId}
👤 Ism: ${userName}
📞 Telefon: ${phoneStr}
📍 Manzil: ${Adres}
${userTelegramId ? `🆔 Telegram ID: ${userTelegramId}` : ''}

📋 <b>BUYURTMALAR:</b>
${orderText}

💰 <b>JAMI SUMMA: ${totalPrice} 000 so'm</b>
⏰ Vaqt: ${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}`;

    // Foydalanuvchi uchun xabar
    const userMessage = `✅ <b>BUYURTMANGIZ QABUL QILINDI!</b>

🆔 Buyurtma ID: ${orderId}
👤 Ism: ${userName}
📞 Telefon: ${phoneStr}
📍 Manzil: ${Adres}

📋 <b>BUYURTMALAR:</b>
${orderText}

💰 <b>JAMI SUMMA: ${totalPrice} 000 so'm</b>

🕐 Tez orada siz bilan bog'lanamiz!`;

    console.log("📤 Admin ga xabar yuborilmoqda...");
    
    // Admin ga yuborish
    await sendTelegramMessage(ADMIN_CHAT_ID, adminMessage);
    console.log("✅ Admin ga yuborildi!");

    // Foydalanuvchiga yuborish (agar Telegram ID bo'lsa)
    if (userTelegramId) {
      try {
        await sendTelegramMessage(userTelegramId, userMessage);
        console.log("✅ Foydalanuvchiga yuborildi!");
      } catch (error) {
        console.warn("⚠️ Foydalanuvchiga yuborib bo'lmadi:", error.message);
      }
    }

    // KV storage ga saqlash (agar mavjud bo'lsa)
    if (env && env.ORDERS) {
      const orderKey = `order_${orderId}_${Date.now()}`;
      await env.ORDERS.put(orderKey, JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        totalPrice: totalPrice,
      }));
      console.log(`💾 KV ga saqlandi: ${orderKey}`);
    }

    return {
      success: true,
      message: 'Buyurtma qabul qilindi',
      orderId: orderId,
      totalPrice: totalPrice,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("❌ handleOrder xatosi:", error);
    throw error;
  }
}

// Asosiy fetch handler
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // OPTIONS (CORS preflight) uchun
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // GET /test - Worker ishlayotganini tekshirish
    if (request.method === 'GET' && url.pathname === '/test') {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Worker ishlayapti! ✅',
          timestamp: new Date().toISOString(),
          endpoints: {
            test: 'GET /test',
            order: 'POST /send-order',
          }
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // POST /send-order - Buyurtma qabul qilish
    if (request.method === 'POST' && url.pathname === '/send-order') {
      try {
        const data = await request.json();
        console.log('📥 Buyurtma keldi:', JSON.stringify(data, null, 2));

        const result = await handleOrder(data, env);

        return new Response(JSON.stringify(result), {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('❌ /send-order xatosi:', error);
        
        return new Response(
          JSON.stringify({
            success: false,
            error: error.message || 'Server xatosi',
            details: error.stack,
          }),
          {
            status: 500,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          }
        );
      }
    }

    // 404 - Endpoint topilmadi
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Endpoint topilmadi',
        requested: url.pathname,
        available: ['GET /test', 'POST /send-order'],
      }),
      {
        status: 404,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  },
};