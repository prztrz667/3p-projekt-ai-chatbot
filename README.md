# 🤖 3P PROJEKT - AI ChatGPT Chatbot

## Quick Start (Szybki Start)

### 1. Pobierz klucz OpenAI
👉 https://platform.openai.com/api-keys

### 2. Wstaw klucz do `.env`
```bash
OPENAI_API_KEY=sk-your-key-here
```

### 3. Zainstaluj i uruchom
```bash
npm install
npm start
```

### 4. Otwórz w przeglądarce
👉 http://localhost:3000

---

## 📁 Struktura plików:

```
3 p/
├── server.js              ← Backend (Node.js + Express)
├── index.html             ← Frontend (z AI chat)
├── style.css              ← Stylizacja
├── package.json           ← Dependencje
├── .env                   ← Zmienne środowiskowe (OCHRONIĆ!)
├── .gitignore             ← Co nie wgrywać na Git
├── INSTALACJA_CHATGPT.md  ← Pełna instrukcja
└── ai-context.txt         ← Knowledge base (stare, pattern matching)
```

---

## 🔌 Jak działa:

1. **Użytkownik** pisze pytanie w chacie → pisk Enter
2. **Frontend** wysyła pytanie do `/api/chat`
3. **Backend** przekazuje do OpenAI API
4. **ChatGPT** odpowiada bazując na kontekście firmy
5. **Odpowiedź** pojawia się w chacie

---

## 💰 Koszty

Średnie pytanie = ~$0.0003
100 pytań dziennie = ~$3-5 miesięcznie

---

## 📞 Kontakt

Telefon: 510 346 330  
Email: kontakt@3p-projekt.pl
