const STORAGE_KEY = "bazaClubIosApp";
const ADMIN_RESET_VERSION = "admin-ruslan-v1";
const VOICE_ROOM_MIN_POINTS = 300;
const CHAT_MIN_POINTS = 50;
const PUBLIC_APP_ORIGIN = "https://www.lasertagbaza.pl";
const VOICE_HTTP_POLL_MS = 280;
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
    const protocol = window.location.protocol === "https:" ? "https:" : "http:";
    return `${protocol}//localhost:3000`;
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
    newsTitle: "BAZA news",
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
    publishNews: "Publish and get +10",
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
    reportMessage: "Report",
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
    newsTitle: "Новости BAZA",
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
    publishNews: "Опубликовать и получить +10",
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
    reportMessage: "Жалоба",
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
    newsTitle: "Aktualności BAZA",
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
    publishNews: "Opublikuj i odbierz +10",
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
    reportMessage: "Zgłoś",
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

const locales = { en: "en", ru: "ru", pl: "pl" };

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
    month: { en: "Jul", ru: "июл", pl: "lip" },
    date: { en: "Wednesday, July 15", ru: "Среда, 15 июля", pl: "Środa, 15 lipca" },
    time: "18:30",
    title: "Counter-Strike 6v6",
    description: {
      en: "Two teams, tactical objectives and fast roster matching for solo players or squads.",
      ru: "Две команды, тактические цели и быстрый подбор состава для соло игроков или своей команды.",
      pl: "Dwie drużyny, cele taktyczne i szybkie dobieranie składu dla solo graczy albo ekip.",
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
    month: { en: "Jul", ru: "июл", pl: "lip" },
    date: { en: "Sunday, July 12", ru: "Воскресенье, 12 июля", pl: "Niedziela, 12 lipca" },
    time: "18:00",
    title: { en: "Open game 10+", ru: "Открытая игра 10+", pl: "Gra otwarta 10+" },
    description: {
      en: "An easy format for new players, families and anyone who wants to try BAZA without a team.",
      ru: "Удобный формат для новых игроков, семей и тех, кто хочет попробовать BAZA без своей команды.",
      pl: "Prosty format dla nowych graczy, rodzin i osób, które chcą spróbować BAZA bez drużyny.",
    },
    capacity: 20,
    roster: ["JAKUB", "SPICA", "BEN", "KIRA", "AGENT", "TORT", "W1LASER"],
  },
  {
    id: "away-telegram-july",
    day: "TG",
    month: { en: "away", ru: "выезд", pl: "wyjazd" },
    date: { en: "Date in Telegram", ru: "Дата в Telegram", pl: "Data w Telegramie" },
    time: { en: "by signup", ru: "по записи", pl: "wg zapisów" },
    title: { en: "Away game", ru: "Выездовая игра", pl: "Gra wyjazdowa" },
    description: {
      en: "The organizer publishes the meeting point, format and exact time in the club Telegram.",
      ru: "Организатор публикует место сбора, формат и точное время в клубном Telegram.",
      pl: "Organizator publikuje miejsce zbiórki, format i dokładny czas w klubowym Telegramie.",
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
    title: { en: "Wednesday Counter-Strike 6v6", ru: "В среду играем Counter-Strike 6v6", pl: "Środa Counter-Strike 6v6" },
    body: {
      en: "Meet at 18:20, age 14+. You can book solo or with a squad.",
      ru: "Сбор к 18:20, возраст 14+. Можно записаться одному или всей командой.",
      pl: "Zbiórka o 18:20, wiek 14+. Możesz zapisać się solo albo ekipą.",
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
      ru: "Запись на среду открыта. Капитаны могут собрать команду в личной панели.",
      pl: "Zapisy na środę są otwarte. Kapitanowie mogą złożyć drużynę w panelu profilu.",
    },
    createdAt: "2026-07-10T08:35:00.000Z",
  },
  {
    id: "chat-2",
    author: "NOKA",
    body: {
      en: "I am in for 18:30.",
      ru: "Я на 18:30 в игре.",
      pl: "Jestem na 18:30.",
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
    nickname: "BAZA player",
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
  siteNews: [],
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
  reports: [],
  voiceRooms: [],
  activeVoiceRoomId: "",
  activities: [
    {
      id: "welcome",
      title: { en: "Welcome to BAZA App", ru: "Добро пожаловать в BAZA App", pl: "Witaj w BAZA App" },
      label: { en: "start", ru: "старт", pl: "start" },
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
let playerChatSocket = null;
let voiceAudioUnlocked = false;
let voiceAudioContext = null;
let voiceRelayRecorder = null;
let voiceRelayMimeType = "";
let voiceRelayActive = false;
let voiceRelayPlaying = false;
let voiceRelayLastChunkAt = "";
const voicePeers = new Map();
const remoteAudioNodes = new Map();
const voiceRelaySeenChunks = new Set();
const voiceRelayQueue = [];
const voiceHttpSeenSignals = new Set();
const notifiedVoiceInviteIds = new Set();

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
const homeTeam = document.querySelector("[data-home-team]");
const achievementsList = document.querySelector("[data-achievements]");
const gameHistoryList = document.querySelector("[data-game-history]");

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
    migratedProfile.level = normalizeLevel(migratedProfile.level);
    migratedProfile.saved =
      Boolean(migratedProfile.saved) ||
      (normalizePlayerName(migratedProfile.nickname) !== "baza player" && Boolean(String(migratedProfile.contact || "").trim()));
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
      siteNews: Array.isArray(saved.siteNews) ? saved.siteNews : [],
      siteRanking: Array.isArray(saved.siteRanking) ? saved.siteRanking : [],
      siteSignups: Array.isArray(saved.siteSignups) ? saved.siteSignups : [],
      cancelledSiteSignupIds: Array.isArray(saved.cancelledSiteSignupIds) ? saved.cancelledSiteSignupIds : [],
      sync: { ...defaultState.sync, ...(saved.sync || {}) },
      articleCache: saved.articleCache && typeof saved.articleCache === "object" ? saved.articleCache : {},
      chat: Array.isArray(saved.chat) ? saved.chat : cloneData(defaultChat),
      reports: Array.isArray(saved.reports) ? saved.reports : [],
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
  return state.profile.nickname.trim() || "BAZA player";
}

function signedGameIds() {
  if (!isCurrentUserRegistered()) return [];
  const currentGameIds = new Set(scheduledGames().map((game) => game.id));
  return Object.keys(state.signups).filter((gameId) => state.signups[gameId] && currentGameIds.has(gameId));
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

function userNews() {
  return state.news.filter((item) => !item.system && !item.site && item.status !== "pending");
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
  const playerItems = userNews();
  const fallbackItems = (state.news || []).filter((item) => item.status !== "pending");
  const items = siteItems.length ? [...siteItems, ...playerItems] : fallbackItems;
  return items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function totalPoints() {
  if (isAdmin()) return 10000;
  const rankedPlayer = rankingPlayerByName(playerName());
  const activityPoints = state.activities.reduce((sum, item) => sum + Number(item.points || 0), 0);
  const derivedPoints = signedGameIds().length * 25 + userNews().length * 10;
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
    normalizePlayerName(nickname) !== "baza player" &&
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

function scheduledGames(now = new Date()) {
  const adminGames = (state.admin?.customGames || []).map((game) => ({ ...game, adminGame: true }));
  return [...defaultGames, ...adminGames]
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
    ru: new Intl.DateTimeFormat("ru", { month: "short" }).format(date).replace(".", ""),
    pl: new Intl.DateTimeFormat("pl", { month: "short" }).format(date).replace(".", ""),
  };
}

function gameDateLabel(date) {
  return {
    en: new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(date),
    ru: new Intl.DateTimeFormat("ru", { weekday: "long", month: "long", day: "numeric" }).format(date),
    pl: new Intl.DateTimeFormat("pl", { weekday: "long", month: "long", day: "numeric" }).format(date),
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
  const status = voiceSocketStatus === "online" ? t("online") : t("offline");
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
  const signed = Boolean(state.signups[game.id] && registered);
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
    en: { sign: "Book and get +25", cancel: "Remove booking", register: "Complete profile" },
    ru: { sign: "Записаться и получить +25", cancel: "Убрать запись", register: "Заполнить профиль" },
    pl: { sign: "Zapisz się i odbierz +25", cancel: "Usuń zapis", register: "Uzupełnij profil" },
  };
  return labels[currentLanguage()][kind];
}

function spotsText(spotsLeft) {
  const labels = {
    en: `players, ${spotsLeft} free`,
    ru: `игроков, свободно ${spotsLeft}`,
    pl: `graczy, wolne ${spotsLeft}`,
  };
  return labels[currentLanguage()];
}

function rosterLabel() {
  return { en: "Player roster", ru: "Список игроков", pl: "Lista graczy" }[currentLanguage()];
}

function emptyRosterText() {
  return {
    en: "No registered bookings yet.",
    ru: "Пока нет записанных игроков.",
    pl: "Brak zapisanych graczy.",
  }[currentLanguage()];
}

function emptyChatText() {
  return {
    en: "No player messages yet.",
    ru: "Пока нет сообщений игроков.",
    pl: "Brak wiadomości graczy.",
  }[currentLanguage()];
}

function deleteMessageLabel() {
  return {
    en: "Delete message",
    ru: "Удалить сообщение",
    pl: "Usuń wiadomość",
  }[currentLanguage()];
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

function allNewsItems() {
  return combinedNews();
}

function findNewsItem(id) {
  return allNewsItems().find((item) => item.id === id);
}

function renderMiniNews(item) {
  const content = `
    <b>${escapeHtml(localize(item.title))}</b>
    <span>${formatDate(item.createdAt)} / ${escapeHtml(item.author || "BAZA")}</span>
    <em>${escapeHtml(t("readNews"))}</em>
  `;

  return `
    <button class="mini-news mini-news-link" type="button" data-open-article="${escapeHtml(item.id)}">
      ${content}
    </button>
  `;
}

function renderFullNews(item) {
  const content = `
    <div class="news-topline">
      <div>
        <time datetime="${escapeHtml(item.createdAt)}">${formatDate(item.createdAt)} / ${escapeHtml(item.author || "BAZA")}</time>
        <h3>${escapeHtml(localize(item.title))}</h3>
      </div>
      ${item.site ? '<span class="news-badge">site</span>' : item.system ? "" : '<span class="news-badge">+10</span>'}
    </div>
    <p>${escapeHtml(localize(item.body))}</p>
    <strong class="read-news-link">${escapeHtml(t("readNews"))}</strong>
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
  if (!allowed) {
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
                ${!message.system && message.author !== playerName() ? `<button type="button" data-report-chat="${escapeHtml(message.id)}">${escapeHtml(t("reportMessage"))}</button>` : ""}
              </div>
              <p>${escapeHtml(localize(message.body))}</p>
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
    <div class="points-transfer-head">
      <div>
        <span>${escapeHtml(t("points"))}</span>
        <strong>${escapeHtml(t("pointsTransfer"))}</strong>
      </div>
      <b>${points}</b>
    </div>
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
  return {
    en: "No games yet.",
    ru: "Пока нет игр.",
    pl: "Brak gier.",
  }[currentLanguage()];
}

function renderProfileForm() {
  if (!profileForm) return;
  const hasCompleteProfile = Boolean(isAdmin() || (state.profile.saved && hasProfilePassword()));
  profileForm.elements.nickname.value = normalizePlayerName(state.profile.nickname) === "baza player" && !state.profile.contact.trim() ? "" : state.profile.nickname;
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
  const proposedNews = state.news.filter((item) => item.status === "pending");
  const pendingMembers = state.team?.members?.filter((member) => member.status === "pending") || [];
  adminPanel.innerHTML = `
    <div class="section-title compact-title">
      <div>
        <span>${escapeHtml(t("adminPasswordLabel"))}: ${escapeHtml(ADMIN_ACCOUNT.password)}</span>
        <h2>${escapeHtml(t("adminPanelTitle"))}</h2>
      </div>
    </div>
    <p class="admin-lead">${escapeHtml(t("adminLead"))}</p>
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
      <h3>${escapeHtml(t("proposedNews"))}</h3>
      <div class="admin-news-list">
        ${
          proposedNews.length
            ? proposedNews.map((item) => renderAdminNewsForm(item)).join("")
            : `<p class="empty-note">${escapeHtml(t("noPendingNews"))}</p>`
        }
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
  return Boolean(active?.closest?.("[data-voice-invite-form], [data-voice-room-form]"));
}

function renderVoiceRoom(options = {}) {
  if (!voiceRoomPanel) return;
  if (!options.force && shouldDeferVoiceRoomRender()) return;
  const registered = isCurrentUserRegistered();
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

  const room = currentVoiceRoom();
  const voiceStatus = voiceSocketStatus === "online" ? t("voiceReady") : voiceSocketStatus === "connecting" ? t("voiceConnecting") : t("voiceServerOffline");
  if (!room) {
    const pendingInvites = pendingVoiceInvites();
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
        <button class="primary-button" type="submit" ${voiceRoomAllowed ? "" : "disabled"}>${escapeHtml(t("createVoiceRoom"))}</button>
      </form>
    `;
    return;
  }

  const owner = normalizePlayerName(room.owner) === normalizePlayerName(playerName());
  const participants = room.participants || [];
  const invitations = (room.invitations || []).filter((invite) => invite.status === "pending");
  const currentParticipant = participants.find((participant) => normalizePlayerName(participant.name) === normalizePlayerName(playerName()));
  const invitedCount = Math.max(participants.length - 1, 0) + invitations.length;
  const canInvite = owner && invitedCount < 5;
  const availablePlayers = registeredPlayers().filter(
    (name) =>
      !participants.some((participant) => normalizePlayerName(participant.name) === normalizePlayerName(name)) &&
      !invitations.some((invite) => normalizePlayerName(invite.name) === normalizePlayerName(name)),
  );

  voiceRoomPanel.innerHTML = `
    <div class="voice-status-card">
      <b>${escapeHtml(t("voiceConnection"))}</b>
      <span>${escapeHtml(voiceStatus)}</span>
    </div>
    <div class="voice-room-card">
      <div class="voice-room-head">
        <div>
          <b>${escapeHtml(room.name)}</b>
          <span>${escapeHtml(room.owner)} / ${invitedCount}/5</span>
        </div>
        <button class="primary-button" type="button" data-voice-mic>${escapeHtml(currentParticipant?.micEnabled ? t("micOn") : t("micOff"))}</button>
      </div>
      <div class="voice-participants">
        ${participants
          .map(
            (participant) => `
              <article>
                <span>${escapeHtml(initials(participant.name))}</span>
                <b>${escapeHtml(participant.name)}</b>
                <em class="${participant.micEnabled ? "talking" : participant.online ? "online" : ""}">${escapeHtml(participant.micEnabled ? t("micOn") : participant.online ? t("online") : t("offline"))}</em>
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
              <span>${escapeHtml(t("voiceInvite"))}</span>
              <div class="voice-player-list">
                ${
                  availablePlayers.length
                    ? availablePlayers
                        .map((name) => `<button class="text-button" type="button" data-voice-invite-member="${escapeHtml(name)}">${escapeHtml(name)}</button>`)
                        .join("")
                    : `<p class="empty-note">${escapeHtml(t("transferNoPlayers"))}</p>`
                }
              </div>
            </div>`
          : `<p class="empty-note">${escapeHtml(owner ? t("roomLimit") : t("voiceInvite"))}</p>`
      }
      <button class="text-button" type="button" data-voice-leave>${escapeHtml(t("leaveVoiceRoom"))}</button>
    </div>
  `;
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

function pendingVoiceInvites() {
  if (!isCurrentUserRegistered()) return [];
  const currentName = normalizePlayerName(playerName());
  return (state.voiceRooms || [])
    .filter(
      (room) =>
        !room.participants?.some((participant) => normalizePlayerName(participant.name) === currentName) &&
        room.invitations?.some((invite) => invite.status === "pending" && normalizePlayerName(invite.name) === currentName),
    )
    .map((room) => ({ room }));
}

function pendingVoiceInviteKey(invite) {
  return `${invite?.room?.id || ""}:${normalizePlayerName(playerName())}`;
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
  return `
    <form class="admin-news-card" data-admin-news-form data-news-id="${escapeHtml(item.id)}">
      <div>
        <b>${escapeHtml(item.author || "BAZA")}</b>
        <span>${formatDate(item.createdAt)}</span>
      </div>
      <label>
        <span>${escapeHtml(t("newsHeadline"))}</span>
        <input name="title" type="text" maxlength="64" value="${escapeHtml(localize(item.title))}" />
      </label>
      <label>
        <span>${escapeHtml(t("newsBody"))}</span>
        <textarea name="body" rows="3" maxlength="400">${escapeHtml(localize(item.body))}</textarea>
      </label>
      <div class="admin-news-actions">
        <button class="primary-button" type="button" data-admin-publish-news="${escapeHtml(item.id)}">${escapeHtml(t("approveNews"))}</button>
        <button class="text-button" type="button" data-admin-delete-news="${escapeHtml(item.id)}">${escapeHtml(t("newsDeleted"))}</button>
        <button class="text-button" type="submit">${escapeHtml(t("adminSaved"))}</button>
      </div>
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
  return {
    en: "No team yet.",
    ru: "Команда еще не создана.",
    pl: "Nie utworzono jeszcze drużyny.",
  }[currentLanguage()];
}

function emptyTeamChatText() {
  return {
    en: "Team chat is empty.",
    ru: "Чат команды пока пуст.",
    pl: "Chat drużyny jest pusty.",
  }[currentLanguage()];
}

function teamLabel(kind) {
  const labels = {
    en: { team: "Team", captain: "Captain" },
    ru: { team: "Команда", captain: "Капитан" },
    pl: { team: "Drużyna", captain: "Kapitan" },
  };
  return labels[currentLanguage()][kind];
}

function statusLabel(status) {
  const labels = {
    en: { pending: "pending", confirmed: "confirmed", declined: "declined" },
    ru: { pending: "ждет", confirmed: "подтвердил", declined: "отказ" },
    pl: { pending: "czeka", confirmed: "potwierdzone", declined: "odmowa" },
  };
  return labels[currentLanguage()][status] || status;
}

function inviteText(teamName) {
  return {
    en: `Invitation to join ${teamName}`,
    ru: `Приглашение вступить в ${teamName}`,
    pl: `Zaproszenie do drużyny ${teamName}`,
  }[currentLanguage()];
}

function confirmLabel() {
  return { en: "Confirm", ru: "Подтвердить", pl: "Potwierdź" }[currentLanguage()];
}

function declineLabel() {
  return { en: "Decline", ru: "Отклонить", pl: "Odrzuć" }[currentLanguage()];
}

function noNotificationsText() {
  return {
    en: "No pending team invitations.",
    ru: "Нет ожидающих командных приглашений.",
    pl: "Brak oczekujących zaproszeń do drużyny.",
  }[currentLanguage()];
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

function sendNativeVoiceAudioActive(active) {
  const handler = window.webkit?.messageHandlers?.bazaNative;
  if (!handler?.postMessage) return false;
  handler.postMessage({ type: "voiceAudioActive", active: Boolean(active) });
  return true;
}

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
      en: "You are on the roster. +25 points added.",
      ru: "Ты в списке. Начислено +25 пунктов.",
      pl: "Jesteś na liście. Dodano +25 punktów.",
    },
    canceled: {
      en: "Booking removed. Points recalculated.",
      ru: "Запись убрана. Пункты пересчитаны.",
      pl: "Zapis usunięty. Punkty przeliczone.",
    },
    news: {
      en: "News added. +10 points.",
      ru: "Новость добавлена. Начислено +10 пунктов.",
      pl: "News dodany. +10 punktów.",
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
    reported: {
      en: "Report sent to club admin.",
      ru: "Жалоба отправлена администратору клуба.",
      pl: "Zgłoszenie wysłane do administratora klubu.",
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
      en: "News approved for publication.",
      ru: "Новость допущена к публикации.",
      pl: "News dopuszczony do publikacji.",
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
  return labels[key][currentLanguage()];
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

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const savedProfile = saved.profile || {};
    return (
      Boolean(savedProfile.saved) &&
      Boolean(savedProfile.passwordHash) &&
      normalizePlayerName(savedProfile.nickname) === normalizePlayerName(nickname) &&
      String(savedProfile.contact || "").trim() === contact
    );
  } catch {
    return false;
  }
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
    return true;
  }
  if (!hasProfilePassword()) return false;
  const hash = await hashPassword(nickname, password);
  if (normalizePlayerName(nickname) !== normalizePlayerName(state.profile.nickname) || hash !== state.profile.passwordHash) return false;
  state.auth.loggedIn = true;
  state.auth.role = "player";
  saveState();
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
  if (state.signups[gameId]) return;
  const signupId = stableSignupId(game);
  state.cancelledSiteSignupIds = (state.cancelledSiteSignupIds || []).filter((id) => id !== signupId);
  state.signups[gameId] = true;
  addActivity(
    {
      en: `Game booking: ${localize(game.title)}`,
      ru: `Запись на игру: ${localize(game.title)}`,
      pl: `Zapis na grę: ${localize(game.title)}`,
    },
    `${localize(game.date)} / ${localize(game.time)}`,
    25,
  );
  saveState();
  render();
  showToast(localizedToast("signed"));
  syncSignupToSite(game, signupId);
}

function cancelGame(gameId) {
  const game = findGame(gameId);
  if (!game || !state.signups[gameId]) return;
  if (!window.confirm(t("confirmCancelText"))) return;
  const signupId = stableSignupId(game);
  delete state.signups[gameId];
  cancelSiteSignup(game, signupId);
  addActivity(
    {
      en: `Booking cancelled: ${localize(game.title)}`,
      ru: `Отмена записи: ${localize(game.title)}`,
      pl: `Anulowano zapis: ${localize(game.title)}`,
    },
    { en: "points removed for this game", ru: "пункты за эту игру сняты", pl: "punkty za tę grę zdjęte" },
    -25,
  );
  saveState();
  render();
  showToast(localizedToast("canceled"));
  syncSignupCancellationToSite(game, signupId);
}

function setView(name) {
  views.forEach((view) => view.classList.toggle("active", view.dataset.view === name));
  tabButtons.forEach((button) => button.classList.toggle("active", button.dataset.tab === name));
  document.querySelector(".app-scroll").scrollTo({ top: 0, behavior: "smooth" });
  if (name === "voice" && isCurrentUserRegistered()) {
    connectVoiceSocket();
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
  const cachedBody = state.articleCache?.[cacheKey] || (item.articleKey ? state.articleCache?.[item.articleKey] : "");
  const isLoading = articleLoadingId === item.id && !hasFullArticleBody(item, cachedBody);
  const body = hasFullArticleBody(item, cachedBody) ? cachedBody : "";
  articleReader.innerHTML = `
    ${item.image ? `<img class="article-image" src="${escapeHtml(item.image)}" alt="${escapeHtml(localize(item.title))}" />` : ""}
    <div class="article-meta">${formatDate(item.createdAt)} / ${escapeHtml(item.author || "BAZA")}</div>
    <h1>${escapeHtml(localize(item.title))}</h1>
    <p class="article-summary">${escapeHtml(localize(item.body))}</p>
    ${isLoading ? `<p class="article-loading">${escapeHtml(t("loadingArticle"))}</p>` : ""}
    ${body ? `<div class="article-body">${renderArticleBody(body)}</div>` : ""}
  `;
}

async function loadArticleBody(item) {
  const cacheKey = articleCacheKey(item);
  const cachedBody = state.articleCache?.[cacheKey] || (item.articleKey ? state.articleCache?.[item.articleKey] : "");
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
        return {
          id: `site-bazie-${index}-${title.toLowerCase().replace(/[^a-z0-9]+/gi, "-")}`,
          title,
          body: articleText || lead,
          author: label,
          createdAt: new Date(Date.UTC(2026, 6, 10, 18 - index, 0, 0)).toISOString(),
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
    const response = await fetch("https://www.lasertagbaza.pl/api/news-feed", { cache: "no-store" });
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
      createdAt: item.publishedAt ? `${item.publishedAt}T12:00:00+02:00` : feed.updatedAt || new Date().toISOString(),
      image: item.image || "",
      contentUrl: item.contentUrl || "",
      site: true,
      sectionId: section.id || "",
      source: "https://www.lasertagbaza.pl/api/news-feed",
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
      return {
        id: `site-${index}-${title.toLowerCase().replace(/[^a-z0-9]+/gi, "-")}`,
        title,
        body,
        author: label,
        createdAt: new Date(Date.UTC(2026, 6, 10, 9 + index, 0, 0)).toISOString(),
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
    { url: "https://www.lasertagbaza.pl/api/ranking-feed", type: "json" },
    { url: "/api/ranking-feed", type: "json" },
    { url: "http://localhost:3000/api/ranking-feed", type: "json" },
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
  };

  const targets = [
    "https://www.lasertagbaza.pl/api/telegram-signup",
    "/api/telegram-signup",
  ];

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
      setSyncStatus("synced");
      saveState();
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

  const targets = [
    "https://www.lasertagbaza.pl/api/telegram-signup",
    "/api/telegram-signup",
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
      if (Array.isArray(data.signups)) {
        replaceSiteSignups(data.signups);
      }
      setSyncStatus("synced");
      saveState();
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

document.addEventListener("click", (event) => {
  const soundTarget = event.target.closest("button, a, .avatar-picker, [role='button']");
  if (soundTarget) playTapSound();

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

  const reportChatButton = event.target.closest("[data-report-chat]");
  if (reportChatButton) {
    reportChatMessage(reportChatButton.dataset.reportChat);
    return;
  }

  const publishNewsButton = event.target.closest("[data-admin-publish-news]");
  if (publishNewsButton) {
    approveAdminNews(publishNewsButton.dataset.adminPublishNews);
    return;
  }

  const deleteNewsButton = event.target.closest("[data-admin-delete-news]");
  if (deleteNewsButton) {
    deleteAdminNews(deleteNewsButton.dataset.adminDeleteNews);
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
    toggleVoiceMic();
    return;
  }

  const voiceLeaveButton = event.target.closest("[data-voice-leave]");
  if (voiceLeaveButton) {
    leaveVoiceRoom();
    return;
  }

  const voiceRemoveButton = event.target.closest("[data-voice-remove]");
  if (voiceRemoveButton) {
    removeVoiceParticipant(voiceRemoveButton.dataset.voiceRemove);
    return;
  }

  const voiceInviteMemberButton = event.target.closest("[data-voice-invite-member]");
  if (voiceInviteMemberButton) {
    addVoiceParticipantByName(voiceInviteMemberButton.dataset.voiceInviteMember);
    return;
  }

  const acceptVoiceButton = event.target.closest("[data-voice-accept]");
  if (acceptVoiceButton) {
    unlockVoiceAudio();
    acceptVoiceInvite(acceptVoiceButton.dataset.voiceAccept);
    return;
  }

  const declineVoiceButton = event.target.closest("[data-voice-decline]");
  if (declineVoiceButton) {
    declineVoiceInvite(declineVoiceButton.dataset.voiceDecline);
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
    if (!message?.id || !message?.author || !message?.body) return;
    byId.set(String(message.id), {
      ...message,
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

function reportChatMessage(messageId) {
  const message = state.chat.find((item) => item.id === messageId);
  if (!message || message.author === playerName()) return;
  state.reports = state.reports || [];
  state.reports.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    type: "chat",
    messageId,
    author: message.author,
    reporter: playerName(),
    body: localize(message.body),
    createdAt: new Date().toISOString(),
    status: "pending",
  });
  state.reports = state.reports.slice(0, 100);
  saveState();
  showToast(localizedToast("reported"));
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
      ru: `Передано ${amount} пунктов игроку ${recipient}`,
      pl: `Przekazano ${amount} punktów graczowi ${recipient}`,
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
  const productionEndpoint = "https://www.lasertagbaza.pl/api/admin-player";
  const payload = {
    nickname: player.nickname,
    password: player.password,
    passwordHash: player.passwordHash,
    points: player.points,
    createdAt: new Date().toISOString(),
    source: player.source || "ios-admin-panel",
  };
  const endpoints = [
    productionEndpoint,
    "http://localhost:3000/api/admin-player",
    "/api/admin-player",
  ];
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
      if (endpoint === productionEndpoint) {
        state.sync.status = "synced";
        state.sync.lastSiteSync = new Date().toISOString();
        state.sync.lastError = "";
        saveState();
        return true;
      }
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
  const endpoints = [
    "https://www.lasertagbaza.pl/api/admin-player",
    "/api/admin-player",
    "http://localhost:3000/api/admin-player",
  ];

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
  const item = state.news.find((newsItem) => newsItem.id === newsId);
  if (!item) return null;
  const formData = new FormData(form);
  item.title = String(formData.get("title") || "").trim() || item.title;
  item.body = String(formData.get("body") || "").trim() || item.body;
  item.editedAt = new Date().toISOString();
  return item;
}

function saveAdminNewsDraft(form) {
  if (!isAdmin()) return;
  updateAdminNewsFromForm(form);
  addAdminLog("news edited", form?.dataset.newsId || "");
  saveState();
  renderAdminPanel();
  showToast(localizedToast("adminSaved"));
}

function approveAdminNews(newsId) {
  if (!isAdmin()) return;
  const form = [...document.querySelectorAll("[data-admin-news-form]")].find((node) => node.dataset.newsId === newsId);
  const item = updateAdminNewsFromForm(form) || state.news.find((newsItem) => newsItem.id === newsId);
  if (!item) return;
  item.status = "published";
  item.pending = false;
  item.approvedAt = new Date().toISOString();
  item.approvedBy = ADMIN_ACCOUNT.nickname;
  if (item.author && normalizePlayerName(item.author) !== normalizePlayerName(ADMIN_ACCOUNT.nickname)) {
    const existing = currentPlayerRanking().find((player) => normalizePlayerName(player.name) === normalizePlayerName(item.author));
    setAdminPlayerPoints(item.author, Number(existing?.points || 0) + 10);
  }
  addAdminLog("news approved", localize(item.title));
  saveState();
  render();
  showToast(localizedToast("newsApproved"));
}

function deleteAdminNews(newsId) {
  if (!isAdmin()) return;
  const item = state.news.find((newsItem) => newsItem.id === newsId);
  state.news = state.news.filter((item) => item.id !== newsId);
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
    if (Array.isArray(data.audioChunks)) {
      data.audioChunks.forEach(handleVoiceRelayChunk);
    }
    renderVoiceRoom();
    renderHomeVoiceEntry();
    renderVoiceInviteAlert();
  } catch (error) {
    lastVoiceError = error?.message || "voice http offline";
    if (!voiceSocket || voiceSocket.readyState !== WebSocket.OPEN) voiceSocketStatus = "offline";
    renderVoiceRoom();
    renderHomeVoiceEntry();
    renderVoiceInviteAlert();
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
  const previousInvites = new Set(pendingVoiceInvites().map(pendingVoiceInviteKey));
  state.voiceRooms = rooms;
  const currentName = normalizePlayerName(playerName());
  const roomForPlayer = rooms.find((room) => room.participants?.some((participant) => normalizePlayerName(participant.name) === currentName));
  if (roomForPlayer) state.activeVoiceRoomId = roomForPlayer.id;
  if (!roomForPlayer && state.activeVoiceRoomId && !rooms.some((room) => room.id === state.activeVoiceRoomId)) {
    state.activeVoiceRoomId = "";
    closeVoicePeers();
    stopVoiceStream();
  }
  saveState();
  const newInvites = pendingVoiceInvites().filter((invite) => !previousInvites.has(pendingVoiceInviteKey(invite)));
  notifyNewVoiceInvites(newInvites);
  renderVoiceRoom();
  renderHomeVoiceEntry();
  renderVoiceInviteAlert();
  connectVoiceRoomMedia();
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

async function connectVoiceRoomMedia() {
  const room = currentVoiceRoom();
  if (!room || voiceSocketStatus !== "online") return;
  const currentName = normalizePlayerName(playerName());
  const remoteParticipants = (room.participants || []).filter(
    (participant) => normalizePlayerName(participant.name) !== currentName && participant.online && (voiceStream || participant.micEnabled),
  );
  for (const participant of remoteParticipants) {
    const peer = createVoicePeer(participant.name);
    addLocalVoiceTracks(peer.pc);
    negotiateVoicePeer(peer);
  }
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

function createVoiceRoom(form) {
  if (!isCurrentUserRegistered()) {
    showToast(localizedToast("registerFirst"));
    return;
  }
  if (!canCreateVoiceRoom()) {
    showToast(t("voiceRoomLocked"));
    renderVoiceRoom();
    return;
  }
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
  saveState();
  renderVoiceRoom({ force: true });
  syncCurrentVoiceRoom();
  showToast(localizedToast("adminSaved"));
}

function addVoiceParticipantByName(memberName) {
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
  syncCurrentVoiceRoom();
}

function addVoiceParticipant(form) {
  addVoiceParticipantByName(new FormData(form).get("member"));
}

function removeVoiceParticipant(name) {
  const room = currentVoiceRoom();
  if (!room || normalizePlayerName(room.owner) !== normalizePlayerName(playerName())) return;
  room.participants = room.participants.filter((participant) => normalizePlayerName(participant.name) !== normalizePlayerName(name));
  room.invitations = (room.invitations || []).filter((invite) => normalizePlayerName(invite.name) !== normalizePlayerName(name));
  closeVoicePeer(name);
  saveState();
  renderVoiceRoom({ force: true });
  syncCurrentVoiceRoom();
}

function acceptVoiceInvite(roomId) {
  unlockVoiceAudio();
  if (!isCurrentUserRegistered()) return;
  const room = (state.voiceRooms || []).find((item) => item.id === roomId);
  if (!room) return;
  const currentName = normalizePlayerName(playerName());
  const invite = room.invitations?.find((item) => item.status === "pending" && normalizePlayerName(item.name) === currentName);
  if (!invite || room.participants.length >= 6) return;
  room.invitations = (room.invitations || []).filter((item) => normalizePlayerName(item.name) !== currentName);
  if (!room.participants.some((participant) => normalizePlayerName(participant.name) === currentName)) {
    room.participants.push({ name: playerName(), micEnabled: false, online: true, joinedAt: new Date().toISOString() });
  }
  state.activeVoiceRoomId = room.id;
  saveState();
  setView("voice");
  renderVoiceRoom({ force: true });
  syncVoiceRoom(room);
  connectVoiceRoomMedia();
  resumeRemoteVoiceAudio();
}

function declineVoiceInvite(roomId) {
  if (!isCurrentUserRegistered()) return;
  const room = (state.voiceRooms || []).find((item) => item.id === roomId);
  if (!room) return;
  const currentName = normalizePlayerName(playerName());
  room.invitations = (room.invitations || []).filter((item) => normalizePlayerName(item.name) !== currentName);
  saveState();
  renderVoiceRoom({ force: true });
  sendVoiceSocket({ type: "decline-invite", roomId: room.id, player: playerName() });
}

function leaveVoiceRoom() {
  const room = currentVoiceRoom();
  if (!room) return;
  stopVoiceStream();
  const currentName = normalizePlayerName(playerName());
  if (normalizePlayerName(room.owner) === currentName) {
    state.voiceRooms = (state.voiceRooms || []).filter((item) => item.id !== room.id);
    sendVoiceSocket({ type: "delete-room", roomId: room.id, player: playerName() });
  } else {
    room.participants = room.participants.filter((participant) => normalizePlayerName(participant.name) !== currentName);
    sendVoiceSocket({ type: "leave-room", roomId: room.id, player: playerName() });
  }
  state.activeVoiceRoomId = "";
  closeVoicePeers();
  saveState();
  renderVoiceRoom({ force: true });
}

async function toggleVoiceMic() {
  unlockVoiceAudio();
  const room = currentVoiceRoom();
  if (!room) return;
  const participant = room.participants.find((item) => normalizePlayerName(item.name) === normalizePlayerName(playerName()));
  if (!participant) return;
  if (participant.micEnabled) {
    participant.micEnabled = false;
    stopVoiceStream();
  } else {
    try {
      voiceStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
        },
      });
      participant.micEnabled = true;
      addLocalVoiceTracksToAllPeers();
      renegotiateVoicePeers();
      startVoiceRelayRecorder();
    } catch {
      showToast(t("micError"));
      return;
    }
  }
  saveState();
  renderVoiceRoom();
  sendVoiceSocket({ type: "mic", roomId: room.id, player: playerName(), micEnabled: participant.micEnabled });
  connectVoiceRoomMedia();
  if (participant.micEnabled) startVoiceRelayRecorder();
  resumeRemoteVoiceAudio();
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

newsForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(newsForm);
  const title = String(formData.get("title") || "").trim();
  const body = String(formData.get("body") || "").trim();
  if (!title || !body) return;
  if (!isCurrentUserRegistered()) {
    showToast(localizedToast("registerFirst"));
    setView("profile");
    return;
  }
  const publishNow = isAdmin();

  state.news.push({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    title,
    body,
    author: playerName(),
    createdAt: new Date().toISOString(),
    system: false,
    status: publishNow ? "published" : "pending",
    pending: !publishNow,
  });
  if (publishNow) {
    addActivity(
      {
        en: `News published: ${title}`,
        ru: `Новость опубликована: ${title}`,
        pl: `News opublikowany: ${title}`,
      },
      "club news",
      10,
    );
  }
  newsForm.reset();
  saveState();
  render();
  showToast(localizedToast(publishNow ? "news" : "newsPending"));
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

chatForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = String(new FormData(chatForm).get("message") || "").trim();
  if (!message) return;
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
    registered: true,
    createdAt: new Date().toISOString(),
  };
  state.chat.push(chatMessage);
  chatForm.reset();
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
    saveAdminNewsDraft(adminNewsForm);
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
    createVoiceRoom(voiceRoomForm);
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

render();
connectPlayerChatSocket();
loadPlayerChat();
chatRefreshTimer = setInterval(loadPlayerChat, 2500);
loadSiteSignups().then(syncCurrentSignedGamesToSite);
loadSiteRanking();
loadAdminPlayersFromSite();
loadSiteNews();
