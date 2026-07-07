# Lasertag Club BAZA site

## Локальный запуск на Mac

1. Открой терминал в этой папке:

```bash
cd /Users/alexhubarevich/Desktop/BAZA_SITE_READY
```

2. Создай файл `.env.local` с секретами Telegram:

```env
TELEGRAM_BOT_TOKEN=токен_бота_из_BotFather
TELEGRAM_CHAT_ID=-1001962931693
```

Не вставляй токен в `index.html`, `script.js` или другие публичные файлы.

3. Запусти сайт с API:

```bash
node local-server.js
```

4. Открой:

```text
http://localhost:3000
```

Форма `Zapis` отправляет заявку в Telegram через `/api/telegram-signup`.
Окно Telegram-чата отправляет сообщение через `/api/telegram-message`.

## Деплой на Vercel

Upload the full contents of this folder to GitHub or Vercel.

Required Vercel environment variables for Telegram signups/messages:

```env
TELEGRAM_BOT_TOKEN=your_new_bot_token
TELEGRAM_CHAT_ID=-1001962931693
```
