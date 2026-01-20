const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'Przemek2191!';
const ADMIN_PASSWORD = 'Przemek2191!';

// Multer dla file uploads
const upload = multer({ storage: multer.memoryStorage() });

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://3p-projekt.pl', 'https://www.3p-projekt.pl', 'https://threep-projekt-ai-chatbot.onrender.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(express.static(__dirname));

// === DATABASE (JSON FILE) ===
const dbPath = path.join(__dirname, 'bookings.json');

function loadDatabase() {
  try {
    if (fs.existsSync(dbPath)) {
      return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    }
  } catch (err) {
    console.error('Błąd ładowania bazy:', err);
  }
  return { bookings: [], schedule: {} };
}

function saveDatabase(data) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Błąd zapisywania bazy:', err);
  }
}

// === MAIL HELPER ===
async function sendEmail(to, subject, html) {
  console.log(`📧 Email do ${to}: ${subject}`);
  // W przyszłości można dodać Resend lub inny serwis
  return true;
}

// === AI CHATBOT - PATTERN MATCHING ===
app.post('/api/chat', (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Brak wiadomości' });
    }

    const val = message.toLowerCase();
    let reply = "Dziękuję za pytanie! Czy mogę Ci w czymś bardziej konkretnie pomóc? 😊";

    // === PYTANIA O KUCHNIĘ ===
    if (val.includes('kuchnia') || val.includes('zabudowa') || val.includes('zmywarką')) {
      reply = "Świetnie! 🍳 Kuchnie to nasza specjalność. Czy masz już gotowe wymiary pomieszczenia, czy potrzebujesz naszej instrukcji pomiaru (Krok 1-3)?";
    }
    // === PYTANIA O SZAFY I GARDEROBY ===
    else if (val.includes('szafa') || val.includes('garderoba') || val.includes('wnękowa') || val.includes('przedpokój') || val.includes('sypialnia')) {
      reply = "Doskonale! 👔 Szafy i garderoby to nasz konik. Czy chcesz szafę przesuwną, wnękową czy całą garderobę? Jakie są wymiary Twojego pomieszczenia?";
    }
    // === PYTANIA O WYMIARY I POMIAR ===
    else if (val.includes('wymiar') || val.includes('mierzyć') || val.includes('pomiar') || val.includes('jak zmierzyć') || val.includes('instrukcja')) {
      reply = "Doskonale pytanie! 📏 Pobierz naszą instrukcję 'Krok 1-3', która pokazuje jak zmierzyć: rzut z góry, instalacje i widok ścian. Prześlij wymiary na: kontakt@3p-projekt.pl";
    }
    // === PYTANIA O CENĘ ===
    else if (val.includes('cena') || val.includes('ile kosztuje') || val.includes('wycena') || val.includes('koszt') || val.includes('budżet')) {
      reply = "💰 Cena zależy od wymiarów, materiałów (fronty, blacie, systemy) i wyposażenia. Oferujemy bezpłatną wycenę! Podaj wymiary a przygotujemy Ci ofertę. Zadzwoń: 510 346 330 lub email: kontakt@3p-projekt.pl";
    }
    // === PYTANIA O 3D I WIZUALIZACJĘ ===
    else if (val.includes('3d') || val.includes('wizualizacja') || val.includes('projekt') || val.includes('jak będzie') || val.includes('podgląd')) {
      reply = "🎨 Oczywiście! Wizualizacja 3D jest darmowa dla wszystkich klientów. Zobaczysz realny podgląd Twojej kuchni/szafy zanim przystąpimy do produkcji. Wymagane są dokładne wymiary.";
    }
    // === PYTANIA O DIY / SAMODZIELNY MONTAŻ ===
    else if (val.includes('diy') || val.includes('sam') || val.includes('samodzielnie') || val.includes('projekt wykonawczy')) {
      reply = "🔨 Super! Oferujemy projekty DIY - pełną dokumentację techniczną. Otrzymasz: wizualizację 3D, listę formatek z otworami, zestawienie materiałów i instrukcję montażu. Oszczędność na montażu, profesjonalny projekt!";
    }
    // === PYTANIA O MONTAŻ ===
    else if (val.includes('montaż') || val.includes('zmontować')) {
      reply = "🏗️ Oferujemy montaż profesjonalny lub projekt DIY (samodzielny montaż). Czasami realizacji: 4-8 tygodni od zatwierdzenia projektu. Która opcja Cię bardziej interesuje?";
    }
    // === PYTANIA O ZASIĘG / LOKALIZACJĘ ===
    else if (val.includes('oświęcim') || val.includes('małopolska') || val.includes('śląsk') || val.includes('gdzie działacie') || val.includes('obszar') || val.includes('zasięg')) {
      reply = "📍 Działamy w Oświęcimiu i okolicach: Małopolska i Śląsk. Realizujemy projekty zarówno dla mieszkańców miasta, jak i okolicznych miejscowości. Jaki projekt Cię interesuje?";
    }
    // === PYTANIA O KONTAKT / SPOTKANIE ===
    else if (val.includes('zadzwoń') || val.includes('telefon') || val.includes('email') || val.includes('kontakt') || val.includes('umówić') || val.includes('spotkanie')) {
      reply = "📞 Chętnie się z Tobą skontaktuję! Telefon: 510 346 330 | Email: kontakt@3p-projekt.pl | Godziny: Pon-Pt 8:00-18:00. Możesz zadzwonić lub napisać maila. Czekamy na Ciebie! 😊";
    }
    // === PYTANIA O MATERIAŁY ===
    else if (val.includes('materiały') || val.includes('fronty') || val.includes('blaty') || val.includes('lakier') || val.includes('drewno') || val.includes('granit') || val.includes('system')) {
      reply = "✨ Pracujemy z wysokiej jakości materiałami: fronty lakierowane/naturalne, blaty (laminat, spieki kwarcowe, granity), systemy przesuwne/domyki. Szczegóły na: https://3p-projekt.pl/blog.html";
    }
    // === PYTANIA O CZAS REALIZACJI ===
    else if (val.includes('jak długo') || val.includes('czas') || val.includes('realizacja') || val.includes('terminy') || val.includes('tygodni')) {
      reply = "⏱️ Zazwyczaj realizujemy meble w 4-8 tygodni od zatwierdzenia projektu. Czas może być różny w zależności od złożoności projektu i dostępności materiałów.";
    }
    // === DOMYŚLNA ODPOWIEDŹ ===
    else {
      reply = "Dziękuję za pytanie! 😊 Czy mogę Ci zaproponować: 1) Pobierz instrukcję pomiaru (Krok 1-3), 2) Pytaj o konkretny typ mebli (kuchnia/szafa), 3) Umów się na wycenę - 510 346 330";
    }

    res.json({ reply: reply });

  } catch (error) {
    console.error('Chat Error:', error.message);
    res.status(500).json({ 
      error: 'Błąd komunikacji. Spróbuj ponownie.',
      details: error.message 
    });
  }
});

// === BOOKING SYSTEM ===

// POST /api/booking - nowa rezerwacja
app.post('/api/booking', upload.single('file'), async (req, res) => {
  try {
    const { firstName, lastName, address, email, phone, projectType, description, date, time } = req.body;

    if (!firstName || !lastName || !email || !phone || !date || !time) {
      return res.status(400).json({ error: 'Brakuje wymaganych pól' });
    }

    const db = loadDatabase();
    const booking = {
      _id: Date.now().toString(),
      firstName,
      lastName,
      address,
      email,
      phone,
      projectType,
      description,
      date,
      time: parseInt(time),
      file: req.file ? req.file.originalname : null,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    db.bookings.push(booking);
    saveDatabase(db);

    // Wyślij email do klienta
    const dateStr = new Date(date + 'T00:00:00').toLocaleDateString('pl-PL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = `${String(time).padStart(2, '0')}:00`;

    await sendEmail(email, '📅 Potwierdzenie rezerwacji konsultacji - 3P PROJEKT', `
      <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #c89a5a;">Dziękuję za rezerwację!</h2>
        <p>Twoja rezerwacja konsultacji została przyjęta.</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Szczegóły spotkania:</strong></p>
          <p>📅 Data: <strong>${dateStr}</strong></p>
          <p>🕐 Godzina: <strong>${timeStr}</strong></p>
          <p>⏱️ Czas trwania: <strong>2 godziny</strong></p>
          <p>👤 Imię i nazwisko: <strong>${firstName} ${lastName}</strong></p>
          <p>📍 Adres: <strong>${address}</strong></p>
          <p>📞 Telefon: <strong>${phone}</strong></p>
          <p>🏗️ Typ projektu: <strong>${projectType}</strong></p>
        </div>

        <p>Potwierdzenie rezerwacji otrzymasz na email lub SMS. Jeśli masz pytania, skontaktuj się z nami:</p>
        <p>📞 510 346 330<br>📧 kontakt@3p-projekt.pl</p>
        
        <p style="color: #999; font-size: 12px; margin-top: 30px;">3P PROJEKT - Meble na wymiar | Oświęcim</p>
      </div>
    `);

    // Wyślij email do admina
    await sendEmail('kontakt@3p-projekt.pl', '🔔 Nowa rezerwacja - ' + firstName + ' ' + lastName, `
      <div style="font-family: Arial;">
        <h2>Nowa rezerwacja konsultacji!</h2>
        <p><strong>${firstName} ${lastName}</strong> rezerwuje spotkanie.</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p>📅 Data: <strong>${dateStr}</strong></p>
          <p>🕐 Godzina: <strong>${timeStr}</strong></p>
          <p>👤 Klient: <strong>${firstName} ${lastName}</strong></p>
          <p>📧 Email: <strong>${email}</strong></p>
          <p>📞 Telefon: <strong>${phone}</strong></p>
          <p>📍 Adres: <strong>${address}</strong></p>
          <p>🏗️ Projekt: <strong>${projectType}</strong></p>
          <p>📝 Opis: <strong>${description}</strong></p>
        </div>

        <p><a href="https://3p-projekt.pl/admin.html" style="background: #c89a5a; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block;">Przejdź do panelu admin</a></p>
      </div>
    `);

    res.json({ success: true, message: 'Rezerwacja przesłana' });
  } catch (error) {
    console.error('Błąd rezerwacji:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// === ADMIN PANEL ===

// POST /api/admin/login
app.post('/api/admin/login', (req, res) => {
  try {
    const { password } = req.body;

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Błędne hasło' });
    }

    const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// Middleware do weryfikacji tokenu
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Brak tokenu' });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Nieprawidłowy token' });
  }
}

// GET /api/admin/bookings
app.get('/api/admin/bookings', verifyToken, (req, res) => {
  const db = loadDatabase();
  res.json({ bookings: db.bookings });
});

// PATCH /api/admin/booking/:id
app.patch('/api/admin/booking/:id', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const db = loadDatabase();

    const booking = db.bookings.find(b => b._id === req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Rezerwacja nie znaleziona' });
    }

    booking.status = status;
    saveDatabase(db);

    // Wyślij email do klienta o potwierdzeniu/odrzuceniu
    if (status === 'confirmed') {
      const dateStr = new Date(booking.date + 'T00:00:00').toLocaleDateString('pl-PL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      const timeStr = `${String(booking.time).padStart(2, '0')}:00`;

      await sendEmail(booking.email, '✅ Potwierdzenie spotkania - 3P PROJEKT', `
        <div style="font-family: Arial;">
          <h2 style="color: #4caf50;">Twoje spotkanie jest potwierdzone!</h2>
          <p>Cześć ${booking.firstName},</p>
          <p>Twoja rezerwacja konsultacji została potwierdzona.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>📅 Data: <strong>${dateStr}</strong></p>
            <p>🕐 Godzina: <strong>${timeStr}</strong></p>
            <p>⏱️ Czas trwania: <strong>2 godziny</strong></p>
            <p>📍 Lokalizacja: <strong>Oświęcim</strong></p>
          </div>

          <p>Jeśli potrzebujesz zmienić termin, skontaktuj się z nami.</p>
          <p>📞 510 346 330</p>
        </div>
      `);
    } else if (status === 'rejected') {
      await sendEmail(booking.email, '❌ Twoja rezerwacja - 3P PROJEKT', `
        <div style="font-family: Arial;">
          <h2>Twoja rezerwacja</h2>
          <p>Cześć ${booking.firstName},</p>
          <p>Niestety, wybrany termin nie jest dostępny. Zapraszamy do wyboru innego terminu:</p>
          <p><a href="https://3p-projekt.pl/booking.html" style="background: #c89a5a; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Wybierz nowy termin</a></p>
          <p>Lub skontaktuj się z nami:<br>📞 510 346 330<br>📧 kontakt@3p-projekt.pl</p>
        </div>
      `);
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// GET /api/admin/schedule
app.get('/api/admin/schedule', verifyToken, (req, res) => {
  const db = loadDatabase();
  res.json({ schedule: db.schedule || {} });
});

// POST /api/admin/schedule
app.post('/api/admin/schedule', verifyToken, (req, res) => {
  try {
    const { schedule } = req.body;
    const db = loadDatabase();

    db.schedule = schedule;
    saveDatabase(db);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// === SERVER START ===
app.listen(PORT, () => {
  console.log(`✅ Serwer uruchomiony na http://localhost:${PORT}`);
  console.log(`🤖 API dostępne:`);
  console.log(`   POST /api/chat - AI chatbot`);
  console.log(`   POST /api/booking - rezerwacja spotkania`);
  console.log(`   POST /api/admin/login - logowanie`);
  console.log(`   GET /api/admin/bookings - lista rezerwacji`);
  console.log(`   POST /api/admin/schedule - zarządzanie harmonogramem`);
});
