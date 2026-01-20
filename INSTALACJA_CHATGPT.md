# 🤖 Integracja ChatGPT API - Poradnik instalacji

## ✅ Co zostało przygotowane:

1. **server.js** - Backend Node.js/Express
2. **package.json** - Dependencje
3. **.env** - Plik konfiguracyjny (zawiera OPENAI_API_KEY)
4. **index.html** (zmodyfikowany) - Frontend wysyła żądania do backendu zamiast pattern matchingu
5. **style.css** (uzupełniony) - Animacja loadingu dla AI

---

## 📋 Kroki instalacji:

### **Krok 1: Pobierz Node.js**
- Pobierz z: https://nodejs.org/ (wersja LTS 18+)
- Zainstaluj na komputerze

### **Krok 2: Otwórz terminal w folderze projektu**
```bash
cd "c:\Users\Przemek\Desktop\3 p"
```

### **Krok 3: Zainstaluj dependencje**
```bash
npm install
```
To zainstaluje: express, cors, axios, dotenv

### **Krok 4: Pobierz OpenAI API Key**
1. Idź na: https://platform.openai.com/api-keys
2. Zaloguj się (lub załóż account - darmowe konto startowe)
3. Kliknij "Create new secret key"
4. Skopiuj klucz (format: `sk-...`)

### **Krok 5: Wstaw klucz do .env**
Otwórz plik `.env` i zastąp:
```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx
```
Wklej swój klucz:
```env
OPENAI_API_KEY=sk-xxxxx_TWÓJ_KLUCZ_xxxxx
```

### **Krok 6: Uruchom serwer**
```bash
npm start
```

Powinieneś zobaczyć:
```
✅ Serwer uruchomiony na http://localhost:3000
🤖 Endpoint AI dostępny: POST /api/chat
```

### **Krok 7: Testuj w przeglądarce**
- Otwórz: http://localhost:3000
- Przejdź do sekcji "Inteligentny asystent projektu"
- Wpisz pytanie i naciśnij Enter
- AI ChatGPT odpowiada! 🎉

---

## 🔧 Opcje uruchamiania:

### **Production (normalny)**
```bash
npm start
```

### **Development (z restartowaniem)**
```bash
npm run dev
```
(wymaga instalacji nodemon: `npm install --save-dev nodemon`)

---

## 💰 Koszty:

**OpenAI GPT-3.5-turbo:**
- ~$0.0005 za 1000 tokenów (input)
- ~$0.0015 za 1000 tokenów (output)
- Średnie pytanie: 100-200 tokenów = $0.00015-$0.0003 za pytanie

**Szacunek:**
- 1000 pytań = ~$0.30-$0.50
- Miesiąc (100 pytań/dzień) = ~$3-5

Możesz monitorować koszty w: https://platform.openai.com/account/billing/overview

---

## 🛡️ Bezpieczeństwo:

✅ API Key przechowywany w `.env` (nie w kodzie)  
✅ Backend waliduje żądania (strona serwerowa)  
✅ Frontend wysyła tylko tekstowe pytania (bezpieczne)  

⚠️ **NIE udostępniaj .env publicznie!** (dodaj do .gitignore)

---

## 🚀 Jeśli chcesz wdrożyć online (na serwerze):

1. Hostuj backend na: Heroku, Render, Railway, Vercel
2. Zmień `localhost:3000` na URL serwera
3. Upewnij się, że .env zawiera klucz OpenAI

---

## ❓ Troubleshooting:

**"❌ Błąd połączenia"**
- Sprawdź, czy serwer działa (`npm start`)
- Sprawdzam http://localhost:3000 w przeglądarce

**"❌ 401 Unauthorized"**
- Klucz OpenAI jest niewłaściwy
- Sprawdź plik `.env`
- Wygeneruj nowy klucz na https://platform.openai.com/api-keys

**"npm: command not found"**
- Node.js nie jest zainstalowany
- Pobierz z https://nodejs.org/

---

## 📚 Dodatkowe zasoby:

- OpenAI API docs: https://platform.openai.com/docs/api-reference
- Express.js: https://expressjs.com/
- Dotenv: https://github.com/motdotla/dotenv

---

**Powodzenia! 🚀 Jeśli coś nie działa - zgłoś błąd.**
