const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration - pozwól na żądania z 3p-projekt.pl
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://3p-projekt.pl', 'https://www.3p-projekt.pl', 'https://threep-projekt-ai-chatbot.onrender.com'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());

// Statyczne pliki (HTML, CSS, JS)
app.use(express.static(__dirname));

// === INTELLIGENT PATTERN MATCHING - AI CHATBOT ===
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

app.listen(PORT, () => {
  console.log(`✅ Serwer uruchomiony na http://localhost:${PORT}`);
  console.log(`🤖 Endpoint AI dostępny: POST /api/chat`);
  console.log(`📁 Statyczne pliki serwowane z: ${__dirname}`);
});
