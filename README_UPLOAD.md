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

## Лента новостей для приложения

Полная структурированная лента:

```text
GET https://www.lasertagbaza.pl/api/news-feed
```

Отдельные разделы:

```text
GET https://www.lasertagbaza.pl/api/news-feed?section=player-reviews
GET https://www.lasertagbaza.pl/api/news-feed?section=baza-updates
```

В HTML источник отмечен как `data-news-source="baza-news-v1"`. Каждая карточка имеет стабильные
атрибуты `data-news-id` и `data-news-section`. Исходные данные ленты находятся в
`data/news-feed.json`.

## Рейтинг игроков для приложения

Полный структурированный рейтинг:

```text
GET https://www.lasertagbaza.pl/api/ranking-feed
```

Только первые три игрока:

```text
GET https://www.lasertagbaza.pl/api/ranking-feed?limit=3
```

API возвращает позицию, ник, очки, аватарку, бонус за статью и ссылку на статью игрока.
В HTML источник отмечен как `data-ranking-source="baza-player-ranking-v1"`, а каждая карточка
имеет стабильные атрибуты `data-player-id`, `data-player-rank` и `data-player-points`.
Исходные данные рейтинга находятся в `data/ranking-feed.json`.

## Игры и записи для приложения

Ближайшие игры и общие списки записавшихся:

```text
GET https://www.lasertagbaza.pl/api/games-feed
```

Запись игрока из приложения выполняется в тот же адрес методом `POST`:

```json
{
  "game": "wednesday",
  "gameLabel": "Środa 18:30 / Counter-Strike 6v6",
  "nickname": "NOKA",
  "phone": "+48 000 000 000",
  "note": "solo",
  "id": "уникальный-id-записи"
}
```

Для воскресенья используется `"game": "sunday"`. Запись сохраняется в том же хранилище,
которое читает сайт, поэтому новый игрок появляется и в приложении, и на странице без отдельной
синхронизации. Телефон не возвращается в публичном списке.

HTML-блок отмечен как `data-games-source="baza-open-games-v1"`. Формы и списки имеют стабильные
атрибуты `data-game-signup-form`, `data-game-signups` и `data-signup-list`.

## Деплой на Vercel

Upload the full contents of this folder to GitHub or Vercel.

Required Vercel environment variables for Telegram signups/messages:

```env
TELEGRAM_BOT_TOKEN=your_new_bot_token
TELEGRAM_CHAT_ID=-1001962931693
```
