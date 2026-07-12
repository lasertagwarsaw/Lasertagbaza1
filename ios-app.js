const STORAGE_KEY = "bazaClubIosApp";
const APP_BUILD = 96;
const ADMIN_RESET_VERSION = "admin-ruslan-v1";
const VOICE_ROOM_MIN_POINTS = 300;
const CHAT_MIN_POINTS = 50;
const CHAT_IMAGE_MAX_BYTES = 95000;
const CHAT_IMAGE_MAX_SIDE = 960;
const NEWS_IMAGE_MAX_BYTES = 220000;
const NEWS_IMAGE_MAX_SIDE = 1400;
const NEWS_VIDEO_MAX_BYTES = 1500000;
const NEWS_VIDEO_MAX_SECONDS = 15;
const GAME_FEED_POLL_MS = 5 * 60 * 1000;
const RANKING_POLL_MS = 15 * 1000;
const PUBLIC_APP_ORIGIN = "https://www.lasertagbaza.pl";
const VOICE_HTTP_POLL_MS = 1000;
const VOICE_RELAY_CHUNK_MS = 220;
const VOICE_RELAY_RESTART_MS = 20;
const VOICE_RELAY_MAX_QUEUE = 4;
const VOICE_RELAY_MAX_AGE_MS = 2500;
const ADMIN_ACCOUNT = {
  nickname: "Ruslan",
  password: "Ruslan2026",
  contact: "admin@baza",
};

function isNativeAppRuntime() {
  return Boolean(window.BAZA_NATIVE_APP) || window.location.protocol === "file:";
}

function appApiOrigin() {
  if (isNativeAppRuntime()) return PUBLIC_APP_ORIGIN;
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1" || host === "") {
    return window.location.origin;
  }
  return window.location.origin;
}

function appApiUrl(path) {
  return `${appApiOrigin()}${path}`;
}

function appSocketUrl(path) {
  const origin = appApiOrigin();
  return `${origin.startsWith("https:") ? "wss:" : "ws:"}${origin.replace(/^https?:/, "")}${path}`;
}

const copy = {
  en: {
    add: "Add",
    addPlayer: "Add player",
    allGames: "All games",
    adminLead: "Hidden controls for player points, ranks and proposed news.",
    adminLog: "Admin log",
    adminPanelTitle: "Admin control",
    adminPasswordLabel: "Admin password",
    accountAccess: "Account",
    adminSaved: "Admin changes saved.",
    approveNews: "Approve",
    appNavigation: "App navigation",
    appSettings: "Settings",
    article: "Article",
    achievements: "Achievements",
    back: "Back",
    backToSite: "Back to BAZA site",
    bookings: "bookings",
    captainTools: "Captain tools",
    change: "Change",
    changeAvatar: "Change avatar",
    changePassword: "Change password",
    chatPlaceholder: "Write to players",
    chatLocked: "Player chat opens from 50 points.",
    clearChat: "Clear chat",
    choosePlayers: "Choose registered players",
    clubFeed: "Club feed",
    clubUpdates: "Updates",
    contact: "Phone or Telegram",
    currentPassword: "Current password",
    createTeam: "Create a team",
    createPlayerProfile: "Create player profile",
    createGame: "Create game",
    confirmCancelText: "Remove your booking from this game?",
    freshNews: "Fresh news",
    fileModeText: "File mode can block site sync.",
    fileModeTitle: "Open through local server",
    gameReward: "+25 points",
    gameRewardText: "for the first booking on each game",
    gameCapacity: "Capacity",
    gameDate: "Game date",
    gameHistory: "Game history",
    gameTime: "Game time",
    games: "Games",
    gamesLead: "Choose a date, check free spots and add yourself to the roster in one tap.",
    gamesTitle: "Book a game",
    history: "History",
    home: "Home",
    homeLead: "A calmer player panel for open games, club news, chat, ranking and your points.",
    homeOverline: "Warsaw / club app",
    homeTitle: "Play, book and stay close to BAZA.",
    hardReset: "Hard reset",
    language: "Language",
    liveAudio: "Live audio",
    loginProfile: "Login",
    loadingArticle: "Loading full article...",
    lockedCaptain: "Reach Captain rank with points to create a team from registered players.",
    logout: "Log out",
    news: "News",
    newsBody: "News text",
    newsBodyPlaceholder: "Time, format, who it is for, and where to ask questions.",
    newsHeadline: "Headline",
    newsLead: "News from the website appears here automatically. You can also add a short club update.",
    newsShort: "news",
    newsTitle: "Lasertag Warsaw news",
    newsTitlePlaceholder: "Wednesday Counter-Strike game",
    newPassword: "New password",
    nextGame: "Next game",
    nickname: "Player nickname",
    notifications: "Notifications",
    offline: "Offline",
    online: "Online",
    openLocalhost: "Open app link",
    openVoiceRoom: "Open voice room",
    openProfile: "Open profile",
    password: "Password",
    passwordHint: "Min. 2 letters/numbers and one uppercase letter.",
    playerAdded: "Player added.",
    playerPassword: "Player password",
    playerBlocked: "Player blocked",
    playerContact: "Contact",
    playerChat: "Player chat",
    playerStats: "Player stats",
    playerTools: "Player tools",
    points: "points",
    pointsTransfer: "Transfer points",
    pointsTransferLocked: "Register and earn points first.",
    pointsTransferNote: "Choose a registered player and send points from your balance.",
    pointsHistory: "Points activity",
    personalProgress: "Progress",
    proposedNews: "Proposed news",
    queue: "Queue",
    profile: "Profile",
    profilePanel: "Player panel",
    publishNews: "Publish and get +30",
    quickBooking: "Quick booking",
    quickChat: "Quick chat",
    rank: "Rank",
    rankInput: "Rank",
    rankCaptain: "Captain",
    rankCasual: "Casual player",
    rankRegular: "Regular player",
    rankRookie: "Rookie",
    readNews: "Read",
    registerFirst: "Complete your profile to register as a player.",
    removePlayer: "Remove player",
    registerProfile: "Register",
    registerToBook: "Complete profile",
    registerToChat: "Complete profile to chat",
    rankingFromSite: "Ranking from the site",
    rankingFilterAll: "All",
    rankingFilterMe: "Me",
    rankingFilterTeam: "Team",
    rankingFilterTop: "Top",
    refreshRoster: "Refresh players",
    savePlayer: "Save player",
    saveProfile: "Save profile",
    selectPlayer: "Select player",
    securitySettings: "Security",
    transferAmount: "Points amount",
    transferNoPlayers: "No available registered players.",
    transferSend: "Send points",
    transferTo: "Player",
    sendInvites: "Send team invitations",
    sendMessage: "Send message",
    showAll: "Show all",
    showLess: "Show less",
    startActions: "Start",
    syncError: "Sync error",
    syncIdle: "Ready",
    syncPending: "Syncing...",
    syncStatus: "Site sync",
    syncSynced: "Synced with site",
    syncPlayer: "Sync player",
    retrySync: "Retry sync",
    exportPlayers: "Export players",
    manageGames: "Manage games",
    managePlayers: "Manage players",
    newPlayerName: "New player name",
    noPendingNews: "No proposed news.",
    newsApproved: "News approved.",
    newsDeleted: "News deleted.",
    newsPending: "News sent for admin approval.",
    teamConfirmations: "Team confirmations",
    teamDeleted: "Team deleted.",
    deleteTeam: "Delete team",
    teamChat: "Team chat",
    teamMessagePlaceholder: "Write to your team",
    teamChatSent: "Message sent to team chat.",
    teamName: "Team name",
    addToRoom: "Add to room",
    createVoiceRoom: "Create voice room",
    leaveVoiceRoom: "Leave room",
    micOff: "Mic off",
    micOn: "Mic on",
    micError: "Microphone is not available.",
    noVoiceRoom: "No voice room yet.",
    roomLimit: "Room limit is 5 invited players.",
    roomName: "Room name",
    voiceInvite: "Invite player",
    voiceInvitation: "Room invitation",
    voiceInvitationPending: "Waiting for confirmation",
    acceptVoiceInvite: "Accept",
    declineVoiceInvite: "Decline",
    voiceRoomLocked: "You need at least 300 points to create a voice room.",
    voiceConnected: "Voice connected",
    voiceConnection: "Voice connection",
    voiceConnecting: "Connecting voice...",
    voiceDisconnected: "Voice disconnected",
    voiceLead: "Create a room, invite up to 5 players and talk with low-latency audio.",
    voiceReady: "Ready for WebRTC audio",
    voiceRoom: "Voice room",
    voiceServerOffline: "Voice server offline",
    topPlayers: "Top players",
    welcomeGame: "Добро пожаловать в игру!",
  },
  ru: {
    add: "Добавить",
    addPlayer: "Добавить игрока",
    allGames: "Все игры",
    adminLead: "Скрытое управление пунктами, рангами игроков и предложенными новостями.",
    adminLog: "Журнал админа",
    adminPanelTitle: "Панель администратора",
    adminPasswordLabel: "Пароль администратора",
    accountAccess: "Аккаунт",
    adminSaved: "Изменения администратора сохранены.",
    approveNews: "Допустить",
    appNavigation: "Навигация приложения",
    appSettings: "Настройки",
    article: "Статья",
    achievements: "Достижения",
    back: "Назад",
    backToSite: "Вернуться на сайт BAZA",
    bookings: "записи",
    captainTools: "Инструменты капитана",
    change: "Сменить",
    changeAvatar: "Сменить аватар",
    changePassword: "Сменить пароль",
    chatPlaceholder: "Напиши игрокам",
    chatLocked: "Чат игроков открывается от 50 пунктов.",
    clearChat: "Очистить чат",
    choosePlayers: "Выбери зарегистрированных игроков",
    clubFeed: "Лента клуба",
    clubUpdates: "Обновления",
    contact: "Телефон или Telegram",
    currentPassword: "Текущий пароль",
    createTeam: "Создать команду",
    createPlayerProfile: "Создать профиль игрока",
    createGame: "Создать игру",
    confirmCancelText: "Убрать твою запись с этой игры?",
    freshNews: "Свежие новости",
    fileModeText: "Режим файла может блокировать синхронизацию с сайтом.",
    fileModeTitle: "Открой через локальную ссылку",
    gameReward: "+25 пунктов",
    gameRewardText: "за первую запись на каждую игру",
    gameCapacity: "Мест",
    gameDate: "Дата игры",
    gameHistory: "История игр",
    gameTime: "Время игры",
    games: "Игры",
    gamesLead: "Выбери дату, проверь свободные места и добавь себя в состав одним нажатием.",
    gamesTitle: "Запись на игры",
    history: "История",
    home: "Главная",
    homeLead: "Спокойная панель игрока для открытых игр, новостей клуба, чата, рейтинга и пунктов.",
    homeOverline: "Варшава / приложение клуба",
    homeTitle: "Играй, записывайся и будь ближе к BAZA.",
    hardReset: "Hard reset",
    language: "Язык",
    liveAudio: "Живой звук",
    loginProfile: "Войти",
    loadingArticle: "Загружаю полный текст...",
    lockedCaptain: "Набери ранг Captain по пунктам, чтобы создать команду из зарегистрированных игроков.",
    logout: "Выйти",
    news: "Новости",
    newsBody: "Текст новости",
    newsBodyPlaceholder: "Время, формат, кому подходит и где задать вопросы.",
    newsHeadline: "Заголовок",
    newsLead: "Новости с сайта появляются здесь автоматически. Можно добавить короткое клубное объявление.",
    newsShort: "новости",
    newsTitle: "Новости Lasertag Warsaw",
    newsTitlePlaceholder: "В среду играем Counter-Strike",
    newPassword: "Новый пароль",
    nextGame: "Ближайшая игра",
    nickname: "Ник игрока",
    notifications: "Уведомления",
    offline: "Не в сети",
    online: "В сети",
    openLocalhost: "Открыть приложение",
    openVoiceRoom: "Открыть комнату разговоров",
    openProfile: "Открыть профиль",
    password: "Пароль",
    passwordHint: "Минимум 2 буквы/цифры и одна заглавная буква.",
    playerAdded: "Игрок добавлен.",
    playerPassword: "Пароль игрока",
    playerBlocked: "Игрок заблокирован",
    playerContact: "Контакт",
    playerChat: "Чат игроков",
    playerStats: "Статистика игрока",
    playerTools: "Инструменты игрока",
    points: "пункты",
    pointsTransfer: "Передать пункты",
    pointsTransferLocked: "Сначала зарегистрируйся и заработай пункты.",
    pointsTransferNote: "Выбери зарегистрированного игрока и передай пункты со своего баланса.",
    pointsHistory: "Получение пунктов",
    personalProgress: "Прогресс",
    proposedNews: "Предложенные новости",
    queue: "Очередь",
    profile: "Профиль",
    profilePanel: "Личная панель",
    publishNews: "Опубликовать и получить +30",
    quickBooking: "Быстрая запись",
    quickChat: "Быстрый чат",
    rank: "Ранг",
    rankInput: "Ранг",
    rankCaptain: "Капитан",
    rankCasual: "Играю иногда",
    rankRegular: "Постоянный игрок",
    rankRookie: "Новый игрок",
    readNews: "Читать",
    registerFirst: "Сначала заполни профиль, чтобы стать зарегистрированным игроком.",
    removePlayer: "Удалить игрока",
    registerProfile: "Регистрация",
    registerToBook: "Заполнить профиль",
    registerToChat: "Заполни профиль, чтобы писать в чат",
    rankingFromSite: "Рейтинг с сайта",
    rankingFilterAll: "Все",
    rankingFilterMe: "Я",
    rankingFilterTeam: "Команда",
    rankingFilterTop: "Топ",
    refreshRoster: "Обновить игроков",
    savePlayer: "Сохранить игрока",
    saveProfile: "Сохранить профиль",
    selectPlayer: "Выбрать игрока",
    securitySettings: "Безопасность",
    transferAmount: "Количество пунктов",
    transferNoPlayers: "Нет доступных зарегистрированных игроков.",
    transferSend: "Передать пункты",
    transferTo: "Игрок",
    sendInvites: "Отправить приглашения",
    sendMessage: "Отправить сообщение",
    showAll: "Развернуть",
    showLess: "Свернуть",
    startActions: "Старт",
    syncError: "Ошибка синхронизации",
    syncIdle: "Готово",
    syncPending: "Синхронизация...",
    syncStatus: "Синхронизация сайта",
    syncSynced: "Синхронизировано с сайтом",
    syncPlayer: "Синхронизировать игрока",
    retrySync: "Повторить синхронизацию",
    exportPlayers: "Экспорт игроков",
    manageGames: "Управление играми",
    managePlayers: "Управление игроками",
    newPlayerName: "Имя нового игрока",
    noPendingNews: "Предложенных новостей нет.",
    newsApproved: "Новость допущена к публикации.",
    newsDeleted: "Новость удалена.",
    newsPending: "Новость отправлена на проверку администратору.",
    teamConfirmations: "Подтверждения команды",
    teamDeleted: "Команда удалена.",
    deleteTeam: "Удалить команду",
    teamChat: "Чат команды",
    teamMessagePlaceholder: "Напиши своей команде",
    teamChatSent: "Сообщение отправлено в чат команды.",
    teamName: "Название команды",
    addToRoom: "Добавить в комнату",
    createVoiceRoom: "Создать комнату",
    leaveVoiceRoom: "Выйти из комнаты",
    micOff: "Микрофон выкл",
    micOn: "Микрофон вкл",
    micError: "Микрофон недоступен.",
    noVoiceRoom: "Комната разговоров ещё не создана.",
    roomLimit: "Лимит комнаты — 5 приглашённых игроков.",
    roomName: "Название комнаты",
    voiceInvite: "Пригласить игрока",
    voiceInvitation: "Приглашение в комнату",
    voiceInvitationPending: "Ждет подтверждения",
    acceptVoiceInvite: "Подтвердить",
    declineVoiceInvite: "Отменить",
    voiceRoomLocked: "Для создания комнаты нужно минимум 300 пунктов.",
    voiceConnected: "Голос подключен",
    voiceConnection: "Подключение голоса",
    voiceConnecting: "Подключаю голос...",
    voiceDisconnected: "Голос отключен",
    voiceLead: "Создай комнату, пригласи до 5 игроков и говори с минимальной задержкой.",
    voiceReady: "Готово для WebRTC-аудио",
    voiceRoom: "Комната разговоров",
    voiceServerOffline: "Сервер голоса недоступен",
    topPlayers: "Топ игроков",
    welcomeGame: "Добро пожаловать в игру!",
  },
  pl: {
    add: "Dodaj",
    addPlayer: "Dodaj gracza",
    allGames: "Wszystkie gry",
    adminLead: "Ukryte sterowanie punktami, rangami graczy i proponowanymi newsami.",
    adminLog: "Dziennik admina",
    adminPanelTitle: "Panel administratora",
    adminPasswordLabel: "Hasło administratora",
    accountAccess: "Konto",
    adminSaved: "Zmiany administratora zapisane.",
    approveNews: "Dopuść",
    appNavigation: "Nawigacja aplikacji",
    appSettings: "Ustawienia",
    article: "Artykuł",
    achievements: "Osiągnięcia",
    back: "Wróć",
    backToSite: "Wróć na stronę BAZA",
    bookings: "zapisy",
    captainTools: "Narzędzia kapitana",
    change: "Zmień",
    changeAvatar: "Zmień avatar",
    changePassword: "Zmień hasło",
    chatPlaceholder: "Napisz do graczy",
    chatLocked: "Chat graczy jest dostępny od 50 punktów.",
    clearChat: "Wyczyść chat",
    choosePlayers: "Wybierz zarejestrowanych graczy",
    clubFeed: "Feed klubu",
    clubUpdates: "Aktualizacje",
    contact: "Telefon albo Telegram",
    currentPassword: "Aktualne hasło",
    createTeam: "Utwórz drużynę",
    createPlayerProfile: "Utwórz profil gracza",
    createGame: "Utwórz grę",
    confirmCancelText: "Usunąć Twój zapis z tej gry?",
    freshNews: "Nowe aktualności",
    fileModeText: "Tryb pliku może blokować synchronizację ze stroną.",
    fileModeTitle: "Otwórz przez lokalny link",
    gameReward: "+25 punktów",
    gameRewardText: "za pierwszy zapis na każdą grę",
    gameCapacity: "Miejsca",
    gameDate: "Data gry",
    gameHistory: "Historia gier",
    gameTime: "Czas gry",
    games: "Gry",
    gamesLead: "Wybierz datę, sprawdź wolne miejsca i dodaj się do składu jednym kliknięciem.",
    gamesTitle: "Zapis na gry",
    history: "Historia",
    home: "Start",
    homeLead: "Spokojny panel gracza do gier otwartych, newsów klubu, chatu, rankingu i punktów.",
    homeOverline: "Warszawa / aplikacja klubu",
    homeTitle: "Graj, zapisuj się i bądź bliżej BAZA.",
    hardReset: "Hard reset",
    language: "Język",
    liveAudio: "Audio na żywo",
    loginProfile: "Zaloguj",
    loadingArticle: "Ładuję pełny tekst...",
    lockedCaptain: "Zdobądź rangę Captain punktami, aby utworzyć drużynę z zarejestrowanych graczy.",
    logout: "Wyloguj",
    news: "News",
    newsBody: "Treść newsa",
    newsBodyPlaceholder: "Czas, format, dla kogo i gdzie zadać pytania.",
    newsHeadline: "Tytuł",
    newsLead: "Aktualności ze strony pojawiają się tutaj automatycznie. Możesz też dodać krótki komunikat.",
    newsShort: "news",
    newsTitle: "Aktualności Lasertag Warsaw",
    newsTitlePlaceholder: "W środę gramy Counter-Strike",
    newPassword: "Nowe hasło",
    nextGame: "Najbliższa gra",
    nickname: "Nick gracza",
    notifications: "Powiadomienia",
    offline: "Offline",
    online: "Online",
    openLocalhost: "Otwórz aplikację",
    openVoiceRoom: "Otwórz pokój rozmów",
    openProfile: "Otwórz profil",
    password: "Hasło",
    passwordHint: "Min. 2 litery/cyfry i jedna wielka litera.",
    playerAdded: "Gracz dodany.",
    playerPassword: "Hasło gracza",
    playerBlocked: "Gracz zablokowany",
    playerContact: "Kontakt",
    playerChat: "Chat graczy",
    playerStats: "Statystyki gracza",
    playerTools: "Narzędzia gracza",
    points: "punkty",
    pointsTransfer: "Przekaż punkty",
    pointsTransferLocked: "Najpierw zarejestruj się i zdobądź punkty.",
    pointsTransferNote: "Wybierz zarejestrowanego gracza i przekaż punkty ze swojego salda.",
    pointsHistory: "Historia punktów",
    personalProgress: "Postęp",
    proposedNews: "Proponowane newsy",
    queue: "Kolejka",
    profile: "Profil",
    profilePanel: "Panel gracza",
    publishNews: "Opublikuj i odbierz +30",
    quickBooking: "Szybki zapis",
    quickChat: "Szybki chat",
    rank: "Ranga",
    rankInput: "Ranga",
    rankCaptain: "Kapitan",
    rankCasual: "Gram czasem",
    rankRegular: "Stały gracz",
    rankRookie: "Nowy gracz",
    readNews: "Czytaj",
    registerFirst: "Najpierw uzupełnij profil, aby zostać zarejestrowanym graczem.",
    removePlayer: "Usuń gracza",
    registerProfile: "Rejestracja",
    registerToBook: "Uzupełnij profil",
    registerToChat: "Uzupełnij profil, aby pisać",
    rankingFromSite: "Ranking ze strony",
    rankingFilterAll: "Wszyscy",
    rankingFilterMe: "Ja",
    rankingFilterTeam: "Drużyna",
    rankingFilterTop: "Top",
    refreshRoster: "Odśwież graczy",
    savePlayer: "Zapisz gracza",
    saveProfile: "Zapisz profil",
    selectPlayer: "Wybierz gracza",
    securitySettings: "Bezpieczeństwo",
    transferAmount: "Liczba punktów",
    transferNoPlayers: "Brak dostępnych zarejestrowanych graczy.",
    transferSend: "Przekaż punkty",
    transferTo: "Gracz",
    sendInvites: "Wyślij zaproszenia",
    sendMessage: "Wyślij wiadomość",
    showAll: "Rozwiń",
    showLess: "Zwiń",
    startActions: "Start",
    syncError: "Błąd synchronizacji",
    syncIdle: "Gotowe",
    syncPending: "Synchronizacja...",
    syncStatus: "Synchronizacja strony",
    syncSynced: "Zsynchronizowano ze stroną",
    syncPlayer: "Synchronizuj gracza",
    retrySync: "Ponów synchronizację",
    exportPlayers: "Eksport graczy",
    manageGames: "Zarządzanie grami",
    managePlayers: "Zarządzanie graczami",
    newPlayerName: "Nazwa nowego gracza",
    noPendingNews: "Brak proponowanych newsów.",
    newsApproved: "News dopuszczony do publikacji.",
    newsDeleted: "News usunięty.",
    newsPending: "News wysłany do akceptacji administratora.",
    teamConfirmations: "Potwierdzenia drużyny",
    teamDeleted: "Drużyna usunięta.",
    deleteTeam: "Usuń drużynę",
    teamChat: "Chat drużyny",
    teamMessagePlaceholder: "Napisz do drużyny",
    teamChatSent: "Wiadomość wysłana na chat drużyny.",
    teamName: "Nazwa drużyny",
    addToRoom: "Dodaj do pokoju",
    createVoiceRoom: "Utwórz pokój",
    leaveVoiceRoom: "Opuść pokój",
    micOff: "Mikrofon wył.",
    micOn: "Mikrofon wł.",
    micError: "Mikrofon niedostępny.",
    noVoiceRoom: "Nie ma jeszcze pokoju rozmów.",
    roomLimit: "Limit pokoju to 5 zaproszonych graczy.",
    roomName: "Nazwa pokoju",
    voiceInvite: "Zaproś gracza",
    voiceInvitation: "Zaproszenie do pokoju",
    voiceInvitationPending: "Czeka na potwierdzenie",
    acceptVoiceInvite: "Potwierdź",
    declineVoiceInvite: "Odrzuć",
    voiceRoomLocked: "Do utworzenia pokoju potrzeba minimum 300 punktów.",
    voiceConnected: "Głos połączony",
    voiceConnection: "Połączenie głosu",
    voiceConnecting: "Łączenie głosu...",
    voiceDisconnected: "Głos rozłączony",
    voiceLead: "Utwórz pokój, zaproś do 5 graczy i rozmawiaj z niskim opóźnieniem.",
    voiceReady: "Gotowe dla audio WebRTC",
    voiceRoom: "Pokój rozmów",
    voiceServerOffline: "Serwer głosu offline",
    topPlayers: "Top gracze",
    welcomeGame: "Добро пожаловать в игру!",
  },
};

copy.uk = {
  add: "Додати",
  addPlayer: "Додати гравця",
  allGames: "Усі ігри",
  adminLead: "Приховане керування очками, рангами гравців і запропонованими новинами.",
  adminLog: "Журнал адміністратора",
  adminPanelTitle: "Панель адміністратора",
  adminPasswordLabel: "Пароль адміністратора",
  accountAccess: "Обліковий запис",
  adminSaved: "Зміни адміністратора збережено.",
  approveNews: "Схвалити",
  appNavigation: "Навігація застосунку",
  appSettings: "Налаштування",
  article: "Стаття",
  achievements: "Досягнення",
  back: "Назад",
  backToSite: "Повернутися на сайт Lasertag Warsaw",
  bookings: "бронювання",
  captainTools: "Інструменти капітана",
  change: "Змінити",
  changeAvatar: "Змінити аватар",
  changePassword: "Змінити пароль",
  chatPlaceholder: "Напишіть гравцям",
  chatLocked: "Чат гравців відкривається від 50 очок.",
  clearChat: "Очистити чат",
  choosePlayers: "Виберіть зареєстрованих гравців",
  clubFeed: "Стрічка клубу",
  clubUpdates: "Оновлення",
  contact: "Телефон або Telegram",
  currentPassword: "Поточний пароль",
  createTeam: "Створити команду",
  createPlayerProfile: "Створити профіль гравця",
  createGame: "Створити гру",
  confirmCancelText: "Скасувати ваше бронювання на цю гру?",
  freshNews: "Свіжі новини",
  fileModeText: "Файловий режим може блокувати синхронізацію із сайтом.",
  fileModeTitle: "Відкрийте через локальний сервер",
  gameReward: "+25 очок",
  gameRewardText: "за перше бронювання кожної гри",
  gameCapacity: "Кількість місць",
  gameDate: "Дата гри",
  gameHistory: "Історія ігор",
  gameTime: "Час гри",
  games: "Ігри",
  gamesLead: "Виберіть дату, перевірте вільні місця та додайте себе до складу одним натисканням.",
  gamesTitle: "Забронювати гру",
  history: "Історія",
  home: "Головна",
  homeLead: "Зручна панель гравця для відкритих ігор, новин клубу, чату, рейтингу та ваших очок.",
  homeOverline: "Варшава / застосунок клубу",
  homeTitle: "Грайте, бронюйте та залишайтеся з Lasertag Warsaw.",
  hardReset: "Повне скидання",
  language: "Мова",
  liveAudio: "Живий звук",
  loginProfile: "Увійти",
  loadingArticle: "Завантаження повної статті...",
  lockedCaptain: "Досягніть рангу Captain за очками, щоб створити команду із зареєстрованих гравців.",
  logout: "Вийти",
  news: "Новини",
  newsBody: "Текст новини",
  newsBodyPlaceholder: "Час, формат, для кого подія і де поставити запитання.",
  newsHeadline: "Заголовок",
  newsLead: "Новини із сайту з'являються тут автоматично. Також можна додати коротке клубне оголошення.",
  newsShort: "новини",
  newsTitle: "Новини Lasertag Warsaw",
  newsTitlePlaceholder: "Гра Counter-Strike у середу",
  newPassword: "Новий пароль",
  nextGame: "Наступна гра",
  nickname: "Нікнейм гравця",
  notifications: "Сповіщення",
  offline: "Не в мережі",
  online: "У мережі",
  openLocalhost: "Відкрити застосунок",
  openVoiceRoom: "Відкрити голосову кімнату",
  openProfile: "Відкрити профіль",
  password: "Пароль",
  passwordHint: "Щонайменше 2 літери або цифри та одна велика літера.",
  playerAdded: "Гравця додано.",
  playerPassword: "Пароль гравця",
  playerBlocked: "Гравця заблоковано",
  playerContact: "Контакт",
  playerChat: "Чат гравців",
  playerStats: "Статистика гравця",
  playerTools: "Інструменти гравця",
  points: "очки",
  pointsTransfer: "Передати очки",
  pointsTransferLocked: "Спочатку зареєструйтеся та заробіть очки.",
  pointsTransferNote: "Виберіть зареєстрованого гравця та передайте очки зі свого балансу.",
  pointsHistory: "Історія очок",
  personalProgress: "Прогрес",
  proposedNews: "Запропоновані новини",
  queue: "Черга",
  profile: "Профіль",
  profilePanel: "Панель гравця",
  publishNews: "Опублікувати й отримати +30",
  quickBooking: "Швидке бронювання",
  quickChat: "Швидкий чат",
  rank: "Ранг",
  rankInput: "Ранг",
  rankCaptain: "Капітан",
  rankCasual: "Граю іноді",
  rankRegular: "Постійний гравець",
  rankRookie: "Новачок",
  readNews: "Читати",
  registerFirst: "Заповніть профіль, щоб зареєструватися як гравець.",
  removePlayer: "Видалити гравця",
  registerProfile: "Зареєструватися",
  registerToBook: "Заповнити профіль",
  registerToChat: "Заповніть профіль, щоб писати в чат",
  rankingFromSite: "Рейтинг із сайту",
  rankingFilterAll: "Усі",
  rankingFilterMe: "Я",
  rankingFilterTeam: "Команда",
  rankingFilterTop: "Топ",
  refreshRoster: "Оновити гравців",
  savePlayer: "Зберегти гравця",
  saveProfile: "Зберегти профіль",
  selectPlayer: "Вибрати гравця",
  securitySettings: "Безпека",
  transferAmount: "Кількість очок",
  transferNoPlayers: "Немає доступних зареєстрованих гравців.",
  transferSend: "Передати очки",
  transferTo: "Гравець",
  sendInvites: "Надіслати запрошення до команди",
  sendMessage: "Надіслати повідомлення",
  showAll: "Показати все",
  showLess: "Показати менше",
  startActions: "Старт",
  syncError: "Помилка синхронізації",
  syncIdle: "Готово",
  syncPending: "Синхронізація...",
  syncStatus: "Синхронізація із сайтом",
  syncSynced: "Синхронізовано із сайтом",
  syncPlayer: "Синхронізувати гравця",
  retrySync: "Повторити синхронізацію",
  exportPlayers: "Експортувати гравців",
  manageGames: "Керування іграми",
  managePlayers: "Керування гравцями",
  newPlayerName: "Ім'я нового гравця",
  noPendingNews: "Немає запропонованих новин.",
  newsApproved: "Новину схвалено.",
  newsDeleted: "Новину видалено.",
  newsPending: "Новину надіслано адміністратору на перевірку.",
  teamConfirmations: "Підтвердження команди",
  teamDeleted: "Команду видалено.",
  deleteTeam: "Видалити команду",
  teamChat: "Чат команди",
  teamMessagePlaceholder: "Напишіть своїй команді",
  teamChatSent: "Повідомлення надіслано до чату команди.",
  teamName: "Назва команди",
  addToRoom: "Додати до кімнати",
  createVoiceRoom: "Створити голосову кімнату",
  leaveVoiceRoom: "Вийти з кімнати",
  micOff: "Мікрофон вимкнено",
  micOn: "Мікрофон увімкнено",
  micError: "Мікрофон недоступний.",
  noVoiceRoom: "Голосової кімнати ще немає.",
  roomLimit: "Ліміт кімнати — 5 запрошених гравців.",
  roomName: "Назва кімнати",
  voiceInvite: "Запросити гравця",
  voiceInvitation: "Запрошення до кімнати",
  voiceInvitationPending: "Очікує підтвердження",
  acceptVoiceInvite: "Прийняти",
  declineVoiceInvite: "Відхилити",
  voiceRoomLocked: "Для створення голосової кімнати потрібно щонайменше 300 очок.",
  voiceConnected: "Голос підключено",
  voiceConnection: "Голосове з'єднання",
  voiceConnecting: "Підключення голосу...",
  voiceDisconnected: "Голос відключено",
  voiceLead: "Створіть кімнату, запросіть до 5 гравців і спілкуйтеся з мінімальною затримкою.",
  voiceReady: "Готово до WebRTC-аудіо",
  voiceRoom: "Голосова кімната",
  voiceServerOffline: "Голосовий сервер не в мережі",
  topPlayers: "Найкращі гравці",
  welcomeGame: "Ласкаво просимо до гри!",
};

copy.be = {
  add: "Дадаць",
  addPlayer: "Дадаць гульца",
  allGames: "Усе гульні",
  adminLead: "Схаванае кіраванне ачкамі, рангамі гульцоў і прапанаванымі навінамі.",
  adminLog: "Журнал адміністратара",
  adminPanelTitle: "Панэль адміністратара",
  adminPasswordLabel: "Пароль адміністратара",
  accountAccess: "Уліковы запіс",
  adminSaved: "Змены адміністратара захаваны.",
  approveNews: "Ухваліць",
  appNavigation: "Навігацыя праграмы",
  appSettings: "Налады",
  article: "Артыкул",
  achievements: "Дасягненні",
  back: "Назад",
  backToSite: "Вярнуцца на сайт Lasertag Warsaw",
  bookings: "браніраванні",
  captainTools: "Інструменты капітана",
  change: "Змяніць",
  changeAvatar: "Змяніць аватар",
  changePassword: "Змяніць пароль",
  chatPlaceholder: "Напішыце гульцам",
  chatLocked: "Чат гульцоў адкрываецца ад 50 ачкоў.",
  clearChat: "Ачысціць чат",
  choosePlayers: "Выберыце зарэгістраваных гульцоў",
  clubFeed: "Стужка клуба",
  clubUpdates: "Абнаўленні",
  contact: "Тэлефон або Telegram",
  currentPassword: "Бягучы пароль",
  createTeam: "Стварыць каманду",
  createPlayerProfile: "Стварыць профіль гульца",
  createGame: "Стварыць гульню",
  confirmCancelText: "Скасаваць ваша браніраванне на гэтую гульню?",
  freshNews: "Свежыя навіны",
  fileModeText: "Файлавы рэжым можа блакаваць сінхранізацыю з сайтам.",
  fileModeTitle: "Адкрыйце праз лакальны сервер",
  gameReward: "+25 ачкоў",
  gameRewardText: "за першае браніраванне кожнай гульні",
  gameCapacity: "Колькасць месцаў",
  gameDate: "Дата гульні",
  gameHistory: "Гісторыя гульняў",
  gameTime: "Час гульні",
  games: "Гульні",
  gamesLead: "Выберыце дату, праверце вольныя месцы і дадайце сябе ў склад адным націскам.",
  gamesTitle: "Забраніраваць гульню",
  history: "Гісторыя",
  home: "Галоўная",
  homeLead: "Зручная панэль гульца для адкрытых гульняў, навін клуба, чата, рэйтынгу і вашых ачкоў.",
  homeOverline: "Варшава / праграма клуба",
  homeTitle: "Гуляйце, браніруйце і заставайцеся з Lasertag Warsaw.",
  hardReset: "Поўны скід",
  language: "Мова",
  liveAudio: "Жывы гук",
  loginProfile: "Увайсці",
  loadingArticle: "Загрузка поўнага артыкула...",
  lockedCaptain: "Дасягніце рангу Captain па ачках, каб стварыць каманду з зарэгістраваных гульцоў.",
  logout: "Выйсці",
  news: "Навіны",
  newsBody: "Тэкст навіны",
  newsBodyPlaceholder: "Час, фармат, для каго падзея і дзе задаць пытанні.",
  newsHeadline: "Загаловак",
  newsLead: "Навіны з сайта з'яўляюцца тут аўтаматычна. Таксама можна дадаць кароткую клубную абвестку.",
  newsShort: "навіны",
  newsTitle: "Навіны Lasertag Warsaw",
  newsTitlePlaceholder: "Гульня Counter-Strike у сераду",
  newPassword: "Новы пароль",
  nextGame: "Наступная гульня",
  nickname: "Нікнэйм гульца",
  notifications: "Апавяшчэнні",
  offline: "Не ў сетцы",
  online: "У сетцы",
  openLocalhost: "Адкрыць праграму",
  openVoiceRoom: "Адкрыць галасавы пакой",
  openProfile: "Адкрыць профіль",
  password: "Пароль",
  passwordHint: "Не менш за 2 літары або лічбы і адна вялікая літара.",
  playerAdded: "Гулец дададзены.",
  playerPassword: "Пароль гульца",
  playerBlocked: "Гулец заблакаваны",
  playerContact: "Кантакт",
  playerChat: "Чат гульцоў",
  playerStats: "Статыстыка гульца",
  playerTools: "Інструменты гульца",
  points: "ачкі",
  pointsTransfer: "Перадаць ачкі",
  pointsTransferLocked: "Спачатку зарэгіструйцеся і зарабіце ачкі.",
  pointsTransferNote: "Выберыце зарэгістраванага гульца і перадайце ачкі са свайго балансу.",
  pointsHistory: "Гісторыя ачкоў",
  personalProgress: "Прагрэс",
  proposedNews: "Прапанаваныя навіны",
  queue: "Чарга",
  profile: "Профіль",
  profilePanel: "Панэль гульца",
  publishNews: "Апублікаваць і атрымаць +30",
  quickBooking: "Хуткае браніраванне",
  quickChat: "Хуткі чат",
  rank: "Ранг",
  rankInput: "Ранг",
  rankCaptain: "Капітан",
  rankCasual: "Гуляю часам",
  rankRegular: "Пастаянны гулец",
  rankRookie: "Навічок",
  readNews: "Чытаць",
  registerFirst: "Запоўніце профіль, каб зарэгістравацца як гулец.",
  removePlayer: "Выдаліць гульца",
  registerProfile: "Зарэгістравацца",
  registerToBook: "Запоўніць профіль",
  registerToChat: "Запоўніце профіль, каб пісаць у чат",
  rankingFromSite: "Рэйтынг з сайта",
  rankingFilterAll: "Усе",
  rankingFilterMe: "Я",
  rankingFilterTeam: "Каманда",
  rankingFilterTop: "Топ",
  refreshRoster: "Абнавіць гульцоў",
  savePlayer: "Захаваць гульца",
  saveProfile: "Захаваць профіль",
  selectPlayer: "Выбраць гульца",
  securitySettings: "Бяспека",
  transferAmount: "Колькасць ачкоў",
  transferNoPlayers: "Няма даступных зарэгістраваных гульцоў.",
  transferSend: "Перадаць ачкі",
  transferTo: "Гулец",
  sendInvites: "Адправіць запрашэнні ў каманду",
  sendMessage: "Адправіць паведамленне",
  showAll: "Паказаць усё",
  showLess: "Паказаць менш",
  startActions: "Старт",
  syncError: "Памылка сінхранізацыі",
  syncIdle: "Гатова",
  syncPending: "Сінхранізацыя...",
  syncStatus: "Сінхранізацыя з сайтам",
  syncSynced: "Сінхранізавана з сайтам",
  syncPlayer: "Сінхранізаваць гульца",
  retrySync: "Паўтарыць сінхранізацыю",
  exportPlayers: "Экспартаваць гульцоў",
  manageGames: "Кіраванне гульнямі",
  managePlayers: "Кіраванне гульцамі",
  newPlayerName: "Імя новага гульца",
  noPendingNews: "Няма прапанаваных навін.",
  newsApproved: "Навіна ўхвалена.",
  newsDeleted: "Навіна выдалена.",
  newsPending: "Навіна адпраўлена адміністратару на праверку.",
  teamConfirmations: "Пацвярджэнні каманды",
  teamDeleted: "Каманда выдалена.",
  deleteTeam: "Выдаліць каманду",
  teamChat: "Чат каманды",
  teamMessagePlaceholder: "Напішыце сваёй камандзе",
  teamChatSent: "Паведамленне адпраўлена ў чат каманды.",
  teamName: "Назва каманды",
  addToRoom: "Дадаць у пакой",
  createVoiceRoom: "Стварыць галасавы пакой",
  leaveVoiceRoom: "Выйсці з пакоя",
  micOff: "Мікрафон выключаны",
  micOn: "Мікрафон уключаны",
  micError: "Мікрафон недаступны.",
  noVoiceRoom: "Галасавога пакоя яшчэ няма.",
  roomLimit: "Ліміт пакоя — 5 запрошаных гульцоў.",
  roomName: "Назва пакоя",
  voiceInvite: "Запрасіць гульца",
  voiceInvitation: "Запрашэнне ў пакой",
  voiceInvitationPending: "Чакае пацвярджэння",
  acceptVoiceInvite: "Прыняць",
  declineVoiceInvite: "Адхіліць",
  voiceRoomLocked: "Для стварэння галасавога пакоя трэба не менш за 300 ачкоў.",
  voiceConnected: "Голас падключаны",
  voiceConnection: "Галасавое злучэнне",
  voiceConnecting: "Падключэнне голасу...",
  voiceDisconnected: "Голас адключаны",
  voiceLead: "Стварыце пакой, запрасіце да 5 гульцоў і размаўляйце з мінімальнай затрымкай.",
  voiceReady: "Гатова да WebRTC-аўдыё",
  voiceRoom: "Галасавы пакой",
  voiceServerOffline: "Галасавы сервер не ў сетцы",
  topPlayers: "Лепшыя гульцы",
  welcomeGame: "Сардэчна запрашаем у гульню!",
};

const additionalCopy = {
  en: {
    addPhoto: "Add photo",
    removePhoto: "Remove photo",
    chatLead: "Messages and photos from registered BAZA players.",
    newGameNotification: "New game is open",
    liveStream: "LIVE STREAM",
    streamDuringGame: "Live stream is available during the game.",
    playerNews: "Player news",
    newsProposalTitle: "Share club news",
    suggestNews: "Suggest news",
    newsMedia: "Photo or short video",
    newsMediaHint: "JPG, PNG, WebP or MP4, MOV, WebM up to 15 seconds and 1.5 MB.",
    sendForReview: "Send to Ruslan for review",
    mediaTooLarge: "The file is too large. Use a smaller photo or video up to 1.5 MB.",
    videoTooLong: "The video must be no longer than 15 seconds.",
    unsupportedMedia: "Use JPG, PNG, WebP, MP4, MOV or WebM.",
    removeMedia: "Remove media",
    rewardAfterApproval: "+30 points after approval",
    deleteProposal: "Delete proposal",
    confirmPublication: "Confirm publication",
    saveNewsChanges: "Save changes",
  },
  pl: {
    addPhoto: "Dodaj zdjęcie",
    removePhoto: "Usuń zdjęcie",
    chatLead: "Wiadomości i zdjęcia zarejestrowanych graczy BAZA.",
    newGameNotification: "Otwarto zapisy na nową grę",
    liveStream: "TRANSMISJA NA ŻYWO",
    streamDuringGame: "Transmisja jest dostępna podczas gry.",
    playerNews: "Wiadomości graczy",
    newsProposalTitle: "Podziel się wiadomością klubową",
    suggestNews: "Zaproponuj news",
    newsMedia: "Zdjęcie lub krótki film",
    newsMediaHint: "JPG, PNG, WebP albo MP4, MOV, WebM do 15 sekund i 1,5 MB.",
    sendForReview: "Wyślij Ruslanowi do akceptacji",
    mediaTooLarge: "Plik jest za duży. Użyj mniejszego zdjęcia lub filmu do 1,5 MB.",
    videoTooLong: "Film może mieć maksymalnie 15 sekund.",
    unsupportedMedia: "Użyj JPG, PNG, WebP, MP4, MOV lub WebM.",
    removeMedia: "Usuń media",
    rewardAfterApproval: "+30 punktów po akceptacji",
    deleteProposal: "Usuń propozycję",
    confirmPublication: "Potwierdź publikację",
    saveNewsChanges: "Zapisz zmiany",
  },
  ru: {
    addPhoto: "Добавить фото",
    removePhoto: "Удалить фото",
    chatLead: "Сообщения и фотографии зарегистрированных игроков BAZA.",
    newGameNotification: "Открыта запись на новую игру",
    liveStream: "ПРЯМОЙ ЭФИР",
    streamDuringGame: "Эфир доступен во время игры.",
    playerNews: "Новости игроков",
    newsProposalTitle: "Поделиться новостью клуба",
    suggestNews: "Предложить новость",
    newsMedia: "Фото или короткое видео",
    newsMediaHint: "JPG, PNG, WebP или MP4, MOV, WebM до 15 секунд и 1,5 МБ.",
    sendForReview: "Отправить Ruslan на проверку",
    mediaTooLarge: "Файл слишком большой. Выбери меньшее фото или видео до 1,5 МБ.",
    videoTooLong: "Видео должно быть не длиннее 15 секунд.",
    unsupportedMedia: "Используй JPG, PNG, WebP, MP4, MOV или WebM.",
    removeMedia: "Удалить медиа",
    rewardAfterApproval: "+30 пунктов после публикации",
    deleteProposal: "Удалить предложение",
    confirmPublication: "Подтвердить публикацию",
    saveNewsChanges: "Сохранить изменения",
  },
  uk: {
    addPhoto: "Додати фото",
    removePhoto: "Видалити фото",
    chatLead: "Повідомлення та фотографії зареєстрованих гравців BAZA.",
    newGameNotification: "Відкрито запис на нову гру",
    liveStream: "ПРЯМИЙ ЕФІР",
    streamDuringGame: "Ефір доступний під час гри.",
    playerNews: "Новини гравців",
    newsProposalTitle: "Поділитися новиною клубу",
    suggestNews: "Запропонувати новину",
    newsMedia: "Фото або коротке відео",
    newsMediaHint: "JPG, PNG, WebP або MP4, MOV, WebM до 15 секунд і 1,5 МБ.",
    sendForReview: "Надіслати Ruslan на перевірку",
    mediaTooLarge: "Файл завеликий. Виберіть менше фото або відео до 1,5 МБ.",
    videoTooLong: "Відео має бути не довше 15 секунд.",
    unsupportedMedia: "Використовуйте JPG, PNG, WebP, MP4, MOV або WebM.",
    removeMedia: "Видалити медіа",
    rewardAfterApproval: "+30 очок після публікації",
    deleteProposal: "Видалити пропозицію",
    confirmPublication: "Підтвердити публікацію",
    saveNewsChanges: "Зберегти зміни",
  },
  be: {
    addPhoto: "Дадаць фота",
    removePhoto: "Выдаліць фота",
    chatLead: "Паведамленні і фатаграфіі зарэгістраваных гульцоў BAZA.",
    newGameNotification: "Адкрыты запіс на новую гульню",
    liveStream: "ПРАМЫ ЭФІР",
    streamDuringGame: "Эфір даступны падчас гульні.",
    playerNews: "Навіны гульцоў",
    newsProposalTitle: "Падзяліцца навіной клуба",
    suggestNews: "Прапанаваць навіну",
    newsMedia: "Фота або кароткае відэа",
    newsMediaHint: "JPG, PNG, WebP або MP4, MOV, WebM да 15 секунд і 1,5 МБ.",
    sendForReview: "Адправіць Ruslan на праверку",
    mediaTooLarge: "Файл занадта вялікі. Выберыце меншае фота або відэа да 1,5 МБ.",
    videoTooLong: "Відэа павінна быць не даўжэй за 15 секунд.",
    unsupportedMedia: "Выкарыстоўвайце JPG, PNG, WebP, MP4, MOV або WebM.",
    removeMedia: "Выдаліць медыя",
    rewardAfterApproval: "+30 ачкоў пасля публікацыі",
    deleteProposal: "Выдаліць прапанову",
    confirmPublication: "Пацвердзіць публікацыю",
    saveNewsChanges: "Захаваць змены",
  },
};

Object.entries(additionalCopy).forEach(([language, values]) => Object.assign(copy[language], values));

const locales = { en: "en", pl: "pl", be: "be", uk: "uk", ru: "ru" };

const newsCopy = {
  "noka-review-2026-07-10": {
    title: {
      en: "The 11th generation through the tournament winner's eyes",
      pl: "11. generacja oczami zwycięzcy turnieju",
      be: "11-е пакаленне вачыма пераможцы турніру",
      uk: "11-те покоління очима переможця турніру",
      ru: "11-е поколение глазами победителя турнира",
    },
    body: {
      en: "Noka talks about adaptation, strong opponents and why the new equipment makes players think differently again.",
      pl: "Noka opowiada o adaptacji, wysokim poziomie rywali i o tym, dlaczego nowe wyposażenie ponownie zmusza do myślenia podczas gry.",
      be: "Noka распавядае пра адаптацыю, высокі ўзровень сапернікаў і пра тое, чаму новае абсталяванне зноў прымушае думаць падчас гульні.",
      uk: "Noka розповідає про адаптацію, високий рівень суперників і про те, чому нове обладнання знову змушує думати під час гри.",
      ru: "Noka рассказывает об адаптации, высоком уровне соперников и о том, почему новое оборудование снова заставляет думать во время игры.",
    },
  },
  "agent-review-2026-07-10": {
    title: {
      en: "The July 5 tournament through the eyes of an Old Skufs player",
      pl: "Turniej 5 lipca oczami gracza Old Skufs",
      be: "Турнір 5 ліпеня вачыма гульца Old Skufs",
      uk: "Турнір 5 липня очима гравця Old Skufs",
      ru: "Турнир 5 июля глазами игрока Old Skufs",
    },
    body: {
      en: "AGENT talks about the organization, Old Skufs' performance, the strongest rivals and the tournament's sporting atmosphere.",
      pl: "AGENT opowiada o organizacji, grze Old Skufs, najmocniejszych rywalach i sportowej atmosferze turnieju.",
      be: "AGENT распавядае пра арганізацыю, гульню Old Skufs, наймацнейшых сапернікаў і спартыўную атмасферу турніру.",
      uk: "AGENT розповідає про організацію, гру Old Skufs, найсильніших суперників і спортивну атмосферу турніру.",
      ru: "AGENT рассказывает об организации, игре Old Skufs, сильнейших соперниках и спортивной атмосфере турнира.",
    },
  },
  "tort-review-2026-07-09": {
    title: {
      en: "Review of laser tag competitions in Warsaw",
      pl: "Przegląd turniejów laser tag w Warszawie",
      be: "Агляд лазертаг-спаборніцтваў у Варшаве",
      uk: "Огляд лазертаг-змагань у Варшаві",
      ru: "Обзор лазертаг-соревнований в Варшаве",
    },
    body: {
      en: "First of all, I want to thank the organizers for what they are doing for laser tag in Warsaw.",
      pl: "Przede wszystkim chcę podziękować organizatorom za to, co robią dla laser tagu w Warszawie.",
      be: "У першую чаргу хачу падзякаваць арганізатарам за тое, што яны робяць для лазертага ў Варшаве.",
      uk: "Насамперед хочу подякувати організаторам за те, що вони роблять для лазертага у Варшаві.",
      ru: "В первую очередь хочу поблагодарить организаторов за то, что они делают для лазертага в Варшаве.",
    },
  },
  "jak-review-2026-07-07": {
    title: {
      en: "A player's review after the Open Lasertag tournament",
      pl: "Opinia gracza po turnieju Open Lasertag",
      be: "Водгук гульца пасля турніру Open Lasertag",
      uk: "Відгук гравця після турніру Open Lasertag",
      ru: "Мнение игрока после турнира Open Lasertag",
    },
    body: {
      en: "JAK talks about the new equipment, the CS scenario, tournament settings and why some habits have to be learned again.",
      pl: "JAK opowiada o nowym sprzęcie, scenariuszu CS, ustawieniach turniejowych i o tym, dlaczego niektórych rzeczy trzeba nauczyć się od nowa.",
      be: "JAK распавядае пра новае абсталяванне, сцэнар CS, турнірныя налады і пра тое, чаму некаторым рэчам трэба навучыцца нанова.",
      uk: "JAK розповідає про нове обладнання, сценарій CS, турнірні налаштування і про те, чому деяких речей доводиться вчитися заново.",
      ru: "JAK рассказывает о новом снаряжении, сценарии CS, организации турнира и о том, почему некоторым вещам приходится учиться заново.",
    },
  },
  "technology-upgrade": {
    title: {
      en: "A new era of laser paintball at Lasertag Warsaw",
      pl: "Nowa era laserowego paintballa w Lasertag Warsaw",
      be: "Новая эра лазернага пейнтбола ў Lasertag Warsaw",
      uk: "Нова ера лазерного пейнтболу в Lasertag Warsaw",
      ru: "Новая эра лазерного пейнтбола в Lasertag Warsaw",
    },
    body: {
      en: "The biggest update in our arena's history: real-time statistics, FPS-style sound effects and new game scenarios.",
      pl: "Największa aktualizacja w historii naszej areny: statystyki w czasie rzeczywistym, efekty dźwiękowe jak w FPS-ach i nowe scenariusze rozgrywek.",
      be: "Найбуйнейшае абнаўленне ў гісторыі нашай арэны: статыстыка ў рэальным часе, гукавыя эфекты як у FPS і новыя сцэнары гульні.",
      uk: "Найбільше оновлення в історії нашої арени: статистика в реальному часі, звукові ефекти як у FPS і нові сценарії гри.",
      ru: "Самое большое обновление в истории нашей арены: статистика в реальном времени, звуковые эффекты в стиле FPS и новые игровые сценарии.",
    },
  },
  "telegram-events": {
    title: {
      en: "Away games and tournaments announced in TG",
      pl: "Wyjazdy i turnieje ogłaszamy w TG",
      be: "Выезды і турніры абвяшчаем у TG",
      uk: "Виїзди й турніри оголошуємо в TG",
      ru: "Анонсируем поездки и турниры в Telegram",
    },
    body: {
      en: "Dates, locations, rules and player lists are published in the club Telegram chat.",
      pl: "Daty, lokalizacje, regulaminy i listy graczy publikujemy w klubowym czacie Telegram.",
      be: "Даты, лакацыі, рэгламенты і спісы гульцоў публікуем у клубным Telegram-чаце.",
      uk: "Дати, локації, регламенти та списки гравців публікуємо в клубному Telegram-чаті.",
      ru: "Даты, локации, регламент и списки игроков публикуются в Telegram-чате клуба.",
    },
  },
  "sunday-open-game": {
    title: {
      en: "Open game for everyone 10+",
      pl: "Otwarta gra dla wszystkich chętnych 10+",
      be: "Адкрытая гульня для ўсіх ахвотных 10+",
      uk: "Відкрита гра для всіх охочих 10+",
      ru: "Открытая игра для всех желающих 10+",
    },
    body: {
      en: "The easiest entry format for new players, families and people without their own team.",
      pl: "Najprostszy wejściowy format dla nowych graczy, rodzin i osób bez własnej drużyny.",
      be: "Самы просты фармат для новых гульцоў, сем'яў і людзей без сваёй каманды.",
      uk: "Найпростіший формат для нових гравців, сімей і людей без власної команди.",
      ru: "Самый простой формат для новых игроков, семей и людей без своей команды.",
    },
  },
  "wednesday-counter-strike": {
    title: {
      en: "Counter-Strike 6v6 for players 14+",
      pl: "Counter-Strike 6 na 6 dla graczy 14+",
      be: "Counter-Strike 6 на 6 для гульцоў 14+",
      uk: "Counter-Strike 6 на 6 для гравців 14+",
      ru: "Counter-Strike 6 на 6 для игроков 14+",
    },
    body: {
      en: "Regular Wednesday scenario: two teams, tactical objectives and registration solo or as a squad.",
      pl: "Stały scenariusz środowy: dwie drużyny, cele taktyczne i zapis solo albo składem.",
      be: "Пастаянны сцэнар па серадах: дзве каманды, тактычныя мэты і запіс сольна або складам.",
      uk: "Постійний сценарій щосереди: дві команди, тактичні цілі та запис соло або складом.",
      ru: "Постоянный сценарий по средам: две команды, тактические цели и запись одному или составом.",
    },
  },
  "fallback-counter": {
    title: {
      en: "Wednesday Counter-Strike 6v6",
      pl: "Środowy Counter-Strike 6v6",
      be: "Counter-Strike 6v6 у сераду",
      uk: "Counter-Strike 6v6 у середу",
      ru: "Counter-Strike 6v6 в среду",
    },
    body: {
      en: "Meet at 18:20, age 14+. You can book solo or with a squad.",
      pl: "Zbiórka o 18:20, wiek 14+. Możesz zapisać się solo albo ekipą.",
      be: "Сустрэча а 18:20, узрост 14+. Можна запісацца аднаму або ўсёй камандай.",
      uk: "Зустріч о 18:20, вік 14+. Можна записатися одному або всією командою.",
      ru: "Сбор к 18:20, возраст 14+. Можно записаться одному или всей командой.",
    },
  },
  "open-tournament-2026-07-05": {
    title: {
      en: "Open Lasertag Tournament — excitement until the final match!",
      pl: "Turniej Open Lasertag — emocje do ostatniego meczu!",
      be: "Турнір Open Lasertag — эмоцыі да апошняга матча!",
      uk: "Турнір Open Lasertag — емоції до останнього матчу!",
      ru: "Турнир Open Lasertag — эмоции до последнего матча!",
    },
    body: {
      en: "Four five-player teams, a new CS scenario, a close fight to the end and victory for Hard Skill led by Shved.",
      pl: "Cztery pięcioosobowe drużyny, nowy scenariusz CS, zacięta walka do końca i zwycięstwo Hard Skill prowadzonego przez Shveda.",
      be: "Чатыры каманды па пяць чалавек, новы сцэнар CS, напружаная барацьба да канца і перамога Hard Skill пад кіраўніцтвам Shveda.",
      uk: "Чотири команди по п'ять гравців, новий сценарій CS, напружена боротьба до кінця і перемога Hard Skill під керівництвом Shveda.",
      ru: "Четыре команды по пять человек, новый сценарий CS, напряжённая борьба до конца и победа Hard Skill под руководством Shveda.",
    },
  },
};

const newsImages = {
  "noka-review-2026-07-10": "assets/update-noka-review.webp",
  "agent-review-2026-07-10": "assets/update-agent-review.webp",
  "tort-review-2026-07-09": "assets/player-tort.webp",
  "jak-review-2026-07-07": "assets/update-jak-review.webp",
  "technology-upgrade": "assets/photo_2026-07-06_22-53-50.webp",
  "telegram-events": "assets/update-telegram.webp",
  "sunday-open-game": "assets/update-sunday.webp",
  "wednesday-counter-strike": "assets/update-wednesday.webp",
  "fallback-counter": "assets/update-wednesday.webp",
  "open-tournament-2026-07-05": "assets/update-open-turniej-2026-07-05.webp",
};

const rankBaseTiers = [
  { points: 0, name: "New Player" },
  { points: 100, name: "Rookie" },
  { points: 200, name: "Agent" },
  { points: 300, name: "Damage" },
  { points: 400, name: "Scout" },
  { points: 500, name: "Hunter" },
  { points: 600, name: "Ghost" },
  { points: 700, name: "Striker" },
  { points: 800, name: "Operator" },
  { points: 900, name: "Commander" },
  { points: 1000, name: "Captain" },
];

const rankPrestigeNames = ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Elite", "Legend"];
const rankPrestigeSteps = ["I", "II", "III", "IV", "V", "Ace", "Prime", "Boss", "Storm", "Alpha"];

const defaultGames = [
  {
    id: "wed-counter",
    scheduleDay: 3,
    scheduleHour: 18,
    scheduleMinute: 30,
    day: "15",
    month: { en: "Jul", pl: "lip", be: "ліп", uk: "лип", ru: "июл" },
    date: { en: "Wednesday, July 15", pl: "Środa, 15 lipca", be: "Серада, 15 ліпеня", uk: "Середа, 15 липня", ru: "Среда, 15 июля" },
    time: "18:30",
    title: "Counter-Strike 6v6",
    description: {
      en: "Two teams, tactical objectives and fast roster matching for solo players or squads.",
      pl: "Dwie drużyny, cele taktyczne i szybkie dobieranie składu dla solo graczy albo ekip.",
      be: "Дзве каманды, тактычныя мэты і хуткі падбор складу для сольных гульцоў або каманд.",
      uk: "Дві команди, тактичні цілі та швидкий підбір складу для гравців соло або команд.",
      ru: "Две команды, тактические цели и быстрый подбор состава для соло игроков или своей команды.",
    },
    capacity: 12,
    roster: ["NOKA", "SVED", "PLATAU", "YNWA", "KATYA", "MAX"],
  },
  {
    id: "sun-open",
    scheduleDay: 0,
    scheduleHour: 18,
    scheduleMinute: 0,
    day: "12",
    month: { en: "Jul", pl: "lip", be: "ліп", uk: "лип", ru: "июл" },
    date: { en: "Sunday, July 12", pl: "Niedziela, 12 lipca", be: "Нядзеля, 12 ліпеня", uk: "Неділя, 12 липня", ru: "Воскресенье, 12 июля" },
    time: "18:00",
    title: { en: "Open game 10+", pl: "Gra otwarta 10+", be: "Адкрытая гульня 10+", uk: "Відкрита гра 10+", ru: "Открытая игра 10+" },
    description: {
      en: "An easy format for new players, families and anyone who wants to try Lasertag Warsaw without a team.",
      pl: "Prosty format dla nowych graczy, rodzin i osób, które chcą spróbować Lasertag Warsaw bez drużyny.",
      be: "Просты фармат для новых гульцоў, сем'яў і ўсіх, хто хоча паспрабаваць Lasertag Warsaw без сваёй каманды.",
      uk: "Простий формат для нових гравців, сімей і всіх, хто хоче спробувати Lasertag Warsaw без власної команди.",
      ru: "Удобный формат для новых игроков, семей и тех, кто хочет попробовать Lasertag Warsaw без своей команды.",
    },
    capacity: 20,
    roster: ["JAKUB", "SPICA", "BEN", "KIRA", "AGENT", "TORT", "W1LASER"],
  },
  {
    id: "away-telegram-july",
    day: "TG",
    month: { en: "away", pl: "wyjazd", be: "выезд", uk: "виїзд", ru: "выезд" },
    date: { en: "Date in Telegram", pl: "Data w Telegramie", be: "Дата ў Telegram", uk: "Дата в Telegram", ru: "Дата в Telegram" },
    time: { en: "by signup", pl: "wg zapisów", be: "па запісе", uk: "за записом", ru: "по записи" },
    title: { en: "Away game", pl: "Gra wyjazdowa", be: "Выязная гульня", uk: "Виїзна гра", ru: "Выездовая игра" },
    description: {
      en: "The organizer publishes the meeting point, format and exact time in the club Telegram.",
      pl: "Organizator publikuje miejsce zbiórki, format i dokładny czas w klubowym Telegramie.",
      be: "Арганізатар публікуе месца сустрэчы, фармат і дакладны час у клубным Telegram.",
      uk: "Організатор публікує місце зустрічі, формат і точний час у клубному Telegram.",
      ru: "Организатор публикует место сбора, формат и точное время в клубном Telegram.",
    },
    capacity: 16,
    roster: ["PASHA", "KOMETA", "JINN"],
  },
];

const siteSignupFallback = [
  { id: "e9cb2239-3bf7-4d53-93c7-364b01527662", game: "wednesday", nickname: "w1laser", note: "solo", createdAt: "2026-07-07T22:03:50.003Z" },
  { id: "b76cb23a-9a3e-49bf-be26-a40a21b04bdd", game: "wednesday", nickname: "Jenya", note: "Solo", createdAt: "2026-07-07T22:11:33.902Z" },
  { id: "b1dbdc4e-0b66-4714-bd84-06dad46ebd24", game: "wednesday", nickname: "Tsisa", note: "Команда", createdAt: "2026-07-07T23:10:39.497Z" },
  { id: "bcb81348-1330-4992-ab35-87027cbad98e", game: "wednesday", nickname: "BG", note: "", createdAt: "2026-07-09T18:51:47.361Z" },
  { id: "8ab37b37-e461-477b-9592-0d2fd07b285b", game: "sunday", nickname: "Tsisa", note: "Solo", createdAt: "2026-07-07T23:11:11.758Z" },
  { id: "9adff3e8-4f1d-46e9-a85b-81d3326dbed9", game: "sunday", nickname: "YNWA", note: "", createdAt: "2026-07-09T11:13:07.919Z" },
  { id: "af295387-7632-45d5-86be-89db7ef2ebe5", game: "sunday", nickname: "KRZAK", note: "", createdAt: "2026-07-09T11:20:21.839Z" },
  { id: "afe9a5d9-2e39-4f56-abd0-48b0e6aed846", game: "sunday", nickname: "Noka", note: "", createdAt: "2026-07-09T11:41:02.530Z" },
  { id: "d88b29da-a355-45e6-8833-a4eff24b3643", game: "sunday", nickname: "W1laser", note: "Solo", createdAt: "2026-07-09T12:09:11.662Z" },
  { id: "ed548e2b-9e9d-40dd-acca-a005fd58b90d", game: "sunday", nickname: "BG", note: "", createdAt: "2026-07-09T18:54:19.880Z" },
  { id: "c35fd961-7fd0-4347-9377-8f5cba8a0764", game: "sunday", nickname: "Jakub", note: "", createdAt: "2026-07-10T09:50:01.475Z" },
  { id: "bd948e68-6ed4-49f2-aab3-2e3e894090ee", game: "sunday", nickname: "Kira", note: "", createdAt: "2026-07-10T10:09:41.489Z" },
  { id: "0ac58e2a-3a25-4974-801f-1c958753e38f", game: "sunday", nickname: "Jinn", note: "", createdAt: "2026-07-10T10:10:28.225Z" },
  { id: "f7968e9d-b0c4-4d7b-8ead-258f26920258", game: "sunday", nickname: "Agent", note: "", createdAt: "2026-07-10T10:11:05.226Z" },
  { id: "3bab8717-c99a-4e18-803d-77cc87a4afea", game: "sunday", nickname: "Max", note: "", createdAt: "2026-07-10T10:11:28.367Z" },
  { id: "a08750db-9ba0-4b2c-abfd-d898aeac4688", game: "sunday", nickname: "Kometa", note: "", createdAt: "2026-07-10T10:12:26.089Z" },
  { id: "ef010911-fb02-4350-aded-1040b4ca4914", game: "sunday", nickname: "Tort", note: "", createdAt: "2026-07-10T10:13:18.359Z" },
  { id: "6f5aa752-059c-49a0-a6cc-4b323740052c", game: "sunday", nickname: "Spica", note: "", createdAt: "2026-07-10T10:14:33.091Z" },
  { id: "001f97e9-aabd-4ab9-8bbf-f541343fc654", game: "sunday", nickname: "JNX", note: "", createdAt: "2026-07-10T10:39:31.791Z" },
];

const playerRanking = [
  { rank: 1, name: "JAKUB", points: 320, avatar: "" },
  { rank: 2, name: "NOKA", points: 300, avatar: "assets/player-noka.jpeg" },
  { rank: 3, name: "YNWA", points: 244, avatar: "assets/player-ynwa.jpg" },
  { rank: 4, name: "MAX", points: 233, avatar: "" },
  { rank: 5, name: "PLATAU", points: 199, avatar: "assets/player-platau.jpg" },
  { rank: 6, name: "SVED", points: 191, avatar: "assets/player-sved.jpg" },
  { rank: 18, name: "KATYA", points: 94, avatar: "assets/player-katya.jpg" },
];

const defaultNews = [
  {
    id: "fallback-counter",
    title: { en: "Wednesday Counter-Strike 6v6", pl: "Środa Counter-Strike 6v6", be: "У сераду Counter-Strike 6v6", uk: "У середу Counter-Strike 6v6", ru: "В среду играем Counter-Strike 6v6" },
    body: {
      en: "Meet at 18:20, age 14+. You can book solo or with a squad.",
      pl: "Zbiórka o 18:20, wiek 14+. Możesz zapisać się solo albo ekipą.",
      be: "Сустрэча а 18:20, узрост 14+. Можна запісацца аднаму або ўсёй камандай.",
      uk: "Зустріч о 18:20, вік 14+. Можна записатися одному або всією командою.",
      ru: "Сбор к 18:20, возраст 14+. Можно записаться одному или всей командой.",
    },
    author: "Club Bot",
    createdAt: "2026-07-10T08:30:00.000Z",
    system: true,
  },
];

const defaultChat = [
  {
    id: "chat-1",
    author: "Club Bot",
    system: true,
    body: {
      en: "Wednesday roster is open. Captains can assemble teams in the profile panel.",
      pl: "Zapisy na środę są otwarte. Kapitanowie mogą złożyć drużynę w panelu profilu.",
      be: "Запіс на сераду адкрыты. Капітаны могуць сабраць каманду ў панэлі профілю.",
      uk: "Запис на середу відкрито. Капітани можуть зібрати команду в панелі профілю.",
      ru: "Запись на среду открыта. Капитаны могут собрать команду в личной панели.",
    },
    createdAt: "2026-07-10T08:35:00.000Z",
  },
  {
    id: "chat-2",
    author: "NOKA",
    body: {
      en: "I am in for 18:30.",
      pl: "Jestem na 18:30.",
      be: "Я ў гульні а 18:30.",
      uk: "Я у грі о 18:30.",
      ru: "Я на 18:30 в игре.",
    },
    createdAt: "2026-07-10T08:42:00.000Z",
  },
];

const defaultState = {
  version: 3,
  settings: {
    language: "en",
  },
  profile: {
    nickname: "Warsaw player",
    contact: "",
    level: "rookie",
    avatar: "",
    saved: false,
    passwordHash: "",
  },
  auth: {
    loggedIn: false,
    role: "player",
  },
  admin: {
    resetVersion: ADMIN_RESET_VERSION,
    playerOverrides: {},
    playerProfiles: {},
    lastCreatedProfile: null,
    blockedPlayers: {},
    customGames: [],
    actionLog: [],
  },
  signups: {},
  news: defaultNews,
  newsProposals: [],
  siteNews: [],
  siteGames: [],
  seenGameInstances: [],
  siteRanking: [],
  siteSignups: [],
  cancelledSiteSignupIds: [],
  sync: {
    status: "idle",
    lastRosterSync: "",
    lastSiteSync: "",
    lastError: "",
  },
  articleCache: {},
  chat: defaultChat,
  voiceRooms: [],
  activeVoiceRoomId: "",
  activities: [
    {
      id: "welcome",
      title: { en: "Welcome to Lasertag Warsaw", pl: "Witaj w Lasertag Warsaw", be: "Сардэчна запрашаем у Lasertag Warsaw", uk: "Ласкаво просимо до Lasertag Warsaw", ru: "Добро пожаловать в Lasertag Warsaw" },
      label: { en: "start", pl: "start", be: "старт", uk: "старт", ru: "старт" },
      points: 0,
      createdAt: new Date().toISOString(),
    },
  ],
  team: null,
};

let state = loadState();
let toastTimer;
let welcomeTimer;
let homeNewsExpanded = false;
let previousView = "home";
let activeArticleId = "";
let articleLoadingId = "";
let rankingFilter = "all";
let voiceStream = null;
let voiceSocket = null;
let voiceSocketStatus = "offline";
let voiceClientId = "";
let voiceReconnectTimer = null;
let pendingVoiceRoomSync = null;
let lastVoiceError = "";
let voiceHttpTimer = null;
let voiceSignalCursor = "";
let voiceAudioCursor = "";
let chatRefreshTimer = null;
let gamesRefreshTimer = null;
let rankingRefreshTimer = null;
let playerChatSocket = null;
let chatPendingPhoto = "";
let newsPendingMedia = null;
let newsProposalRefreshTimer = null;
let voiceAudioUnlocked = false;
let voiceAudioContext = null;
let voiceRelayRecorder = null;
let voiceRelayMimeType = "";
let voiceRelayActive = false;
let voiceRelayPlaying = false;
let voiceRelayLastChunkAt = "";
let nativeVoiceRtcStatus = "offline";
let nativeVoiceRtcRoomId = "";
let nativeVoiceRtcMicEnabled = false;
let nativeVoiceRemoteAudioTracks = 0;
let nativeVoiceRemoteParticipants = 0;
let nativeVoiceRequestSequence = 0;
let nativeVoiceConnectPromise = null;
let nativeVoiceDisconnectedAt = 0;
let browserVoiceRtcStatus = "offline";
let browserVoiceRtcRoomId = "";
let browserVoiceRtcPlayer = "";
let browserVoiceRtcMicEnabled = false;
let browserVoiceRoom = null;
let browserVoiceConnectPromise = null;
let voiceRoomRenderFingerprint = "";
let voiceActionPending = false;
let voiceRoomMissingSince = 0;
let voiceSessionActivated = false;
let voiceReconnectNotBefore = 0;
let voiceReconnectAttempts = 0;
let voiceBrowserHiddenTimer = null;
let voiceDisconnectPromise = null;
const VOICE_ROOM_MISSING_GRACE_MS = 12000;
const VOICE_RECONNECT_STATUS_GRACE_MS = 6000;
const VOICE_BROWSER_HIDDEN_DISCONNECT_MS = 120000;
const voicePeers = new Map();
const remoteAudioNodes = new Map();
const browserVoiceAudioNodes = new Map();
const voiceRelaySeenChunks = new Set();
const voiceRelayQueue = [];
const voiceHttpSeenSignals = new Set();
const notifiedVoiceInviteIds = new Set();
const nativeVoiceRequests = new Map();
let lastVoiceForegroundSyncAt = 0;

const views = document.querySelectorAll("[data-view]");
const appScroll = document.querySelector(".app-scroll");
const tabButtons = document.querySelectorAll("[data-tab]");
const openViewButtons = document.querySelectorAll("[data-open-view]");
const siteHomeLinks = document.querySelectorAll("[data-site-home]");
const gameList = document.querySelector("[data-game-list]");
const featuredGame = document.querySelector("[data-featured-game]");
const rankingList = document.querySelector("[data-ranking-list]");
const rankingFilterButtons = document.querySelectorAll("[data-ranking-filter]");
const miniFeed = document.querySelector("[data-mini-feed]");
const newsFeed = document.querySelector("[data-news-feed]");
const newsForm = document.querySelector("[data-news-form]");
const newsProposalToggle = document.querySelector("[data-toggle-news-proposal]");
const newsMediaInput = document.querySelector("[data-news-media-input]");
const newsMediaPreview = document.querySelector("[data-news-media-preview]");
const profileForm = document.querySelector("[data-profile-form]");
const loginForm = document.querySelector("[data-login-form]");
const passwordChangeForm = document.querySelector("[data-password-change-form]");
const profileLoginButton = document.querySelector("[data-profile-login-action]");
const profileRegisterButton = document.querySelector("[data-profile-register-action]");
const languageSelect = document.querySelector("[data-language-select]");
const welcomeMessage = document.querySelector("[data-welcome-message]");
const avatarInput = document.querySelector("[data-avatar-input]");
const avatarPicker = document.querySelector(".avatar-picker");
const activityList = document.querySelector("[data-activity-list]");
const toast = document.querySelector("[data-toast]");
const chatFeed = document.querySelector("[data-chat-feed]");
const chatForm = document.querySelector("[data-chat-form]");
const chatPhotoInput = document.querySelector("[data-chat-photo-input]");
const chatPhotoPreview = document.querySelector("[data-chat-photo-preview]");
const chatPhotoPreviewImage = document.querySelector("[data-chat-photo-preview-image]");
const playerPicker = document.querySelector("[data-player-picker]");
const teamPanel = document.querySelector("[data-team-panel]");
const teamForm = document.querySelector("[data-team-form]");
const teamStatus = document.querySelector("[data-team-status]");
const notificationList = document.querySelector("[data-notification-list]");
let homeNewsToggle = document.querySelector("[data-toggle-home-news]");
const articleReader = document.querySelector("[data-article-reader]");
const articleBackButton = document.querySelector("[data-back-from-article]");
const syncStatusNodes = document.querySelectorAll("[data-sync-status]");
const profileSync = document.querySelector("[data-profile-sync]");
const pointsTransferPanel = document.querySelector("[data-points-transfer]");
const adminPanel = document.querySelector("[data-admin-panel]");
const voiceRoomPanel = document.querySelector("[data-voice-room]");
const voiceAudioStage = document.querySelector("[data-voice-audio]");
const homeVoiceStatus = document.querySelector("[data-home-voice-status]");
const voiceInviteAlert = document.querySelector("[data-voice-invite-alert]");
const envWarning = document.querySelector("[data-env-warning]");
const homeStatsPanel = document.querySelector("[data-home-stats]");
const homeTeam = document.querySelector("[data-home-team]");
const achievementsList = document.querySelector("[data-achievements]");
const gameHistoryList = document.querySelector("[data-game-history]");

let uiAudioContext = null;
let uiAudioEnabled = false;
let lastScrollFeedbackAt = 0;
const scrollFeedbackPositions = new WeakMap();

function nativeHaptic(style = "light") {
  const handler = window.webkit?.messageHandlers?.bazaNative;
  if (handler?.postMessage) {
    handler.postMessage({ type: "haptic", style });
    return;
  }
  if (navigator.vibrate) navigator.vibrate(style === "medium" ? 16 : 8);
}

function ensureUiAudio() {
  if (uiAudioContext) return uiAudioContext;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  uiAudioContext = new AudioContext();
  return uiAudioContext;
}

function playUiTone(kind = "press") {
  if (!uiAudioEnabled) return;
  const context = ensureUiAudio();
  if (!context) return;
  if (context.state === "suspended") context.resume().catch(() => {});
  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = kind === "scroll" ? "sine" : "square";
  oscillator.frequency.setValueAtTime(kind === "scroll" ? 760 : 330, now);
  if (kind !== "scroll") oscillator.frequency.exponentialRampToValueAtTime(520, now + 0.045);
  gain.gain.setValueAtTime(kind === "scroll" ? 0.012 : 0.035, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + (kind === "scroll" ? 0.025 : 0.065));
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + (kind === "scroll" ? 0.028 : 0.07));
}

document.addEventListener(
  "pointerdown",
  (event) => {
    const control = event.target.closest("button, a, [role='button']");
    if (!control || control.disabled || control.getAttribute("aria-disabled") === "true") return;
    uiAudioEnabled = true;
    ensureUiAudio();
    playUiTone("press");
    nativeHaptic(control.classList.contains("primary-button") ? "medium" : "light");
  },
  { capture: true },
);

document.addEventListener(
  "scroll",
  (event) => {
    const target = event.target;
    if (!(target instanceof Element) || !target.matches(".app-scroll, .chat-feed, .ranking-strip, .home-roster")) return;
    const position = Math.round((target.scrollTop || 0) + (target.scrollLeft || 0));
    const previous = scrollFeedbackPositions.get(target) ?? position;
    const now = performance.now();
    if (Math.abs(position - previous) < 44 || now - lastScrollFeedbackAt < 90) return;
    scrollFeedbackPositions.set(target, position);
    lastScrollFeedbackAt = now;
    playUiTone("scroll");
    nativeHaptic("selection");
  },
  { capture: true, passive: true },
);

saveState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return cloneData(defaultState);
    const saved = JSON.parse(raw);
    const adminData = {
      ...defaultState.admin,
      ...(saved.admin || {}),
      resetVersion: ADMIN_RESET_VERSION,
      playerOverrides: saved.admin?.resetVersion === ADMIN_RESET_VERSION && saved.admin?.playerOverrides ? saved.admin.playerOverrides : {},
      playerProfiles: saved.admin?.resetVersion === ADMIN_RESET_VERSION && saved.admin?.playerProfiles ? saved.admin.playerProfiles : {},
      lastCreatedProfile: saved.admin?.resetVersion === ADMIN_RESET_VERSION ? saved.admin?.lastCreatedProfile || null : null,
      blockedPlayers: saved.admin?.resetVersion === ADMIN_RESET_VERSION && saved.admin?.blockedPlayers ? saved.admin.blockedPlayers : {},
      customGames: saved.admin?.resetVersion === ADMIN_RESET_VERSION && Array.isArray(saved.admin?.customGames) ? saved.admin.customGames : [],
      actionLog: saved.admin?.resetVersion === ADMIN_RESET_VERSION && Array.isArray(saved.admin?.actionLog) ? saved.admin.actionLog : [],
    };
    const resetOldProfiles = saved.admin?.resetVersion !== ADMIN_RESET_VERSION;
    const migratedProfile = resetOldProfiles ? cloneData(defaultState.profile) : { ...defaultState.profile, ...saved.profile };
    if (normalizePlayerName(migratedProfile.nickname) === "baza player") migratedProfile.nickname = defaultState.profile.nickname;
    migratedProfile.level = normalizeLevel(migratedProfile.level);
    migratedProfile.saved =
      Boolean(migratedProfile.saved) ||
      (!isPlaceholderPlayerName(migratedProfile.nickname) && Boolean(String(migratedProfile.contact || "").trim()));
    const migratedAuth = {
      ...defaultState.auth,
      ...(resetOldProfiles ? {} : saved.auth || {}),
      loggedIn: resetOldProfiles ? false : Boolean(saved.auth?.loggedIn && (migratedProfile.passwordHash || saved.auth?.role === "admin")),
      role: resetOldProfiles ? "player" : saved.auth?.role || "player",
    };
    const migratedTeam = !resetOldProfiles && saved.team
      ? { ...saved.team, chat: Array.isArray(saved.team.chat) ? saved.team.chat : [] }
      : null;

    return {
      ...cloneData(defaultState),
      ...saved,
      version: defaultState.version,
      settings: { ...defaultState.settings, ...saved.settings, language: saved.settings?.language || "en" },
      profile: migratedProfile,
      auth: migratedAuth,
      admin: adminData,
      news: normalizeNewsItems(Array.isArray(saved.news) ? saved.news : cloneData(defaultNews)),
      newsProposals: Array.isArray(saved.newsProposals) ? saved.newsProposals : [],
      siteNews: Array.isArray(saved.siteNews) ? saved.siteNews : [],
      siteGames: Array.isArray(saved.siteGames) ? saved.siteGames : [],
      seenGameInstances: Array.isArray(saved.seenGameInstances) ? saved.seenGameInstances : [],
      siteRanking: Array.isArray(saved.siteRanking) ? saved.siteRanking : [],
      siteSignups: Array.isArray(saved.siteSignups) ? saved.siteSignups : [],
      cancelledSiteSignupIds: Array.isArray(saved.cancelledSiteSignupIds) ? saved.cancelledSiteSignupIds : [],
      sync: { ...defaultState.sync, ...(saved.sync || {}) },
      articleCache: saved.articleCache && typeof saved.articleCache === "object" ? saved.articleCache : {},
      chat: Array.isArray(saved.chat) ? saved.chat : cloneData(defaultChat),
      voiceRooms: Array.isArray(saved.voiceRooms) ? saved.voiceRooms : [],
      activeVoiceRoomId: saved.activeVoiceRoomId || "",
      activities: Array.isArray(saved.activities) ? saved.activities : cloneData(defaultState.activities),
      signups: resetOldProfiles ? {} : saved.signups || {},
      team: migratedTeam,
    };
  } catch {
    return cloneData(defaultState);
  }
}

function saveState() {
  try {
    const persistedState = {
      ...state,
      newsProposals: (state.newsProposals || []).map((proposal) => ({
        ...proposal,
        media: proposal.media ? { ...proposal.media, data: "" } : null,
      })),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedState));
    return true;
  } catch (error) {
    if (state.profile?.avatar) {
      state.profile.avatar = "";
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        return true;
      } catch {
        // Fall through to the error toast below.
      }
    }
    showToast(localizedToast("saveError"));
    return false;
  }
}

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeNewsItems(items) {
  return items.map((item) => ({
    ...item,
    status: item.status || (item.pending ? "pending" : "published"),
  }));
}

function normalizeLevel(level) {
  const levelMap = {
    "Новый игрок": "rookie",
    "Играю иногда": "casual",
    "Постоянный игрок": "regular",
    "Командный капитан": "captain",
    Rookie: "rookie",
    Regular: "regular",
    Captain: "captain",
  };
  return levelMap[level] || level || "rookie";
}

function currentLanguage() {
  return copy[state.settings.language] ? state.settings.language : "en";
}

function t(key) {
  return copy[currentLanguage()]?.[key] || copy.en[key] || key;
}

function localize(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[currentLanguage()] || value.en || Object.values(value)[0] || "";
  }
  return value == null ? "" : String(value);
}

function localizedText(values) {
  return values?.[currentLanguage()] || values?.en || "";
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "BX";
}

function playerName() {
  return state.profile.nickname.trim() || "Warsaw player";
}

function signedGameIds() {
  if (!isCurrentUserRegistered()) return [];
  return scheduledGames()
    .filter((game) => isCurrentPlayerSignedForGame(game))
    .map((game) => game.id);
}

function siteHomeUrl() {
  if (location.protocol === "file:" || ["localhost", "127.0.0.1"].includes(location.hostname)) {
    return "http://localhost:3000/";
  }
  return "https://www.lasertagbaza.pl/";
}

function applySiteLinks() {
  siteHomeLinks.forEach((link) => {
    link.href = siteHomeUrl();
  });
}

function localUserNews() {
  return state.news.filter((item) => !item.system && !item.site && item.status !== "pending");
}

function userNews() {
  const currentName = normalizePlayerName(playerName());
  const items = [
    ...localUserNews(),
    ...(state.siteNews || []).filter(
      (item) => item.playerSubmitted && normalizePlayerName(item.author) === currentName,
    ),
  ];
  return [...new Map(items.map((item) => [item.id, item])).values()];
}

function rankingPlayerByName(name) {
  const normalizedName = normalizePlayerName(name);
  if (!normalizedName) return null;
  return currentPlayerRanking().find((player) => normalizePlayerName(player.name) === normalizedName) || null;
}

function rankingPointsForPlayer(name) {
  return Number(rankingPlayerByName(name)?.points || 0);
}

function rankingPointsForCurrentPlayer() {
  return rankingPointsForPlayer(playerName());
}

function combinedNews() {
  const siteItems = state.siteNews || [];
  const playerItems = localUserNews();
  const fallbackItems = (state.news || []).filter((item) => item.status !== "pending");
  const items = siteItems.length ? [...siteItems, ...playerItems] : fallbackItems;
  return items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function totalPoints() {
  if (isAdmin()) return 10000;
  const rankedPlayer = rankingPlayerByName(playerName());
  const activityPoints = state.activities.reduce((sum, item) => sum + Number(item.points || 0), 0);
  const derivedPoints = signedGameIds().length * 25 + userNews().length * 30;
  if (rankedPlayer) return Math.max(0, Number(rankedPlayer.points || 0));
  return Math.max(0, Math.max(activityPoints, derivedPoints));
}

function calculatedRankLabel() {
  return rankLabelForPoints(totalPoints());
}

function rankLabelForPoints(points) {
  if (points >= 10000) return "BAZA Legend";
  const baseTier = [...rankBaseTiers].reverse().find((tier) => points >= tier.points);
  if (baseTier && points <= 1000) return baseTier.name;

  const level = Math.max(11, Math.floor(points / 100));
  const prestigeIndex = Math.min(Math.floor((level - 11) / rankPrestigeSteps.length), rankPrestigeNames.length - 1);
  const stepIndex = (level - 11) % rankPrestigeSteps.length;
  return `${rankPrestigeNames[prestigeIndex]} Captain ${rankPrestigeSteps[stepIndex]}`;
}

function selectedRankLabel() {
  return calculatedRankLabel();
}

function capitalize(value) {
  return String(value || "").charAt(0).toUpperCase() + String(value || "").slice(1);
}

function isCaptain() {
  return isAdmin() || (isCurrentUserRegistered() && totalPoints() >= 1000);
}

function canCreateVoiceRoom() {
  return isAdmin() || (isCurrentUserRegistered() && totalPoints() >= VOICE_ROOM_MIN_POINTS);
}

function canUsePlayerChat() {
  return isAdmin() || (isCurrentUserRegistered() && totalPoints() >= CHAT_MIN_POINTS);
}

function isAdmin() {
  return Boolean(
    state.auth?.loggedIn &&
      state.auth?.role === "admin" &&
      normalizePlayerName(state.profile?.nickname) === normalizePlayerName(ADMIN_ACCOUNT.nickname),
  );
}

function isPlayerBlocked(name) {
  return Boolean(state.admin?.blockedPlayers?.[normalizePlayerName(name)]);
}

function normalizePlayerName(name) {
  return String(name || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[Łł]/g, "l")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function isPlaceholderPlayerName(name) {
  return ["baza player", "warsaw player"].includes(normalizePlayerName(name));
}

function staticRegisteredPlayerNames() {
  const names = new Set(currentPlayerRanking().map((player) => player.name));
  defaultGames.forEach((game) => game.roster.forEach((name) => names.add(name)));
  (state.admin?.customGames || []).forEach((game) => (game.roster || []).forEach((name) => names.add(name)));
  return names;
}

function currentPlayerRanking() {
  const basePlayers = state.siteRanking.length ? state.siteRanking : playerRanking;
  const byName = new Map();

  basePlayers.forEach((player) => {
    byName.set(normalizePlayerName(player.name), { ...player });
  });

  if (isAdmin()) {
    byName.set(normalizePlayerName(ADMIN_ACCOUNT.nickname), {
      rank: 1,
      name: ADMIN_ACCOUNT.nickname,
      points: 10000,
      avatar: state.profile.avatar,
    });
  }

  Object.entries(state.admin?.playerOverrides || {}).forEach(([nameKey, override]) => {
    const existing = byName.get(nameKey) || { name: override.name || nameKey, avatar: "" };
    byName.set(nameKey, {
      ...existing,
      name: override.name || existing.name,
      points: Number(override.points || 0),
    });
  });

  return [...byName.values()]
    .sort((a, b) => Number(b.points || 0) - Number(a.points || 0) || String(a.name).localeCompare(String(b.name)))
    .map((player, index) => ({ ...player, rank: index + 1 }));
}

function findGame(gameId) {
  return scheduledGames().find((item) => item.id === gameId) || defaultGames.find((item) => item.id === gameId);
}

function isCurrentUserRegistered() {
  if (isAdmin()) return true;
  const nickname = playerName();
  return (
    Boolean(state.profile.saved) &&
    Boolean(state.auth.loggedIn) &&
    !isPlaceholderPlayerName(nickname) &&
    Boolean(state.profile.contact.trim()) &&
    !isPlayerBlocked(nickname)
  );
}

function hasProfilePassword() {
  return Boolean(state.profile.passwordHash);
}

function isRegisteredPlayerName(name) {
  const normalizedName = normalizePlayerName(name);
  if (isPlayerBlocked(normalizedName)) return false;
  const staticNames = [...staticRegisteredPlayerNames()].map(normalizePlayerName);
  return staticNames.includes(normalizedName) || (isCurrentUserRegistered() && normalizedName === normalizePlayerName(playerName()));
}

function isTeamParticipant() {
  if (!state.team || !isCurrentUserRegistered()) return false;
  const currentName = normalizePlayerName(playerName());
  return (
    normalizePlayerName(state.team.captain) === currentName ||
    state.team.members.some((member) => normalizePlayerName(member.name) === currentName && member.status !== "declined")
  );
}

function isTeamCaptainOwner() {
  return Boolean(state.team && isCurrentUserRegistered() && normalizePlayerName(state.team.captain) === normalizePlayerName(playerName()));
}

function userRoster(game) {
  return siteSignupNamesForGame(game);
}

function signedRoster(game) {
  return siteSignupNamesForGame(game);
}

function siteSignupNamesForGame(game) {
  const gameKey = siteGameKey(game);
  if (!gameKey) return [];
  const names = [];
  state.siteSignups
    .filter((signup) => signup.game === gameKey)
    .forEach((signup) => {
      const name = String(signup.nickname || "").trim();
      if (name && !names.some((existing) => normalizePlayerName(existing) === normalizePlayerName(name))) {
        names.push(name);
      }
    });
  return names;
}

function currentPlayerSiteSignup(game) {
  if (!isCurrentUserRegistered()) return null;
  const gameKey = siteGameKey(game);
  const currentName = normalizePlayerName(playerName());
  if (!gameKey || !currentName) return null;
  return state.siteSignups.find(
    (signup) => signup.game === gameKey && normalizePlayerName(signup.nickname) === currentName,
  ) || null;
}

function isCurrentPlayerSignedForGame(game) {
  if (!isCurrentUserRegistered() || !game) return false;
  return Boolean(state.signups[game.id] || currentPlayerSiteSignup(game));
}

function siteGameKey(game) {
  if (game?.siteGame) return game.siteGame;
  if (game?.scheduleDay === 3 || String(game?.id || "").startsWith("wed-counter")) return "wednesday";
  if (game?.scheduleDay === 0 || String(game?.id || "").startsWith("sun-open")) return "sunday";
  return "";
}

function registeredPlayers() {
  const names = staticRegisteredPlayerNames();
  if (isCurrentUserRegistered()) names.add(playerName());
  return [...names]
    .filter((name) => normalizePlayerName(name) !== normalizePlayerName(playerName()))
    .sort((a, b) => a.localeCompare(b));
}

function siteFeedGames() {
  if (!Array.isArray(state.siteGames) || !state.siteGames.length) return [];
  return state.siteGames.map((feedGame) => {
    const template = defaultGames.find((game) => siteGameKey(game) === feedGame.id) || {};
    const startsAt = new Date(feedGame.startsAt);
    const validStart = !Number.isNaN(startsAt.getTime());
    return {
      ...template,
      siteGame: feedGame.id || template.siteGame || "",
      id: `${template.id || feedGame.id || "site-game"}-${validStart ? dateId(startsAt) : feedGame.date || Date.now()}`,
      startsAt: validStart ? startsAt.toISOString() : feedGame.startsAt,
      time: feedGame.time || template.time || "18:00",
      title: template.title || feedGame.title || "BAZA game",
      description: template.description || feedGame.scenario || "BAZA game",
      capacity: Number(feedGame.capacity || template.capacity || 20),
      roster: Array.isArray(feedGame.players) ? feedGame.players.map((player) => player.nickname).filter(Boolean) : [],
      feedInstanceKey: `${feedGame.id || "game"}:${feedGame.startsAt || feedGame.date || ""}`,
    };
  });
}

function scheduledGames(now = new Date()) {
  const adminGames = (state.admin?.customGames || []).map((game) => ({ ...game, adminGame: true }));
  const baseGames = siteFeedGames();
  return [...(baseGames.length ? baseGames : defaultGames), ...adminGames]
    .map((game) => {
      if (game.startsAt) {
        const startsAt = new Date(game.startsAt);
        return {
          ...game,
          id: game.id,
          day: String(startsAt.getDate()).padStart(2, "0"),
          month: monthLabel(startsAt),
          date: gameDateLabel(startsAt),
        };
      }
      if (typeof game.scheduleDay !== "number") return { ...game, startsAt: null };
      const startsAt = nextDateForSchedule(game, now);
      return {
        ...game,
        id: `${game.id}-${dateId(startsAt)}`,
        startsAt: startsAt.toISOString(),
        day: String(startsAt.getDate()).padStart(2, "0"),
        month: monthLabel(startsAt),
        date: gameDateLabel(startsAt),
      };
    })
    .sort((a, b) => {
      if (!a.startsAt && !b.startsAt) return 0;
      if (!a.startsAt) return 1;
      if (!b.startsAt) return -1;
      return new Date(a.startsAt) - new Date(b.startsAt);
    });
}

function nextDateForSchedule(game, now) {
  const date = new Date(now);
  date.setHours(game.scheduleHour || 0, game.scheduleMinute || 0, 0, 0);
  const dayDelta = (game.scheduleDay - date.getDay() + 7) % 7;
  date.setDate(date.getDate() + dayDelta);
  if (date <= now) date.setDate(date.getDate() + 7);
  return date;
}

function dateId(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function monthLabel(date) {
  return {
    en: new Intl.DateTimeFormat("en", { month: "short" }).format(date),
    pl: new Intl.DateTimeFormat("pl", { month: "short" }).format(date).replace(".", ""),
    be: new Intl.DateTimeFormat("be", { month: "short" }).format(date).replace(".", ""),
    uk: new Intl.DateTimeFormat("uk", { month: "short" }).format(date).replace(".", ""),
    ru: new Intl.DateTimeFormat("ru", { month: "short" }).format(date).replace(".", ""),
  };
}

function gameDateLabel(date) {
  return {
    en: new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(date),
    pl: new Intl.DateTimeFormat("pl", { weekday: "long", month: "long", day: "numeric" }).format(date),
    be: new Intl.DateTimeFormat("be", { weekday: "long", month: "long", day: "numeric" }).format(date),
    uk: new Intl.DateTimeFormat("uk", { weekday: "long", month: "long", day: "numeric" }).format(date),
    ru: new Intl.DateTimeFormat("ru", { weekday: "long", month: "long", day: "numeric" }).format(date),
  };
}

function applyLanguage() {
  const language = currentLanguage();
  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((node) => {
    node.dataset.i18nAttr.split(",").forEach((record) => {
      const [attribute, key] = record.split(":").map((part) => part.trim());
      if (attribute && key) node.setAttribute(attribute, t(key));
    });
  });
}

function renderAvatar(target, size = "small") {
  const label = initials(playerName());
  if (!target) return;
  target.innerHTML = state.profile.avatar
    ? `<img src="${state.profile.avatar}" alt="${escapeHtml(playerName())}" />`
    : label;
  target.setAttribute("aria-label", size === "small" ? `${t("profile")}: ${playerName()}` : `${t("changeAvatar")}: ${playerName()}`);
}

function renderStats() {
  if (homeStatsPanel) homeStatsPanel.hidden = !isCurrentUserRegistered();
  document.querySelectorAll("[data-points-total]").forEach((node) => {
    node.textContent = totalPoints();
  });
  document.querySelectorAll("[data-signed-count]").forEach((node) => {
    node.textContent = signedGameIds().length;
  });
  document.querySelectorAll("[data-news-count]").forEach((node) => {
    node.textContent = userNews().length;
  });
  document.querySelectorAll("[data-rank-label]").forEach((node) => {
    node.textContent = calculatedRankLabel();
  });
  document.querySelector("[data-profile-name]").textContent = playerName();
  document.querySelector("[data-profile-level]").textContent = selectedRankLabel();
  renderAvatar(document.querySelector("[data-avatar-mini]"));
  renderAvatar(document.querySelector("[data-avatar-large]"), "large");
  renderHomeVoiceEntry();
  renderVoiceInviteAlert();
}

function renderHomeVoiceEntry() {
  if (!homeVoiceStatus) return;
  const room = currentVoiceRoom();
  const invites = pendingVoiceInvites();
  const activeCount = room?.participants?.length || 0;
  if (!isCurrentUserRegistered()) {
    homeVoiceStatus.textContent = t("registerProfile");
    return;
  }
  if (invites.length) {
    homeVoiceStatus.textContent = `${t("voiceInvitation")} · ${invites.length}`;
    return;
  }
  if (!room) {
    homeVoiceStatus.textContent = t("noVoiceRoom");
    return;
  }
  const transportStatus = voiceTransportStatus();
  const status = transportStatus === "connected" || transportStatus === "online" ? t("online") : t("offline");
  homeVoiceStatus.textContent = `${activeCount}/6 · ${status}`;
}

function renderVoiceInviteAlert() {
  if (!voiceInviteAlert) return;
  const invites = pendingVoiceInvites();
  if (!invites.length) {
    voiceInviteAlert.hidden = true;
    voiceInviteAlert.innerHTML = "";
    return;
  }
  const invite = invites[0];
  voiceInviteAlert.hidden = false;
  voiceInviteAlert.innerHTML = `
    <div>
      <b>${escapeHtml(t("voiceInvitation"))}</b>
      <span>${escapeHtml(invite.room.name)} / ${escapeHtml(invite.room.owner)}</span>
    </div>
    <button class="primary-button" type="button" data-voice-accept="${escapeHtml(invite.room.id)}">${escapeHtml(t("acceptVoiceInvite"))}</button>
  `;
}

function gameCard(game, isCompact = false) {
  const roster = isCompact ? signedRoster(game) : userRoster(game);
  const registered = isCurrentUserRegistered();
  const signed = isCurrentPlayerSignedForGame(game);
  const spotsLeft = Math.max(game.capacity - roster.length, 0);
  const progress = Math.min(Math.round((roster.length / game.capacity) * 100), 100);
  const button = signed
    ? `<button class="secondary-button" type="button" data-cancel-game="${game.id}">${buttonLabel("cancel")}</button>`
    : `<button class="primary-button" type="button" data-sign-game="${game.id}" ${spotsLeft === 0 && registered ? "disabled" : ""}>${buttonLabel(registered ? "sign" : "register")}</button>`;

  return `
    <article class="${isCompact ? "featured-game-inner" : "game-card"}">
      <div class="game-topline">
        <div class="date-pill">
          <span><strong>${escapeHtml(game.day)}</strong>${escapeHtml(localize(game.month))}</span>
        </div>
        <div>
          <p class="game-meta">${escapeHtml(localize(game.date))} / ${escapeHtml(localize(game.time))}</p>
          <h3>${escapeHtml(localize(game.title))}</h3>
          <p>${escapeHtml(localize(game.description))}</p>
        </div>
      </div>
      <div class="game-progress">
        <div><i style="width: ${progress}%"></i></div>
        <span>${roster.length}/${game.capacity} ${spotsText(spotsLeft)}</span>
      </div>
      ${button}
      <div class="roster ${isCompact ? "home-roster" : ""}" aria-label="${escapeHtml(rosterLabel())}">
        ${roster.length ? roster.map((name) => `<span>${escapeHtml(name)}</span>`).join("") : `<em>${escapeHtml(emptyRosterText())}</em>`}
      </div>
    </article>
  `;
}

function buttonLabel(kind) {
  const labels = {
    en: { sign: "Book this game", cancel: "Remove booking", register: "Complete profile" },
    pl: { sign: "Zapisz się", cancel: "Usuń zapis", register: "Uzupełnij profil" },
    be: { sign: "Запісацца", cancel: "Скасаваць запіс", register: "Запоўніць профіль" },
    uk: { sign: "Записатися", cancel: "Скасувати запис", register: "Заповнити профіль" },
    ru: { sign: "Записаться", cancel: "Убрать запись", register: "Заполнить профиль" },
  };
  return (labels[currentLanguage()] || labels.en)[kind];
}

function spotsText(spotsLeft) {
  const labels = {
    en: `players, ${spotsLeft} free`,
    pl: `graczy, wolne ${spotsLeft}`,
    be: `гульцоў, вольна ${spotsLeft}`,
    uk: `гравців, вільно ${spotsLeft}`,
    ru: `игроков, свободно ${spotsLeft}`,
  };
  return localizedText(labels);
}

function rosterLabel() {
  return localizedText({ en: "Player roster", pl: "Lista graczy", be: "Спіс гульцоў", uk: "Список гравців", ru: "Список игроков" });
}

function emptyRosterText() {
  return localizedText({
    en: "No registered bookings yet.",
    pl: "Brak zapisanych graczy.",
    be: "Пакуль няма запісаных гульцоў.",
    uk: "Поки немає записаних гравців.",
    ru: "Пока нет записанных игроков.",
  });
}

function emptyChatText() {
  return localizedText({
    en: "No player messages yet.",
    pl: "Brak wiadomości graczy.",
    be: "Пакуль няма паведамленняў гульцоў.",
    uk: "Поки немає повідомлень гравців.",
    ru: "Пока нет сообщений игроков.",
  });
}

function chatPhotoErrorText() {
  return localizedText({
    en: "The photo could not be prepared. Choose a smaller image.",
    pl: "Nie udało się przygotować zdjęcia. Wybierz mniejszy plik.",
    be: "Не ўдалося падрыхтаваць фота. Выберыце меншы файл.",
    uk: "Не вдалося підготувати фото. Виберіть менший файл.",
    ru: "Не удалось подготовить фото. Выберите файл поменьше.",
  });
}

function deleteMessageLabel() {
  return localizedText({
    en: "Delete message",
    pl: "Usuń wiadomość",
    be: "Выдаліць паведамленне",
    uk: "Видалити повідомлення",
    ru: "Удалить сообщение",
  });
}

function safeChatImage(value) {
  const image = String(value || "");
  if (!/^data:image\/(?:jpeg|jpg|png|webp);base64,[a-z0-9+/=]+$/i.test(image)) return "";
  return image.length <= Math.ceil(CHAT_IMAGE_MAX_BYTES * 1.4) ? image : "";
}

function renderGames() {
  const games = scheduledGames().filter((game) => game.adminGame || Boolean(siteGameKey(game)));
  const nextGame = games.find((game) => game.startsAt) || games[0];
  if (featuredGame) featuredGame.innerHTML = gameCard(nextGame, true);
  if (gameList) gameList.innerHTML = games.map((game) => gameCard(game)).join("");
}

function renderRanking() {
  if (!rankingList) return;
  rankingFilterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.rankingFilter === rankingFilter);
  });

  const players = filteredRanking();
  rankingList.innerHTML = players
    .map((player) => {
      const avatar = player.avatar
        ? `<img src="${player.avatar}" alt="${escapeHtml(player.name)}" />`
        : `<span>${escapeHtml(initials(player.name))}</span>`;
      const rank = player.rank ? `#${player.rank}` : "ME";
      return `
        <article class="ranking-card">
          <div class="ranking-avatar">${avatar}</div>
          <b>${escapeHtml(rank)}</b>
          <strong>${escapeHtml(player.name)}</strong>
          <em>${escapeHtml(rankLabelForPoints(player.points))}</em>
          <span>${player.points} ${t("points")}</span>
        </article>
      `;
    })
    .join("");
}

function filteredRanking() {
  const ranking = currentPlayerRanking();
  if (rankingFilter === "top") return ranking.slice(0, 5);
  if (rankingFilter === "team") {
    const teamNames = currentTeamNames();
    return teamNames.length ? ranking.filter((player) => teamNames.includes(normalizePlayerName(player.name))) : ranking.slice(0, 5);
  }
  if (rankingFilter === "me") {
    const currentName = normalizePlayerName(playerName());
    const existing = ranking.find((player) => normalizePlayerName(player.name) === currentName);
    return [existing || { rank: null, name: playerName(), points: totalPoints(), avatar: state.profile.avatar }];
  }
  return ranking;
}

function currentTeamNames() {
  if (!state.team) return [];
  return [
    state.team.captain,
    ...state.team.members.filter((member) => member.status !== "declined").map((member) => member.name),
  ].map(normalizePlayerName);
}

function formatDate(value) {
  const date = new Date(value);
  return new Intl.DateTimeFormat(locales[currentLanguage()], {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function safeNewsUrl(item) {
  const url = String(item.contentUrl || "").trim();
  if (!url) return "";
  return /^https?:\/\//i.test(url) || url.startsWith("/") ? url : "";
}

function localizedNewsTitle(item) {
  return localize(newsCopy[item.id]?.title || item.title);
}

function localizedNewsBody(item) {
  return localize(newsCopy[item.id]?.body || item.body);
}

function newsImage(item) {
  if (item.media?.type === "image" && /^data:image\/(?:jpeg|jpg|png|webp);base64,/i.test(item.media.data || "")) {
    return item.media.data;
  }
  return newsImages[item.id] || item.image || "assets/card-news-trophy.jpg";
}

function safeNewsVideo(item) {
  const data = String(item.media?.data || "");
  return item.media?.type === "video" && /^data:video\/(?:mp4|webm|quicktime);base64,/i.test(data) ? data : "";
}

function renderNewsCardMedia(item) {
  const video = safeNewsVideo(item);
  if (video) {
    return `<video class="news-card-image news-card-video" src="${escapeHtml(video)}" muted playsinline preload="metadata"></video>`;
  }
  return `<img class="news-card-image" src="${escapeHtml(newsImage(item))}" alt="${escapeHtml(localizedNewsTitle(item))}" loading="lazy" decoding="async" />`;
}

function renderArticleMedia(item) {
  const video = safeNewsVideo(item);
  if (video) {
    return `<video class="article-image article-video" src="${escapeHtml(video)}" controls playsinline preload="metadata"></video>`;
  }
  return `<img class="article-image" src="${escapeHtml(newsImage(item))}" alt="${escapeHtml(localizedNewsTitle(item))}" />`;
}

function allNewsItems() {
  return combinedNews();
}

function findNewsItem(id) {
  return allNewsItems().find((item) => item.id === id);
}

function renderMiniNews(item) {
  const content = `
    <img class="mini-news-image" src="${escapeHtml(newsImage(item))}" alt="${escapeHtml(localizedNewsTitle(item))}" loading="lazy" decoding="async" />
    <span class="mini-news-copy">
      <b>${escapeHtml(localizedNewsTitle(item))}</b>
      <span>${formatDate(item.createdAt)} / ${escapeHtml(item.author || "BAZA")}</span>
      <em>${escapeHtml(t("readNews"))}</em>
    </span>
  `;

  return `
    <button class="mini-news mini-news-link" type="button" data-open-article="${escapeHtml(item.id)}">
      ${content}
    </button>
  `;
}

function renderFullNews(item) {
  const content = `
    ${renderNewsCardMedia(item)}
    <div class="news-card-copy">
    <div class="news-topline">
      <div>
        <time datetime="${escapeHtml(item.createdAt)}">${formatDate(item.createdAt)} / ${escapeHtml(item.author || "BAZA")}</time>
        <h3>${escapeHtml(localizedNewsTitle(item))}</h3>
      </div>
      ${item.playerSubmitted ? '<span class="news-badge">+30</span>' : item.site ? '<span class="news-badge">site</span>' : item.system ? "" : '<span class="news-badge">+30</span>'}
    </div>
    <p>${escapeHtml(localizedNewsBody(item))}</p>
    <strong class="read-news-link">${escapeHtml(t("readNews"))}</strong>
    </div>
  `;

  return `
    <button class="news-card news-card-link" type="button" data-open-article="${escapeHtml(item.id)}">
      ${content}
    </button>
  `;
}

function renderNews() {
  const sorted = combinedNews();
  if (miniFeed) {
    homeNewsToggle = ensureHomeNewsToggle();
    const visibleItems = homeNewsExpanded ? sorted : sorted.slice(0, 3);
    miniFeed.innerHTML = visibleItems
      .map((item) => renderMiniNews(item))
      .join("");

    if (homeNewsToggle) {
      homeNewsToggle.hidden = sorted.length <= 3;
      homeNewsToggle.textContent = homeNewsExpanded ? t("showLess") : t("showAll");
      homeNewsToggle.setAttribute("aria-expanded", String(homeNewsExpanded));
    }
  }

  if (newsFeed) {
    newsFeed.innerHTML = sorted
      .map((item) => renderFullNews(item))
      .join("");
  }
}

function ensureHomeNewsToggle() {
  if (homeNewsToggle) return homeNewsToggle;
  if (!miniFeed?.previousElementSibling) return null;

  const heading = miniFeed.previousElementSibling;
  const existingButton = heading.querySelector(".text-button");
  const button = document.createElement("button");
  button.className = "text-button";
  button.type = "button";
  button.dataset.toggleHomeNews = "";

  if (existingButton) {
    existingButton.replaceWith(button);
  } else {
    heading.append(button);
  }
  button.addEventListener("click", () => {
    homeNewsExpanded = !homeNewsExpanded;
    renderNews();
  });
  homeNewsToggle = button;
  return button;
}

function renderChat() {
  if (!chatFeed) return;
  const registered = isCurrentUserRegistered();
  const allowed = canUsePlayerChat();
  const messageInput = chatForm?.elements.message;
  if (messageInput) {
    messageInput.disabled = !allowed;
    messageInput.placeholder = !registered ? t("registerToChat") : allowed ? t("chatPlaceholder") : t("chatLocked");
  }
  if (chatPhotoInput) chatPhotoInput.disabled = !allowed;
  if (!allowed) {
    if (chatPendingPhoto) clearChatPhoto();
    chatFeed.innerHTML = `<p class="empty-note">${escapeHtml(registered ? t("chatLocked") : t("registerToChat"))}</p>`;
    return;
  }
  const messages = state.chat
    .filter((message) => message.registered || message.system || message.author === "Club Bot" || isRegisteredPlayerName(message.author))
    .slice(-12);

  chatFeed.innerHTML = messages.length
    ? messages
        .map(
          (message) => `
            <article class="chat-message ${message.author === playerName() ? "own" : ""}">
              <div>
                <b>${escapeHtml(message.author)}</b>
                <span>${formatDate(message.createdAt)}</span>
                ${message.author === playerName() || isAdmin() ? `<button type="button" data-delete-chat="${escapeHtml(message.id)}" aria-label="${escapeHtml(deleteMessageLabel())}">×</button>` : ""}
              </div>
              ${message.body ? `<p>${escapeHtml(localize(message.body))}</p>` : ""}
              ${safeChatImage(message.image) ? `<img class="chat-message-photo" src="${escapeHtml(message.image)}" alt="${escapeHtml(t("addPhoto"))}" loading="lazy" />` : ""}
            </article>
          `,
        )
        .join("")
    : `<p class="empty-note">${escapeHtml(emptyChatText())}</p>`;
  chatFeed.scrollTop = chatFeed.scrollHeight;
}

function renderActivity() {
  if (!activityList) return;
  const items = [...state.activities].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  activityList.innerHTML = items
    .map(
      (item) => `
        <li>
          <div>
            <b>${escapeHtml(localize(item.title))}</b>
            <span>${escapeHtml(localize(item.label))}</span>
          </div>
          <strong>${item.points > 0 ? `+${item.points}` : item.points}</strong>
        </li>
      `,
    )
    .join("");
}

function renderGameHistory() {
  if (!gameHistoryList) return;
  const games = state.activities
    .filter((item) => Math.abs(Number(item.points || 0)) === 25)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);

  gameHistoryList.innerHTML = games.length
    ? games
        .map(
          (item) => `
            <li>
              <div>
                <b>${escapeHtml(localize(item.title))}</b>
                <span>${escapeHtml(localize(item.label))}</span>
              </div>
              <strong>${item.points > 0 ? `+${item.points}` : item.points}</strong>
            </li>
          `,
        )
        .join("")
    : `<li><div><b>${escapeHtml(emptyGameHistoryText())}</b><span>${escapeHtml(t("gameHistory"))}</span></div><strong>0</strong></li>`;
}

function renderAchievements() {
  if (!achievementsList) return;
  const points = totalPoints();
  const signedCount = signedGameIds().length;
  const newsCount = userNews().length;
  const achievements = [
    { label: "First game", unlocked: signedCount >= 1, detail: `${signedCount}/1` },
    { label: "Rookie", unlocked: points >= 100, detail: `${points}/100` },
    { label: "Agent", unlocked: points >= 200, detail: `${points}/200` },
    { label: "Captain", unlocked: points >= 1000, detail: `${points}/1000` },
    { label: "News maker", unlocked: newsCount >= 1, detail: `${newsCount}/1` },
    { label: "Team player", unlocked: isTeamParticipant(), detail: state.team?.name || "BAZA" },
  ];

  achievementsList.innerHTML = achievements
    .map(
      (item) => `
        <article class="${item.unlocked ? "unlocked" : "locked"}">
          <b>${escapeHtml(item.unlocked ? "✓" : "•")}</b>
          <div>
            <strong>${escapeHtml(item.label)}</strong>
            <span>${escapeHtml(item.detail)}</span>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderHomeTeam() {
  if (!homeTeam) return;
  if (!state.team || !isTeamParticipant()) {
    homeTeam.hidden = true;
    homeTeam.innerHTML = "";
    return;
  }

  const confirmedCount = state.team.members.filter((member) => member.status === "confirmed").length;
  homeTeam.hidden = false;
  homeTeam.innerHTML = `
    <div>
      <span>${escapeHtml(t("teamChat"))}</span>
      <strong>${escapeHtml(state.team.name)}</strong>
    </div>
    <p>${escapeHtml(teamLabel("captain"))}: ${escapeHtml(state.team.captain)} · ${confirmedCount}/${state.team.members.length}</p>
    <button class="text-button" type="button" data-home-profile>${escapeHtml(t("openProfile"))}</button>
  `;
}

function renderSyncStatus() {
  const label = syncStatusText();
  syncStatusNodes.forEach((node) => {
    node.textContent = label;
  });

  if (profileSync) {
    profileSync.innerHTML = `
      <div>
        <span>${escapeHtml(t("syncStatus"))}</span>
        <strong>${escapeHtml(label)}</strong>
      </div>
      ${state.auth.loggedIn ? `<button class="text-button" type="button" data-logout>${escapeHtml(t("logout"))}</button>` : ""}
      ${state.sync.lastError ? `<p>${escapeHtml(state.sync.lastError)}</p>` : ""}
    `;
  }
}

function renderPointsTransfer() {
  if (!pointsTransferPanel) return;
  const wasOpen = Boolean(pointsTransferPanel.querySelector("[data-profile-disclosure='points']")?.open);
  const registered = isCurrentUserRegistered();
  const points = totalPoints();
  const players = registeredPlayers();
  const canTransfer = registered && points > 0 && players.length;
  pointsTransferPanel.hidden = !registered;

  if (!registered) {
    pointsTransferPanel.innerHTML = "";
    return;
  }

  pointsTransferPanel.innerHTML = `
    <details class="profile-disclosure" data-profile-disclosure="points" ${wasOpen ? "open" : ""}>
      <summary>
        <span class="material-symbols-rounded" aria-hidden="true">toll</span>
        <span><small>${escapeHtml(t("points"))} · ${points}</small><strong>${escapeHtml(t("pointsTransfer"))}</strong></span>
        <span class="material-symbols-rounded disclosure-chevron" aria-hidden="true">expand_more</span>
      </summary>
      <div class="profile-disclosure-body">
        <p>${escapeHtml(canTransfer ? t("pointsTransferNote") : players.length ? t("pointsTransferLocked") : t("transferNoPlayers"))}</p>
        <form class="points-transfer-form" data-points-transfer-form>
          <label>
            <span>${escapeHtml(t("transferTo"))}</span>
            <select name="recipient" ${canTransfer ? "" : "disabled"} required>
              ${players.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)} · ${rankingPointsForPlayer(name)} ${escapeHtml(t("points"))}</option>`).join("")}
            </select>
          </label>
          <label>
            <span>${escapeHtml(t("transferAmount"))}</span>
            <input name="amount" type="number" min="1" max="${points}" step="1" inputmode="numeric" ${canTransfer ? "" : "disabled"} required />
          </label>
          <button class="primary-button" type="submit" ${canTransfer ? "" : "disabled"}>${escapeHtml(t("transferSend"))}</button>
        </form>
      </div>
    </details>
  `;
}

function renderEnvironmentWarning() {
  if (!envWarning) return;
  envWarning.hidden = location.protocol !== "file:" || Boolean(window.BAZA_NATIVE_APP);
}

function syncStatusText() {
  if (state.sync.status === "pending") return t("syncPending");
  if (state.sync.status === "error") return t("syncError");
  if (state.sync.status === "synced") return t("syncSynced");
  return t("syncIdle");
}

function emptyGameHistoryText() {
  return localizedText({
    en: "No games yet.",
    pl: "Brak gier.",
    be: "Пакуль няма гульняў.",
    uk: "Поки немає ігор.",
    ru: "Пока нет игр.",
  });
}

function renderProfileForm() {
  if (!profileForm) return;
  const hasCompleteProfile = Boolean(isAdmin() || (state.profile.saved && hasProfilePassword()));
  profileForm.elements.nickname.value = isPlaceholderPlayerName(state.profile.nickname) && !state.profile.contact.trim() ? "" : state.profile.nickname;
  profileForm.elements.contact.value = state.profile.contact;
  if (profileForm.elements.password) profileForm.elements.password.value = "";
  profileForm.hidden = hasCompleteProfile;
  if (profileLoginButton) profileLoginButton.hidden = Boolean(state.auth.loggedIn);
  if (profileRegisterButton) profileRegisterButton.hidden = hasCompleteProfile;
  if (loginForm) {
    loginForm.hidden = true;
    if (loginForm.elements.loginNickname) loginForm.elements.loginNickname.value = state.profile.nickname;
    if (loginForm.elements.loginPassword) loginForm.elements.loginPassword.value = "";
  }
  if (passwordChangeForm) {
    passwordChangeForm.hidden = !hasCompleteProfile || !state.auth.loggedIn || isAdmin();
    const securityDisclosure = passwordChangeForm.closest("[data-profile-disclosure='security']");
    if (securityDisclosure) securityDisclosure.hidden = passwordChangeForm.hidden;
    if (passwordChangeForm.elements.currentPassword) passwordChangeForm.elements.currentPassword.value = "";
    if (passwordChangeForm.elements.newPassword) passwordChangeForm.elements.newPassword.value = "";
  }
  if (languageSelect) languageSelect.value = currentLanguage();
}

function renderAdminPanel() {
  if (!adminPanel) return;
  adminPanel.hidden = !isAdmin();
  if (!isAdmin()) {
    adminPanel.innerHTML = "";
    return;
  }

  const players = currentPlayerRanking().filter((player) => normalizePlayerName(player.name) !== normalizePlayerName(ADMIN_ACCOUNT.nickname));
  const proposedNews = (state.newsProposals || []).filter((item) => item.status === "pending");
  const pendingMembers = state.team?.members?.filter((member) => member.status === "pending") || [];
  adminPanel.innerHTML = `
    <div class="section-title compact-title">
      <div>
        <span>${escapeHtml(t("adminPasswordLabel"))}: ${escapeHtml(ADMIN_ACCOUNT.password)}</span>
        <h2>${escapeHtml(t("adminPanelTitle"))}</h2>
      </div>
    </div>
    <p class="admin-lead">${escapeHtml(t("adminLead"))}</p>
    <div class="admin-block admin-proposals-panel">
      <div class="admin-proposals-heading">
        <h3>${escapeHtml(t("proposedNews"))}</h3>
        <b>${proposedNews.length}</b>
      </div>
      <div class="admin-news-list">
        ${
          proposedNews.length
            ? proposedNews.map((item) => renderAdminNewsForm(item)).join("")
            : `<p class="empty-note">${escapeHtml(t("noPendingNews"))}</p>`
        }
      </div>
    </div>
    <div class="admin-toolbar">
      <button class="text-button" type="button" data-admin-retry-sync>${escapeHtml(t("retrySync"))}</button>
      <button class="text-button" type="button" data-admin-export-players>${escapeHtml(t("exportPlayers"))}</button>
      <button class="text-button" type="button" data-admin-clear-chat>${escapeHtml(t("clearChat"))}</button>
    </div>
    <div class="admin-sync-status">
      <b>${escapeHtml(t("syncStatus"))}</b>
      <span>${escapeHtml(syncStatusText())}${state.sync.lastSiteSync ? ` / ${escapeHtml(formatDate(state.sync.lastSiteSync))}` : ""}</span>
      ${state.sync.lastError ? `<p>${escapeHtml(state.sync.lastError)}</p>` : ""}
    </div>
    <div class="admin-block">
      <h3>${escapeHtml(t("managePlayers"))}</h3>
      ${renderAdminPlayerControl(players)}
    </div>
    <div class="admin-block">
      <h3>${escapeHtml(t("manageGames"))}</h3>
      ${renderAdminGameControl()}
    </div>
    <div class="admin-block">
      <h3>${escapeHtml(t("bookings"))}</h3>
      ${renderAdminSignupControl()}
    </div>
    <div class="admin-block">
      <h3>${escapeHtml(t("queue"))}</h3>
      <div class="admin-queue-list">
        <p>${escapeHtml(t("proposedNews"))}: <b>${proposedNews.length}</b></p>
        <p>${escapeHtml(t("teamConfirmations"))}: <b>${pendingMembers.length}</b></p>
      </div>
    </div>
    <div class="admin-block">
      <h3>${escapeHtml(t("adminLog"))}</h3>
      <div class="admin-log-list">
        ${renderAdminLog()}
      </div>
    </div>
  `;
}

function renderAdminPlayerControl(players) {
  const selectedPlayer = players[0] || { name: "", points: 0, rank: 0 };
  const selectedProfile = state.admin?.playerProfiles?.[normalizePlayerName(selectedPlayer.name)] || {};
  return `
    <div class="admin-player-window">
      <form class="admin-player-card" data-admin-player-form>
        <label>
          <span>${escapeHtml(t("selectPlayer"))}</span>
          <select name="playerName" data-admin-player-select>
            ${players.map((player) => `<option value="${escapeHtml(player.name)}">${escapeHtml(player.name)} / #${player.rank}</option>`).join("")}
          </select>
        </label>
        <div class="admin-selected-player" data-admin-selected-player>
          <b>${escapeHtml(selectedPlayer.name || "-")}</b>
          <span>${escapeHtml(rankLabelForPoints(selectedPlayer.points || 0))}</span>
        </div>
        <label>
          <span>${escapeHtml(t("playerContact"))}</span>
          <input name="contact" type="text" maxlength="48" value="${escapeHtml(selectedProfile.contact || "")}" />
        </label>
        <label>
          <span>${escapeHtml(t("points"))}</span>
          <input name="points" type="number" min="0" max="10000" step="10" value="${Number(selectedPlayer.points || 0)}" />
        </label>
        <label>
          <span>${escapeHtml(t("rankInput"))}</span>
          <select name="rankPoints" data-admin-rank-select>
            ${adminRankOptions(Number(selectedPlayer.points || 0))}
          </select>
        </label>
        <label>
          <span>${escapeHtml(t("playerPassword"))}</span>
          <input name="password" type="text" minlength="2" maxlength="32" placeholder="New password" />
        </label>
        <label class="admin-check">
          <input name="blocked" type="checkbox" ${isPlayerBlocked(selectedPlayer.name) ? "checked" : ""} />
          <span>${escapeHtml(t("playerBlocked"))}</span>
        </label>
        <button class="text-button" type="submit">${escapeHtml(t("savePlayer"))}</button>
      </form>
      <button class="primary-button" type="button" data-admin-show-add-player>${escapeHtml(t("addPlayer"))}</button>
      <form class="admin-add-player-card" data-admin-add-player-form hidden>
        <h3>${escapeHtml(t("createPlayerProfile"))}</h3>
        <label>
          <span>${escapeHtml(t("newPlayerName"))}</span>
          <input name="playerName" type="text" maxlength="24" autocomplete="username" placeholder="NICK" required />
        </label>
        <label>
          <span>${escapeHtml(t("playerPassword"))}</span>
          <input name="password" type="text" minlength="2" maxlength="32" autocomplete="new-password" placeholder="Player2026" required />
        </label>
        <label>
          <span>${escapeHtml(t("points"))}</span>
          <input name="points" type="number" min="0" max="10000" step="10" value="0" />
        </label>
        <button class="primary-button" type="submit">${escapeHtml(t("createPlayerProfile"))}</button>
      </form>
      ${
        state.admin?.lastCreatedProfile
          ? `<div class="admin-created-profile">
              <span>${escapeHtml(t("createPlayerProfile"))}</span>
              <b>${escapeHtml(state.admin.lastCreatedProfile.nickname)}</b>
              <code>${escapeHtml(state.admin.lastCreatedProfile.password)}</code>
            </div>`
          : ""
      }
    </div>
  `;
}

function renderAdminPlayerForm(player) {
  return `
    <form class="admin-player-card" data-admin-player-form data-player-name="${escapeHtml(player.name)}">
      <div>
        <b>${escapeHtml(player.name)}</b>
        <span>#${player.rank} / ${escapeHtml(rankLabelForPoints(player.points))}</span>
      </div>
      <label>
        <span>${escapeHtml(t("points"))}</span>
        <input name="points" type="number" min="0" max="10000" step="10" value="${Number(player.points || 0)}" />
      </label>
      <label>
        <span>${escapeHtml(t("rankInput"))}</span>
        <select name="rankPoints" data-admin-rank-select>
          ${adminRankOptions(Number(player.points || 0))}
        </select>
      </label>
      <button class="text-button" type="submit">${escapeHtml(t("savePlayer"))}</button>
    </form>
  `;
}

function renderAdminGameControl() {
  const games = state.admin?.customGames || [];
  return `
    <form class="admin-game-card" data-admin-game-form>
      <label>
        <span>${escapeHtml(t("newsHeadline"))}</span>
        <input name="title" type="text" maxlength="48" placeholder="Open game" required />
      </label>
      <label>
        <span>${escapeHtml(t("gameDate"))}</span>
        <input name="date" type="date" required />
      </label>
      <label>
        <span>${escapeHtml(t("gameTime"))}</span>
        <input name="time" type="time" value="18:00" required />
      </label>
      <label>
        <span>${escapeHtml(t("gameCapacity"))}</span>
        <input name="capacity" type="number" min="2" max="80" value="20" required />
      </label>
      <button class="primary-button" type="submit">${escapeHtml(t("createGame"))}</button>
    </form>
    <div class="admin-game-list">
      ${
        games.length
          ? games
              .map(
                (game) => `
                  <article>
                    <b>${escapeHtml(localize(game.title))}</b>
                    <span>${escapeHtml(localize(game.date))} / ${escapeHtml(localize(game.time))}</span>
                    <button class="text-button" type="button" data-admin-delete-game="${escapeHtml(game.id)}">${escapeHtml(t("deleteTeam"))}</button>
                  </article>
                `,
              )
              .join("")
          : `<p class="empty-note">${escapeHtml(emptyGameHistoryText())}</p>`
      }
    </div>
  `;
}

function renderAdminSignupControl() {
  const games = scheduledGames().filter((game) => game.adminGame || Boolean(siteGameKey(game)));
  return `
    <div class="admin-signup-list">
      ${
        games.length
          ? games
              .map((game) => {
                const signups = adminSignupsForGame(game);
                return `
                  <article class="admin-signup-card">
                    <div>
                      <b>${escapeHtml(localize(game.title))}</b>
                      <span>${escapeHtml(localize(game.date))} / ${escapeHtml(localize(game.time))}</span>
                    </div>
                    ${
                      signups.length
                        ? signups
                            .map(
                              (signup) => `
                                <p>
                                  <span>${escapeHtml(signup.nickname)}</span>
                                  <button class="text-button" type="button" data-admin-remove-signup="${escapeHtml(signup.id)}" data-admin-remove-game="${escapeHtml(signup.game)}" data-admin-remove-player="${escapeHtml(signup.nickname)}">${escapeHtml(t("deleteTeam"))}</button>
                                </p>
                              `,
                            )
                            .join("")
                        : `<em>${escapeHtml(emptyRosterText())}</em>`
                    }
                  </article>
                `;
              })
              .join("")
          : `<p class="empty-note">${escapeHtml(emptyGameHistoryText())}</p>`
      }
    </div>
  `;
}

function adminSignupsForGame(game) {
  const gameKey = siteGameKey(game);
  if (!gameKey) return [];
  const byName = new Map();
  state.siteSignups
    .filter((signup) => signup.game === gameKey)
    .forEach((signup) => {
      const name = String(signup.nickname || "").trim();
      if (!name) return;
      const key = normalizePlayerName(name);
      if (!byName.has(key)) byName.set(key, { ...signup, nickname: name });
    });
  return [...byName.values()].sort((a, b) => String(a.nickname).localeCompare(String(b.nickname)));
}

function renderAdminLog() {
  const items = state.admin?.actionLog || [];
  return items.length
    ? items
        .slice(0, 12)
        .map(
          (item) => `
            <article>
              <b>${escapeHtml(item.action)}</b>
              <span>${escapeHtml(item.detail || "")}</span>
              <time>${escapeHtml(formatDate(item.createdAt))}</time>
            </article>
          `,
        )
        .join("")
    : `<p class="empty-note">${escapeHtml(t("syncIdle"))}</p>`;
}

function shouldDeferVoiceRoomRender() {
  const active = document.activeElement;
  return Boolean(active && voiceRoomPanel?.contains(active));
}

function renderVoiceRoom(options = {}) {
  if (!voiceRoomPanel) return;
  if (!options.force && shouldDeferVoiceRoomRender()) return;
  const registered = isCurrentUserRegistered();
  const room = currentVoiceRoom();
  const pendingInvites = pendingVoiceInvites();
  const transportStatus = voiceTransportStatus();
  const transportAvailable = hasNativeVoiceRtc() || hasBrowserVoiceRtc();
  const selectedBefore = voiceRoomPanel.querySelector("[data-voice-invite-select]")?.value || "";
  const fingerprint = JSON.stringify({
    registered,
    room,
    pendingInvites: pendingInvites.map((invite) => invite.room.id),
    transportStatus,
    micEnabled: voiceTransportMicEnabled(),
    audioCount: voiceTransportAudioCount(),
    actionPending: voiceActionPending,
    lastVoiceError,
  });
  if (!options.force && fingerprint === voiceRoomRenderFingerprint) return;
  voiceRoomRenderFingerprint = fingerprint;

  if (!registered) {
    voiceRoomPanel.innerHTML = `
      <div class="voice-status-card">
        <b>${escapeHtml(t("voiceRoom"))}</b>
        <span>${escapeHtml(t("offline"))}</span>
      </div>
      <p class="empty-note">${escapeHtml(t("registerFirst"))}</p>
      <button class="primary-button" type="button" data-home-profile>${escapeHtml(t("registerProfile"))}</button>
    `;
    return;
  }

  let voiceStatus = t("voiceServerOffline");
  if ((!room && transportAvailable) || transportStatus === "connected") voiceStatus = t("voiceReady");
  if (transportStatus === "connecting") voiceStatus = t("voiceConnecting");
  if (room && voiceActionPending && transportStatus === "offline") voiceStatus = t("voiceConnecting");
  if (!room) {
    const voiceRoomAllowed = canCreateVoiceRoom();
    voiceRoomPanel.innerHTML = `
      <div class="voice-status-card">
        <b>${escapeHtml(t("voiceConnection"))}</b>
        <span>${escapeHtml(voiceStatus)}</span>
      </div>
      ${
        pendingInvites.length
          ? `<div class="voice-invite-requests">
              ${pendingInvites
                .map(
                  (invite) => `
                    <article>
                      <div>
                        <b>${escapeHtml(t("voiceInvitation"))}</b>
                        <span>${escapeHtml(invite.room.name)} / ${escapeHtml(invite.room.owner)}</span>
                      </div>
                      <button class="primary-button" type="button" data-voice-accept="${escapeHtml(invite.room.id)}">${escapeHtml(t("acceptVoiceInvite"))}</button>
                      <button class="text-button" type="button" data-voice-decline="${escapeHtml(invite.room.id)}">${escapeHtml(t("declineVoiceInvite"))}</button>
                    </article>
                  `,
                )
                .join("")}
            </div>`
          : ""
      }
      ${voiceRoomAllowed ? "" : `<p class="empty-note">${escapeHtml(t("voiceRoomLocked"))}</p>`}
      <form class="voice-room-form" data-voice-room-form>
        <label>
          <span>${escapeHtml(t("roomName"))}</span>
          <input name="roomName" type="text" maxlength="32" placeholder="BAZA Voice" ${voiceRoomAllowed ? "" : "disabled"} />
        </label>
        <button class="primary-button" type="submit" ${voiceRoomAllowed && !voiceActionPending ? "" : "disabled"}>${escapeHtml(t("createVoiceRoom"))}</button>
      </form>
    `;
    return;
  }

  const owner = normalizePlayerName(room.owner) === normalizePlayerName(playerName());
  const participants = room.participants || [];
  const invitations = (room.invitations || []).filter((invite) => invite.status === "pending");
  const invitedCount = Math.max(participants.length - 1, 0) + invitations.length;
  const canInvite = owner && invitedCount < 5;
  const localMicEnabled = voiceTransportMicEnabled();
  const remoteAudioCount = voiceTransportAudioCount();
  const connectionReady = transportStatus === "connected";
  const availablePlayers = registeredPlayers().filter(
    (name) =>
      !participants.some((participant) => normalizePlayerName(participant.name) === normalizePlayerName(name)) &&
      !invitations.some((invite) => normalizePlayerName(invite.name) === normalizePlayerName(name)),
  );

  voiceRoomPanel.innerHTML = `
    <div class="voice-status-card">
      <b>${escapeHtml(t("voiceConnection"))}</b>
      <span>${escapeHtml(voiceStatus)}${remoteAudioCount ? ` · audio ${remoteAudioCount}` : ""}</span>
    </div>
    ${lastVoiceError ? `<p class="empty-note voice-error">${escapeHtml(lastVoiceError)}</p>` : ""}
    <div class="voice-room-card">
      <div class="voice-room-head">
        <div>
          <b>${escapeHtml(room.name)}</b>
          <span>${escapeHtml(room.owner)} / ${invitedCount}/5</span>
        </div>
        <button class="primary-button" type="button" data-voice-mic ${connectionReady && !voiceActionPending ? "" : "disabled"}>${escapeHtml(localMicEnabled ? t("micOn") : t("micOff"))}</button>
      </div>
      <div class="voice-participants">
        ${participants
          .map(
            (participant) => `
              <article>
                <span>${escapeHtml(initials(participant.name))}</span>
                <b>${escapeHtml(participant.name)}</b>
                ${owner && normalizePlayerName(participant.name) !== normalizePlayerName(room.owner) ? `<button class="text-button" type="button" data-voice-remove="${escapeHtml(participant.name)}">${escapeHtml(t("removePlayer"))}</button>` : ""}
              </article>
            `,
          )
          .join("")}
        ${invitations
          .map(
            (invite) => `
              <article>
                <span>${escapeHtml(initials(invite.name))}</span>
                <b>${escapeHtml(invite.name)}</b>
                <em>${escapeHtml(t("voiceInvitationPending"))}</em>
                ${owner ? `<button class="text-button" type="button" data-voice-remove="${escapeHtml(invite.name)}">${escapeHtml(t("removePlayer"))}</button>` : ""}
              </article>
            `,
          )
          .join("")}
      </div>
      ${
        canInvite
          ? `<div class="voice-invite-form" data-voice-invite-form>
              <label>
                <span>${escapeHtml(t("voiceInvite"))}</span>
                <select data-voice-invite-select ${availablePlayers.length ? "" : "disabled"}>
                  <option value="">${escapeHtml(t("selectPlayer"))}</option>
                  ${availablePlayers.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("")}
                </select>
              </label>
              <button class="primary-button" type="button" data-voice-invite-confirm ${availablePlayers.length && !voiceActionPending ? "" : "disabled"}>${escapeHtml(t("addToRoom"))}</button>
            </div>`
          : `<p class="empty-note">${escapeHtml(owner ? t("roomLimit") : t("voiceInvite"))}</p>`
      }
      <button class="text-button" type="button" data-voice-leave ${voiceActionPending ? "disabled" : ""}>${escapeHtml(t("leaveVoiceRoom"))}</button>
    </div>
  `;
  const inviteSelect = voiceRoomPanel.querySelector("[data-voice-invite-select]");
  if (inviteSelect && availablePlayers.some((name) => normalizePlayerName(name) === normalizePlayerName(selectedBefore))) {
    inviteSelect.value = selectedBefore;
  }
}

function currentVoiceRoom() {
  const rooms = state.voiceRooms || [];
  const currentName = normalizePlayerName(playerName());
  return (
    rooms.find((room) => room.id === state.activeVoiceRoomId && room.participants?.some((participant) => normalizePlayerName(participant.name) === currentName)) ||
    rooms.find((room) => room.participants?.some((participant) => normalizePlayerName(participant.name) === currentName)) ||
    null
  );
}

async function leaveOtherVoiceRooms(exceptRoomId = "") {
  const currentName = normalizePlayerName(playerName());
  const memberships = (state.voiceRooms || []).filter(
    (room) =>
      room.id !== exceptRoomId &&
      room.participants?.some((participant) => normalizePlayerName(participant.name) === currentName),
  );
  for (const room of memberships) {
    const owner = normalizePlayerName(room.owner) === currentName;
    await syncVoiceRoomOverHttp({
      type: owner ? "delete-room" : "leave-room",
      roomId: room.id,
      player: playerName(),
    });
  }
  if (memberships.length) {
    await leaveNativeVoiceRoom();
    await leaveBrowserVoiceRoom();
  }
}

async function runVoiceAction(action) {
  if (voiceActionPending) return;
  voiceActionPending = true;
  renderVoiceRoom({ force: true });
  try {
    await action();
  } finally {
    voiceActionPending = false;
    renderVoiceRoom({ force: true });
  }
}

function pendingVoiceInvites() {
  if (!isCurrentUserRegistered()) return [];
  const currentName = normalizePlayerName(playerName());
  return (state.voiceRooms || [])
    .filter(
      (room) =>
        !room.participants?.some((participant) => normalizePlayerName(participant.name) === currentName) &&
        room.invitations?.some((invite) => invite.status === "pending" && normalizePlayerName(invite.name) === currentName),
    )
    .map((room) => ({
      room,
      invitation: room.invitations.find(
        (invite) => invite.status === "pending" && normalizePlayerName(invite.name) === currentName,
      ),
    }));
}

function pendingVoiceInviteKey(invite) {
  return `${invite?.room?.id || ""}:${normalizePlayerName(playerName())}:${invite?.invitation?.createdAt || ""}`;
}

function notifyNewVoiceInvites(invites) {
  invites.forEach((invite) => {
    const key = pendingVoiceInviteKey(invite);
    if (!key || notifiedVoiceInviteIds.has(key)) return;
    notifiedVoiceInviteIds.add(key);
    showToast(`${t("voiceInvitation")}: ${invite.room.name}`);
    sendNativeVoiceInviteNotification(invite);
  });
}

function adminRankOptions(points) {
  const options = [
    ...rankBaseTiers,
    { points: 2000, name: "Bronze Captain" },
    { points: 3000, name: "Silver Captain" },
    { points: 5000, name: "Diamond Captain" },
    { points: 7500, name: "Elite Captain" },
    { points: 10000, name: "BAZA Legend" },
  ];
  const selected = [...options].reverse().find((option) => points >= option.points)?.points ?? 0;
  return options
    .map((option) => `<option value="${option.points}" ${option.points === selected ? "selected" : ""}>${escapeHtml(option.name)}</option>`)
    .join("");
}

function renderAdminNewsForm(item) {
  const mediaData = String(item.media?.data || "");
  const title = localize(item.title);
  const body = localize(item.body);
  const readableBody = escapeHtml(body).replace(/\n/g, "<br />");
  const mediaPreview = item.media?.type === "video" && mediaData
    ? `<video class="admin-news-media" src="${escapeHtml(mediaData)}" controls playsinline preload="metadata"></video>`
    : item.media?.type === "image" && mediaData
      ? `<img class="admin-news-media" src="${escapeHtml(mediaData)}" alt="${escapeHtml(localize(item.title))}" />`
      : item.media
        ? `<p class="admin-news-media-note">${escapeHtml(item.media.fileName || t("newsMedia"))}</p>`
        : "";
  return `
    <form class="admin-news-card" data-admin-news-form data-news-id="${escapeHtml(item.id)}">
      <div class="admin-news-meta">
        <b>${escapeHtml(item.author || "BAZA")}</b>
        <span>${formatDate(item.createdAt)}</span>
      </div>
      ${mediaPreview}
      <div class="admin-news-readable">
        <h4>${escapeHtml(title)}</h4>
        <p>${readableBody}</p>
      </div>
      <label>
        <span>${escapeHtml(t("newsHeadline"))}</span>
        <input name="title" type="text" maxlength="80" value="${escapeHtml(title)}" />
      </label>
      <label>
        <span>${escapeHtml(t("newsBody"))}</span>
        <textarea name="body" rows="8" maxlength="3000">${escapeHtml(body)}</textarea>
      </label>
      <div class="admin-news-actions">
        <button class="text-button" type="submit">${escapeHtml(t("saveNewsChanges"))}</button>
        <button class="primary-button" type="button" data-admin-publish-news="${escapeHtml(item.id)}">${escapeHtml(t("confirmPublication"))}</button>
        <button class="text-button" type="button" data-admin-delete-news="${escapeHtml(item.id)}">${escapeHtml(t("deleteProposal"))}</button>
      </div>
      <p class="admin-news-reward">${escapeHtml(t("rewardAfterApproval"))}</p>
    </form>
  `;
}

function focusProfileRegistration() {
  if (!profileForm) return;
  if (loginForm) loginForm.hidden = true;
  profileForm.hidden = false;
  profileForm.scrollIntoView({ behavior: "smooth", block: "center" });
  (profileForm.elements.nickname || profileForm.elements.password)?.focus();
}

function focusProfileLogin() {
  if (!loginForm) return;
  if (profileForm) profileForm.hidden = true;
  loginForm.hidden = false;
  if (loginForm.elements.loginNickname && state.profile.nickname) {
    loginForm.elements.loginNickname.value = state.profile.nickname;
  }
  loginForm.scrollIntoView({ behavior: "smooth", block: "center" });
  (loginForm.elements.loginPassword || loginForm.elements.loginNickname)?.focus();
}

function renderTeamTools() {
  if (!teamPanel || !playerPicker || !teamStatus || !notificationList) return;
  const captain = isCaptain();
  teamPanel.classList.toggle("locked", !captain);
  teamForm.querySelectorAll("input, button").forEach((node) => {
    node.disabled = !captain;
  });

  if (!captain) {
    playerPicker.innerHTML = `<p class="locked-note">${escapeHtml(t("lockedCaptain"))}</p>`;
  } else {
    playerPicker.innerHTML = registeredPlayers()
      .map(
        (name) => `
          <label class="player-check">
            <input type="checkbox" name="members" value="${escapeHtml(name)}" />
            <span>${escapeHtml(name)}</span>
          </label>
        `,
      )
      .join("");
  }

  if (!state.team) {
    teamStatus.innerHTML = `<p>${emptyTeamText()}</p>`;
  } else {
    const teamChat = Array.isArray(state.team.chat) ? state.team.chat : [];
    const canDeleteTeam = isTeamCaptainOwner();
    teamStatus.innerHTML = `
      <article class="team-card">
        <div>
          <span>${escapeHtml(teamLabel("team"))}</span>
          <h3>${escapeHtml(state.team.name)}</h3>
          <p>${escapeHtml(teamLabel("captain"))}: ${escapeHtml(state.team.captain)}</p>
        </div>
        <div class="team-members">
          ${state.team.members
            .map((member) => `<span class="${member.status}">${escapeHtml(member.name)} · ${escapeHtml(statusLabel(member.status))}</span>`)
            .join("")}
        </div>
        ${canDeleteTeam ? `<button class="danger-button" type="button" data-delete-team>${escapeHtml(t("deleteTeam"))}</button>` : ""}
        <div class="team-chat-panel">
          <div class="team-chat-head">
            <span>${escapeHtml(t("teamChat"))}</span>
            <strong>${escapeHtml(state.team.name)}</strong>
          </div>
          <div class="team-chat-feed">
            ${
              teamChat.length
                ? teamChat
                    .slice(-6)
                    .map(
                      (message) => `
                        <article class="team-chat-message ${message.author === playerName() ? "own" : ""}">
                          <div><b>${escapeHtml(message.author)}</b><span>${formatDate(message.createdAt)}</span></div>
                          <p>${escapeHtml(message.body)}</p>
                        </article>
                      `,
                    )
                    .join("")
                : `<p class="empty-note">${escapeHtml(emptyTeamChatText())}</p>`
            }
          </div>
          <form class="team-chat-compose" data-team-chat-form>
            <input name="teamMessage" type="text" maxlength="120" placeholder="${escapeHtml(t("teamMessagePlaceholder"))}" required />
            <button type="submit" aria-label="${escapeHtml(t("sendMessage"))}">↗</button>
          </form>
        </div>
      </article>
    `;
  }

  const pending = state.team?.members.filter((member) => member.status === "pending") || [];
  notificationList.innerHTML = pending.length
    ? pending
        .map(
          (member) => `
            <article class="notification-card">
              <div>
                <b>${escapeHtml(member.name)}</b>
                <span>${escapeHtml(inviteText(state.team.name))}</span>
              </div>
              <div>
                <button type="button" data-confirm-member="${escapeHtml(member.name)}">${escapeHtml(confirmLabel())}</button>
                <button type="button" data-decline-member="${escapeHtml(member.name)}">${escapeHtml(declineLabel())}</button>
              </div>
            </article>
          `,
        )
        .join("")
    : `<p class="empty-note">${escapeHtml(noNotificationsText())}</p>`;
}

function emptyTeamText() {
  return localizedText({
    en: "No team yet.",
    pl: "Nie utworzono jeszcze drużyny.",
    be: "Каманда яшчэ не створана.",
    uk: "Команду ще не створено.",
    ru: "Команда еще не создана.",
  });
}

function emptyTeamChatText() {
  return localizedText({
    en: "Team chat is empty.",
    pl: "Chat drużyny jest pusty.",
    be: "Чат каманды пакуль пусты.",
    uk: "Чат команди поки порожній.",
    ru: "Чат команды пока пуст.",
  });
}

function teamLabel(kind) {
  const labels = {
    en: { team: "Team", captain: "Captain" },
    pl: { team: "Drużyna", captain: "Kapitan" },
    be: { team: "Каманда", captain: "Капітан" },
    uk: { team: "Команда", captain: "Капітан" },
    ru: { team: "Команда", captain: "Капитан" },
  };
  return (labels[currentLanguage()] || labels.en)[kind];
}

function statusLabel(status) {
  const labels = {
    en: { pending: "pending", confirmed: "confirmed", declined: "declined" },
    pl: { pending: "czeka", confirmed: "potwierdzone", declined: "odmowa" },
    be: { pending: "чакае", confirmed: "пацверджана", declined: "адмоўлена" },
    uk: { pending: "очікує", confirmed: "підтверджено", declined: "відхилено" },
    ru: { pending: "ждет", confirmed: "подтвердил", declined: "отказ" },
  };
  return (labels[currentLanguage()] || labels.en)[status] || status;
}

function inviteText(teamName) {
  return localizedText({
    en: `Invitation to join ${teamName}`,
    pl: `Zaproszenie do drużyny ${teamName}`,
    be: `Запрашэнне далучыцца да ${teamName}`,
    uk: `Запрошення приєднатися до ${teamName}`,
    ru: `Приглашение вступить в ${teamName}`,
  });
}

function confirmLabel() {
  return localizedText({ en: "Confirm", pl: "Potwierdź", be: "Пацвердзіць", uk: "Підтвердити", ru: "Подтвердить" });
}

function declineLabel() {
  return localizedText({ en: "Decline", pl: "Odrzuć", be: "Адхіліць", uk: "Відхилити", ru: "Отклонить" });
}

function noNotificationsText() {
  return localizedText({
    en: "No pending team invitations.",
    pl: "Brak oczekujących zaproszeń do drużyny.",
    be: "Няма чаканых запрашэнняў у каманду.",
    uk: "Немає запрошень до команди, що очікують.",
    ru: "Нет ожидающих командных приглашений.",
  });
}

function render() {
  applySiteLinks();
  applyLanguage();
  ensureVoiceInviteSync();
  renderEnvironmentWarning();
  renderStats();
  renderGames();
  renderRanking();
  renderNews();
  renderNewsMediaPreview();
  renderChat();
  renderHomeTeam();
  renderSyncStatus();
  renderPointsTransfer();
  renderAchievements();
  renderGameHistory();
  renderActivity();
  renderProfileForm();
  renderAdminPanel();
  renderVoiceRoom();
  renderTeamTools();
  renderArticle();
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
}

let tapAudioContext = null;

function playTapSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    tapAudioContext = tapAudioContext || new AudioContextClass();
    if (tapAudioContext.state === "suspended") tapAudioContext.resume();
    const oscillator = tapAudioContext.createOscillator();
    const gain = tapAudioContext.createGain();
    const now = tapAudioContext.currentTime;
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(880, now);
    oscillator.frequency.exponentialRampToValueAtTime(520, now + 0.055);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.055, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);
    oscillator.connect(gain);
    gain.connect(tapAudioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.08);
  } catch {
    // Decorative tap sound should never block the action.
  }
}

function showWelcomeMessage() {
  if (!profileForm || !welcomeMessage) return;
  clearTimeout(welcomeTimer);
  profileForm.hidden = true;
  welcomeMessage.hidden = false;
  welcomeTimer = setTimeout(() => {
    welcomeMessage.hidden = true;
    profileForm.hidden = isCurrentUserRegistered();
  }, 10000);
}

function requestNativeAvatarPicker() {
  const handler = window.webkit?.messageHandlers?.bazaNative;
  if (handler?.postMessage) {
    handler.postMessage({ type: "pickAvatar" });
    return true;
  }
  return false;
}

function sendNativeVoiceInviteNotification(invite) {
  const handler = window.webkit?.messageHandlers?.bazaNative;
  if (!handler?.postMessage || !invite?.room) return false;
  handler.postMessage({
    type: "voiceInviteNotification",
    title: t("voiceInvitation"),
    body: `${invite.room.name} / ${invite.room.owner}`,
    roomId: invite.room.id,
  });
  return true;
}

function sendNewGameNotification(game) {
  const title = t("newGameNotification");
  const body = `${localize(game.title)} · ${game.date || ""} ${game.time || ""}`.trim();
  const handler = window.webkit?.messageHandlers?.bazaNative;
  if (handler?.postMessage) {
    handler.postMessage({
      type: "gameNotification",
      title,
      body,
      gameId: game.feedInstanceKey || game.id,
    });
    return;
  }
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body, tag: `baza-game-${game.feedInstanceKey || game.id}` });
  }
}

function sendNativeVoiceAudioActive(active) {
  const handler = window.webkit?.messageHandlers?.bazaNative;
  if (!handler?.postMessage) return false;
  handler.postMessage({ type: "voiceAudioActive", active: Boolean(active) });
  return true;
}

let nativeVoiceReadyResolver = null;

function requestNativeVoiceAudioReady() {
  const handler = window.webkit?.messageHandlers?.bazaNative;
  if (!handler?.postMessage) return Promise.resolve(true);
  return new Promise((resolve) => {
    nativeVoiceReadyResolver = resolve;
    handler.postMessage({ type: "prepareVoiceAudio" });
    setTimeout(() => {
      if (nativeVoiceReadyResolver === resolve) {
        nativeVoiceReadyResolver = null;
        resolve(true);
      }
    }, 1200);
  });
}

window.__bazaNativeVoiceReady = (ready) => {
  if (!nativeVoiceReadyResolver) return;
  const resolve = nativeVoiceReadyResolver;
  nativeVoiceReadyResolver = null;
  resolve(Boolean(ready));
};

function hasNativeVoiceRtc() {
  const handler = window.webkit?.messageHandlers?.bazaNative;
  return Boolean(window.BAZA_NATIVE_APP && window.BAZA_NATIVE_CAPABILITIES?.liveKitVoice === true && handler?.postMessage);
}

function hasBrowserVoiceRtc() {
  return Boolean(!hasNativeVoiceRtc() && window.LivekitClient?.Room);
}

function voiceTransportStatus() {
  if (hasNativeVoiceRtc()) {
    if (
      nativeVoiceRtcStatus === "offline" &&
      currentVoiceRoom() &&
      nativeVoiceDisconnectedAt &&
      Date.now() - nativeVoiceDisconnectedAt < VOICE_RECONNECT_STATUS_GRACE_MS
    ) {
      return "connecting";
    }
    return nativeVoiceRtcStatus;
  }
  if (hasBrowserVoiceRtc()) return browserVoiceRtcStatus;
  return "offline";
}

function voiceTransportMicEnabled() {
  if (hasNativeVoiceRtc()) return nativeVoiceRtcMicEnabled;
  if (hasBrowserVoiceRtc()) return browserVoiceRtcMicEnabled;
  return false;
}

function voiceTransportAudioCount() {
  if (hasNativeVoiceRtc()) return nativeVoiceRemoteAudioTracks;
  if (hasBrowserVoiceRtc()) return browserVoiceAudioNodes.size;
  return 0;
}

function updateVoiceDiagnostics() {
  document.documentElement.dataset.voiceBuild = String(APP_BUILD);
  document.documentElement.dataset.voiceSessionActive = String(voiceSessionActivated);
  document.documentElement.dataset.voiceTransport = voiceTransportStatus();
  document.documentElement.dataset.voiceReconnectAttempts = String(voiceReconnectAttempts);
}

function resetVoiceReconnectBackoff() {
  voiceReconnectAttempts = 0;
  voiceReconnectNotBefore = 0;
  updateVoiceDiagnostics();
}

function registerVoiceConnectFailure() {
  voiceReconnectAttempts = Math.min(voiceReconnectAttempts + 1, 5);
  voiceReconnectNotBefore = Date.now() + Math.min(30000, 2000 * 2 ** (voiceReconnectAttempts - 1));
  updateVoiceDiagnostics();
}

function activateVoiceSession() {
  const wasActive = voiceSessionActivated;
  voiceSessionActivated = true;
  clearTimeout(voiceBrowserHiddenTimer);
  voiceBrowserHiddenTimer = null;
  if (!wasActive) resetVoiceReconnectBackoff();
  updateVoiceDiagnostics();
}

async function deactivateVoiceSession() {
  voiceSessionActivated = false;
  updateVoiceDiagnostics();
  clearTimeout(voiceBrowserHiddenTimer);
  voiceBrowserHiddenTimer = null;
  resetVoiceReconnectBackoff();
  if (!voiceDisconnectPromise) {
    voiceDisconnectPromise = (async () => {
      closeVoicePeers();
      stopVoiceStream();
      await leaveNativeVoiceRoom();
      await leaveBrowserVoiceRoom();
      sendNativeVoiceAudioActive(false);
    })().finally(() => {
      voiceDisconnectPromise = null;
    });
  }
  await voiceDisconnectPromise;
  updateVoiceDiagnostics();
  if (!voiceSessionActivated) {
    renderVoiceRoom({ force: true });
    renderHomeVoiceEntry();
  }
}

function sendNativeVoiceRtcCommand(type, payload = {}, timeoutMs = 15000) {
  const handler = window.webkit?.messageHandlers?.bazaNative;
  if (!hasNativeVoiceRtc() || !handler?.postMessage) {
    return Promise.reject(new Error("Native voice service is unavailable"));
  }

  nativeVoiceRequestSequence += 1;
  const requestId = `voice-${Date.now()}-${nativeVoiceRequestSequence}`;
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      nativeVoiceRequests.delete(requestId);
      reject(new Error("Voice service did not respond"));
    }, timeoutMs);
    nativeVoiceRequests.set(requestId, { resolve, reject, timeout });
    handler.postMessage({ type, requestId, ...payload });
  });
}

async function ensureNativeVoiceRoom(room) {
  if (!hasNativeVoiceRtc() || !room) return false;
  if (["connected", "connecting"].includes(nativeVoiceRtcStatus) && nativeVoiceRtcRoomId === room.id) return true;
  if (nativeVoiceConnectPromise && nativeVoiceRtcRoomId === room.id) return nativeVoiceConnectPromise;
  nativeVoiceRtcStatus = "connecting";
  nativeVoiceRtcRoomId = room.id;
  renderVoiceRoom();
  renderHomeVoiceEntry();
  nativeVoiceConnectPromise = sendNativeVoiceRtcCommand(
    "liveKitJoin",
    {
      roomId: room.id,
      player: playerName(),
      tokenEndpoint: appApiUrl("/api/voice-room"),
      clientVersion: APP_BUILD,
    },
    20000,
  )
    .then(() => {
      resetVoiceReconnectBackoff();
      return true;
    })
    .finally(() => {
      nativeVoiceConnectPromise = null;
    });
  return nativeVoiceConnectPromise;
}

async function setNativeVoiceMicrophone(enabled) {
  const result = await sendNativeVoiceRtcCommand("liveKitMicrophone", { enabled: Boolean(enabled) });
  nativeVoiceRtcMicEnabled = Boolean(result.micEnabled);
  return nativeVoiceRtcMicEnabled;
}

function leaveNativeVoiceRoom() {
  if (!hasNativeVoiceRtc()) return Promise.resolve();
  nativeVoiceConnectPromise = null;
  nativeVoiceDisconnectedAt = 0;
  nativeVoiceRtcStatus = "offline";
  nativeVoiceRtcRoomId = "";
  nativeVoiceRtcMicEnabled = false;
  nativeVoiceRemoteAudioTracks = 0;
  nativeVoiceRemoteParticipants = 0;
  return sendNativeVoiceRtcCommand("liveKitLeave", {}, 8000).catch(() => {});
}

async function fetchBrowserVoiceToken(room) {
  let lastError = "Voice token was not issued";
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      const response = await fetch(appApiUrl("/api/voice-room"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ type: "livekit-token", roomId: room.id, player: playerName(), clientVersion: APP_BUILD }),
      });
      const data = await response.json();
      if (response.ok && data.ok && data.serverUrl && data.token) return data;
      lastError = data.error || `Voice token failed (${response.status})`;
      if (![403, 404].includes(response.status)) break;
    } catch (error) {
      lastError = error?.message || lastError;
    }
    await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
  }
  throw new Error(lastError);
}

function clearBrowserVoiceAudio() {
  browserVoiceAudioNodes.forEach(({ track, element }) => {
    try {
      track?.detach?.(element);
    } catch {
      // The room can already be disconnected.
    }
    element?.remove();
  });
  browserVoiceAudioNodes.clear();
}

function attachBrowserVoiceAudio(track, publication, participant) {
  if (track?.kind !== "audio" || !voiceAudioStage) return;
  const key = publication?.trackSid || `${participant?.identity || "player"}:${Date.now()}`;
  const element = document.createElement("audio");
  element.autoplay = true;
  element.playsInline = true;
  element.muted = false;
  element.volume = 1;
  element.dataset.voiceRemote = `livekit-${key}`;
  voiceAudioStage.appendChild(element);
  track.attach(element);
  browserVoiceAudioNodes.set(key, { track, element });
  renderVoiceRoom();
  element.play().catch((error) => {
    lastVoiceError = error?.message || "audio playback blocked";
  });
}

function detachBrowserVoiceAudio(track, publication) {
  const key = publication?.trackSid;
  const attached = key ? browserVoiceAudioNodes.get(key) : null;
  if (!attached) return;
  try {
    track?.detach?.(attached.element);
  } catch {
    // The track can already be detached by LiveKit.
  }
  attached.element.remove();
  browserVoiceAudioNodes.delete(key);
  renderVoiceRoom();
}

async function leaveBrowserVoiceRoom() {
  const room = browserVoiceRoom;
  browserVoiceRoom = null;
  browserVoiceConnectPromise = null;
  browserVoiceRtcStatus = "offline";
  browserVoiceRtcRoomId = "";
  browserVoiceRtcPlayer = "";
  browserVoiceRtcMicEnabled = false;
  clearBrowserVoiceAudio();
  if (room) await room.disconnect().catch(() => {});
}

async function ensureBrowserVoiceRoom(room) {
  if (!hasBrowserVoiceRtc() || !room) return false;
  const currentPlayer = playerName();
  if (
    browserVoiceRoom &&
    browserVoiceRtcStatus === "connected" &&
    browserVoiceRtcRoomId === room.id &&
    normalizePlayerName(browserVoiceRtcPlayer) === normalizePlayerName(currentPlayer)
  ) {
    return true;
  }
  if (browserVoiceConnectPromise && browserVoiceRtcRoomId === room.id) return browserVoiceConnectPromise;

  browserVoiceRtcRoomId = room.id;
  browserVoiceRtcPlayer = currentPlayer;
  browserVoiceRtcStatus = "connecting";
  renderVoiceRoom();
  renderHomeVoiceEntry();

  browserVoiceConnectPromise = (async () => {
    await leaveBrowserVoiceRoom();
    browserVoiceRtcRoomId = room.id;
    browserVoiceRtcPlayer = currentPlayer;
    browserVoiceRtcStatus = "connecting";
    const credentials = await fetchBrowserVoiceToken(room);
    const { Room, RoomEvent } = window.LivekitClient;
    const liveRoom = new Room({ adaptiveStream: false, dynacast: false });
    liveRoom.on(RoomEvent.TrackSubscribed, attachBrowserVoiceAudio);
    liveRoom.on(RoomEvent.TrackUnsubscribed, detachBrowserVoiceAudio);
    liveRoom.on(RoomEvent.Disconnected, () => {
      if (browserVoiceRoom !== liveRoom) return;
      browserVoiceRtcStatus = "offline";
      browserVoiceRtcMicEnabled = false;
      clearBrowserVoiceAudio();
      renderVoiceRoom();
      renderHomeVoiceEntry();
    });
    await liveRoom.connect(credentials.serverUrl, credentials.token, { autoSubscribe: true });
    browserVoiceRoom = liveRoom;
    browserVoiceRtcStatus = "connected";
    resetVoiceReconnectBackoff();
    browserVoiceRtcMicEnabled = false;
    const activeRoom = currentVoiceRoom();
    const activeParticipant = activeRoom?.participants?.find(
      (participant) => normalizePlayerName(participant.name) === normalizePlayerName(currentPlayer),
    );
    if (activeParticipant) activeParticipant.micEnabled = false;
    if (activeRoom) sendVoiceSocket({ type: "mic", roomId: activeRoom.id, player: currentPlayer, micEnabled: false });
    lastVoiceError = "";
    if (voiceAudioUnlocked) await liveRoom.startAudio().catch(() => {});
    renderVoiceRoom();
    renderHomeVoiceEntry();
    return true;
  })();

  try {
    return await browserVoiceConnectPromise;
  } catch (error) {
    browserVoiceRtcStatus = "offline";
    browserVoiceRtcMicEnabled = false;
    lastVoiceError = error?.message || "LiveKit connection failed";
    renderVoiceRoom();
    renderHomeVoiceEntry();
    throw error;
  } finally {
    browserVoiceConnectPromise = null;
  }
}

async function setBrowserVoiceMicrophone(enabled) {
  if (!browserVoiceRoom || browserVoiceRtcStatus !== "connected") throw new Error("Voice room is not connected");
  await browserVoiceRoom.localParticipant.setMicrophoneEnabled(Boolean(enabled));
  browserVoiceRtcMicEnabled = Boolean(enabled);
  return browserVoiceRtcMicEnabled;
}

window.__bazaNativeVoiceEvent = (event) => {
  if (!event || typeof event !== "object") return;
  if (event.status) {
    nativeVoiceRtcStatus = String(event.status);
    if (nativeVoiceRtcStatus === "connected") {
      nativeVoiceDisconnectedAt = 0;
      resetVoiceReconnectBackoff();
    }
    if (nativeVoiceRtcStatus === "offline" && !nativeVoiceDisconnectedAt) nativeVoiceDisconnectedAt = Date.now();
  }
  if (event.roomId) nativeVoiceRtcRoomId = String(event.roomId);
  if (typeof event.micEnabled === "boolean") nativeVoiceRtcMicEnabled = event.micEnabled;
  if (Number.isFinite(Number(event.remoteAudioTracks))) nativeVoiceRemoteAudioTracks = Number(event.remoteAudioTracks);
  if (Number.isFinite(Number(event.remoteParticipants))) nativeVoiceRemoteParticipants = Number(event.remoteParticipants);
  if (event.error) lastVoiceError = String(event.error);
  if (event.ok) lastVoiceError = "";

  const room = currentVoiceRoom();
  const participant = room?.participants?.find((item) => normalizePlayerName(item.name) === normalizePlayerName(playerName()));
  if (participant && typeof event.micEnabled === "boolean") {
    const changed = participant.micEnabled !== event.micEnabled;
    participant.micEnabled = event.micEnabled;
    if (changed) sendVoiceSocket({ type: "mic", roomId: room.id, player: playerName(), micEnabled: event.micEnabled });
  }

  const pending = event.requestId ? nativeVoiceRequests.get(event.requestId) : null;
  if (pending) {
    clearTimeout(pending.timeout);
    nativeVoiceRequests.delete(event.requestId);
    if (event.ok) pending.resolve(event);
    else pending.reject(new Error(event.error || "Voice service failed"));
  }

  saveState();
  renderVoiceRoom();
  renderHomeVoiceEntry();
  updateVoiceDiagnostics();
};

window.__bazaVoiceDiagnostics = () => ({
  build: APP_BUILD,
  sessionActivated: voiceSessionActivated,
  roomId: currentVoiceRoom()?.id || "",
  transportStatus: voiceTransportStatus(),
  microphoneEnabled: voiceTransportMicEnabled(),
  reconnectAttempts: voiceReconnectAttempts,
  reconnectBlockedForMs: Math.max(0, voiceReconnectNotBefore - Date.now()),
});

function resizeImageDataUrl(dataUrl, maxSize = 420, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => {
      const scale = Math.min(1, maxSize / Math.max(image.naturalWidth || image.width, image.naturalHeight || image.height));
      const width = Math.max(1, Math.round((image.naturalWidth || image.width) * scale));
      const height = Math.max(1, Math.round((image.naturalHeight || image.height) * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) {
        reject(new Error("Canvas unavailable"));
        return;
      }
      context.drawImage(image, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    });
    image.addEventListener("error", reject);
    image.src = dataUrl;
  });
}

function avatarFileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result || "")));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(file);
  });
}

function dataUrlByteLength(dataUrl) {
  const base64 = String(dataUrl || "").split(",")[1] || "";
  return Math.floor((base64.length * 3) / 4);
}

async function compressChatPhoto(file) {
  if (!file || !String(file.type || "").startsWith("image/")) throw new Error("Invalid image");
  const source = await avatarFileToDataUrl(file);
  let maxSide = CHAT_IMAGE_MAX_SIDE;
  let quality = 0.8;
  let result = "";
  for (let attempt = 0; attempt < 8; attempt += 1) {
    result = await resizeImageDataUrl(source, maxSide, quality);
    if (dataUrlByteLength(result) <= CHAT_IMAGE_MAX_BYTES) return result;
    maxSide = Math.max(420, Math.round(maxSide * 0.82));
    quality = Math.max(0.46, quality - 0.08);
  }
  throw new Error("Image is too large");
}

async function compressNewsPhoto(file) {
  const source = await avatarFileToDataUrl(file);
  let maxSide = NEWS_IMAGE_MAX_SIDE;
  let quality = 0.84;
  for (let attempt = 0; attempt < 9; attempt += 1) {
    const result = await resizeImageDataUrl(source, maxSide, quality);
    if (dataUrlByteLength(result) <= NEWS_IMAGE_MAX_BYTES) return result;
    maxSide = Math.max(520, Math.round(maxSide * 0.82));
    quality = Math.max(0.48, quality - 0.07);
  }
  throw new Error("Image is too large");
}

function videoDuration(dataUrl) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const timeout = setTimeout(() => reject(new Error("Video metadata unavailable")), 8000);
    video.preload = "metadata";
    video.addEventListener("loadedmetadata", () => {
      clearTimeout(timeout);
      resolve(Number(video.duration || 0));
      video.removeAttribute("src");
      video.load();
    }, { once: true });
    video.addEventListener("error", () => {
      clearTimeout(timeout);
      reject(new Error("Invalid video"));
    }, { once: true });
    video.src = dataUrl;
  });
}

async function prepareNewsMedia(file) {
  if (!file) return null;
  const fileName = String(file.name || "media");
  const extension = fileName.split(".").pop()?.toLowerCase() || "";
  const imageExtensions = new Set(["jpg", "jpeg", "png", "webp"]);
  const videoExtensions = new Set(["mp4", "mov", "webm"]);
  const isImage = String(file.type || "").startsWith("image/") || imageExtensions.has(extension);
  const isVideo = String(file.type || "").startsWith("video/") || videoExtensions.has(extension);

  if (isImage && imageExtensions.has(extension)) {
    return {
      type: "image",
      mime: "image/jpeg",
      fileName,
      duration: 0,
      data: await compressNewsPhoto(file),
    };
  }
  if (!isVideo || !videoExtensions.has(extension)) throw new Error("unsupported");
  if (file.size > NEWS_VIDEO_MAX_BYTES) throw new Error("large");
  const data = await avatarFileToDataUrl(file);
  const duration = await videoDuration(data);
  if (!duration || duration > NEWS_VIDEO_MAX_SECONDS + 0.25) throw new Error("duration");
  return {
    type: "video",
    mime: file.type || (extension === "mov" ? "video/quicktime" : `video/${extension}`),
    fileName,
    duration: Math.round(duration * 10) / 10,
    data,
  };
}

function clearNewsMedia() {
  newsPendingMedia = null;
  if (newsMediaInput) newsMediaInput.value = "";
  renderNewsMediaPreview();
}

function renderNewsMediaPreview() {
  if (!newsMediaPreview) return;
  newsMediaPreview.hidden = !newsPendingMedia;
  if (!newsPendingMedia) {
    newsMediaPreview.innerHTML = "";
    return;
  }
  const media = newsPendingMedia.type === "video"
    ? `<video src="${escapeHtml(newsPendingMedia.data)}" controls playsinline preload="metadata"></video>`
    : `<img src="${escapeHtml(newsPendingMedia.data)}" alt="${escapeHtml(t("newsMedia"))}" />`;
  newsMediaPreview.innerHTML = `
    ${media}
    <div>
      <span>${escapeHtml(newsPendingMedia.fileName)}</span>
      <button class="text-button" type="button" data-remove-news-media>${escapeHtml(t("removeMedia"))}</button>
    </div>
  `;
}

function renderChatPhotoPreview() {
  if (!chatPhotoPreview || !chatPhotoPreviewImage) return;
  chatPhotoPreview.hidden = !chatPendingPhoto;
  chatPhotoPreviewImage.src = chatPendingPhoto || "";
}

function clearChatPhoto() {
  chatPendingPhoto = "";
  if (chatPhotoInput) chatPhotoInput.value = "";
  renderChatPhotoPreview();
}

async function updateAvatar(dataUrl) {
  const value = String(dataUrl || "");
  if (!value) return;
  try {
    state.profile.avatar = await resizeImageDataUrl(value);
  } catch {
    state.profile.avatar = value;
  }
  if (!saveState()) return;
  render();
  showToast(localizedToast("avatar"));
}

window.__bazaSetNativeAvatar = updateAvatar;

function localizedToast(key) {
  const labels = {
    signed: {
      en: "You are on the roster. Rating updated.",
      ru: "Ты в списке. Рейтинг обновлён.",
      pl: "Jesteś na liście. Ranking został zaktualizowany.",
    },
    canceled: {
      en: "Booking removed. Points recalculated.",
      ru: "Запись убрана. Пункты пересчитаны.",
      pl: "Zapis usunięty. Punkty przeliczone.",
    },
    news: {
      en: "News published. +30 points added.",
      ru: "Новость опубликована. Начислено +30 пунктов.",
      pl: "News opublikowany. Dodano +30 punktów.",
    },
    profile: {
      en: "Profile saved.",
      ru: "Профиль сохранен.",
      pl: "Profil zapisany.",
    },
    login: {
      en: "Logged in.",
      ru: "Вход выполнен.",
      pl: "Zalogowano.",
    },
    logout: {
      en: "Logged out.",
      ru: "Выход выполнен.",
      pl: "Wylogowano.",
    },
    loginError: {
      en: "Wrong nickname or password.",
      ru: "Неверный ник или пароль.",
      pl: "Błędny nick albo hasło.",
    },
    passwordChanged: {
      en: "Password changed.",
      ru: "Пароль изменен.",
      pl: "Hasło zmienione.",
    },
    passwordError: {
      en: "Password needs min. 2 letters/numbers and one uppercase letter.",
      ru: "Пароль: минимум 2 буквы/цифры и одна заглавная буква.",
      pl: "Hasło: min. 2 litery/cyfry i jedna wielka litera.",
    },
    saveError: {
      en: "Profile could not be saved. Try changing the avatar to a smaller image.",
      ru: "Профиль не удалось сохранить. Попробуй поставить аватар меньшего размера.",
      pl: "Nie udało się zapisać profilu. Spróbuj mniejszego avatara.",
    },
    avatar: {
      en: "Avatar updated.",
      ru: "Аватар обновлен.",
      pl: "Avatar zaktualizowany.",
    },
    teamCreated: {
      en: "Team invitations sent. Players must confirm.",
      ru: "Приглашения отправлены. Игроки должны подтвердить вступление.",
      pl: "Zaproszenia wysłane. Gracze muszą potwierdzić dołączenie.",
    },
    needCaptain: {
      en: "Only Captain rank can create a team.",
      ru: "Команду может создать только ранг Капитан.",
      pl: "Drużynę może utworzyć tylko ranga Kapitan.",
    },
    chooseMember: {
      en: "Choose at least one registered player.",
      ru: "Выбери хотя бы одного зарегистрированного игрока.",
      pl: "Wybierz przynajmniej jednego zarejestrowanego gracza.",
    },
    confirmed: {
      en: "Invitation confirmed.",
      ru: "Приглашение подтверждено.",
      pl: "Zaproszenie potwierdzone.",
    },
    declined: {
      en: "Invitation declined.",
      ru: "Приглашение отклонено.",
      pl: "Zaproszenie odrzucone.",
    },
    chat: {
      en: "Message sent to player chat.",
      ru: "Сообщение отправлено в чат игроков.",
      pl: "Wiadomość wysłana na chat graczy.",
    },
    chatDeleted: {
      en: "Message deleted.",
      ru: "Сообщение удалено.",
      pl: "Wiadomość usunięta.",
    },
    teamChat: {
      en: "Message sent to team chat.",
      ru: "Сообщение отправлено в чат команды.",
      pl: "Wiadomość wysłana na chat drużyny.",
    },
    teamDeleted: {
      en: "Team deleted.",
      ru: "Команда удалена.",
      pl: "Drużyna usunięta.",
    },
    hardReset: {
      en: "Factory settings restored.",
      ru: "Заводские настройки восстановлены.",
      pl: "Przywrócono ustawienia fabryczne.",
    },
    adminSaved: {
      en: "Admin changes saved.",
      ru: "Изменения администратора сохранены.",
      pl: "Zmiany administratora zapisane.",
    },
    playerAdded: {
      en: "Player added.",
      ru: "Игрок добавлен.",
      pl: "Gracz dodany.",
    },
    newsApproved: {
      en: "News published. The player received +30 points.",
      ru: "Новость опубликована. Игрок получил +30 пунктов.",
      pl: "News opublikowany. Gracz otrzymał +30 punktów.",
    },
    newsDeleted: {
      en: "Proposed news deleted.",
      ru: "Предложенная новость удалена.",
      pl: "Proponowany news usunięty.",
    },
    newsPending: {
      en: "News sent for admin approval.",
      ru: "Новость отправлена администратору на проверку.",
      pl: "News wysłany do akceptacji administratora.",
    },
    transferSuccess: {
      en: "Points transferred and synced.",
      ru: "Пункты переданы и синхронизированы.",
      pl: "Punkty przekazane i zsynchronizowane.",
    },
    transferQueued: {
      en: "Points transferred locally. Site sync will retry.",
      ru: "Пункты переданы локально. Синхронизация с сайтом повторится.",
      pl: "Punkty przekazane lokalnie. Synchronizacja strony ponowi próbę.",
    },
    transferNotEnough: {
      en: "Not enough points.",
      ru: "Недостаточно пунктов.",
      pl: "Za mało punktów.",
    },
    transferInvalid: {
      en: "Choose a registered player.",
      ru: "Выбери зарегистрированного игрока.",
      pl: "Wybierz zarejestrowanego gracza.",
    },
    registerFirst: {
      en: "Complete your profile first.",
      ru: "Сначала заполни профиль.",
      pl: "Najpierw uzupełnij profil.",
    },
  };
  const additionalLabels = {
    be: {
      signed: "Вы ў спісе. Рэйтынг абноўлены.",
      canceled: "Браніраванне скасавана. Ачкі пералічаны.",
      news: "Навіна апублікавана. Налічана +30 ачкоў.",
      profile: "Профіль захаваны.",
      login: "Уваход выкананы.",
      logout: "Вы выйшлі з уліковага запісу.",
      loginError: "Няправільны нікнэйм або пароль.",
      passwordChanged: "Пароль зменены.",
      passwordError: "Пароль павінен мець не менш за 2 літары або лічбы і адну вялікую літару.",
      saveError: "Не ўдалося захаваць профіль. Паспрабуйце меншую выяву аватара.",
      avatar: "Аватар абноўлены.",
      teamCreated: "Запрашэнні адпраўлены. Гульцы павінны пацвердзіць далучэнне.",
      needCaptain: "Стварыць каманду можа толькі гулец з рангам Captain.",
      chooseMember: "Выберыце хаця б аднаго зарэгістраванага гульца.",
      confirmed: "Запрашэнне пацверджана.",
      declined: "Запрашэнне адхілена.",
      chat: "Паведамленне адпраўлена ў чат гульцоў.",
      chatDeleted: "Паведамленне выдалена.",
      teamChat: "Паведамленне адпраўлена ў чат каманды.",
      teamDeleted: "Каманда выдалена.",
      hardReset: "Завадскія налады адноўлены.",
      adminSaved: "Змены адміністратара захаваны.",
      playerAdded: "Гулец дададзены.",
      newsApproved: "Навіна апублікавана. Гулец атрымаў +30 ачкоў.",
      newsDeleted: "Прапанаваная навіна выдалена.",
      newsPending: "Навіна адпраўлена адміністратару на праверку.",
      transferSuccess: "Ачкі перададзены і сінхранізаваны.",
      transferQueued: "Ачкі перададзены лакальна. Сінхранізацыя з сайтам паўторыцца.",
      transferNotEnough: "Недастаткова ачкоў.",
      transferInvalid: "Выберыце зарэгістраванага гульца.",
      registerFirst: "Спачатку запоўніце профіль.",
    },
    uk: {
      signed: "Ви у списку. Рейтинг оновлено.",
      canceled: "Бронювання скасовано. Очки перераховано.",
      news: "Новину опубліковано. Нараховано +30 очок.",
      profile: "Профіль збережено.",
      login: "Вхід виконано.",
      logout: "Ви вийшли з облікового запису.",
      loginError: "Неправильний нікнейм або пароль.",
      passwordChanged: "Пароль змінено.",
      passwordError: "Пароль має містити щонайменше 2 літери або цифри та одну велику літеру.",
      saveError: "Не вдалося зберегти профіль. Спробуйте менше зображення аватара.",
      avatar: "Аватар оновлено.",
      teamCreated: "Запрошення надіслано. Гравці мають підтвердити приєднання.",
      needCaptain: "Створити команду може лише гравець із рангом Captain.",
      chooseMember: "Виберіть хоча б одного зареєстрованого гравця.",
      confirmed: "Запрошення підтверджено.",
      declined: "Запрошення відхилено.",
      chat: "Повідомлення надіслано до чату гравців.",
      chatDeleted: "Повідомлення видалено.",
      teamChat: "Повідомлення надіслано до чату команди.",
      teamDeleted: "Команду видалено.",
      hardReset: "Заводські налаштування відновлено.",
      adminSaved: "Зміни адміністратора збережено.",
      playerAdded: "Гравця додано.",
      newsApproved: "Новину опубліковано. Гравець отримав +30 очок.",
      newsDeleted: "Запропоновану новину видалено.",
      newsPending: "Новину надіслано адміністратору на перевірку.",
      transferSuccess: "Очки передано та синхронізовано.",
      transferQueued: "Очки передано локально. Синхронізація із сайтом повториться.",
      transferNotEnough: "Недостатньо очок.",
      transferInvalid: "Виберіть зареєстрованого гравця.",
      registerFirst: "Спочатку заповніть профіль.",
    },
  };
  const language = currentLanguage();
  return additionalLabels[language]?.[key] || labels[key]?.[language] || labels[key]?.en || "";
}

function addActivity(title, label, points) {
  state.activities.push({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    title,
    label,
    points,
    createdAt: new Date().toISOString(),
  });
}

function isValidPassword(password) {
  return /^(?=.*\p{Lu})[\p{L}\p{N}]{2,}$/u.test(password);
}

function defaultAccountPassword(nickname) {
  const cleanName =
    String(nickname || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[Łł]/g, (letter) => (letter === "Ł" ? "L" : "l"))
      .replace(/[^a-zA-Z0-9]/g, "") || "Player";
  return `Baza${cleanName}2026`;
}

function findKnownAccountPlayer(nickname) {
  const normalizedNickname = normalizePlayerName(nickname);
  const rankingPlayer = currentPlayerRanking().find((player) => normalizePlayerName(player.name) === normalizedNickname);
  if (rankingPlayer) return rankingPlayer;
  const staticName = [...staticRegisteredPlayerNames()].find((name) => normalizePlayerName(name) === normalizedNickname);
  return staticName ? { name: staticName, points: rankingPointsForPlayer(staticName) } : null;
}

async function hashPassword(nickname, password) {
  const source = `${normalizePlayerName(nickname)}:${password}`;
  const bytes = new TextEncoder().encode(source);
  if (!globalThis.crypto?.subtle) return sha256Fallback(bytes);
  const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function sha256Fallback(bytes) {
  const rightRotate = (value, amount) => (value >>> amount) | (value << (32 - amount));
  const constants = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];
  const hash = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
  const message = Array.from(bytes);
  const bitLength = message.length * 8;
  message.push(0x80);
  while (message.length % 64 !== 56) message.push(0);
  for (let shift = 56; shift >= 0; shift -= 8) message.push((bitLength / 2 ** shift) & 0xff);

  for (let chunk = 0; chunk < message.length; chunk += 64) {
    const words = new Array(64).fill(0);
    for (let index = 0; index < 16; index += 1) {
      const offset = chunk + index * 4;
      words[index] = (message[offset] << 24) | (message[offset + 1] << 16) | (message[offset + 2] << 8) | message[offset + 3];
    }
    for (let index = 16; index < 64; index += 1) {
      const s0 = rightRotate(words[index - 15], 7) ^ rightRotate(words[index - 15], 18) ^ (words[index - 15] >>> 3);
      const s1 = rightRotate(words[index - 2], 17) ^ rightRotate(words[index - 2], 19) ^ (words[index - 2] >>> 10);
      words[index] = (words[index - 16] + s0 + words[index - 7] + s1) >>> 0;
    }
    let [a, b, c, d, e, f, g, h] = hash;
    for (let index = 0; index < 64; index += 1) {
      const s1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const choice = (e & f) ^ (~e & g);
      const temp1 = (h + s1 + choice + constants[index] + words[index]) >>> 0;
      const s0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const majority = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (s0 + majority) >>> 0;
      h = g;
      g = f;
      f = e;
      e = (d + temp1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) >>> 0;
    }
    [a, b, c, d, e, f, g, h].forEach((value, index) => {
      hash[index] = (hash[index] + value) >>> 0;
    });
  }
  return hash.map((value) => value.toString(16).padStart(8, "0")).join("");
}

async function savePlayerProfile(formData) {
  const nickname = String(formData.get("nickname") || "").trim();
  const contact = String(formData.get("contact") || "").trim();
  const password = String(formData.get("password") || "");
  if (!nickname || !contact) return false;
  if (!isValidPassword(password)) {
    showToast(localizedToast("passwordError"));
    return false;
  }

  state.profile.nickname = nickname;
  state.profile.contact = contact;
  state.profile.saved = true;
  state.profile.passwordHash = await hashPassword(nickname, password);
  state.auth.loggedIn = true;
  state.auth.role = "player";

  if (!saveState()) return false;

  let persisted = false;
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const savedProfile = saved.profile || {};
    persisted = (
      Boolean(savedProfile.saved) &&
      Boolean(savedProfile.passwordHash) &&
      normalizePlayerName(savedProfile.nickname) === normalizePlayerName(nickname) &&
      String(savedProfile.contact || "").trim() === contact
    );
  } catch {
    return false;
  }
  if (!persisted) return false;
  await syncAdminPlayerToSite({
    nickname,
    contact,
    points: totalPoints(),
    passwordHash: state.profile.passwordHash,
    source: "ios-profile-registration",
  });
  return true;
}

async function loginPlayer(formData) {
  const nickname = String(formData.get("loginNickname") || "").trim();
  const password = String(formData.get("loginPassword") || "");
  if (!nickname || !password) return false;
  await loadAdminPlayersFromSite();
  if (normalizePlayerName(nickname) === normalizePlayerName(ADMIN_ACCOUNT.nickname) && password === ADMIN_ACCOUNT.password) {
    state.profile = {
      ...defaultState.profile,
      nickname: ADMIN_ACCOUNT.nickname,
      contact: ADMIN_ACCOUNT.contact,
      saved: true,
      passwordHash: "",
    };
    state.auth = {
      loggedIn: true,
      role: "admin",
    };
    saveState();
    await loadNewsProposals();
    return true;
  }
  const adminProfile = state.admin?.playerProfiles?.[normalizePlayerName(nickname)];
  if (adminProfile && password) {
    const adminProfileHash = await hashPassword(nickname, password);
    if (adminProfileHash === adminProfile.passwordHash) {
      state.profile = {
        ...defaultState.profile,
        nickname: adminProfile.nickname,
        contact: adminProfile.contact || "admin-created",
        saved: true,
        passwordHash: adminProfile.passwordHash,
      };
      state.auth = {
        loggedIn: true,
        role: "player",
      };
      saveState();
      return true;
    }
  }
  const knownPlayer = findKnownAccountPlayer(nickname);
  if (knownPlayer && password === defaultAccountPassword(knownPlayer.name)) {
    const passwordHash = await hashPassword(knownPlayer.name, password);
    ensureAdminState();
    state.admin.playerProfiles[normalizePlayerName(knownPlayer.name)] = {
      nickname: knownPlayer.name,
      contact: "site-account",
      passwordHash,
      points: Number(knownPlayer.points || 0),
      createdAt: new Date().toISOString(),
      synced: false,
    };
    state.profile = {
      ...defaultState.profile,
      nickname: knownPlayer.name,
      contact: "site-account",
      saved: true,
      passwordHash,
    };
    state.auth = {
      loggedIn: true,
      role: "player",
    };
    saveState();
    await syncAdminPlayerToSite({
      nickname: knownPlayer.name,
      contact: "site-account",
      points: Number(knownPlayer.points || 0),
      passwordHash,
      source: "ios-account-login",
    });
    return true;
  }
  if (!hasProfilePassword()) return false;
  const hash = await hashPassword(nickname, password);
  if (normalizePlayerName(nickname) !== normalizePlayerName(state.profile.nickname) || hash !== state.profile.passwordHash) return false;
  state.auth.loggedIn = true;
  state.auth.role = "player";
  saveState();
  await syncAdminPlayerToSite({
    nickname,
    contact: state.profile.contact,
    points: totalPoints(),
    passwordHash: state.profile.passwordHash,
    source: "ios-profile-login",
  });
  return true;
}

async function changePlayerPassword(formData) {
  if (!state.auth.loggedIn || isAdmin() || !hasProfilePassword()) return false;
  const currentPassword = String(formData.get("currentPassword") || "");
  const newPassword = String(formData.get("newPassword") || "");
  const nickname = playerName();
  const currentHash = await hashPassword(nickname, currentPassword);
  if (currentHash !== state.profile.passwordHash) return false;
  if (!isValidPassword(newPassword)) {
    showToast(localizedToast("passwordError"));
    return false;
  }
  const passwordHash = await hashPassword(nickname, newPassword);
  state.profile.passwordHash = passwordHash;
  ensureAdminState();
  const key = normalizePlayerName(nickname);
  state.admin.playerProfiles[key] = {
    ...(state.admin.playerProfiles[key] || {}),
    nickname,
    contact: state.profile.contact || state.admin.playerProfiles[key]?.contact || "player",
    passwordHash,
    points: totalPoints(),
    updatedAt: new Date().toISOString(),
  };
  saveState();
  await syncAdminPlayerToSite({
    nickname,
    contact: state.profile.contact,
    points: totalPoints(),
    passwordHash,
    source: "ios-password-change",
  });
  return true;
}

function logoutPlayer() {
  const wasAdmin = isAdmin();
  state.auth.loggedIn = false;
  state.auth.role = "player";
  if (wasAdmin) {
    state.profile = cloneData(defaultState.profile);
  }
  stopVoiceHttpSync();
  saveState();
  render();
  showToast(localizedToast("logout"));
}

function signGame(gameId) {
  const game = findGame(gameId);
  if (!game) return;
  if (!isCurrentUserRegistered()) {
    showToast(localizedToast("registerFirst"));
    setView("profile");
    return;
  }
  if (isCurrentPlayerSignedForGame(game)) return;
  const signupId = stableSignupId(game);
  state.cancelledSiteSignupIds = (state.cancelledSiteSignupIds || []).filter((id) => id !== signupId);
  state.signups[gameId] = true;
  addActivity(
    {
      en: `Game booking: ${localize(game.title)}`,
      pl: `Zapis na grę: ${localize(game.title)}`,
      be: `Запіс на гульню: ${localize(game.title)}`,
      uk: `Запис на гру: ${localize(game.title)}`,
      ru: `Запись на игру: ${localize(game.title)}`,
    },
    `${localize(game.date)} / ${localize(game.time)}`,
    25,
  );
  applyCurrentPlayerPointDelta(25);
  saveState();
  render();
  showToast(localizedToast("signed"));
  syncSignupToSite(game, signupId);
}

function cancelGame(gameId) {
  const game = findGame(gameId);
  if (!game || !isCurrentPlayerSignedForGame(game)) return;
  if (!window.confirm(t("confirmCancelText"))) return;
  const signupId = currentPlayerSiteSignup(game)?.id || stableSignupId(game);
  delete state.signups[gameId];
  cancelSiteSignup(game, signupId);
  addActivity(
    {
      en: `Booking cancelled: ${localize(game.title)}`,
      pl: `Anulowano zapis: ${localize(game.title)}`,
      be: `Браніраванне скасавана: ${localize(game.title)}`,
      uk: `Бронювання скасовано: ${localize(game.title)}`,
      ru: `Отмена записи: ${localize(game.title)}`,
    },
    { en: "points removed for this game", pl: "punkty za tę grę zdjęte", be: "ачкі за гэтую гульню зняты", uk: "очки за цю гру знято", ru: "пункты за эту игру сняты" },
    -25,
  );
  applyCurrentPlayerPointDelta(-25);
  saveState();
  render();
  showToast(localizedToast("canceled"));
  syncSignupCancellationToSite(game, signupId);
}

function setView(name) {
  const previousViewName = getCurrentView();
  views.forEach((view) => view.classList.toggle("active", view.dataset.view === name));
  tabButtons.forEach((button) => button.classList.toggle("active", button.dataset.tab === name));
  document.querySelector(".app-scroll").scrollTo({ top: 0, behavior: "smooth" });
  if (name === "voice" && isCurrentUserRegistered()) {
    activateVoiceSession();
    connectVoiceSocket();
    connectVoiceRoomMedia({ force: true });
  } else if (previousViewName === "voice") {
    deactivateVoiceSession();
  }
}

function getCurrentView() {
  return [...views].find((view) => view.classList.contains("active"))?.dataset.view || "home";
}

function openArticle(id) {
  const item = findNewsItem(id);
  if (!item) return;
  previousView = getCurrentView() === "article" ? previousView : getCurrentView();
  activeArticleId = id;
  renderArticle();
  setView("article");
  appScroll?.scrollTo({ top: 0, behavior: "auto" });
  loadArticleBody(item);
}

function closeArticle() {
  activeArticleId = "";
  articleLoadingId = "";
  setView(previousView || "home");
}

function renderArticle() {
  if (!articleReader) return;
  const item = findNewsItem(activeArticleId);
  if (!item) {
    articleReader.innerHTML = "";
    return;
  }

  const cacheKey = articleCacheKey(item);
  const cachedBody = localize(item.contentByLanguage) || item.content || state.articleCache?.[cacheKey] || (item.articleKey ? state.articleCache?.[item.articleKey] : "");
  const canShowSourceBody = true;
  const isLoading = canShowSourceBody && articleLoadingId === item.id && !hasFullArticleBody(item, cachedBody);
  const body = canShowSourceBody && hasFullArticleBody(item, cachedBody) ? cachedBody : "";
  articleReader.innerHTML = `
    ${renderArticleMedia(item)}
    <div class="article-meta">${formatDate(item.createdAt)} / ${escapeHtml(item.author || "BAZA")}</div>
    <h1>${escapeHtml(localizedNewsTitle(item))}</h1>
    <p class="article-summary">${escapeHtml(localizedNewsBody(item))}</p>
    ${isLoading ? `<p class="article-loading">${escapeHtml(t("loadingArticle"))}</p>` : ""}
    ${body ? `<div class="article-body">${renderArticleBody(body)}</div>` : ""}
  `;
}

async function loadArticleBody(item) {
  const cacheKey = articleCacheKey(item);
  const cachedBody = localize(item.contentByLanguage) || item.content || state.articleCache?.[cacheKey] || (item.articleKey ? state.articleCache?.[item.articleKey] : "");
  if (hasFullArticleBody(item, cachedBody)) return;

  articleLoadingId = item.id;
  renderArticle();

  const sources = [item.contentUrl, "Lasertagbaza1-upload/index.html", "index.html"].filter(Boolean);
  for (const source of sources) {
    try {
      const response = await fetch(source, { cache: "no-store" });
      if (!response.ok) continue;
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const text = findArticleText(doc, item);
      if (!text || !hasFullArticleBody(item, text)) continue;
      state.articleCache[cacheKey] = text;
      if (item.articleKey) state.articleCache[item.articleKey] = text;
      saveState();
      break;
    } catch {
      // Keep trying the next source; the summary remains readable if all sources fail.
    }
  }
  if (articleLoadingId === item.id) articleLoadingId = "";
  renderArticle();
}

function articleCacheKey(item) {
  return item.articleKey || item.id;
}

function hasFullArticleBody(item, body) {
  const text = String(body || "").replace(/\s+/g, " ").trim();
  if ((item.content || item.contentByLanguage) && text) return true;
  const summary = localize(item.body).replace(/\s+/g, " ").trim();
  return text.length > Math.max(180, summary.length + 40);
}

function renderArticleBody(body) {
  return String(body)
    .split(/\n{2,}/)
    .map((block) => {
      const text = block.trim();
      if (!text) return "";
      if (text.startsWith("## ")) return `<h2>${escapeHtml(text.slice(3))}</h2>`;
      if (text.startsWith("> ")) return `<blockquote>${escapeHtml(text.slice(2))}</blockquote>`;
      return `<p>${escapeHtml(text)}</p>`;
    })
    .join("");
}

function safeAttr(value) {
  return String(value || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function findArticleText(doc, item) {
  const directSelectors = [
    item.webSelector,
    item.id ? `[data-news-id="${safeAttr(item.id)}"]` : "",
    item.articleKey ? `[data-news-key="${safeAttr(item.articleKey)}"]` : "",
  ].filter(Boolean);

  const directMatch = directSelectors
    .map((selector) => doc.querySelector(selector))
    .find(Boolean);
  const directBody = articleBodyFromNode(directMatch);
  if (directBody) return directBody;

  if (!item.articleKey) return "";
  const cards = [...doc.querySelectorAll(".update-card")];
  const matchingCard = cards.find((card) => {
    const link = [...card.querySelectorAll("a[href]")].find((anchor) =>
      anchor.getAttribute("href")?.includes(`article=${item.articleKey}`),
    );
    if (link) return true;
    const image = card.querySelector("img");
    const imageSource = image?.getAttribute("src") || "";
    const text = card.textContent.replace(/\s+/g, " ").toLowerCase();
    return imageSource.includes(item.articleKey) || text.includes(item.articleKey.replace(/-/g, " "));
  });

  return articleBodyFromNode(matchingCard);
}

function articleBodyFromNode(node) {
  const container = node?.closest?.(".update-card") || node;
  const body = container?.querySelector?.(".update-article-body");
  if (!body) return "";
  return [...body.querySelectorAll("h4, p, blockquote")]
    .map((node) => {
      const text = node.textContent.replace(/\s+/g, " ").trim();
      if (!text) return "";
      if (node.tagName === "H4") return `## ${text}`;
      if (node.tagName === "BLOCKQUOTE") return `> ${text}`;
      return text;
    })
    .filter(Boolean)
    .join("\n\n");
}

async function loadSiteNews() {
  const remoteNews = await loadRemoteNewsFeed();
  if (remoteNews.length) {
    state.siteNews = remoteNews;
    saveState();
    renderNews();
    return;
  }

  const siteSources = ["index.html", "Lasertagbaza1-upload/index.html"];

  for (const source of siteSources) {
    try {
      const response = await fetch(source, { cache: "no-store" });
      if (!response.ok) continue;
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const updatesSection = findBazaUpdatesSection(doc);
      if (!updatesSection) continue;

      const featuredCards = [...updatesSection.querySelectorAll(".update-card.featured-update")];
      const cards = (featuredCards.length ? featuredCards : [...updatesSection.querySelectorAll(".update-card")]).slice(0, 6);
      if (!cards.length) continue;

      state.siteNews = cards.map((card, index) => {
        const sourceNode = card.querySelector("summary") || card;
        const title = sourceNode.querySelector("h3")?.textContent?.trim() || "BAZA update";
        const lead = sourceNode.querySelector("p")?.textContent?.trim() || "";
        const articleText = card.querySelector(".update-article-body p")?.textContent?.trim();
        const label = sourceNode.querySelector("span")?.textContent?.trim() || "BAZA";
        const newsId = card.dataset.newsId || card.querySelector("[data-news-key]")?.dataset.newsKey;
        return {
          id: newsId || `site-bazie-${index}-${title.toLowerCase().replace(/[^a-z0-9]+/gi, "-")}`,
          title,
          body: articleText || lead,
          author: label,
          createdAt: new Date(Date.UTC(2026, 6, 10, 18 - index, 0, 0)).toISOString(),
          image: sourceNode.querySelector("img")?.getAttribute("src") || "",
          site: true,
          source,
        };
      });
      saveState();
      renderNews();
      return;
    } catch {
      renderNews();
    }
  }
}

async function loadRemoteNewsFeed() {
  try {
    const source = appApiUrl("/api/news-feed");
    const response = await fetch(source, { cache: "no-store" });
    if (!response.ok) return [];
    const feed = await response.json();
    const sections = Array.isArray(feed.sections) ? feed.sections : [];
    const items = sections.flatMap((section) => {
      const sectionItems = Array.isArray(section.items) ? section.items : [];
      return sectionItems.map((item) => ({ item, section }));
    });

    return items.map(({ item, section }, index) => ({
      id: item.id || `remote-news-${index}`,
      title: item.title || "BAZA update",
      body: item.summary || "",
      author: item.author || localize(section.labels) || "BAZA",
      createdAt: item.createdAt || (item.publishedAt ? `${item.publishedAt}T12:00:00+02:00` : feed.updatedAt || new Date().toISOString()),
      image: item.image || "",
      media: item.media || null,
      contentUrl: item.contentUrl || "",
      content: item.content || "",
      contentByLanguage: item.contentByLanguage || {},
      articleKey: item.articleKey || "",
      webSelector: item.webSelector || "",
      site: true,
      sectionId: section.id || "",
      playerSubmitted: Boolean(item.playerSubmitted),
      source,
    }));
  } catch {
    return [];
  }
}

function findBazaUpdatesSection(doc) {
  const normalize = (value) => value.replace(/\s+/g, " ").trim().toLowerCase();
  const exactHeading = "nowe aktualizacje na bazie.";
  const sections = [...doc.querySelectorAll("section")];
  const exactSection = sections.find((section) => {
    const heading = normalize(section.querySelector("h2")?.textContent || "");
    return heading === exactHeading || heading === exactHeading.replace(".", "");
  });

  if (exactSection) return exactSection;

  return sections.find((section) => {
    const heading = normalize(section.querySelector("h2")?.textContent || "");
    return heading.includes("nowe aktualizacje") && heading.includes("bazie");
  });
}

async function loadLegacySiteNews() {
  try {
    const response = await fetch("index.html", { cache: "no-store" });
    if (!response.ok) return;
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const cards = [...doc.querySelectorAll(".update-card")].slice(0, 6);
    if (!cards.length) return;
    state.siteNews = cards.map((card, index) => {
      const title = card.querySelector("h3")?.textContent?.trim() || "BAZA update";
      const body = card.querySelector("p")?.textContent?.trim() || "";
      const label = card.querySelector("span")?.textContent?.trim() || "BAZA";
      const newsId = card.dataset.newsId || card.querySelector("[data-news-key]")?.dataset.newsKey;
      return {
        id: newsId || `site-${index}-${title.toLowerCase().replace(/[^a-z0-9]+/gi, "-")}`,
        title,
        body,
        author: label,
        createdAt: new Date(Date.UTC(2026, 6, 10, 9 + index, 0, 0)).toISOString(),
        image: card.querySelector("img")?.getAttribute("src") || "",
        site: true,
      };
    });
    saveState();
    renderNews();
  } catch {
    renderNews();
  }
}

async function loadSiteRanking() {
  const sources = [
    { url: appApiUrl("/api/ranking-feed"), type: "json" },
    { url: "Lasertagbaza1-upload/data/ranking-feed.json", type: "json" },
    { url: "https://www.lasertagbaza.pl/", type: "html" },
    { url: "index.html", type: "html" },
    { url: "Lasertagbaza1-upload/index.html", type: "html" },
  ];

  for (const source of sources) {
    try {
      const response = await fetch(source.url, { cache: "no-store" });
      if (!response.ok) continue;
      let ranking = [];
      if (source.type === "json") {
        const data = await response.json();
        ranking = normalizeRankingFeedPlayers(data?.players || data?.ranking?.players || []);
      } else {
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, "text/html");
        ranking = parseSiteRanking(doc, source.url);
      }
      if (!ranking.length) continue;
      state.siteRanking = ranking;
      saveState();
      renderRanking();
      renderTeamTools();
      renderGames();
      return;
    } catch {
      // Keep the fallback ranking when a site source is unavailable.
    }
  }
}

function parseSiteRanking(doc, source) {
  const section = doc.querySelector("#top-punkty") || doc.querySelector(".points-rating");
  const sourceBase = source.includes("/") ? source.slice(0, source.lastIndexOf("/") + 1) : "";
  return [...(section?.querySelectorAll(".points-card") || [])]
    .map((card, index) => {
      const rankText = card.querySelector("b")?.textContent || "";
      const name = card.querySelector("strong")?.textContent?.trim() || "";
      const pointsText = [...card.querySelectorAll("span")]
        .map((node) => node.textContent || "")
        .find((text) => /\d+\s*pkt/i.test(text)) || "";
      const image = card.querySelector("img")?.getAttribute("src") || "";
      const rank = Number(rankText.replace(/\D+/g, "")) || index + 1;
      const points = Number(pointsText.replace(/\D+/g, "")) || 0;
      if (!name || !points) return null;
      return {
        rank,
        name,
        points,
        avatar: resolveRankingImage(image, sourceBase),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.rank - b.rank);
}

function normalizeGamesFeedGames(games) {
  return (Array.isArray(games) ? games : [])
    .map((game) => ({
      id: String(game.id || "").trim(),
      startsAt: String(game.startsAt || "").trim(),
      date: String(game.date || "").trim(),
      time: String(game.time || "").trim(),
      title: game.title || "",
      scenario: game.scenario || "",
      capacity: Number(game.capacity || 0),
      players: Array.isArray(game.players) ? game.players : [],
    }))
    .filter((game) => game.id && game.startsAt && !Number.isNaN(new Date(game.startsAt).getTime()));
}

async function loadSiteGames({ notify = true } = {}) {
  try {
    const response = await fetch(appApiUrl("/api/games-feed"), { cache: "no-store" });
    if (!response.ok) return false;
    const feed = await response.json();
    const games = normalizeGamesFeedGames(feed.games);
    if (!games.length) return false;

    const previousKeys = new Set(state.seenGameInstances || []);
    const currentKeys = games.map((game) => `${game.id}:${game.startsAt}`);
    const hasPreviousSnapshot = previousKeys.size > 0;
    const newGames = hasPreviousSnapshot
      ? games.filter((game) => !previousKeys.has(`${game.id}:${game.startsAt}`))
      : [];

    state.siteGames = games;
    state.seenGameInstances = [...new Set([...currentKeys, ...previousKeys])].slice(-40);
    if (Array.isArray(feed.signups)) replaceSiteSignups(feed.signups);
    saveState();
    renderGames();
    renderStats();

    if (notify) {
      newGames.forEach((game) => {
        const renderedGame = scheduledGames().find((item) => item.feedInstanceKey === `${game.id}:${game.startsAt}`) || game;
        sendNewGameNotification(renderedGame);
      });
    }
    return true;
  } catch {
    return false;
  }
}

async function loadSiteSignups() {
  setSyncStatus("pending");
  const loaded = await fetchSiteSignups();
  if (!loaded.length) {
    setSyncStatus("error", "No site signups loaded.");
    return;
  }
  replaceSiteSignups(loaded);
  state.sync.lastRosterSync = new Date().toISOString();
  setSyncStatus("synced");
  saveState();
  renderGames();
  renderStats();
}

async function refreshRoster() {
  await loadSiteSignups();
  render();
  showToast(syncStatusText());
}

async function fetchSiteSignups() {
  const sources = [
    "https://www.lasertagbaza.pl/api/telegram-signup",
    "/api/telegram-signup",
    "Lasertagbaza1-upload/data/site-signups.json",
  ];

  for (const source of sources) {
    try {
      const response = await fetch(source, { cache: "no-store" });
      if (!response.ok) continue;
      const data = await response.json();
      const signups = extractSiteSignups(data);
      if (signups.length) return signups;
    } catch {
      // Try the next source.
    }
  }

  if (siteSignupFallback.length) return siteSignupFallback;

  try {
    return JSON.parse(localStorage.getItem("bazaGameSignups") || "[]");
  } catch {
    return [];
  }
}

function mergeSiteSignups(signups) {
  state.siteSignups = normalizeSiteSignups([...state.siteSignups, ...signups]);
  localStorage.setItem("bazaGameSignups", JSON.stringify(state.siteSignups));
}

function replaceSiteSignups(signups) {
  const appSignups = state.siteSignups.filter((signup) => String(signup.id || "").startsWith("app-"));
  state.siteSignups = normalizeSiteSignups([...signups, ...appSignups]);
  localStorage.setItem("bazaGameSignups", JSON.stringify(state.siteSignups));
}

function normalizeSiteSignups(signups) {
  const byId = new Map();
  const cancelledIds = new Set(state.cancelledSiteSignupIds || []);
  signups
    .filter((signup) => signup && ["wednesday", "sunday"].includes(signup.game) && !cancelledIds.has(String(signup.id || "")))
    .forEach((signup) => {
      const id = String(signup.id || `${signup.game}-${signup.nickname}-${signup.createdAt || ""}`);
      byId.set(id, {
        id,
        game: signup.game,
        nickname: String(signup.nickname || "").trim(),
        phone: String(signup.phone || "").trim(),
        note: String(signup.note || "").trim(),
        createdAt: signup.createdAt || new Date().toISOString(),
      });
    });
  return [...byId.values()].filter((signup) => signup.nickname);
}

function extractSiteSignups(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.signups)) return data.signups;
  if (Array.isArray(data?.players)) return data.players;
  if (Array.isArray(data?.registeredPlayers)) return data.registeredPlayers;
  if (data?.signups && typeof data.signups === "object") {
    return Object.entries(data.signups).flatMap(([game, records]) =>
      Array.isArray(records) ? records.map((record) => ({ ...record, game: record.game || game })) : [],
    );
  }
  return [];
}

function stableSignupId(game) {
  const gameKey = siteGameKey(game) || game.id;
  const normalizedName = normalizePlayerName(playerName()).replace(/[^a-z0-9]+/g, "-") || "player";
  const datePart = game.startsAt ? dateId(new Date(game.startsAt)) : dateId(new Date());
  return `app-${gameKey}-${datePart}-${normalizedName}`;
}

function cancelSiteSignup(game, signupId) {
  const gameKey = siteGameKey(game);
  const currentName = normalizePlayerName(playerName());
  state.cancelledSiteSignupIds = [...new Set([...(state.cancelledSiteSignupIds || []), signupId])];
  state.siteSignups = state.siteSignups.filter((signup) => {
    const sameId = String(signup.id || "") === signupId;
    const sameAppPlayer =
      String(signup.id || "").startsWith("app-") &&
      signup.game === gameKey &&
      normalizePlayerName(signup.nickname) === currentName;
    return !sameId && !sameAppPlayer;
  });
  localStorage.setItem("bazaGameSignups", JSON.stringify(state.siteSignups));
}

function adminRemoveLocalSignup({ id, game, nickname }) {
  const cleanId = String(id || "");
  const cleanGame = String(game || "");
  const cleanName = normalizePlayerName(nickname);
  if (cleanId) state.cancelledSiteSignupIds = [...new Set([...(state.cancelledSiteSignupIds || []), cleanId])];
  state.siteSignups = state.siteSignups.filter((signup) => {
    const sameId = cleanId && String(signup.id || "") === cleanId;
    const samePlayer = signup.game === cleanGame && normalizePlayerName(signup.nickname) === cleanName;
    return !(sameId || samePlayer);
  });
  localStorage.setItem("bazaGameSignups", JSON.stringify(state.siteSignups));
}

function setSyncStatus(status, error = "") {
  state.sync = {
    ...defaultState.sync,
    ...(state.sync || {}),
    status,
    lastError: error,
  };
  if (status === "synced") state.sync.lastSiteSync = new Date().toISOString();
  saveState();
  renderSyncStatus();
}

async function syncSignupToSite(game, signupId) {
  const gameKey = siteGameKey(game);
  if (!gameKey) return;
  setSyncStatus("pending");
  const signup = {
    id: signupId,
    game: gameKey,
    nickname: playerName(),
    phone: state.profile.contact.trim(),
    note: "BAZA app",
    createdAt: new Date().toISOString(),
  };

  mergeSiteSignups([signup]);
  saveState();
  renderGames();

  const payload = {
    ...signup,
    gameLabel: gameLabelForSite(gameKey),
    playerProof: state.profile.passwordHash,
  };

  const targets = [appApiUrl("/api/games-feed")];

  for (const target of targets) {
    try {
      const response = await fetch(target, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) continue;
      const data = await response.json().catch(() => ({}));
      if (Array.isArray(data.signups)) {
        mergeSiteSignups(data.signups);
      }
      if (applyRankingPayload(data.ranking)) clearPlayerPointOverride(playerName());
      setSyncStatus("synced");
      saveState();
      renderRanking();
      renderStats();
      renderGames();
      return;
    } catch {
      // Try the next endpoint; the local mirror is already updated.
    }
  }
  setSyncStatus("error", "The app could not send this booking to the site.");
}

async function syncSignupCancellationToSite(game, signupId) {
  const gameKey = siteGameKey(game);
  if (!gameKey) return;
  setSyncStatus("pending");

  const payload = {
    id: signupId,
    game: gameKey,
    nickname: playerName(),
  };

  const targets = [appApiUrl("/api/games-feed")];

  for (const target of targets) {
    try {
      const response = await fetch(target, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) continue;
      const data = await response.json().catch(() => ({}));
      if (Array.isArray(data.signups)) {
        replaceSiteSignups(data.signups);
      }
      if (applyRankingPayload(data.ranking)) clearPlayerPointOverride(playerName());
      setSyncStatus("synced");
      saveState();
      renderRanking();
      renderStats();
      renderGames();
      return;
    } catch {
      // The local roster has already been updated.
    }
  }
  setSyncStatus("error", "The app could not remove this booking from the site.");
}

async function adminRemoveSignupFromSite({ id, game, nickname }) {
  if (!isAdmin()) return;
  const payload = { id, game, nickname };
  setSyncStatus("pending");
  adminRemoveLocalSignup(payload);
  addAdminLog("signup removed", `${nickname} / ${game}`);
  saveState();
  render();

  const targets = [
    "https://www.lasertagbaza.pl/api/telegram-signup",
    "/api/telegram-signup",
    "http://localhost:3000/api/telegram-signup",
  ];

  for (const target of targets) {
    try {
      const response = await fetch(target, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) continue;
      const data = await response.json().catch(() => ({}));
      if (Array.isArray(data.signups)) replaceSiteSignups(data.signups);
      setSyncStatus("synced");
      saveState();
      render();
      return;
    } catch {
      // Local removal is already applied; try next endpoint.
    }
  }

  setSyncStatus("error", "Player removed locally. Site sync did not confirm deletion.");
  renderAdminPanel();
}

function syncCurrentSignedGamesToSite() {
  if (!isCurrentUserRegistered()) return;
  scheduledGames().forEach((game) => {
    if (state.signups[game.id]) {
      syncSignupToSite(game, stableSignupId(game));
    }
  });
}

function gameLabelForSite(gameKey) {
  return gameKey === "wednesday"
    ? "Środa 18:30 / Counter-Strike 6v6"
    : "Niedziela 18:00 / otwarta gra";
}

function resolveRankingImage(src, sourceBase) {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith("/")) return src;
  return `${sourceBase}${src}`;
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.tab === "profile" && getCurrentView() === "profile") {
      setView("home");
      return;
    }
    setView(button.dataset.tab);
  });
});

openViewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.openView === "profile" && getCurrentView() === "profile") {
      setView("home");
      return;
    }
    setView(button.dataset.openView);
  });
});

homeNewsToggle?.addEventListener("click", () => {
  homeNewsExpanded = !homeNewsExpanded;
  renderNews();
});

document.addEventListener("dragstart", (event) => {
  const editableTarget = event.target.closest("input, textarea, select, [contenteditable='true']");
  if (!editableTarget) event.preventDefault();
});

document.addEventListener("selectstart", (event) => {
  const editableTarget = event.target.closest("input, textarea, select, [contenteditable='true']");
  if (!editableTarget) event.preventDefault();
});

document.addEventListener("click", async (event) => {
  const soundTarget = event.target.closest("button, a, .avatar-picker, [role='button']");
  if (soundTarget) playTapSound();

  const removeChatPhotoButton = event.target.closest("[data-remove-chat-photo]");
  if (removeChatPhotoButton) {
    clearChatPhoto();
    return;
  }

  const liveStreamButton = event.target.closest("[data-live-stream]");
  if (liveStreamButton) {
    showToast(t("streamDuringGame"));
    return;
  }

  const removeNewsMediaButton = event.target.closest("[data-remove-news-media]");
  if (removeNewsMediaButton) {
    clearNewsMedia();
    return;
  }

  const signButton = event.target.closest("[data-sign-game]");
  if (signButton) {
    signGame(signButton.dataset.signGame);
    return;
  }

  const cancelButton = event.target.closest("[data-cancel-game]");
  if (cancelButton) {
    cancelGame(cancelButton.dataset.cancelGame);
    return;
  }

  const refreshButton = event.target.closest("[data-refresh-roster]");
  if (refreshButton) {
    refreshRoster();
    return;
  }

  const rankingButton = event.target.closest("[data-ranking-filter]");
  if (rankingButton) {
    rankingFilter = rankingButton.dataset.rankingFilter || "all";
    renderRanking();
    return;
  }

  const homeProfileButton = event.target.closest("[data-home-profile]");
  if (homeProfileButton) {
    setView("profile");
    return;
  }

  const openVoiceRoomButton = event.target.closest("[data-open-voice-room]");
  if (openVoiceRoomButton) {
    unlockVoiceAudio();
    setView("voice");
    renderVoiceRoom();
    return;
  }

  const voiceBackButton = event.target.closest("[data-voice-back]");
  if (voiceBackButton) {
    setView("home");
    return;
  }

  const articleButton = event.target.closest("[data-open-article]");
  if (articleButton) {
    openArticle(articleButton.dataset.openArticle);
    return;
  }

  const deleteTeamButton = event.target.closest("[data-delete-team]");
  if (deleteTeamButton) {
    deleteTeam();
    return;
  }

  const deleteChatButton = event.target.closest("[data-delete-chat]");
  if (deleteChatButton) {
    deleteOwnChatMessage(deleteChatButton.dataset.deleteChat);
    return;
  }

  const publishNewsButton = event.target.closest("[data-admin-publish-news]");
  if (publishNewsButton) {
    await approveAdminNews(publishNewsButton.dataset.adminPublishNews);
    return;
  }

  const deleteNewsButton = event.target.closest("[data-admin-delete-news]");
  if (deleteNewsButton) {
    await deleteAdminNews(deleteNewsButton.dataset.adminDeleteNews);
    return;
  }

  const deleteAdminGameButton = event.target.closest("[data-admin-delete-game]");
  if (deleteAdminGameButton) {
    deleteAdminGame(deleteAdminGameButton.dataset.adminDeleteGame);
    return;
  }

  const removeSignupButton = event.target.closest("[data-admin-remove-signup]");
  if (removeSignupButton) {
    adminRemoveSignupFromSite({
      id: removeSignupButton.dataset.adminRemoveSignup,
      game: removeSignupButton.dataset.adminRemoveGame,
      nickname: removeSignupButton.dataset.adminRemovePlayer,
    });
    return;
  }

  const retrySyncButton = event.target.closest("[data-admin-retry-sync]");
  if (retrySyncButton) {
    retryAdminSync();
    return;
  }

  const exportPlayersButton = event.target.closest("[data-admin-export-players]");
  if (exportPlayersButton) {
    exportPlayers();
    return;
  }

  const clearChatButton = event.target.closest("[data-admin-clear-chat]");
  if (clearChatButton) {
    clearPlayerChatByAdmin();
    return;
  }

  const voiceMicButton = event.target.closest("[data-voice-mic]");
  if (voiceMicButton) {
    unlockVoiceAudio();
    runVoiceAction(toggleVoiceMic);
    return;
  }

  const voiceLeaveButton = event.target.closest("[data-voice-leave]");
  if (voiceLeaveButton) {
    runVoiceAction(leaveVoiceRoom);
    return;
  }

  const voiceRemoveButton = event.target.closest("[data-voice-remove]");
  if (voiceRemoveButton) {
    runVoiceAction(() => removeVoiceParticipant(voiceRemoveButton.dataset.voiceRemove));
    return;
  }

  const voiceInviteConfirmButton = event.target.closest("[data-voice-invite-confirm]");
  if (voiceInviteConfirmButton) {
    const member = voiceRoomPanel?.querySelector("[data-voice-invite-select]")?.value || "";
    if (member) runVoiceAction(() => addVoiceParticipantByName(member));
    return;
  }

  const acceptVoiceButton = event.target.closest("[data-voice-accept]");
  if (acceptVoiceButton) {
    unlockVoiceAudio();
    runVoiceAction(() => acceptVoiceInvite(acceptVoiceButton.dataset.voiceAccept));
    return;
  }

  const declineVoiceButton = event.target.closest("[data-voice-decline]");
  if (declineVoiceButton) {
    runVoiceAction(() => declineVoiceInvite(declineVoiceButton.dataset.voiceDecline));
    return;
  }

  const showAddPlayerButton = event.target.closest("[data-admin-show-add-player]");
  if (showAddPlayerButton) {
    const form = adminPanel?.querySelector("[data-admin-add-player-form]");
    if (form) {
      form.hidden = !form.hidden;
      if (!form.hidden) form.elements.playerName?.focus();
    }
    return;
  }

  const logoutButton = event.target.closest("[data-logout]");
  if (logoutButton) {
    logoutPlayer();
    return;
  }

  const profileLoginAction = event.target.closest("[data-profile-login-action]");
  if (profileLoginAction) {
    focusProfileLogin();
    return;
  }

  const profileRegisterAction = event.target.closest("[data-profile-register-action]");
  if (profileRegisterAction) {
    focusProfileRegistration();
    return;
  }

  const hardResetButton = event.target.closest("[data-hard-reset]");
  if (hardResetButton) {
    hardResetApp();
    return;
  }

  const confirmButton = event.target.closest("[data-confirm-member]");
  if (confirmButton) {
    updateMemberStatus(confirmButton.dataset.confirmMember, "confirmed");
    showToast(localizedToast("confirmed"));
    return;
  }

  const declineButton = event.target.closest("[data-decline-member]");
  if (declineButton) {
    updateMemberStatus(declineButton.dataset.declineMember, "declined");
    showToast(localizedToast("declined"));
  }
});

articleBackButton?.addEventListener("click", closeArticle);

document.addEventListener("change", (event) => {
  const adminPlayerSelect = event.target.closest("[data-admin-player-select]");
  if (adminPlayerSelect) {
    syncAdminPlayerSelect(adminPlayerSelect);
    return;
  }

  const adminRankSelect = event.target.closest("[data-admin-rank-select]");
  if (adminRankSelect) {
    syncAdminRankSelect(adminRankSelect);
  }
});

function updateMemberStatus(name, status) {
  if (!state.team) return;
  state.team.members = state.team.members.map((member) => (member.name === name ? { ...member, status } : member));
  saveState();
  renderTeamTools();
  renderHomeTeam();
  renderAchievements();
}

function deleteTeam() {
  if (!state.team || !isTeamCaptainOwner()) return;
  state.team = null;
  saveState();
  renderTeamTools();
  renderHomeTeam();
  renderAchievements();
  showToast(localizedToast("teamDeleted"));
}

function playerChatApiUrl() {
  return appApiUrl("/api/player-chat");
}

function playerChatSocketUrl() {
  return appSocketUrl("/api/player-chat-ws");
}

function mergePlayerChatMessages(messages) {
  if (!Array.isArray(messages)) return false;
  const byId = new Map();
  const stickyMessages = state.chat.filter((message) => message.system || message.author === "Club Bot");
  [...stickyMessages, ...messages].forEach((message) => {
    const image = safeChatImage(message?.image);
    if (!message?.id || !message?.author || (!message?.body && !image)) return;
    byId.set(String(message.id), {
      ...message,
      body: message.body || "",
      image,
      registered: Boolean(message.registered) || !message.system,
      remote: !message.system,
      createdAt: message.createdAt || new Date().toISOString(),
    });
  });
  const nextMessages = [...byId.values()]
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .slice(-120);
  const changed = JSON.stringify(nextMessages) !== JSON.stringify(state.chat);
  state.chat = nextMessages;
  if (changed) saveState();
  return changed;
}

async function loadPlayerChat({ silent = true } = {}) {
  try {
    const response = await fetch(playerChatApiUrl(), { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    if (mergePlayerChatMessages(data.messages)) renderChat();
  } catch {
    if (!silent) showToast(localizedToast("syncError"));
  }
}

function connectPlayerChatSocket() {
  if (appApiOrigin().includes("lasertagbaza.pl")) return;
  if (!("WebSocket" in window) || (playerChatSocket && [WebSocket.OPEN, WebSocket.CONNECTING].includes(playerChatSocket.readyState))) return;
  try {
    playerChatSocket = new WebSocket(playerChatSocketUrl());
  } catch {
    return;
  }

  playerChatSocket.addEventListener("message", (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === "chat" && mergePlayerChatMessages(data.messages)) renderChat();
    } catch {
      // Ignore malformed chat packets.
    }
  });

  playerChatSocket.addEventListener("close", () => {
    playerChatSocket = null;
    setTimeout(connectPlayerChatSocket, 1800);
  });

  playerChatSocket.addEventListener("error", () => {
    playerChatSocket = null;
  });
}

async function syncPlayerChatMessage(message) {
  try {
    const response = await fetch(playerChatApiUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    if (!response.ok) return;
    const data = await response.json();
    if (mergePlayerChatMessages(data.messages)) renderChat();
  } catch {
    // Keep the local message when the chat server is unavailable.
  }
}

async function deleteRemoteChatMessage(messageId, author) {
  try {
    const response = await fetch(playerChatApiUrl(), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: messageId, author, admin: isAdmin() }),
    });
    if (!response.ok) return;
    const data = await response.json();
    if (mergePlayerChatMessages(data.messages)) renderChat();
  } catch {
    // Local delete still works without the chat server.
  }
}

async function deleteOwnChatMessage(messageId) {
  const message = state.chat.find((item) => item.id === messageId);
  if (!message || (!isAdmin() && message.author !== playerName())) return;
  state.chat = state.chat.filter((item) => item.id !== messageId);
  if (isAdmin()) addAdminLog("chat message deleted", message.author || "unknown");
  saveState();
  renderChat();
  renderAdminPanel();
  await deleteRemoteChatMessage(messageId, message.author);
  showToast(localizedToast("chatDeleted"));
}

async function transferPlayerPoints(form) {
  if (!isCurrentUserRegistered()) {
    showToast(localizedToast("registerFirst"));
    setView("profile");
    return;
  }

  const formData = new FormData(form);
  const sender = playerName();
  const recipient = String(formData.get("recipient") || "").trim();
  const amount = Math.floor(Number(formData.get("amount") || 0));
  const validRecipient = registeredPlayers().some((name) => normalizePlayerName(name) === normalizePlayerName(recipient));

  if (!validRecipient || normalizePlayerName(sender) === normalizePlayerName(recipient)) {
    showToast(localizedToast("transferInvalid"));
    return;
  }
  if (!amount || amount < 1) return;

  const senderPoints = totalPoints();
  if (amount > senderPoints) {
    showToast(localizedToast("transferNotEnough"));
    return;
  }

  const recipientPoints = rankingPointsForPlayer(recipient);
  const nextSenderPoints = Math.max(0, senderPoints - amount);
  const nextRecipientPoints = Math.min(10000, recipientPoints + amount);

  ensureAdminState();
  setAdminPlayerPoints(sender, nextSenderPoints);
  setAdminPlayerPoints(recipient, nextRecipientPoints);
  addActivity(
    {
      en: `Transferred ${amount} points to ${recipient}`,
      pl: `Przekazano ${amount} punktów graczowi ${recipient}`,
      be: `Перададзена ${amount} ачкоў гульцу ${recipient}`,
      uk: `Передано ${amount} очок гравцеві ${recipient}`,
      ru: `Передано ${amount} пунктов игроку ${recipient}`,
    },
    "points transfer",
    -amount,
  );
  state.sync.status = "pending";
  state.sync.lastError = "";
  form.reset();
  saveState();
  render();

  const syncResults = await Promise.all([
    syncAdminPlayerToSite({ nickname: sender, points: nextSenderPoints, source: "ios-player-transfer" }),
    syncAdminPlayerToSite({ nickname: recipient, points: nextRecipientPoints, source: "ios-player-transfer" }),
  ]);
  render();
  showToast(localizedToast(syncResults.every(Boolean) ? "transferSuccess" : "transferQueued"));
}

function ensureAdminState() {
  state.admin = state.admin || cloneData(defaultState.admin);
  state.admin.playerOverrides = state.admin.playerOverrides || {};
  state.admin.playerProfiles = state.admin.playerProfiles || {};
  state.admin.blockedPlayers = state.admin.blockedPlayers || {};
  state.admin.customGames = state.admin.customGames || [];
  state.admin.actionLog = state.admin.actionLog || [];
}

function addAdminLog(action, detail = "") {
  ensureAdminState();
  state.admin.actionLog.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    action,
    detail,
    createdAt: new Date().toISOString(),
  });
  state.admin.actionLog = state.admin.actionLog.slice(0, 80);
}

function setAdminPlayerPoints(name, points) {
  ensureAdminState();
  const playerNameValue = String(name || "").trim();
  if (!playerNameValue) return;
  const key = normalizePlayerName(playerNameValue);
  state.admin.playerOverrides[key] = {
    name: playerNameValue,
    points: Math.max(0, Math.min(10000, Number(points || 0))),
  };
}

function applyCurrentPlayerPointDelta(delta) {
  if (!isCurrentUserRegistered() || isAdmin()) return;
  const currentPoints = Number(rankingPlayerByName(playerName())?.points || totalPoints() || 0);
  setAdminPlayerPoints(playerName(), currentPoints + Number(delta || 0));
}

function clearPlayerPointOverride(name) {
  const key = normalizePlayerName(name);
  if (state.admin?.playerOverrides?.[key]) delete state.admin.playerOverrides[key];
}

async function saveAdminPlayer(form) {
  if (!isAdmin()) return;
  const formData = new FormData(form);
  const name = String(formData.get("playerName") || "").trim();
  const points = Number(formData.get("points") || formData.get("rankPoints") || 0);
  const contact = String(formData.get("contact") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const blocked = Boolean(formData.get("blocked"));
  ensureAdminState();
  setAdminPlayerPoints(name, points);
  const key = normalizePlayerName(name);
  state.admin.blockedPlayers[key] = blocked;
  if (!blocked) delete state.admin.blockedPlayers[key];
  state.admin.playerProfiles[key] = {
    ...(state.admin.playerProfiles[key] || {}),
    nickname: name,
    contact,
    points: Math.max(0, Math.min(10000, points)),
    updatedAt: new Date().toISOString(),
  };
  if (password) {
    if (!isValidPassword(password)) {
      showToast(localizedToast("passwordError"));
      return;
    }
    state.admin.playerProfiles[key].passwordHash = await hashPassword(name, password);
    state.admin.lastCreatedProfile = { nickname: name, password, points, createdAt: new Date().toISOString() };
  }
  addAdminLog("player", `${name}: ${points} / ${blocked ? "blocked" : "active"}`);
  saveState();
  renderRanking();
  renderAdminPanel();
  renderTeamTools();
  await syncAdminPlayerToSite({
    nickname: name,
    contact,
    points,
    passwordHash: state.admin.playerProfiles[key]?.passwordHash || "",
  });
  showToast(localizedToast("adminSaved"));
}

function syncAdminPlayerSelect(select) {
  const form = select.closest("[data-admin-player-form]");
  if (!form) return;
  const player = currentPlayerRanking().find((item) => item.name === select.value);
  const points = Number(player?.points || 0);
  const key = normalizePlayerName(player?.name || "");
  const profile = state.admin?.playerProfiles?.[key] || {};
  const pointsInput = form.elements.points;
  const rankSelect = form.elements.rankPoints;
  const contactInput = form.elements.contact;
  const blockedInput = form.elements.blocked;
  const passwordInput = form.elements.password;
  const selectedPlayer = form.querySelector("[data-admin-selected-player]");
  if (pointsInput) pointsInput.value = points;
  if (rankSelect) rankSelect.innerHTML = adminRankOptions(points);
  if (contactInput) contactInput.value = profile.contact || "";
  if (blockedInput) blockedInput.checked = isPlayerBlocked(player?.name || "");
  if (passwordInput) passwordInput.value = "";
  if (selectedPlayer) {
    selectedPlayer.innerHTML = `
      <b>${escapeHtml(player?.name || "-")}</b>
      <span>${escapeHtml(rankLabelForPoints(points))}</span>
    `;
  }
}

function syncAdminRankSelect(select) {
  const form = select.closest("[data-admin-player-form]");
  const pointsInput = form?.elements.points;
  if (pointsInput) pointsInput.value = select.value;
}

async function syncAdminPlayerToSite(player) {
  const payload = {
    nickname: player.nickname,
    password: player.password,
    passwordHash: player.passwordHash,
    points: player.points,
    createdAt: new Date().toISOString(),
    source: player.source || "ios-admin-panel",
  };
  const endpoints = [appApiUrl("/api/admin-player")];
  let localSynced = false;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) continue;
      const data = await response.json().catch(() => null);
      const players = normalizeRankingFeedPlayers(data?.players || data?.ranking?.players || []);
      if (players.length) state.siteRanking = players;
      localSynced = true;
      state.sync.status = "synced";
      state.sync.lastSiteSync = new Date().toISOString();
      state.sync.lastError = "";
      saveState();
      return true;
    } catch {
      // Try the next sync endpoint.
    }
  }

  state.sync.status = "error";
  state.sync.lastError = localSynced ? "Player saved locally. Live site sync is waiting for API." : "Player saved locally. Site sync is waiting for API.";
  saveState();
  return false;
}

async function loadAdminPlayersFromSite() {
  const endpoints = [appApiUrl("/api/admin-player")];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, { cache: "no-store" });
      if (!response.ok) continue;
      const data = await response.json();
      const players = normalizeRankingFeedPlayers(data?.players || data?.ranking?.players || []);
      const profiles = data?.profiles && typeof data.profiles === "object" ? Object.values(data.profiles) : [];
      ensureAdminState();
      profiles.forEach((profile) => {
        if (!profile?.nickname || !profile?.passwordHash) return;
        state.admin.playerProfiles[normalizePlayerName(profile.nickname)] = {
          nickname: profile.nickname,
          passwordHash: profile.passwordHash,
          contact: profile.contact || "admin-created",
          points: Number(profile.points || 0),
          createdAt: profile.createdAt || new Date().toISOString(),
          synced: true,
        };
        setAdminPlayerPoints(profile.nickname, Number(profile.points || 0));
      });
      if (players.length) state.siteRanking = players;
      saveState();
      renderRanking();
      renderAdminPanel();
      return true;
    } catch {
      // Try the next admin player source.
    }
  }
  return false;
}

function normalizeRankingFeedPlayers(players) {
  return players
    .map((player, index) => ({
      id: player.id || "",
      rank: Number(player.rank || index + 1),
      name: player.nickname || player.name || "",
      points: Number(player.points || 0),
      avatar: player.avatar || "",
    }))
    .filter((player) => player.name);
}

async function addAdminPlayer(form) {
  if (!isAdmin()) return;
  const formData = new FormData(form);
  const name = String(formData.get("playerName") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const points = Number(formData.get("points") || 0);
  if (!name || !password) return;
  if (!isValidPassword(password)) {
    showToast(localizedToast("passwordError"));
    return;
  }
  ensureAdminState();
  setAdminPlayerPoints(name, points);
  const profileKey = normalizePlayerName(name);
  const createdProfile = {
    nickname: name,
    passwordHash: await hashPassword(name, password),
    contact: "admin-created",
    points: Math.max(0, Math.min(10000, Number(points || 0))),
    createdAt: new Date().toISOString(),
    createdBy: ADMIN_ACCOUNT.nickname,
  };
  state.admin.playerProfiles[profileKey] = createdProfile;
  state.admin.lastCreatedProfile = {
    nickname: name,
    password,
    points: createdProfile.points,
    createdAt: createdProfile.createdAt,
  };
  addAdminLog("player created", `${name}: ${createdProfile.points}`);
  form.reset();
  saveState();
  render();
  await syncAdminPlayerToSite({
    nickname: name,
    password,
    points: createdProfile.points,
    passwordHash: createdProfile.passwordHash,
  });
  showToast(localizedToast("playerAdded"));
}

function createAdminGame(form) {
  if (!isAdmin()) return;
  const formData = new FormData(form);
  const title = String(formData.get("title") || "").trim();
  const date = String(formData.get("date") || "").trim();
  const time = String(formData.get("time") || "18:00").trim();
  const capacity = Math.max(2, Math.min(80, Number(formData.get("capacity") || 20)));
  if (!title || !date || !time) return;
  ensureAdminState();
  const startsAt = new Date(`${date}T${time}:00`);
  state.admin.customGames.push({
    id: `admin-game-${Date.now()}`,
    startsAt: startsAt.toISOString(),
    day: String(startsAt.getDate()).padStart(2, "0"),
    month: monthLabel(startsAt),
    date: gameDateLabel(startsAt),
    time,
    title,
    description: "BAZA admin game",
    capacity,
    roster: [],
    siteGame: "",
  });
  addAdminLog("game created", `${title} / ${date} ${time}`);
  form.reset();
  saveState();
  render();
  showToast(localizedToast("adminSaved"));
}

function deleteAdminGame(gameId) {
  if (!isAdmin()) return;
  ensureAdminState();
  const game = state.admin.customGames.find((item) => item.id === gameId);
  state.admin.customGames = state.admin.customGames.filter((item) => item.id !== gameId);
  addAdminLog("game deleted", game?.title || gameId);
  saveState();
  render();
  showToast(localizedToast("adminSaved"));
}

function clearPlayerChatByAdmin() {
  if (!isAdmin()) return;
  state.chat = state.chat.filter((message) => message.system || message.author === "Club Bot");
  addAdminLog("chat cleared", "player chat");
  saveState();
  renderChat();
  renderAdminPanel();
  showToast(localizedToast("chatDeleted"));
}

function exportPlayers() {
  if (!isAdmin()) return;
  const payload = {
    exportedAt: new Date().toISOString(),
    players: currentPlayerRanking().map((player) => {
      const key = normalizePlayerName(player.name);
      const profile = state.admin?.playerProfiles?.[key] || {};
      return {
        nickname: player.name,
        points: player.points,
        rank: rankLabelForPoints(player.points),
        contact: profile.contact || "",
        blocked: Boolean(state.admin?.blockedPlayers?.[key]),
        hasPassword: Boolean(profile.passwordHash),
      };
    }),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `baza-players-${dateId(new Date())}.json`;
  link.click();
  URL.revokeObjectURL(url);
  addAdminLog("export", `${payload.players.length} players`);
  saveState();
  renderAdminPanel();
}

async function retryAdminSync() {
  if (!isAdmin()) return;
  setSyncStatus("pending");
  const players = currentPlayerRanking().filter((player) => normalizePlayerName(player.name) !== normalizePlayerName(ADMIN_ACCOUNT.nickname));
  for (const player of players) {
    const profile = state.admin?.playerProfiles?.[normalizePlayerName(player.name)] || {};
    await syncAdminPlayerToSite({
      nickname: player.name,
      points: player.points,
      passwordHash: profile.passwordHash,
    });
  }
  await loadSiteSignups();
  await loadAdminPlayersFromSite();
  addAdminLog("sync", "retry complete");
  saveState();
  render();
  showToast(syncStatusText());
}

function updateAdminNewsFromForm(form) {
  const newsId = form?.dataset.newsId;
  const item = (state.newsProposals || []).find((newsItem) => newsItem.id === newsId);
  if (!item) return null;
  const formData = new FormData(form);
  item.title = String(formData.get("title") || "").trim() || item.title;
  item.body = String(formData.get("body") || "").trim() || item.body;
  item.editedAt = new Date().toISOString();
  return item;
}

function applyRankingPayload(payload) {
  const players = normalizeRankingFeedPlayers(payload?.players || payload?.ranking?.players || []);
  if (!players.length) return false;
  state.siteRanking = players;
  return true;
}

async function requestNewsProposal(payload, method = "POST") {
  const response = await fetch(`${appApiUrl("/api/news-feed")}?mode=proposals`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "News proposal request failed");
  return data;
}

async function loadNewsProposals() {
  try {
    const response = await fetch(`${appApiUrl("/api/news-feed")}?mode=proposals`, {
      cache: "no-store",
      headers: isAdmin() ? { "X-BAZA-Admin": ADMIN_ACCOUNT.password } : {},
    });
    if (!response.ok) return false;
    const data = await response.json();
    const incoming = Array.isArray(data.proposals) ? data.proposals : [];
    if (isAdmin()) {
      state.newsProposals = incoming;
    } else {
      const localPending = (state.newsProposals || []).filter((item) => item.status === "pending");
      state.newsProposals = [...incoming, ...localPending.filter((local) => !incoming.some((item) => item.id === local.id))];
    }
    saveState();
    renderAdminPanel();
    return true;
  } catch {
    return false;
  }
}

async function submitNewsProposal(form) {
  if (!isCurrentUserRegistered() || isAdmin()) {
    showToast(localizedToast("registerFirst"));
    setView("profile");
    return false;
  }
  const formData = new FormData(form);
  const title = String(formData.get("title") || "").trim();
  const body = String(formData.get("body") || "").trim();
  if (!title || !body) return false;

  const submitButton = form.querySelector('[type="submit"]');
  if (submitButton) submitButton.disabled = true;
  try {
    const data = await requestNewsProposal({
      action: "create",
      title,
      body,
      author: playerName(),
      playerProof: state.profile.passwordHash,
      media: newsPendingMedia,
    });
    state.newsProposals = [data.proposal, ...(state.newsProposals || []).filter((item) => item.id !== data.proposal.id)];
    form.reset();
    clearNewsMedia();
    form.hidden = true;
    saveState();
    showToast(localizedToast("newsPending"));
    return true;
  } catch (error) {
    showToast(error?.message || localizedToast("saveError"));
    return false;
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
}

async function saveAdminNewsDraft(form) {
  if (!isAdmin()) return;
  const item = updateAdminNewsFromForm(form);
  if (!item) return;
  try {
    await requestNewsProposal({
      action: "update",
      id: item.id,
      title: item.title,
      body: item.body,
      adminPassword: ADMIN_ACCOUNT.password,
    });
  } catch (error) {
    showToast(error?.message || localizedToast("saveError"));
    return;
  }
  addAdminLog("news edited", form?.dataset.newsId || "");
  saveState();
  await loadNewsProposals();
  renderAdminPanel();
  showToast(localizedToast("adminSaved"));
}

async function approveAdminNews(newsId) {
  if (!isAdmin()) return;
  const form = [...document.querySelectorAll("[data-admin-news-form]")].find((node) => node.dataset.newsId === newsId);
  const item = updateAdminNewsFromForm(form) || (state.newsProposals || []).find((newsItem) => newsItem.id === newsId);
  if (!item) return;
  let data;
  try {
    data = await requestNewsProposal({
      action: "approve",
      id: item.id,
      title: item.title,
      body: item.body,
      adminPassword: ADMIN_ACCOUNT.password,
    });
  } catch (error) {
    showToast(error?.message || localizedToast("saveError"));
    return;
  }
  applyRankingPayload(data.ranking);
  addAdminLog("news approved", localize(item.title));
  saveState();
  await Promise.all([loadNewsProposals(), loadSiteNews(), loadSiteRanking()]);
  render();
  showToast(localizedToast("newsApproved"));
}

async function deleteAdminNews(newsId) {
  if (!isAdmin()) return;
  const item = (state.newsProposals || []).find((newsItem) => newsItem.id === newsId);
  try {
    await requestNewsProposal({ id: newsId, adminPassword: ADMIN_ACCOUNT.password }, "DELETE");
  } catch (error) {
    showToast(error?.message || localizedToast("saveError"));
    return;
  }
  state.newsProposals = (state.newsProposals || []).filter((newsItem) => newsItem.id !== newsId);
  addAdminLog("news deleted", localize(item?.title || newsId));
  saveState();
  render();
  showToast(localizedToast("newsDeleted"));
}

function voiceSocketUrl() {
  return appSocketUrl("/api/voice-room");
}

function voiceHttpApiUrl() {
  return appApiUrl("/api/voice-room");
}

async function syncVoiceRoomOverHttp(payload = null) {
  if (!isCurrentUserRegistered()) return;
  try {
    const options = payload
      ? {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      : { cache: "no-store" };
    const url = payload
      ? voiceHttpApiUrl()
      : `${voiceHttpApiUrl()}?player=${encodeURIComponent(playerName())}${voiceSignalCursor ? `&after=${encodeURIComponent(voiceSignalCursor)}` : ""}${
          voiceAudioCursor ? `&afterAudio=${encodeURIComponent(voiceAudioCursor)}` : ""
        }`;
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("voice http failed");
    const data = await response.json();
    voiceSocketStatus = "online";
    if (Array.isArray(data.rooms)) syncVoiceRoomsFromServer(data.rooms);
    if (Array.isArray(data.signals)) {
      data.signals.forEach((signal) => {
        if (!signal?.id || voiceHttpSeenSignals.has(signal.id)) return;
        voiceHttpSeenSignals.add(signal.id);
        voiceSignalCursor = signal.createdAt || voiceSignalCursor;
        handleWebRtcSignal({ type: "signal", ...signal });
      });
    }
    if (Array.isArray(data.audioChunks)) data.audioChunks.forEach(handleVoiceRelayChunk);
    renderVoiceRoom();
    renderHomeVoiceEntry();
    renderVoiceInviteAlert();
    return data;
  } catch (error) {
    lastVoiceError = error?.message || "voice http offline";
    if (!voiceSocket || voiceSocket.readyState !== WebSocket.OPEN) voiceSocketStatus = "offline";
    renderVoiceRoom();
    renderHomeVoiceEntry();
    renderVoiceInviteAlert();
    return null;
  }
}

function stopVoiceHttpSync() {
  clearInterval(voiceHttpTimer);
  voiceHttpTimer = null;
  voiceSocketStatus = "offline";
}

function startVoiceHttpSync() {
  if (voiceHttpTimer || !isCurrentUserRegistered()) return;
  syncVoiceRoomOverHttp({ type: "hello", player: playerName() });
  syncVoiceRoomOverHttp();
  voiceHttpTimer = setInterval(() => syncVoiceRoomOverHttp(), VOICE_HTTP_POLL_MS);
}

function ensureVoiceInviteSync() {
  if (isCurrentUserRegistered()) {
    startVoiceHttpSync();
  } else if (voiceHttpTimer) {
    stopVoiceHttpSync();
  }
}

function syncVoiceInvitesOnForeground() {
  if (document.visibilityState === "hidden" || !isCurrentUserRegistered()) return;
  const now = Date.now();
  if (now - lastVoiceForegroundSyncAt < 750) return;
  lastVoiceForegroundSyncAt = now;
  syncVoiceRoomOverHttp();
}

function sendVoiceHttp(payload) {
  if (!payload || !isCurrentUserRegistered()) return;
  syncVoiceRoomOverHttp(payload);
}

function connectVoiceSocket() {
  if (!isCurrentUserRegistered()) return;
  startVoiceHttpSync();
  if (appApiOrigin().includes("lasertagbaza.pl") || appApiOrigin().includes("vercel.app")) return;
  if (!("WebSocket" in window)) return;
  if (voiceSocket && [WebSocket.OPEN, WebSocket.CONNECTING].includes(voiceSocket.readyState)) return;
  clearTimeout(voiceReconnectTimer);
  voiceSocketStatus = "connecting";
  renderVoiceRoom();
  renderHomeVoiceEntry();

  try {
    voiceSocket = new WebSocket(voiceSocketUrl());
  } catch {
    voiceSocketStatus = "offline";
    renderVoiceRoom();
    renderHomeVoiceEntry();
    return;
  }

  voiceSocket.addEventListener("open", () => {
    voiceSocketStatus = "online";
    sendVoiceSocket({ type: "hello", player: playerName() });
    const room = currentVoiceRoom();
    if (room) sendVoiceSocket({ type: "sync-room", room: prepareVoiceRoomForSync(room) });
    if (pendingVoiceRoomSync) {
      sendVoiceSocket(pendingVoiceRoomSync);
      pendingVoiceRoomSync = null;
    }
    renderVoiceRoom();
    renderHomeVoiceEntry();
  });

  voiceSocket.addEventListener("message", (event) => {
    try {
      handleVoiceSocketMessage(JSON.parse(event.data));
    } catch {
      // Ignore malformed signaling packets.
    }
  });

  voiceSocket.addEventListener("close", () => {
    voiceSocketStatus = "offline";
    voiceSocket = null;
    renderVoiceRoom();
    renderHomeVoiceEntry();
    if (getCurrentView() === "voice" && isCurrentUserRegistered()) {
      voiceReconnectTimer = setTimeout(connectVoiceSocket, 1600);
    }
  });

  voiceSocket.addEventListener("error", () => {
    voiceSocketStatus = "offline";
    renderVoiceRoom();
    renderHomeVoiceEntry();
  });
}

function sendVoiceSocket(payload) {
  if (!voiceSocket || voiceSocket.readyState !== WebSocket.OPEN) {
    sendVoiceHttp(payload);
    return false;
  }
  voiceSocket.send(JSON.stringify(payload));
  return true;
}

function handleVoiceSocketMessage(message) {
  if (!message || typeof message !== "object") return;
  if (message.type === "hello") {
    voiceClientId = message.clientId || voiceClientId;
    return;
  }
  if (message.type === "rooms") {
    syncVoiceRoomsFromServer(message.rooms);
    return;
  }
  if (message.type === "signal") {
    handleWebRtcSignal(message);
  }
}

function prepareVoiceRoomForSync(room) {
  return {
    id: room.id,
    name: room.name,
    owner: room.owner,
    createdAt: room.createdAt,
    participants: (room.participants || []).slice(0, 6).map((participant) => ({
      name: participant.name,
      micEnabled: Boolean(participant.micEnabled),
      joinedAt: participant.joinedAt || new Date().toISOString(),
    })),
    invitations: (room.invitations || [])
      .filter((invite) => invite.status === "pending")
      .slice(0, 5)
      .map((invite) => ({
        name: invite.name,
        status: "pending",
        createdAt: invite.createdAt || new Date().toISOString(),
      })),
  };
}

function syncVoiceRoomsFromServer(rooms) {
  if (!Array.isArray(rooms)) return;
  const currentName = normalizePlayerName(playerName());
  const previousRooms = state.voiceRooms || [];
  const previousActiveRoom = previousRooms.find(
    (room) =>
      room.id === state.activeVoiceRoomId &&
      room.participants?.some((participant) => normalizePlayerName(participant.name) === currentName),
  );
  let nextRooms = rooms;
  let activeRoom = rooms.find(
    (room) =>
      room.id === state.activeVoiceRoomId &&
      room.participants?.some((participant) => normalizePlayerName(participant.name) === currentName),
  );
  let roomForPlayer =
    activeRoom || rooms.find((room) => room.participants?.some((participant) => normalizePlayerName(participant.name) === currentName));

  if (!roomForPlayer && previousActiveRoom) {
    if (!voiceRoomMissingSince) voiceRoomMissingSince = Date.now();
    if (Date.now() - voiceRoomMissingSince < VOICE_ROOM_MISSING_GRACE_MS) {
      nextRooms = [previousActiveRoom, ...rooms.filter((room) => room.id !== previousActiveRoom.id)];
      activeRoom = previousActiveRoom;
      roomForPlayer = previousActiveRoom;
    }
  } else {
    voiceRoomMissingSince = 0;
  }

  state.voiceRooms = nextRooms;
  if (roomForPlayer) state.activeVoiceRoomId = roomForPlayer.id;
  if (!roomForPlayer && state.activeVoiceRoomId) {
    voiceRoomMissingSince = 0;
    state.activeVoiceRoomId = "";
    voiceSessionActivated = false;
    updateVoiceDiagnostics();
    closeVoicePeers();
    stopVoiceStream();
    leaveNativeVoiceRoom();
    leaveBrowserVoiceRoom();
  }
  saveState();
  notifyNewVoiceInvites(pendingVoiceInvites());
  renderVoiceRoom();
  renderHomeVoiceEntry();
  renderVoiceInviteAlert();
  if (voiceSessionActivated) connectVoiceRoomMedia();
}

function syncCurrentVoiceRoom() {
  const room = currentVoiceRoom();
  if (!room) return;
  syncVoiceRoom(room);
}

function syncVoiceRoom(room) {
  if (!room) return;
  connectVoiceSocket();
  const payload = { type: "sync-room", room: prepareVoiceRoomForSync(room) };
  if (!sendVoiceSocket(payload)) {
    pendingVoiceRoomSync = payload;
    setTimeout(() => {
      if (pendingVoiceRoomSync && sendVoiceSocket(pendingVoiceRoomSync)) pendingVoiceRoomSync = null;
    }, 400);
  }
}

function voicePeerKey(name) {
  return normalizePlayerName(name);
}

function shouldInitiateVoicePeer(remoteName) {
  return normalizePlayerName(playerName()).localeCompare(normalizePlayerName(remoteName)) < 0;
}

function unlockVoiceAudio() {
  voiceAudioUnlocked = true;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      voiceAudioContext = voiceAudioContext || new AudioContextClass();
      if (voiceAudioContext.state === "suspended") voiceAudioContext.resume();
    }
  } catch {
    // iOS may still allow media playback through the audio elements below.
  }
  browserVoiceRoom?.startAudio?.().catch(() => {});
  resumeRemoteVoiceAudio();
}

function resumeRemoteVoiceAudio() {
  remoteAudioNodes.forEach((audio) => {
    audio.muted = false;
    audio.volume = 1;
    audio.play().catch((error) => {
      lastVoiceError = error?.message || "audio playback blocked";
    });
  });
  browserVoiceAudioNodes.forEach(({ element }) => {
    element.muted = false;
    element.volume = 1;
    element.play().catch((error) => {
      lastVoiceError = error?.message || "audio playback blocked";
    });
  });
  playNextVoiceRelayChunk();
}

function supportedVoiceRelayMimeType() {
  if (!("MediaRecorder" in window)) return "";
  const candidates = ["audio/webm;codecs=opus", "audio/mp4", "audio/aac", "audio/webm"];
  return candidates.find((type) => MediaRecorder.isTypeSupported?.(type)) || "";
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || "").split(",")[1] || "");
    reader.onerror = () => reject(reader.error || new Error("audio encode failed"));
    reader.readAsDataURL(blob);
  });
}

function startVoiceRelayRecorder() {
  const room = currentVoiceRoom();
  if (!room || !voiceStream || !("MediaRecorder" in window)) return;
  if (voiceRelayRecorder && voiceRelayRecorder.state !== "inactive") return;
  voiceRelayActive = true;
  sendNativeVoiceAudioActive(true);
  try {
    voiceRelayMimeType = supportedVoiceRelayMimeType();
    const options = voiceRelayMimeType ? { mimeType: voiceRelayMimeType, audioBitsPerSecond: 28000 } : { audioBitsPerSecond: 28000 };
    voiceRelayRecorder = new MediaRecorder(voiceStream, options);
    voiceRelayRecorder.addEventListener("dataavailable", async (event) => {
      if (!event.data || event.data.size < 120 || event.data.size > 90_000) return;
      const activeRoom = currentVoiceRoom();
      if (!activeRoom || !voiceStream) return;
      try {
        const data = await blobToBase64(event.data);
        if (!data) return;
        sendVoiceHttp({
          type: "audio-chunk",
          roomId: activeRoom.id,
          source: playerName(),
          mimeType: event.data.type || voiceRelayMimeType || "audio/mp4",
          data,
        });
        voiceRelayLastChunkAt = new Date().toISOString();
      } catch (error) {
        lastVoiceError = error?.message || "audio relay send failed";
      }
    });
    voiceRelayRecorder.addEventListener("error", (event) => {
      lastVoiceError = event.error?.message || "audio relay recorder failed";
    });
    voiceRelayRecorder.addEventListener(
      "stop",
      () => {
        voiceRelayRecorder = null;
        if (voiceRelayActive && voiceStream && currentVoiceRoom()) {
          setTimeout(startVoiceRelayRecorder, VOICE_RELAY_RESTART_MS);
        }
      },
      { once: true },
    );
    voiceRelayRecorder.start();
    setTimeout(() => {
      if (voiceRelayRecorder?.state === "recording") voiceRelayRecorder.stop();
    }, VOICE_RELAY_CHUNK_MS);
  } catch (error) {
    voiceRelayRecorder = null;
    lastVoiceError = error?.message || "audio relay unavailable";
  }
}

function stopVoiceRelayRecorder() {
  voiceRelayActive = false;
  sendNativeVoiceAudioActive(false);
  if (!voiceRelayRecorder) return;
  try {
    if (voiceRelayRecorder.state !== "inactive") voiceRelayRecorder.stop();
  } catch {
    // Recorder can already be stopped by WebKit.
  }
  voiceRelayRecorder = null;
}

function handleVoiceRelayChunk(chunk) {
  if (!chunk?.id || voiceRelaySeenChunks.has(chunk.id)) return;
  voiceRelaySeenChunks.add(chunk.id);
  voiceAudioCursor = chunk.createdAt || voiceAudioCursor;
  if (!chunk.data || normalizePlayerName(chunk.source) === normalizePlayerName(playerName())) return;
  if (Date.now() - new Date(chunk.createdAt || 0).getTime() > VOICE_RELAY_MAX_AGE_MS) return;
  voiceRelayQueue.push(chunk);
  voiceRelayQueue.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
  if (voiceRelayQueue.length > VOICE_RELAY_MAX_QUEUE) {
    voiceRelayQueue.splice(0, voiceRelayQueue.length - VOICE_RELAY_MAX_QUEUE);
  }
  playNextVoiceRelayChunk();
}

function playNextVoiceRelayChunk() {
  if (voiceRelayPlaying || !voiceAudioUnlocked || !voiceRelayQueue.length) return;
  const chunk = voiceRelayQueue.shift();
  const mimeType = chunk.mimeType || "audio/mp4";
  const audio = document.createElement("audio");
  audio.autoplay = true;
  audio.playsInline = true;
  audio.muted = false;
  audio.volume = 1;
  audio.dataset.voiceRelay = voicePeerKey(chunk.source || "relay");
  audio.src = `data:${mimeType};base64,${chunk.data}`;
  voiceRelayPlaying = true;
  if (voiceAudioStage) voiceAudioStage.appendChild(audio);
  const finish = () => {
    voiceRelayPlaying = false;
    audio.remove();
    playNextVoiceRelayChunk();
  };
  audio.addEventListener("ended", finish, { once: true });
  audio.addEventListener("error", finish, { once: true });
  audio.play().catch((error) => {
    lastVoiceError = error?.message || "audio relay playback blocked";
    finish();
  });
}

async function flushVoiceCandidates(peer) {
  if (!peer?.pc?.remoteDescription || !peer.pendingCandidates?.length) return;
  const candidates = peer.pendingCandidates.splice(0);
  for (const candidate of candidates) {
    try {
      await peer.pc.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      lastVoiceError = error?.message || "ice candidate skipped";
    }
  }
}

async function negotiateVoicePeer(peer) {
  if (!peer || peer.negotiating || !shouldInitiateVoicePeer(peer.name) || voiceSocketStatus !== "online" || peer.pc.signalingState !== "stable") return;
  peer.negotiating = true;
  try {
    const offer = await peer.pc.createOffer({ offerToReceiveAudio: true });
    await peer.pc.setLocalDescription(offer);
    sendVoiceSignal(peer.name, { description: peer.pc.localDescription });
  } catch (error) {
    lastVoiceError = error?.message || "offer failed";
  } finally {
    peer.negotiating = false;
  }
}

function renegotiateVoicePeers() {
  voicePeers.forEach((peer) => negotiateVoicePeer(peer));
}

function scheduleVoicePeerReconnect(remoteName) {
  const peer = voicePeers.get(voicePeerKey(remoteName));
  if (!peer || peer.reconnectTimer) return;
  peer.reconnectTimer = setTimeout(() => {
    closeVoicePeer(remoteName);
    connectVoiceRoomMedia();
  }, 900);
}

function createVoicePeer(remoteName) {
  const key = voicePeerKey(remoteName);
  if (voicePeers.has(key)) return voicePeers.get(key);
  const pc = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    bundlePolicy: "max-bundle",
    rtcpMuxPolicy: "require",
  });
  const peer = { name: remoteName, pc, negotiating: false, pendingCandidates: [], reconnectTimer: null };
  voicePeers.set(key, peer);

  pc.addEventListener("icecandidate", (event) => {
    if (event.candidate) {
      sendVoiceSignal(remoteName, { candidate: event.candidate });
    }
  });

  pc.addEventListener("track", (event) => {
    const stream = event.streams?.[0] || new MediaStream([event.track]);
    if (stream) attachRemoteVoice(remoteName, stream);
  });

  pc.addEventListener("negotiationneeded", async () => {
    negotiateVoicePeer(peer);
  });

  pc.addEventListener("connectionstatechange", () => {
    if (pc.connectionState === "connected") lastVoiceError = "";
    if (["failed", "closed", "disconnected"].includes(pc.connectionState)) {
      if (pc.connectionState !== "closed") scheduleVoicePeerReconnect(remoteName);
    }
  });

  pc.addEventListener("iceconnectionstatechange", () => {
    if (pc.iceConnectionState === "connected" || pc.iceConnectionState === "completed") {
      lastVoiceError = "";
      resumeRemoteVoiceAudio();
    }
    if (["failed", "disconnected"].includes(pc.iceConnectionState)) scheduleVoicePeerReconnect(remoteName);
  });

  addLocalVoiceTracks(pc);
  return peer;
}

function addLocalVoiceTracks(pc) {
  if (!voiceStream) return;
  const existingTrackIds = new Set(pc.getSenders().map((sender) => sender.track?.id).filter(Boolean));
  voiceStream.getAudioTracks().forEach((track) => {
    track.enabled = true;
    if (!existingTrackIds.has(track.id)) pc.addTrack(track, voiceStream);
  });
}

async function connectVoiceRoomMedia(options = {}) {
  const room = currentVoiceRoom();
  if (!room || !voiceSessionActivated) return;
  if (voiceDisconnectPromise) await voiceDisconnectPromise;
  if (!voiceSessionActivated || currentVoiceRoom()?.id !== room.id) return;
  if (!options.force && Date.now() < voiceReconnectNotBefore) return;
  if (hasNativeVoiceRtc()) {
    ensureNativeVoiceRoom(room).catch((error) => {
      lastVoiceError = voiceErrorMessage(error);
      nativeVoiceRtcStatus = "offline";
      registerVoiceConnectFailure();
      renderVoiceRoom();
      renderHomeVoiceEntry();
    });
    return;
  }
  if (hasBrowserVoiceRtc()) {
    ensureBrowserVoiceRoom(room).catch((error) => {
      lastVoiceError = voiceErrorMessage(error);
      browserVoiceRtcStatus = "offline";
      registerVoiceConnectFailure();
      renderVoiceRoom();
      renderHomeVoiceEntry();
    });
    return;
  }
  lastVoiceError = "LiveKit is unavailable. Update the app and reopen it.";
  renderVoiceRoom();
  renderHomeVoiceEntry();
}

function sendVoiceSignal(target, signal) {
  const room = currentVoiceRoom();
  if (!room) return;
  sendVoiceSocket({
    type: "signal",
    roomId: room.id,
    source: playerName(),
    target,
    signal,
  });
}

async function handleWebRtcSignal(message) {
  const source = message.source;
  const signal = message.signal || {};
  if (!source || normalizePlayerName(source) === normalizePlayerName(playerName())) return;
  const room = currentVoiceRoom();
  if (!room || message.roomId !== room.id) return;
  const peer = createVoicePeer(source);
  const pc = peer.pc;
  try {
    if (signal.description) {
      const description = new RTCSessionDescription(signal.description);
      if (description.type === "offer" && pc.signalingState !== "stable") {
        await pc.setLocalDescription({ type: "rollback" });
      }
      if (description.type === "answer" && pc.signalingState !== "have-local-offer") return;
      await pc.setRemoteDescription(description);
      await flushVoiceCandidates(peer);
      addLocalVoiceTracks(pc);
      if (description.type === "offer") {
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        sendVoiceSignal(source, { description: pc.localDescription });
      }
    }
  } catch (error) {
    lastVoiceError = error?.message || "signal failed";
  }
  if (signal.candidate) {
    try {
      if (pc.remoteDescription) {
        await pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
      } else {
        peer.pendingCandidates.push(signal.candidate);
      }
    } catch (error) {
      // ICE can race ahead of descriptions; a later candidate/offer can still complete the call.
      lastVoiceError = error?.message || "ice candidate skipped";
    }
  }
}

function attachRemoteVoice(remoteName, stream) {
  if (!voiceAudioStage) return;
  const key = voicePeerKey(remoteName);
  let audio = remoteAudioNodes.get(key);
  if (!audio) {
    audio = document.createElement("audio");
    audio.autoplay = true;
    audio.playsInline = true;
    audio.muted = false;
    audio.volume = 1;
    audio.dataset.voiceRemote = key;
    voiceAudioStage.appendChild(audio);
    remoteAudioNodes.set(key, audio);
  }
  audio.srcObject = stream;
  if (voiceAudioUnlocked) resumeRemoteVoiceAudio();
  audio.play().catch((error) => {
    lastVoiceError = error?.message || "audio playback blocked";
  });
}

function closeVoicePeer(name) {
  const key = voicePeerKey(name);
  const peer = voicePeers.get(key);
  if (peer) {
    clearTimeout(peer.reconnectTimer);
    peer.pc.close();
    voicePeers.delete(key);
  }
  const audio = remoteAudioNodes.get(key);
  if (audio) {
    audio.remove();
    remoteAudioNodes.delete(key);
  }
}

function closeVoicePeers() {
  [...voicePeers.keys()].forEach((key) => closeVoicePeer(key));
}

async function createVoiceRoom(form) {
  if (!isCurrentUserRegistered()) {
    showToast(localizedToast("registerFirst"));
    return;
  }
  if (!canCreateVoiceRoom()) {
    showToast(t("voiceRoomLocked"));
    renderVoiceRoom();
    return;
  }
  await leaveOtherVoiceRooms();
  const formData = new FormData(form);
  const name = String(formData.get("roomName") || "").trim() || `${playerName()} voice`;
  const room = {
    id: crypto.randomUUID ? crypto.randomUUID() : `voice-${Date.now()}`,
    name,
    owner: playerName(),
    participants: [{ name: playerName(), micEnabled: false, online: true, joinedAt: new Date().toISOString() }],
    invitations: [],
    createdAt: new Date().toISOString(),
  };
  state.voiceRooms = [
    room,
    ...(state.voiceRooms || []).filter((item) => normalizePlayerName(item.owner) !== normalizePlayerName(playerName())),
  ];
  state.activeVoiceRoomId = room.id;
  activateVoiceSession();
  saveState();
  renderVoiceRoom({ force: true });
  const synced = await syncVoiceRoomOverHttp({ type: "sync-room", room: prepareVoiceRoomForSync(room) });
  if (!synced) {
    lastVoiceError = "Could not create the room on the server";
    renderVoiceRoom({ force: true });
    return;
  }
  connectVoiceRoomMedia({ force: true });
}

async function addVoiceParticipantByName(memberName) {
  const room = currentVoiceRoom();
  if (!room || normalizePlayerName(room.owner) !== normalizePlayerName(playerName())) return;
  const member = String(memberName || "").trim();
  room.invitations = Array.isArray(room.invitations) ? room.invitations : [];
  const pendingInvites = room.invitations.filter((invite) => invite.status === "pending");
  if (!member || room.participants.length + pendingInvites.length >= 6) {
    showToast(t("roomLimit"));
    return;
  }
  const alreadyParticipant = room.participants.some((participant) => normalizePlayerName(participant.name) === normalizePlayerName(member));
  const alreadyInvited = pendingInvites.some((invite) => normalizePlayerName(invite.name) === normalizePlayerName(member));
  if (!alreadyParticipant && !alreadyInvited) {
    room.invitations.push({ name: member, status: "pending", createdAt: new Date().toISOString() });
  }
  saveState();
  renderVoiceRoom({ force: true });
  await syncVoiceRoomOverHttp({ type: "sync-room", room: prepareVoiceRoomForSync(room) });
}

function addVoiceParticipant(form) {
  addVoiceParticipantByName(new FormData(form).get("member"));
}

async function removeVoiceParticipant(name) {
  const room = currentVoiceRoom();
  if (!room || normalizePlayerName(room.owner) !== normalizePlayerName(playerName())) return;
  room.participants = room.participants.filter((participant) => normalizePlayerName(participant.name) !== normalizePlayerName(name));
  room.invitations = (room.invitations || []).filter((invite) => normalizePlayerName(invite.name) !== normalizePlayerName(name));
  saveState();
  renderVoiceRoom({ force: true });
  await syncVoiceRoomOverHttp({ type: "sync-room", room: prepareVoiceRoomForSync(room) });
}

async function acceptVoiceInvite(roomId) {
  unlockVoiceAudio();
  if (!isCurrentUserRegistered()) return;
  let room = (state.voiceRooms || []).find((item) => item.id === roomId);
  if (!room) return;
  const currentName = normalizePlayerName(playerName());
  let invite = room.invitations?.find((item) => item.status === "pending" && normalizePlayerName(item.name) === currentName);
  if (!invite || room.participants.length >= 6) return;
  await leaveOtherVoiceRooms(roomId);
  room = (state.voiceRooms || []).find((item) => item.id === roomId);
  if (!room) return;
  invite = room.invitations?.find((item) => item.status === "pending" && normalizePlayerName(item.name) === currentName);
  if (!invite || room.participants.length >= 6) return;
  room.invitations = (room.invitations || []).filter((item) => normalizePlayerName(item.name) !== currentName);
  if (!room.participants.some((participant) => normalizePlayerName(participant.name) === currentName)) {
    room.participants.push({ name: playerName(), micEnabled: false, online: true, joinedAt: new Date().toISOString() });
  }
  state.activeVoiceRoomId = room.id;
  saveState();
  setView("voice");
  renderVoiceRoom({ force: true });
  const synced = await syncVoiceRoomOverHttp({ type: "sync-room", room: prepareVoiceRoomForSync(room) });
  if (!synced) {
    lastVoiceError = "Could not join the room";
    renderVoiceRoom({ force: true });
    return;
  }
  connectVoiceRoomMedia({ force: true });
  resumeRemoteVoiceAudio();
}

async function declineVoiceInvite(roomId) {
  if (!isCurrentUserRegistered()) return;
  const room = (state.voiceRooms || []).find((item) => item.id === roomId);
  if (!room) return;
  const currentName = normalizePlayerName(playerName());
  room.invitations = (room.invitations || []).filter((item) => normalizePlayerName(item.name) !== currentName);
  saveState();
  renderVoiceRoom({ force: true });
  await syncVoiceRoomOverHttp({ type: "decline-invite", roomId: room.id, player: playerName() });
}

async function leaveVoiceRoom() {
  const room = currentVoiceRoom();
  if (!room) return;
  stopVoiceStream();
  const currentName = normalizePlayerName(playerName());
  if (normalizePlayerName(room.owner) === currentName) {
    state.voiceRooms = (state.voiceRooms || []).filter((item) => item.id !== room.id);
    await syncVoiceRoomOverHttp({ type: "delete-room", roomId: room.id, player: playerName() });
  } else {
    room.participants = room.participants.filter((participant) => normalizePlayerName(participant.name) !== currentName);
    await syncVoiceRoomOverHttp({ type: "leave-room", roomId: room.id, player: playerName() });
  }
  state.activeVoiceRoomId = "";
  voiceSessionActivated = false;
  updateVoiceDiagnostics();
  await leaveNativeVoiceRoom();
  await leaveBrowserVoiceRoom();
  sendNativeVoiceAudioActive(false);
  saveState();
  renderVoiceRoom({ force: true });
}

async function toggleVoiceMic() {
  unlockVoiceAudio();
  activateVoiceSession();
  const room = currentVoiceRoom();
  if (!room) return;
  const participant = room.participants.find((item) => normalizePlayerName(item.name) === normalizePlayerName(playerName()));
  if (!participant) return;
  if (hasNativeVoiceRtc()) {
    try {
      sendNativeVoiceAudioActive(true);
      const nativeReady = await requestNativeVoiceAudioReady();
      if (!nativeReady) throw new Error("Microphone permission denied in iPhone settings");
      await ensureNativeVoiceRoom(room);
      const nextEnabled = !voiceTransportMicEnabled();
      participant.micEnabled = await setNativeVoiceMicrophone(nextEnabled);
      saveState();
      renderVoiceRoom();
      sendVoiceSocket({ type: "mic", roomId: room.id, player: playerName(), micEnabled: participant.micEnabled });
    } catch (error) {
      lastVoiceError = voiceErrorMessage(error);
      participant.micEnabled = false;
      renderVoiceRoom();
      renderHomeVoiceEntry();
      showToast(`${t("micError")} ${lastVoiceError}`.trim().slice(0, 180));
    }
    return;
  }
  if (hasBrowserVoiceRtc()) {
    try {
      sendNativeVoiceAudioActive(true);
      await ensureBrowserVoiceRoom(room);
      await browserVoiceRoom?.startAudio?.().catch(() => {});
      participant.micEnabled = await setBrowserVoiceMicrophone(!voiceTransportMicEnabled());
      saveState();
      renderVoiceRoom();
      sendVoiceSocket({ type: "mic", roomId: room.id, player: playerName(), micEnabled: participant.micEnabled });
    } catch (error) {
      lastVoiceError = voiceErrorMessage(error);
      participant.micEnabled = false;
      renderVoiceRoom();
      renderHomeVoiceEntry();
      showToast(`${t("micError")} ${lastVoiceError}`.trim().slice(0, 180));
    }
    return;
  }
  lastVoiceError = "LiveKit is unavailable. Update the app and reopen it.";
  renderVoiceRoom();
  showToast(lastVoiceError);
}

async function requestVoiceStream() {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("getUserMedia is not available in this WebView");
  }
  const constraintsList = [
    {
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        channelCount: 1,
      },
    },
    { audio: true },
  ];
  let lastError = null;
  for (const constraints of constraintsList) {
    try {
      return await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("microphone stream unavailable");
}

function voiceErrorMessage(error) {
  const name = error?.name ? `${error.name}: ` : "";
  return `${name}${error?.message || "microphone stream unavailable"}`.trim();
}

function stopVoiceStream() {
  stopVoiceRelayRecorder();
  if (voiceStream) {
    voiceStream.getTracks().forEach((track) => track.stop());
    voiceStream = null;
  }
  const room = currentVoiceRoom();
  const participant = room?.participants?.find((item) => normalizePlayerName(item.name) === normalizePlayerName(playerName()));
  if (participant) participant.micEnabled = false;
}

function addLocalVoiceTracksToAllPeers() {
  voicePeers.forEach((peer) => addLocalVoiceTracks(peer.pc));
}

function voiceDebugSnapshot() {
  return {
    transport: hasNativeVoiceRtc() ? "livekit-native" : hasBrowserVoiceRtc() ? "livekit-browser" : "unavailable",
    nativeRtcStatus: nativeVoiceRtcStatus,
    nativeRtcRoomId: nativeVoiceRtcRoomId,
    nativeRtcMicEnabled: nativeVoiceRtcMicEnabled,
    nativeRemoteAudioTracks: nativeVoiceRemoteAudioTracks,
    nativeRemoteParticipants: nativeVoiceRemoteParticipants,
    browserRtcStatus: browserVoiceRtcStatus,
    browserRtcRoomId: browserVoiceRtcRoomId,
    browserRtcMicEnabled: browserVoiceRtcMicEnabled,
    browserRemoteAudio: browserVoiceAudioNodes.size,
    actionPending: voiceActionPending,
    socket: voiceSocketStatus,
    clientId: voiceClientId,
    lastError: lastVoiceError,
    audioUnlocked: voiceAudioUnlocked,
    audioContextState: voiceAudioContext?.state || "",
    relayActive: voiceRelayActive,
    relayRecorder: voiceRelayRecorder?.state || "",
    relayMimeType: voiceRelayMimeType,
    relayQueue: voiceRelayQueue.length,
    relayLastChunkAt: voiceRelayLastChunkAt,
    peers: voicePeers.size,
    peerStates: [...voicePeers.values()].map((peer) => ({
      name: peer.name,
      connectionState: peer.pc.connectionState,
      iceConnectionState: peer.pc.iceConnectionState,
      signalingState: peer.pc.signalingState,
      senders: peer.pc.getSenders().filter((sender) => sender.track).length,
      receivers: peer.pc.getReceivers().filter((receiver) => receiver.track).length,
    })),
    remoteAudio: remoteAudioNodes.size,
    remoteAudioStates: [...remoteAudioNodes.entries()].map(([name, audio]) => ({
      name,
      paused: audio.paused,
      muted: audio.muted,
      readyState: audio.readyState,
      volume: audio.volume,
    })),
    hasLocalAudio: Boolean(voiceStream),
    room: currentVoiceRoom()
      ? {
          id: currentVoiceRoom().id,
          participants: currentVoiceRoom().participants?.map((participant) => ({
            name: participant.name,
            online: Boolean(participant.online),
            micEnabled: Boolean(participant.micEnabled),
          })),
        }
      : null,
  };
}

window.__bazaVoiceDebug = voiceDebugSnapshot;

function hardResetApp() {
  clearTimeout(welcomeTimer);
  stopVoiceHttpSync();
  localStorage.removeItem(STORAGE_KEY);
  state = cloneData(defaultState);
  if (profileForm) profileForm.hidden = false;
  if (welcomeMessage) welcomeMessage.hidden = true;
  saveState();
  render();
  setView("home");
  appScroll?.scrollTo({ top: 0, behavior: "auto" });
  showToast(localizedToast("hardReset"));
}

newsProposalToggle?.addEventListener("click", () => {
  if (!newsForm) return;
  newsForm.hidden = !newsForm.hidden;
  newsProposalToggle.setAttribute("aria-expanded", String(!newsForm.hidden));
  if (!newsForm.hidden) newsForm.elements.title?.focus();
});

newsMediaInput?.addEventListener("change", async () => {
  const file = newsMediaInput.files?.[0];
  if (!file) return;
  try {
    newsPendingMedia = await prepareNewsMedia(file);
    renderNewsMediaPreview();
  } catch (error) {
    clearNewsMedia();
    const message = error?.message === "duration"
      ? t("videoTooLong")
      : error?.message === "unsupported"
        ? t("unsupportedMedia")
        : t("mediaTooLarge");
    showToast(message);
  }
});

newsForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  await submitNewsProposal(newsForm);
});

languageSelect?.addEventListener("change", () => {
  state.settings.language = languageSelect.value;
  saveState();
  render();
});

profileForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(profileForm);
  if (!(await savePlayerProfile(formData))) {
    return;
  }
  render();
  showWelcomeMessage();
  showToast(localizedToast("profile"));
});

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  if (!(await loginPlayer(formData))) {
    showToast(localizedToast("loginError"));
    return;
  }
  render();
  showToast(localizedToast("login"));
});

passwordChangeForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(passwordChangeForm);
  if (!(await changePlayerPassword(formData))) {
    showToast(localizedToast("loginError"));
    return;
  }
  render();
  showToast(localizedToast("passwordChanged"));
});

avatarPicker?.addEventListener("click", (event) => {
  if (!isNativeAppRuntime()) return;
  event.preventDefault();
  requestNativeAvatarPicker();
});

avatarInput?.addEventListener("change", async () => {
  const file = avatarInput.files?.[0];
  if (!file) return;
  try {
    await updateAvatar(await avatarFileToDataUrl(file));
  } catch {
    showToast(localizedToast("saveError"));
  } finally {
    avatarInput.value = "";
  }
});

chatPhotoInput?.addEventListener("change", async () => {
  const file = chatPhotoInput.files?.[0];
  if (!file) return;
  if (!canUsePlayerChat()) {
    clearChatPhoto();
    showToast(isCurrentUserRegistered() ? t("chatLocked") : t("registerToChat"));
    return;
  }
  try {
    chatPendingPhoto = await compressChatPhoto(file);
    renderChatPhotoPreview();
  } catch {
    clearChatPhoto();
    showToast(chatPhotoErrorText());
  }
});

chatForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = String(new FormData(chatForm).get("message") || "").trim();
  if (!message && !chatPendingPhoto) return;
  if (!isCurrentUserRegistered()) {
    showToast(localizedToast("registerFirst"));
    setView("profile");
    return;
  }
  if (!canUsePlayerChat()) {
    showToast(t("chatLocked"));
    renderChat();
    return;
  }
  const chatMessage = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    author: playerName(),
    body: message,
    image: chatPendingPhoto,
    registered: true,
    createdAt: new Date().toISOString(),
  };
  state.chat.push(chatMessage);
  chatForm.reset();
  clearChatPhoto();
  saveState();
  renderChat();
  syncPlayerChatMessage(chatMessage);
  showToast(localizedToast("chat"));
});

document.addEventListener("submit", async (event) => {
  const pointsTransferForm = event.target.closest("[data-points-transfer-form]");
  if (pointsTransferForm) {
    event.preventDefault();
    await transferPlayerPoints(pointsTransferForm);
    return;
  }

  const adminPlayerForm = event.target.closest("[data-admin-player-form]");
  if (adminPlayerForm) {
    event.preventDefault();
    await saveAdminPlayer(adminPlayerForm);
    return;
  }

  const adminAddPlayerForm = event.target.closest("[data-admin-add-player-form]");
  if (adminAddPlayerForm) {
    event.preventDefault();
    await addAdminPlayer(adminAddPlayerForm);
    return;
  }

  const adminNewsForm = event.target.closest("[data-admin-news-form]");
  if (adminNewsForm) {
    event.preventDefault();
    await saveAdminNewsDraft(adminNewsForm);
    return;
  }

  const adminGameForm = event.target.closest("[data-admin-game-form]");
  if (adminGameForm) {
    event.preventDefault();
    createAdminGame(adminGameForm);
    return;
  }

  const voiceRoomForm = event.target.closest("[data-voice-room-form]");
  if (voiceRoomForm) {
    event.preventDefault();
    await runVoiceAction(() => createVoiceRoom(voiceRoomForm));
    return;
  }

  const voiceInviteForm = event.target.closest("[data-voice-invite-form]");
  if (voiceInviteForm) {
    event.preventDefault();
    addVoiceParticipant(voiceInviteForm);
    return;
  }

  const form = event.target.closest("[data-team-chat-form]");
  if (!form) return;
  event.preventDefault();
  const message = String(new FormData(form).get("teamMessage") || "").trim();
  if (!message || !state.team) return;
  if (!isTeamParticipant()) {
    showToast(localizedToast("registerFirst"));
    return;
  }
  state.team.chat = Array.isArray(state.team.chat) ? state.team.chat : [];
  state.team.chat.push({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    author: playerName(),
    body: message,
    createdAt: new Date().toISOString(),
  });
  saveState();
  form.reset();
  renderTeamTools();
  showToast(localizedToast("teamChat"));
});

teamForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!isCaptain()) {
    showToast(localizedToast("needCaptain"));
    return;
  }
  const formData = new FormData(teamForm);
  const teamName = String(formData.get("teamName") || "").trim();
  const members = formData.getAll("members").map((name) => String(name));
  if (!members.length) {
    showToast(localizedToast("chooseMember"));
    return;
  }

  state.team = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    name: teamName || "BAZA Team",
    captain: playerName(),
    members: members.map((name) => ({ name, status: "pending" })),
    chat: [],
    createdAt: new Date().toISOString(),
  };
  saveState();
  teamForm.reset();
  renderTeamTools();
  renderHomeTeam();
  renderAchievements();
  showToast(localizedToast("teamCreated"));
});

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

document.addEventListener("visibilitychange", () => {
  syncVoiceInvitesOnForeground();
  if (document.visibilityState === "visible") {
    loadSiteGames({ notify: true });
    loadSiteRanking();
    if (isAdmin()) loadNewsProposals();
  }
  clearTimeout(voiceBrowserHiddenTimer);
  voiceBrowserHiddenTimer = null;
  if (!window.BAZA_NATIVE_APP && document.visibilityState === "hidden" && voiceSessionActivated) {
    voiceBrowserHiddenTimer = setTimeout(deactivateVoiceSession, VOICE_BROWSER_HIDDEN_DISCONNECT_MS);
  } else if (!window.BAZA_NATIVE_APP && document.visibilityState === "visible" && getCurrentView() === "voice" && currentVoiceRoom()) {
    activateVoiceSession();
    connectVoiceRoomMedia({ force: true });
  }
});
window.addEventListener("pageshow", syncVoiceInvitesOnForeground);
window.addEventListener("focus", syncVoiceInvitesOnForeground);
window.addEventListener("pagehide", () => {
  if (!window.BAZA_NATIVE_APP) deactivateVoiceSession();
});

render();
updateVoiceDiagnostics();
connectPlayerChatSocket();
loadPlayerChat();
chatRefreshTimer = setInterval(loadPlayerChat, 2500);
loadSiteGames({ notify: true });
gamesRefreshTimer = setInterval(() => {
  loadSiteGames({ notify: true });
}, GAME_FEED_POLL_MS);
loadSiteSignups().then(syncCurrentSignedGamesToSite);
loadSiteRanking();
rankingRefreshTimer = setInterval(loadSiteRanking, RANKING_POLL_MS);
loadAdminPlayersFromSite();
loadSiteNews();
loadNewsProposals();
newsProposalRefreshTimer = setInterval(() => {
  if (isAdmin()) loadNewsProposals();
}, 5000);
