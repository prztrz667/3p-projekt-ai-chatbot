const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Statyczne pliki (HTML, CSS, JS)
app.use(express.static(__dirname));

// === ENDPOINT DO AI CHATGPT ===
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Brak wiadomości' });
    }

    // Kontekst systemu dla bota
    const systemContext = `Jesteś asystentem AI dla firmy 3P PROJEKT specjalizującej się w meblach na wymiar.
Informacje o firmie:
- Nazwa: 3P PROJEKT
- Lokalizacja: Oświęcim, Małopolska/Śląsk
- Telefon: 510 346 330
- Email: kontakt@3p-projekt.pl
- Godziny: Pon-Pt 8:00-18:00

Usługi:
- Meble na wymiar (kuchnie, szafy, garderoby)
- Wizualizacje 3D (darmowe)
- Projekty DIY (wykonawcze)
- Montaż profesjonalny

Proces: Krok 1 (Pomiar) → Krok 2 (Projekt 3D) → Krok 3 (Realizacja 4-8 tygodni)

Bądź pomocny, miły, polecaj kontakt telefoniczny, nie wymyślaj informacji, które nie znacie.`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemContext },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 300
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const botMessage = response.data.choices[0].message.content;
    res.json({ reply: botMessage });

  } catch (error) {
    console.error('OpenAI API Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Błąd komunikacji z AI. Spróbuj ponownie.',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serwer uruchomiony na http://localhost:${PORT}`);
  console.log(`🤖 Endpoint AI dostępny: POST /api/chat`);
  console.log(`📁 Statyczne pliki serwowane z: ${__dirname}`);
});
