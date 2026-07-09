const menuButton = document.querySelector(".menu-toggle");
const mobileLinks = document.querySelectorAll(".mobile-nav a");
const bookingForm = document.querySelector(".booking-form");
const signupLists = document.querySelectorAll("[data-signup-list]");
const signupCounters = document.querySelectorAll("[data-signup-count]");
const nextGamePanel = document.querySelector("[data-next-game-panel]");
const nextGameToggle = document.querySelector("[data-next-game-toggle]");
const nextGameRegister = document.querySelector("[data-next-game-register]");
const nextGameList = document.querySelector("[data-next-game-list]");
const nextGameCount = document.querySelector("[data-next-game-count]");
const toast = document.querySelector(".toast");
const filterButtons = document.querySelectorAll(".filter-button");
const gameRows = document.querySelectorAll(".game-row");
const siteLanguageButtons = document.querySelectorAll("[data-site-lang]");
const recurringGameRows = document.querySelectorAll("[data-recurring-weekday][data-recurring-time]");
const playerCarousel = document.querySelector("[data-player-carousel]");
const priceOpenButtons = document.querySelectorAll("[data-price-open]");
const priceCloseButtons = document.querySelectorAll("[data-price-close]");
const priceModal = document.querySelector(".price-modal");
const newsArticles = document.querySelectorAll(".update-article");

const localApiBase = window.location.protocol === "file:" ? "http://localhost:3000" : "";
const telegramSignupEndpoint = `${localApiBase}/api/telegram-signup`;
const newsCommentsEndpoint = `${localApiBase}/api/news-comments`;
const signupStorageKey = "bazaGameSignups";
const signupCycleStorageKey = "bazaSignupCycleStart";
const deviceSignupStorageKey = "bazaDeviceSignupCycle";
const newsCommentsStorageKey = "bazaNewsComments";
const supportedSiteLanguages = ["pl", "be", "en", "uk", "ru"];
let currentSiteLanguage = supportedSiteLanguages.includes(localStorage.getItem("bazaSiteLanguage"))
  ? localStorage.getItem("bazaSiteLanguage")
  : "pl";
let sharedSignups = [];
let newsComments = {};
let activeNextGame = "wednesday";

const monthLabels = {
  pl: ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"],
  be: ["сту", "лют", "сак", "кра", "май", "чэр", "ліп", "жні", "вер", "кас", "ліс", "сне"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  uk: ["січ", "лют", "бер", "кві", "тра", "чер", "лип", "сер", "вер", "жов", "лис", "гру"],
  ru: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
};

const weekdayLabels = {
  pl: ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"],
  be: ["Нд", "Пн", "Аў", "Ср", "Чц", "Пт", "Сб"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  uk: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  ru: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
};

const nextDateLabels = {
  pl: "Najbliższy termin",
  be: "Бліжэйшая гульня",
  en: "Next game",
  uk: "Найближча гра",
  ru: "Ближайшая игра",
};

const pointLabels = {
  pl: "pkt",
  be: "ач.",
  en: "pts",
  uk: "оч.",
  ru: "оч.",
};

const siteCopy = {
  be: {
    "Lasertag Club BAZA — Otwarte gry laser tag Warszawa": "Lasertag Club BAZA — адкрытыя гульні ў лазертаг у Варшаве",
    "Turnieje BAZA — Lasertag Club Warszawa": "Турніры BAZA — Lasertag Club Варшава",
    "Lasertag Club BAZA Warszawa — otwarte gry laser tag, rankingi graczy, top drużyny, aktualności i Telegram z tłumaczeniem na polski.": "Lasertag Club BAZA Варшава — адкрытыя гульні ў лазертаг, рэйтынгі гульцоў, топ каманд, навіны і Telegram з перакладам.",
    "Archiwum turniejów Lasertag Club BAZA Warszawa: zespoły, wyniki i najlepsi gracze.": "Архіў турніраў Lasertag Club BAZA Варшава: каманды, вынікі і лепшыя гульцы.",
    "Główna nawigacja": "Галоўная навігацыя",
    "Mobilna nawigacja": "Мабільная навігацыя",
    "Język strony": "Мова сайта",
    "Otwórz menu": "Адкрыць меню",
    "Zamknij menu": "Закрыць меню",
    "Gry otwarte": "Адкрытыя гульні",
    "Rankingi": "Рэйтынгі",
    "Aktualności": "Навіны",
    "Kontakt": "Кантакт",
    "Dołącz": "Далучыцца",
    "Powrót": "Назад",
    "PLATAU": "ПЛАТАЎ",
    "Warszawa / open games": "Варшава / адкрытыя гульні",
    "Klubowa scena laser tag dla graczy solo, ekip i drużyn. Sprawdź najbliższe gry, zapisz się do składu i śledź rankingi po każdej rundzie.": "Клубная сцэна лазертага для сольных гульцоў, кампаній і каманд. Глядзі бліжэйшыя гульні, запісвайся ў склад і сачы за рэйтынгамі пасля кожнага раўнда.",
    "Zobacz gry": "Глядзець гульні",
    "Telegram live": "Telegram live",
    "Najbliższa gra otwarta": "Бліжэйшая адкрытая гульня",
    "Środa 18:30": "Серада 18:30",
    "Scenariusz": "Сцэнар",
    "Wiek": "Узрост",
    "14+ lat": "14+ гадоў",
    "Zapisz się": "Запісацца",
    "stałe gry w tygodniu": "пастаянныя гульні на тыдзень",
    "aktywnych graczy": "актыўных гульцоў",
    "daty turniejów": "даты турніраў",
    "Najważniejsze informacje": "Галоўная інфармацыя",
    "Środa 18:30 Counter-Strike 6v6": "Серада 18:30 Counter-Strike 6v6",
    "Niedziela 18:00 otwarta gra 10+": "Нядзеля 18:00 адкрытая гульня 10+",
    "Wyjazdowe gry w Telegramie": "Выязныя гульні ў Telegram",
    "Turnieje ogłaszamy w TG": "Турніры абвяшчаем у TG",
    "Ranking 05.07.26": "Рэйтынг 05.07.26",
    "według punktów.": "па балах.",
    "Wyniki z 12 gier. Karty pokazują miejsce, punkty i miejsce na avatar. Przewijaj ranking po 5 graczy.": "Вынікі з 12 гульняў. Карткі паказваюць месца, балы і месца для аватара. Гартай рэйтынг па 5 гульцоў.",
    "Klasyfikacja graczy": "Класіфікацыя гульцоў",
    "Przewijanie rankingu": "Гартанне рэйтынгу",
    "Poprzedni gracze": "Папярэднія гульцы",
    "Następni gracze": "Наступныя гульцы",
    "Informacja o zdobywaniu punktów": "Інфармацыя пра атрыманне балаў",
    "Punkty można zdobyć, wysyłając swój artykuł na lasertagwarsaw@gmail.com albo zdobywając je podczas gry.": "Балы можна атрымаць, даслаўшы свой артыкул на lasertagwarsaw@gmail.com або набраўшы іх падчас гульні.",
    "Harmonogram": "Расклад",
    "Najbliższe": "Бліжэйшыя",
    "otwarte gry.": "адкрытыя гульні.",
    "Stałe gry odbywają się w środę i niedzielę. Wyjazdowe gry oraz turnieje planujemy w czacie Telegram, gdzie publikujemy dokładne daty i zapisy.": "Пастаянныя гульні праходзяць у сераду і нядзелю. Выязныя гульні і турніры плануем у Telegram-чаце, дзе публікуем дакладныя даты і запіс.",
    "Filtr gier": "Фільтр гульняў",
    "Wszystkie": "Усе",
    "Środa": "Серада",
    "Niedziela": "Нядзеля",
    "18:30 / scenariusz Counter-Strike": "18:30 / сцэнар Counter-Strike",
    "Gra drużynowa 6 na 6 dla graczy od 14 lat. Zapisy solo albo całym składem.": "Камандная гульня 6 на 6 для гульцоў ад 14 гадоў. Запіс сольна або ўсім складам.",
    "wiek graczy": "узрост гульцоў",
    "Dołącz do gry Counter-Strike 6v6": "Далучыцца да гульні Counter-Strike 6v6",
    "18:00 / otwarta gra": "18:00 / адкрытая гульня",
    "Dla wszystkich chętnych": "Для ўсіх ахвотных",
    "Niedzielna gra otwarta dla nowych i stałych graczy od 10 lat.": "Нядзельная адкрытая гульня для новых і пастаянных гульцоў ад 10 гадоў.",
    "Dołącz do niedzielnej gry otwartej": "Далучыцца да нядзельнай адкрытай гульні",
    "Wyjazd": "Выезд",
    "Daty planowane w czacie Telegram": "Даты плануюцца ў Telegram-чаце",
    "Wyjazdowa gra": "Выязная гульня",
    "Terminy, miejsce zbiórki i zasady zapisów podajemy w grupie Telegram.": "Тэрміны, месца збору і правілы запісу паведамляем у групе Telegram.",
    "daty w czacie": "даты ў чаце",
    "Sprawdź wyjazdowe gry w Telegramie": "Праверыць выязныя гульні ў Telegram",
    "Otwórz stronę turniejów": "Адкрыць старонку турніраў",
    "Lip / turniej": "ліп / турнір",
    "Archiwum i daty w Telegramie": "Архіў і даты ў Telegram",
    "Turnieje BAZA": "Турніры BAZA",
    "Kliknij ikonę turnieju, aby zobaczyć poprzednie turnieje, zespoły i wyniki.": "Націсні на іконку турніру, каб убачыць мінулыя турніры, каманды і вынікі.",
    "drużyny 05.07": "каманды 05.07",
    "Wyniki": "Вынікі",
    "Zobacz archiwum turniejów": "Глядзець архіў турніраў",
    "Wyniki sezonu": "Вынікі сезона",
    "Top drużyny": "Топ каманд",
    "i gracze.": "і гульцы.",
    "Ranking aktualizowany po grach otwartych i meczach ligi. Widok jest gotowy pod późniejsze podłączenie automatycznych statystyk z systemu areny.": "Рэйтынг абнаўляецца пасля адкрытых гульняў і лігавых матчаў. Раздзел гатовы да будучага падключэння аўтаматычнай статыстыкі з сістэмы арэны.",
    "Sezon letni": "Летні сезон",
    "pkt": "ач.",
    "1280 pkt": "1280 ач.",
    "1194 pkt": "1194 ач.",
    "1110 pkt": "1110 ач.",
    "1042 pkt": "1042 ач.",
    "Top gracze": "Топ гульцоў",
    "K/D + cele": "K/D + мэты",
    "trafienia": "трапленняў",
    "92 trafienia": "92 трапленні",
    "83 trafienia": "83 трапленні",
    "baz przejętych": "баз захоплена",
    "7 baz przejętych": "7 баз захоплена",
    "Klub": "Клуб",
    "Nowe aktualizacje na": "Новыя абнаўленні на",
    "BAZIE.": "BAZIE.",
    "Nowe aktualizacje": "Новыя абнаўленні",
    "areny.": "арэны.",
    "Miejsce na komunikaty dla graczy: stałe gry, wyjazdy, turnieje, zapisy w Telegramie i ważne informacje organizacyjne.": "Месца для паведамленняў гульцам: пастаянныя гульні, выезды, турніры, запіс у Telegram і важная арганізацыйная інфармацыя.",
    "Środa / 18:30": "Серада / 18:30",
    "Counter-Strike 6 na 6 dla graczy 14+": "Counter-Strike 6 на 6 для гульцоў 14+",
    "Stały scenariusz środowy: dwie drużyny, cele taktyczne i zapis solo albo składem.": "Пастаянны сцэнар па серадах: дзве каманды, тактычныя мэты і запіс сольна або складам.",
    "Czytaj artykuł": "Чытаць артыкул",
    "Niedziela / 18:00": "Нядзеля / 18:00",
    "Otwarta gra dla wszystkich chętnych 10+": "Адкрытая гульня для ўсіх ахвотных 10+",
    "Najprostszy wejściowy format dla nowych graczy, rodzin i osób bez własnej drużyny.": "Самы просты фармат уваходу для новых гульцоў, сем'яў і людзей без сваёй каманды.",
    "Telegram / daty": "Telegram / даты",
    "Wyjazdy i turnieje ogłaszamy w TG": "Выезды і турніры абвяшчаем у TG",
    "Daty, lokalizacje, regulaminy i listy graczy publikujemy w klubowym czacie Telegram.": "Даты, лакацыі, рэгламенты і спісы гульцоў публікуем у клубным Telegram-чаце.",
    "Chat graczy": "Чат гульцоў",
    "po polsku.": "з перакладам.",
    "Prototyp integracji pokazuje, jak wiadomości z Telegrama mogą trafiać na stronę i automatycznie wyświetlać polskie tłumaczenie dla lokalnych graczy.": "Прататып інтэграцыі паказвае, як паведамленні з Telegram могуць трапляць на сайт і аўтаматычна паказваць пераклад для мясцовых гульцоў.",
    "Język wiadomości": "Мова паведамленняў",
    "Podgląd chatu Telegram": "Папярэдні прагляд Telegram-чата",
    "auto-translate: PL": "аўтапераклад: PL",
    "W środę o 18:30 gramy scenariusz Counter-Strike 6 na 6, wiek 14+.": "У сераду ў 18:30 гуляем сцэнар Counter-Strike 6 на 6, узрост 14+.",
    "W niedzielę o 18:00 otwarta gra dla wszystkich chętnych od 10 lat.": "У нядзелю ў 18:00 адкрытая гульня для ўсіх ахвотных ад 10 гадоў.",
    "Daty gier wyjazdowych i turniejów podajemy tutaj w czacie Telegram.": "Даты выязных гульняў і турніраў паведамляем тут, у Telegram-чаце.",
    "Napisz wiadomość do Telegrama": "Напісаць паведамленне ў Telegram",
    "Wyślij wiadomość": "Адправіць паведамленне",
    "Zapis": "Запіс",
    "Wejdź do": "Увайсці ў",
    "gry.": "гульню.",
    "Postaw plus, wybierz dzień i zostaw dane. Nick pojawi się na stronie, a pełna informacja trafi do organizatora w Telegramie.": "Пастаў плюс, выберы дзень і пакінь дадзеныя. Нік з'явіцца на сайце, а поўная інфармацыя трапіць арганізатару ў Telegram.",
    "Dzień gry": "Дзень гульні",
    "Nick gracza": "Нік гульца",
    "Numer telefonu": "Нумар тэлефона",
    "Informacja dla organizatora": "Інфармацыя для арганізатара",
    "solo / ekipa / pierwszy raz": "сола / каманда / першы раз",
    "Dodaj do listy": "Дадаць у спіс",
    "Na stronie pokazujemy nick. Telefon wysyłamy tylko do organizatora.": "На сайце паказваем нік. Тэлефон адпраўляем толькі арганізатару.",
    "Lista jest pusta": "Спіс пусты",
    "bez notatki": "без нататкі",
    "graczy": "гульцоў",
    "Plus dodany.": "Плюс дададзены.",
    "Nick pojawił się na liście. Wysyłamy dane do Telegrama.": "Нік з'явіўся ў спісе. Адпраўляем дадзеныя ў Telegram.",
    "Telegram wysłany.": "Telegram адпраўлены.",
    "Organizator dostał pełne dane gracza.": "Арганізатар атрымаў поўныя дадзеныя гульца.",
    "Plus zapisany na stronie.": "Плюс захаваны на сайце.",
    "Telegram endpoint trzeba jeszcze podłączyć na hostingu.": "Telegram endpoint яшчэ трэба падключыць на хостынгу.",
    "Wybierz poziom i zostaw kontakt. Organizator odeśle wolne miejsca oraz link do grupy Telegram.": "Выберы фармат і пакінь кантакт. Арганізатар дашле вольныя месцы і спасылку на групу Telegram.",
    "Interesuje mnie": "Мяне цікавіць",
    "Środa 18:30 / Counter-Strike 6v6 / 14+": "Серада 18:30 / Counter-Strike 6v6 / 14+",
    "Niedziela 18:00 / otwarta gra / 10+": "Нядзеля 18:00 / адкрытая гульня / 10+",
    "Gra wyjazdowa / daty w Telegramie": "Выязная гульня / даты ў Telegram",
    "Turniej / daty w Telegramie": "Турнір / даты ў Telegram",
    "Numer telefonu albo Telegram": "Нумар тэлефона або Telegram",
    "Wyślij zgłoszenie": "Адправіць заяўку",
    "Odpowiadamy zwykle w ciągu 15 minut.": "Звычайна адказваем цягам 15 хвілін.",
    "Zgłoszenie przyjęte.": "Заяўка прынята.",
    "Wyślemy termin i link do Telegrama.": "Дашлём час гульні і спасылку на Telegram.",
    "Social": "Сацыяльныя сеткі",
    "Lokalizacja": "Лакацыя",
    "BAZA / mapa": "BAZA / мапа",
    "Firma": "Кампанія",
    "Archiwum turniejów": "Архіў турніраў",
    "Turnieje": "Турніры",
    "Krótka historia turniejów: wynik, drużyny i top 5 graczy bez powtarzania tych samych danych w kilku miejscach.": "Кароткая гісторыя турніраў: вынік, каманды і топ-5 гульцоў без паўтарэння адных і тых жа дадзеных.",
    "W turnieju zagrały 4 drużyny. Zostawiamy najważniejsze informacje: zwycięzcę, listę drużyn i pięciu najlepszych graczy.": "У турніры згулялі 4 каманды. Пакідаем галоўнае: пераможцу, спіс каманд і пяць лепшых гульцоў.",
    "1 miejsce": "1 месца",
    "Zwycięska drużyna turnieju z 5 lipca.": "Каманда-пераможца турніру 5 ліпеня.",
    "Lista drużyn": "Спіс каманд",
    "4 drużyny": "4 каманды",
    "2 miejsce": "2 месца",
    "3 miejsce": "3 месца",
    "4 miejsce": "4 месца",
    "skład do uzupełnienia": "склад будзе дададзены",
    "Skład Sztorm": "Склад Sztorm",
    "Skład Old Skufs": "Склад Old Skufs",
    "Skład Kometa Strike": "Склад Kometa Strike",
    "Michał": "Миша",
    "wynik do uzupełnienia": "вынік будзе дададзены",
    "Najlepsi": "Лепшыя",
    "gracze.": "гульцы.",
    "Lista robocza z pierwszego turnieju. Zdjęcia dodamy po przygotowaniu galerii.": "Рабочы спіс з першага турніру. Фота дададзім пасля падрыхтоўкі галерэі.",
  },
  en: {
    "Lasertag Club BAZA — Otwarte gry laser tag Warszawa": "Lasertag Club BAZA — open laser tag games in Warsaw",
    "Turnieje BAZA — Lasertag Club Warszawa": "BAZA Tournaments — Lasertag Club Warsaw",
    "Lasertag Club BAZA Warszawa — otwarte gry laser tag, rankingi graczy, top drużyny, aktualności i Telegram z tłumaczeniem na polski.": "Lasertag Club BAZA Warsaw — open laser tag games, player rankings, top teams, updates and Telegram translation.",
    "Archiwum turniejów Lasertag Club BAZA Warszawa: zespoły, wyniki i najlepsi gracze.": "Lasertag Club BAZA Warsaw tournament archive: teams, results and top players.",
    "Główna nawigacja": "Main navigation",
    "Mobilna nawigacja": "Mobile navigation",
    "Język strony": "Site language",
    "Otwórz menu": "Open menu",
    "Zamknij menu": "Close menu",
    "Gry otwarte": "Open games",
    "Rankingi": "Rankings",
    "Aktualności": "Updates",
    "Kontakt": "Contact",
    "Dołącz": "Join",
    "Powrót": "Back",
    "Warszawa / open games": "Warsaw / open games",
    "Klubowa scena laser tag dla graczy solo, ekip i drużyn. Sprawdź najbliższe gry, zapisz się do składu i śledź rankingi po każdej rundzie.": "A club laser tag scene for solo players, groups and teams. Check upcoming games, join a squad and follow rankings after each round.",
    "Zobacz gry": "See games",
    "Telegram live": "Telegram live",
    "Najbliższa gra otwarta": "Next open game",
    "Środa 18:30": "Wednesday 18:30",
    "Scenariusz": "Scenario",
    "Wiek": "Age",
    "14+ lat": "14+ years",
    "Zapisz się": "Sign up",
    "stałe gry w tygodniu": "weekly regular games",
    "aktywnych graczy": "active players",
    "daty turniejów": "tournament dates",
    "Najważniejsze informacje": "Key information",
    "Środa 18:30 Counter-Strike 6v6": "Wednesday 18:30 Counter-Strike 6v6",
    "Niedziela 18:00 otwarta gra 10+": "Sunday 18:00 open game 10+",
    "Wyjazdowe gry w Telegramie": "Away games on Telegram",
    "Turnieje ogłaszamy w TG": "Tournaments announced in TG",
    "Ranking 05.07.26": "Ranking 05.07.26",
    "według punktów.": "by points.",
    "Wyniki z 12 gier. Karty pokazują miejsce, punkty i miejsce na avatar. Przewijaj ranking po 5 graczy.": "Results from 12 games. Cards show place, points and an avatar slot. Browse the ranking 5 players at a time.",
    "Klasyfikacja graczy": "Player classification",
    "Przewijanie rankingu": "Ranking navigation",
    "Poprzedni gracze": "Previous players",
    "Następni gracze": "Next players",
    "Informacja o zdobywaniu punktów": "Information about earning points",
    "Punkty można zdobyć, wysyłając swój artykuł na lasertagwarsaw@gmail.com albo zdobywając je podczas gry.": "You can earn points by sending your article to lasertagwarsaw@gmail.com or by earning them during a game.",
    "Harmonogram": "Schedule",
    "Najbliższe": "Upcoming",
    "otwarte gry.": "open games.",
    "Stałe gry odbywają się w środę i niedzielę. Wyjazdowe gry oraz turnieje planujemy w czacie Telegram, gdzie publikujemy dokładne daty i zapisy.": "Regular games take place on Wednesday and Sunday. Away games and tournaments are planned in the Telegram chat, where we publish exact dates and registration.",
    "Filtr gier": "Game filter",
    "Wszystkie": "All",
    "Środa": "Wednesday",
    "Niedziela": "Sunday",
    "18:30 / scenariusz Counter-Strike": "18:30 / Counter-Strike scenario",
    "Gra drużynowa 6 na 6 dla graczy od 14 lat. Zapisy solo albo całym składem.": "A 6v6 team game for players aged 14+. Register solo or with a full squad.",
    "wiek graczy": "player age",
    "Dołącz do gry Counter-Strike 6v6": "Join the Counter-Strike 6v6 game",
    "18:00 / otwarta gra": "18:00 / open game",
    "Dla wszystkich chętnych": "For everyone who wants to play",
    "Niedzielna gra otwarta dla nowych i stałych graczy od 10 lat.": "Sunday open game for new and regular players aged 10+.",
    "Dołącz do niedzielnej gry otwartej": "Join the Sunday open game",
    "Wyjazd": "Away",
    "Daty planowane w czacie Telegram": "Dates planned in the Telegram chat",
    "Wyjazdowa gra": "Away game",
    "Terminy, miejsce zbiórki i zasady zapisów podajemy w grupie Telegram.": "Dates, meeting point and registration rules are posted in the Telegram group.",
    "daty w czacie": "dates in chat",
    "Sprawdź wyjazdowe gry w Telegramie": "Check away games on Telegram",
    "Otwórz stronę turniejów": "Open tournaments page",
    "Lip / turniej": "Jul / tournament",
    "Archiwum i daty w Telegramie": "Archive and dates on Telegram",
    "Turnieje BAZA": "BAZA Tournaments",
    "Kliknij ikonę turnieju, aby zobaczyć poprzednie turnieje, zespoły i wyniki.": "Click the tournament icon to see previous tournaments, teams and results.",
    "drużyny 05.07": "teams 05.07",
    "Wyniki": "Results",
    "Zobacz archiwum turniejów": "View tournament archive",
    "Wyniki sezonu": "Season results",
    "Top drużyny": "Top teams",
    "i gracze.": "and players.",
    "Ranking aktualizowany po grach otwartych i meczach ligi. Widok jest gotowy pod późniejsze podłączenie automatycznych statystyk z systemu areny.": "The ranking is updated after open games and league matches. This view is ready for future automatic stats from the arena system.",
    "Sezon letni": "Summer season",
    "pkt": "pts",
    "1280 pkt": "1280 pts",
    "1194 pkt": "1194 pts",
    "1110 pkt": "1110 pts",
    "1042 pkt": "1042 pts",
    "Top gracze": "Top players",
    "K/D + cele": "K/D + objectives",
    "trafienia": "hits",
    "92 trafienia": "92 hits",
    "83 trafienia": "83 hits",
    "baz przejętych": "bases captured",
    "7 baz przejętych": "7 bases captured",
    "Klub": "Club",
    "Nowe aktualizacje na": "New updates at",
    "BAZIE.": "BAZA.",
    "Nowe aktualizacje": "New updates",
    "areny.": "of the arena.",
    "Miejsce na komunikaty dla graczy: stałe gry, wyjazdy, turnieje, zapisy w Telegramie i ważne informacje organizacyjne.": "A place for player announcements: regular games, away games, tournaments, Telegram registration and important organization info.",
    "Środa / 18:30": "Wednesday / 18:30",
    "Counter-Strike 6 na 6 dla graczy 14+": "Counter-Strike 6v6 for players 14+",
    "Stały scenariusz środowy: dwie drużyny, cele taktyczne i zapis solo albo składem.": "Regular Wednesday scenario: two teams, tactical objectives and registration solo or as a squad.",
    "Czytaj artykuł": "Read article",
    "Niedziela / 18:00": "Sunday / 18:00",
    "Otwarta gra dla wszystkich chętnych 10+": "Open game for everyone 10+",
    "Najprostszy wejściowy format dla nowych graczy, rodzin i osób bez własnej drużyny.": "The easiest entry format for new players, families and people without their own team.",
    "Telegram / daty": "Telegram / dates",
    "Wyjazdy i turnieje ogłaszamy w TG": "Away games and tournaments announced in TG",
    "Daty, lokalizacje, regulaminy i listy graczy publikujemy w klubowym czacie Telegram.": "Dates, locations, rules and player lists are published in the club Telegram chat.",
    "Chat graczy": "Player chat",
    "po polsku.": "with translation.",
    "Prototyp integracji pokazuje, jak wiadomości z Telegrama mogą trafiać na stronę i automatycznie wyświetlać polskie tłumaczenie dla lokalnych graczy.": "The integration prototype shows how Telegram messages can appear on the site and automatically display a translation for local players.",
    "Język wiadomości": "Message language",
    "Podgląd chatu Telegram": "Telegram chat preview",
    "auto-translate: PL": "auto-translate: PL",
    "W środę o 18:30 gramy scenariusz Counter-Strike 6 na 6, wiek 14+.": "On Wednesday at 18:30 we play the Counter-Strike 6v6 scenario, age 14+.",
    "W niedzielę o 18:00 otwarta gra dla wszystkich chętnych od 10 lat.": "On Sunday at 18:00 there is an open game for everyone aged 10+.",
    "Daty gier wyjazdowych i turniejów podajemy tutaj w czacie Telegram.": "Away game and tournament dates are posted here in the Telegram chat.",
    "Napisz wiadomość do Telegrama": "Write a Telegram message",
    "Wyślij wiadomość": "Send message",
    "Zapis": "Registration",
    "Wejdź do": "Enter the",
    "gry.": "game.",
    "Postaw plus, wybierz dzień i zostaw dane. Nick pojawi się na stronie, a pełna informacja trafi do organizatora w Telegramie.": "Hit plus, choose the day and leave your details. Your nickname appears on the site, and the full info goes to the organizer on Telegram.",
    "Dzień gry": "Game day",
    "Nick gracza": "Player nickname",
    "Numer telefonu": "Phone number",
    "Informacja dla organizatora": "Info for the organizer",
    "solo / ekipa / pierwszy raz": "solo / squad / first time",
    "Dodaj do listy": "Add to list",
    "Na stronie pokazujemy nick. Telefon wysyłamy tylko do organizatora.": "The site shows only your nickname. The phone number is sent only to the organizer.",
    "Lista jest pusta": "The list is empty",
    "bez notatki": "no note",
    "graczy": "players",
    "Plus dodany.": "Plus added.",
    "Nick pojawił się na liście. Wysyłamy dane do Telegrama.": "The nickname is on the list. Sending details to Telegram.",
    "Telegram wysłany.": "Telegram sent.",
    "Organizator dostał pełne dane gracza.": "The organizer received the full player details.",
    "Plus zapisany na stronie.": "Plus saved on the site.",
    "Telegram endpoint trzeba jeszcze podłączyć na hostingu.": "The Telegram endpoint still needs to be connected on hosting.",
    "Wybierz poziom i zostaw kontakt. Organizator odeśle wolne miejsca oraz link do grupy Telegram.": "Choose a format and leave your contact. The organizer will send available spots and the Telegram group link.",
    "Interesuje mnie": "I am interested in",
    "Środa 18:30 / Counter-Strike 6v6 / 14+": "Wednesday 18:30 / Counter-Strike 6v6 / 14+",
    "Niedziela 18:00 / otwarta gra / 10+": "Sunday 18:00 / open game / 10+",
    "Gra wyjazdowa / daty w Telegramie": "Away game / dates on Telegram",
    "Turniej / daty w Telegramie": "Tournament / dates on Telegram",
    "Numer telefonu albo Telegram": "Phone number or Telegram",
    "Wyślij zgłoszenie": "Send registration",
    "Odpowiadamy zwykle w ciągu 15 minut.": "We usually reply within 15 minutes.",
    "Zgłoszenie przyjęte.": "Registration received.",
    "Wyślemy termin i link do Telegrama.": "We will send the time and Telegram link.",
    "Social": "Social",
    "Lokalizacja": "Location",
    "BAZA / mapa": "BAZA / map",
    "Firma": "Company",
    "Archiwum turniejów": "Tournament archive",
    "Turnieje": "Tournaments",
    "Krótka historia turniejów: wynik, drużyny i top 5 graczy bez powtarzania tych samych danych w kilku miejscach.": "A short tournament history: result, teams and top 5 players without repeating the same data in several places.",
    "W turnieju zagrały 4 drużyny. Zostawiamy najważniejsze informacje: zwycięzcę, listę drużyn i pięciu najlepszych graczy.": "Four teams played in the tournament. We keep the essentials: winner, team list and five best players.",
    "1 miejsce": "1st place",
    "Zwycięska drużyna turnieju z 5 lipca.": "Winning team of the July 5 tournament.",
    "Lista drużyn": "Team list",
    "4 drużyny": "4 teams",
    "2 miejsce": "2nd place",
    "3 miejsce": "3rd place",
    "4 miejsce": "4th place",
    "skład do uzupełnienia": "lineup to be added",
    "Skład Sztorm": "Sztorm lineup",
    "Skład Old Skufs": "Old Skufs lineup",
    "Skład Kometa Strike": "Kometa Strike lineup",
    "Michał": "I love Hot Moms",
    "wynik do uzupełnienia": "result to be added",
    "Najlepsi": "Best",
    "gracze.": "players.",
    "Lista robocza z pierwszego turnieju. Zdjęcia dodamy po przygotowaniu galerii.": "Working list from the first tournament. Photos will be added after the gallery is prepared.",
  },
  uk: {
    "Lasertag Club BAZA — Otwarte gry laser tag Warszawa": "Lasertag Club BAZA — відкриті ігри лазертаг у Варшаві",
    "Turnieje BAZA — Lasertag Club Warszawa": "Турніри BAZA — Lasertag Club Варшава",
    "Lasertag Club BAZA Warszawa — otwarte gry laser tag, rankingi graczy, top drużyny, aktualności i Telegram z tłumaczeniem na polski.": "Lasertag Club BAZA Варшава — відкриті ігри лазертаг, рейтинги гравців, топ команд, новини та Telegram з перекладом.",
    "Archiwum turniejów Lasertag Club BAZA Warszawa: zespoły, wyniki i najlepsi gracze.": "Архів турнірів Lasertag Club BAZA Варшава: команди, результати та найкращі гравці.",
    "Główna nawigacja": "Головна навігація",
    "Mobilna nawigacja": "Мобільна навігація",
    "Język strony": "Мова сайту",
    "Otwórz menu": "Відкрити меню",
    "Zamknij menu": "Закрити меню",
    "Gry otwarte": "Відкриті ігри",
    "Rankingi": "Рейтинги",
    "Aktualności": "Новини",
    "Kontakt": "Контакт",
    "Dołącz": "Приєднатися",
    "Powrót": "Назад",
    "Warszawa / open games": "Варшава / відкриті ігри",
    "Klubowa scena laser tag dla graczy solo, ekip i drużyn. Sprawdź najbliższe gry, zapisz się do składu i śledź rankingi po każdej rundzie.": "Клубна сцена лазертагу для соло-гравців, компаній і команд. Перевіряй найближчі ігри, записуйся до складу і стеж за рейтингами після кожного раунду.",
    "Zobacz gry": "Дивитися ігри",
    "Telegram live": "Telegram live",
    "Najbliższa gra otwarta": "Найближча відкрита гра",
    "Środa 18:30": "Середа 18:30",
    "Scenariusz": "Сценарій",
    "Wiek": "Вік",
    "14+ lat": "14+ років",
    "Zapisz się": "Записатися",
    "stałe gry w tygodniu": "постійні ігри на тиждень",
    "aktywnych graczy": "активних гравців",
    "daty turniejów": "дати турнірів",
    "Najważniejsze informacje": "Головна інформація",
    "Środa 18:30 Counter-Strike 6v6": "Середа 18:30 Counter-Strike 6v6",
    "Niedziela 18:00 otwarta gra 10+": "Неділя 18:00 відкрита гра 10+",
    "Wyjazdowe gry w Telegramie": "Виїзні ігри в Telegram",
    "Turnieje ogłaszamy w TG": "Турніри оголошуємо в TG",
    "Ranking 05.07.26": "Рейтинг 05.07.26",
    "według punktów.": "за балами.",
    "Wyniki z 12 gier. Karty pokazują miejsce, punkty i miejsce na avatar. Przewijaj ranking po 5 graczy.": "Результати з 12 ігор. Картки показують місце, бали та місце для аватара. Гортай рейтинг по 5 гравців.",
    "Klasyfikacja graczy": "Класифікація гравців",
    "Przewijanie rankingu": "Гортання рейтингу",
    "Poprzedni gracze": "Попередні гравці",
    "Następni gracze": "Наступні гравці",
    "Informacja o zdobywaniu punktów": "Інформація про отримання балів",
    "Punkty można zdobyć, wysyłając swój artykuł na lasertagwarsaw@gmail.com albo zdobywając je podczas gry.": "Бали можна отримати, надіславши свою статтю на lasertagwarsaw@gmail.com або набравши їх під час гри.",
    "Harmonogram": "Розклад",
    "Najbliższe": "Найближчі",
    "otwarte gry.": "відкриті ігри.",
    "Stałe gry odbywają się w środę i niedzielę. Wyjazdowe gry oraz turnieje planujemy w czacie Telegram, gdzie publikujemy dokładne daty i zapisy.": "Постійні ігри проходять у середу та неділю. Виїзні ігри й турніри плануємо в Telegram-чаті, де публікуємо точні дати та запис.",
    "Filtr gier": "Фільтр ігор",
    "Wszystkie": "Усі",
    "Środa": "Середа",
    "Niedziela": "Неділя",
    "18:30 / scenariusz Counter-Strike": "18:30 / сценарій Counter-Strike",
    "Gra drużynowa 6 na 6 dla graczy od 14 lat. Zapisy solo albo całym składem.": "Командна гра 6 на 6 для гравців від 14 років. Запис соло або всім складом.",
    "wiek graczy": "вік гравців",
    "Dołącz do gry Counter-Strike 6v6": "Приєднатися до гри Counter-Strike 6v6",
    "18:00 / otwarta gra": "18:00 / відкрита гра",
    "Dla wszystkich chętnych": "Для всіх охочих",
    "Niedzielna gra otwarta dla nowych i stałych graczy od 10 lat.": "Недільна відкрита гра для нових і постійних гравців від 10 років.",
    "Dołącz do niedzielnej gry otwartej": "Приєднатися до недільної відкритої гри",
    "Wyjazd": "Виїзд",
    "Daty planowane w czacie Telegram": "Дати плануються в Telegram-чаті",
    "Wyjazdowa gra": "Виїзна гра",
    "Terminy, miejsce zbiórki i zasady zapisów podajemy w grupie Telegram.": "Терміни, місце збору та правила запису повідомляємо в групі Telegram.",
    "daty w czacie": "дати в чаті",
    "Sprawdź wyjazdowe gry w Telegramie": "Перевірити виїзні ігри в Telegram",
    "Otwórz stronę turniejów": "Відкрити сторінку турнірів",
    "Lip / turniej": "лип / турнір",
    "Archiwum i daty w Telegramie": "Архів і дати в Telegram",
    "Turnieje BAZA": "Турніри BAZA",
    "Kliknij ikonę turnieju, aby zobaczyć poprzednie turnieje, zespoły i wyniki.": "Натисни іконку турніру, щоб побачити попередні турніри, команди та результати.",
    "drużyny 05.07": "команди 05.07",
    "Wyniki": "Результати",
    "Zobacz archiwum turniejów": "Дивитися архів турнірів",
    "Wyniki sezonu": "Результати сезону",
    "Top drużyny": "Топ команд",
    "i gracze.": "і гравці.",
    "Ranking aktualizowany po grach otwartych i meczach ligi. Widok jest gotowy pod późniejsze podłączenie automatycznych statystyk z systemu areny.": "Рейтинг оновлюється після відкритих ігор і матчів ліги. Розділ готовий до майбутнього підключення автоматичної статистики з системи арени.",
    "Sezon letni": "Літній сезон",
    "pkt": "оч.",
    "1280 pkt": "1280 оч.",
    "1194 pkt": "1194 оч.",
    "1110 pkt": "1110 оч.",
    "1042 pkt": "1042 оч.",
    "Top gracze": "Топ гравців",
    "K/D + cele": "K/D + цілі",
    "trafienia": "влучань",
    "92 trafienia": "92 влучання",
    "83 trafienia": "83 влучання",
    "baz przejętych": "баз захоплено",
    "7 baz przejętych": "7 баз захоплено",
    "Klub": "Клуб",
    "Nowe aktualizacje na": "Нові оновлення на",
    "BAZIE.": "BAZIE.",
    "Nowe aktualizacje": "Нові оновлення",
    "areny.": "арени.",
    "Miejsce na komunikaty dla graczy: stałe gry, wyjazdy, turnieje, zapisy w Telegramie i ważne informacje organizacyjne.": "Місце для повідомлень гравцям: постійні ігри, виїзди, турніри, запис у Telegram і важлива організаційна інформація.",
    "Środa / 18:30": "Середа / 18:30",
    "Counter-Strike 6 na 6 dla graczy 14+": "Counter-Strike 6 на 6 для гравців 14+",
    "Stały scenariusz środowy: dwie drużyny, cele taktyczne i zapis solo albo składem.": "Постійний сценарій щосереди: дві команди, тактичні цілі та запис соло або складом.",
    "Czytaj artykuł": "Читати статтю",
    "Niedziela / 18:00": "Неділя / 18:00",
    "Otwarta gra dla wszystkich chętnych 10+": "Відкрита гра для всіх охочих 10+",
    "Najprostszy wejściowy format dla nowych graczy, rodzin i osób bez własnej drużyny.": "Найпростіший формат входу для нових гравців, сімей і людей без власної команди.",
    "Telegram / daty": "Telegram / дати",
    "Wyjazdy i turnieje ogłaszamy w TG": "Виїзди й турніри оголошуємо в TG",
    "Daty, lokalizacje, regulaminy i listy graczy publikujemy w klubowym czacie Telegram.": "Дати, локації, регламенти та списки гравців публікуємо в клубному Telegram-чаті.",
    "Chat graczy": "Чат гравців",
    "po polsku.": "з перекладом.",
    "Prototyp integracji pokazuje, jak wiadomości z Telegrama mogą trafiać na stronę i automatycznie wyświetlać polskie tłumaczenie dla lokalnych graczy.": "Прототип інтеграції показує, як повідомлення з Telegram можуть потрапляти на сайт і автоматично показувати переклад для місцевих гравців.",
    "Język wiadomości": "Мова повідомлень",
    "Podgląd chatu Telegram": "Попередній перегляд Telegram-чату",
    "auto-translate: PL": "автопереклад: PL",
    "W środę o 18:30 gramy scenariusz Counter-Strike 6 na 6, wiek 14+.": "У середу о 18:30 граємо сценарій Counter-Strike 6 на 6, вік 14+.",
    "W niedzielę o 18:00 otwarta gra dla wszystkich chętnych od 10 lat.": "У неділю о 18:00 відкрита гра для всіх охочих від 10 років.",
    "Daty gier wyjazdowych i turniejów podajemy tutaj w czacie Telegram.": "Дати виїзних ігор і турнірів повідомляємо тут, у Telegram-чаті.",
    "Napisz wiadomość do Telegrama": "Написати повідомлення в Telegram",
    "Wyślij wiadomość": "Надіслати повідомлення",
    "Zapis": "Запис",
    "Wejdź do": "Увійти в",
    "gry.": "гру.",
    "Postaw plus, wybierz dzień i zostaw dane. Nick pojawi się na stronie, a pełna informacja trafi do organizatora w Telegramie.": "Постав плюс, обери день і залиш дані. Нік з'явиться на сайті, а повна інформація піде організатору в Telegram.",
    "Dzień gry": "День гри",
    "Nick gracza": "Нік гравця",
    "Numer telefonu": "Номер телефону",
    "Informacja dla organizatora": "Інформація для організатора",
    "solo / ekipa / pierwszy raz": "соло / команда / перший раз",
    "Dodaj do listy": "Додати до списку",
    "Na stronie pokazujemy nick. Telefon wysyłamy tylko do organizatora.": "На сайті показуємо нік. Телефон надсилаємо тільки організатору.",
    "Lista jest pusta": "Список порожній",
    "bez notatki": "без нотатки",
    "graczy": "гравців",
    "Plus dodany.": "Плюс додано.",
    "Nick pojawił się na liście. Wysyłamy dane do Telegrama.": "Нік з'явився у списку. Надсилаємо дані в Telegram.",
    "Telegram wysłany.": "Telegram надіслано.",
    "Organizator dostał pełne dane gracza.": "Організатор отримав повні дані гравця.",
    "Plus zapisany na stronie.": "Плюс збережено на сайті.",
    "Telegram endpoint trzeba jeszcze podłączyć na hostingu.": "Telegram endpoint ще треба підключити на хостингу.",
    "Wybierz poziom i zostaw kontakt. Organizator odeśle wolne miejsca oraz link do grupy Telegram.": "Обери формат і залиш контакт. Організатор надішле вільні місця та посилання на групу Telegram.",
    "Interesuje mnie": "Мене цікавить",
    "Środa 18:30 / Counter-Strike 6v6 / 14+": "Середа 18:30 / Counter-Strike 6v6 / 14+",
    "Niedziela 18:00 / otwarta gra / 10+": "Неділя 18:00 / відкрита гра / 10+",
    "Gra wyjazdowa / daty w Telegramie": "Виїзна гра / дати в Telegram",
    "Turniej / daty w Telegramie": "Турнір / дати в Telegram",
    "Numer telefonu albo Telegram": "Номер телефону або Telegram",
    "Wyślij zgłoszenie": "Надіслати заявку",
    "Odpowiadamy zwykle w ciągu 15 minut.": "Зазвичай відповідаємо протягом 15 хвилин.",
    "Zgłoszenie przyjęte.": "Заявку прийнято.",
    "Wyślemy termin i link do Telegrama.": "Надішлемо час гри та посилання на Telegram.",
    "Social": "Соцмережі",
    "Lokalizacja": "Локація",
    "BAZA / mapa": "BAZA / мапа",
    "Firma": "Компанія",
    "Archiwum turniejów": "Архів турнірів",
    "Turnieje": "Турніри",
    "Krótka historia turniejów: wynik, drużyny i top 5 graczy bez powtarzania tych samych danych w kilku miejscach.": "Коротка історія турнірів: результат, команди й топ-5 гравців без повторення тих самих даних.",
    "W turnieju zagrały 4 drużyny. Zostawiamy najważniejsze informacje: zwycięzcę, listę drużyn i pięciu najlepszych graczy.": "У турнірі зіграли 4 команди. Залишаємо головне: переможця, список команд і п'ять найкращих гравців.",
    "1 miejsce": "1 місце",
    "Zwycięska drużyna turnieju z 5 lipca.": "Команда-переможець турніру 5 липня.",
    "Lista drużyn": "Список команд",
    "4 drużyny": "4 команди",
    "2 miejsce": "2 місце",
    "3 miejsce": "3 місце",
    "4 miejsce": "4 місце",
    "skład do uzupełnienia": "склад буде додано",
    "Skład Sztorm": "Склад Sztorm",
    "Skład Old Skufs": "Склад Old Skufs",
    "Skład Kometa Strike": "Склад Kometa Strike",
    "wynik do uzupełnienia": "результат буде додано",
    "Najlepsi": "Найкращі",
    "gracze.": "гравці.",
    "Lista robocza z pierwszego turnieju. Zdjęcia dodamy po przygotowaniu galerii.": "Робочий список з першого турніру. Фото додамо після підготовки галереї.",
  },
};

const updateArticleCopy = {
  be: {
    "Telegram + YouTube": "Telegram + YouTube",
    "Dołącz do": "Далучайся да",
    "społeczności.": "супольнасці.",
    "Najważniejsze terminy, zapisy i szybkie komunikaty trzymamy w Telegramie. Klimat gier, akcję z kamery i życie BAZY pokazujemy na kanale YouTube.": "Галоўныя даты, запісы і хуткія паведамленні трымаем у Telegram. Атмасферу гульняў, экшн з камеры і жыццё BAZY паказваем на YouTube-канале.",
    "Otwórz Telegram": "Адкрыць Telegram",
    "YouTube Lasertag Warsaw": "YouTube Lasertag Warsaw",
    "Odtwórz film na YouTube": "Прайграць відэа на YouTube",
    "YouTube / Lasertag Warsaw": "YouTube / Lasertag Warsaw",
    "Zobacz grę z perspektywy gracza": "Паглядзі гульню вачыма гульца",
    "Materiał z otwartej gry pokazuje tempo, komunikację i atmosferę naszej areny. To najlepszy szybki podgląd tego, co czeka Cię na BAZIE.": "Матэрыял з адкрытай гульні паказвае тэмп, камунікацыю і атмасферу нашай арэны. Гэта найлепшы кароткі погляд на тое, што чакае цябе на BAZIE.",
    "Otwórz film": "Адкрыць відэа",
    "Otwórz kanał": "Адкрыць канал",
    "Środowe gry są przygotowane dla osób, które chcą grać bardziej taktycznie: komunikacja, cele rundy i praca drużynowa są ważniejsze niż przypadkowe bieganie po arenie.": "Серадовыя гульні падрыхтаваныя для тых, хто хоча гуляць больш тактычна: камунікацыя, мэты раўнда і камандная праца важнейшыя за выпадковае беганне па арэне.",
    "Niedziela jest najlepszym startem dla nowych graczy: można przyjść solo, z rodziną albo znajomymi, a organizator pomaga dobrać drużyny i wyjaśnia zasady przed grą.": "Нядзеля - найлепшы старт для новых гульцоў: можна прыйсці аднаму, з сям'ёй або сябрамі, а арганізатар дапаможа падабраць каманды і растлумачыць правілы перад гульнёй.",
    "Telegram zostaje głównym miejscem szybkich komunikatów: tam pojawiają się zapisy, zmiany terminów, wyjazdy, turnieje oraz listy graczy przed wydarzeniami.": "Telegram застаецца галоўным месцам хуткіх паведамленняў: там з'яўляюцца запісы, змены дат, выезды, турніры і спісы гульцоў перад падзеямі.",
    "Technologia / BAZA": "Тэхналогія / BAZA",
    "Nowa era laserowego paintballa w Lasertag Warsaw": "Новая эра лазернага пейнтбола ў Lasertag Warsaw",
    "Największa aktualizacja w historii naszej areny: statystyki w czasie rzeczywistym, efekty dźwiękowe jak w FPS-ach i nowe scenariusze rozgrywek.": "Найбуйнейшае абнаўленне ў гісторыі нашай арэны: статыстыка ў рэальным часе, гукавыя эфекты як у FPS і новыя сцэнары гульні.",
    "Technologia zmienia sposób, w jaki gramy. Dlatego w Lasertag Warsaw wprowadziliśmy największą aktualizację w historii naszej areny, która przenosi rozgrywkę na zupełnie nowy poziom.": "Тэхналогія змяняе тое, як мы гуляем. Таму ў Lasertag Warsaw мы ўвялі найбуйнейшае абнаўленне ў гісторыі нашай арэны, якое выводзіць гульню на зусім новы ўзровень.",
    "Statystyki w czasie rzeczywistym": "Статыстыка ў рэальным часе",
    "Nasza arena została pokryta dedykowaną siecią Wi-Fi, dzięki której całe wyposażenie komunikuje się w czasie rzeczywistym. Oznacza to, że gracze mogą na bieżąco śledzić swoje wyniki i statystyki podczas rozgrywki.": "Наша арэна пакрытая асобнай Wi-Fi сеткай, дзякуючы якой усё абсталяванне камунікуе ў рэальным часе. Гэта значыць, што гульцы могуць адразу сачыць за сваімі вынікамі і статыстыкай падчас гульні.",
    "To rozwiązanie otwiera zupełnie nowe możliwości - od dokładniejszej analizy własnej gry po jeszcze bardziej dynamiczne scenariusze i wydarzenia na polu walki.": "Гэта рашэнне адкрывае зусім новыя магчымасці - ад дакладнейшага аналізу ўласнай гульні да яшчэ больш дынамічных сцэнарыяў і падзей на полі бою.",
    "Efekty dźwiękowe jak w grach komputerowych": "Гукавыя эфекты як у камп'ютарных гульнях",
    "Każda eliminacja dostarcza jeszcze większych emocji. System rozpoznaje wyjątkowe osiągnięcia i odtwarza komunikaty głosowe znane z najpopularniejszych gier FPS.": "Кожнае выключэнне з гульні дае яшчэ больш эмоцый. Сістэма распазнае асаблівыя дасягненні і прайгравае галасавыя паведамленні, вядомыя з папулярных FPS-гульняў.",
    "Double Kill, Triple Kill, Killing Spree i wiele innych efektów sprawiają, że każda akcja daje jeszcze większą satysfakcję i pozwala poczuć klimat profesjonalnej gry komputerowej.": "Double Kill, Triple Kill, Killing Spree і шмат іншых эфектаў робяць кожную акцыю яшчэ больш задавальняльнай і дазваляюць адчуць атмасферу прафесійнай камп'ютарнай гульні.",
    "Zdjęcia nowego systemu gry": "Фота новай гульнявой сістэмы",
    "Nowe scenariusze rozgrywek": "Новыя сцэнары гульняў",
    "Aktualizacja umożliwiła stworzenie zupełnie nowych trybów gry.": "Абнаўленне дазволіла стварыць зусім новыя рэжымы гульні.",
    "Jednym z nich jest scenariusz inspirowany klasycznym trybem podkładania bomby. Drużyny muszą współpracować, aby podłożyć lub rozbroić bombę, a cały przebieg rozgrywki uzupełniają realistyczne komunikaty głosowe oraz odliczanie czasu, dzięki czemu żaden uczestnik nie przegapi najważniejszych wydarzeń.": "Адзін з іх - сцэнар, натхнёны класічным рэжымам закладкі бомбы. Каманды павінны супрацоўнічаць, каб закласці або размінаваць бомбу, а гульню дапаўняюць рэалістычныя галасавыя паведамленні і адлік часу, каб ніхто не прапусціў галоўныя падзеі.",
    "To jednak dopiero początek. System pozwala nam stale rozwijać kolejne scenariusze oraz dodawać nowe mechaniki, które wcześniej nie były możliwe do zrealizowania.": "Але гэта толькі пачатак. Сістэма дазваляе нам пастаянна развіваць новыя сцэнары і дадаваць механікі, якія раней немагчыма было рэалізаваць.",
    "Jeszcze większa immersja": "Яшчэ большая імерсія",
    "Naszym celem było stworzenie rozgrywki, która daje emocje porównywalne z najlepszymi grami komputerowymi, jednocześnie pozostając aktywnością na świeżym powietrzu.": "Нашай мэтай было стварыць гульню з эмоцыямі, параўнальнымі з лепшымі камп'ютарнымі гульнямі, але пры гэтым пакінуць яе актыўнасцю на свежым паветры.",
    "Połączenie nowoczesnego sprzętu, inteligentnego systemu komunikacji, realistycznych efektów dźwiękowych i zaawansowanych scenariuszy sprawia, że gracze mogą całkowicie zanurzyć się w świecie laserowego paintballa.": "Спалучэнне сучаснага абсталявання, разумнай сістэмы камунікацыі, рэалістычных гукавых эфектаў і прасунутых сцэнарыяў дазваляе гульцам цалкам занурыцца ў свет лазернага пейнтбола.",
    "Technologia, której nie znajdziesz nigdzie indziej": "Тэхналогія, якой няма нідзе больш",
    "To rozwiązanie jest efektem wielu miesięcy pracy nad infrastrukturą naszej areny i konfiguracją całego systemu. Dzięki własnej sieci Wi-Fi oraz najnowszej generacji sprzętu możemy oferować funkcje, które do tej pory były dostępne jedynie w grach komputerowych.": "Гэта рашэнне - вынік многіх месяцаў працы над інфраструктурай арэны і канфігурацыяй усёй сістэмы. Дзякуючы ўласнай Wi-Fi сетцы і абсталяванню новага пакалення мы можам прапаноўваць функцыі, якія раней былі даступныя толькі ў камп'ютарных гульнях.",
    "Nieustannie rozwijamy naszą bazę i już pracujemy nad kolejnymi nowościami, które jeszcze bardziej zwiększą realizm i interaktywność rozgrywek.": "Мы пастаянна развіваем нашу базу і ўжо працуем над наступнымі навінкамі, якія яшчэ больш павялічаць рэалізм і інтэрактыўнасць гульняў.",
    "Jeżeli chcesz przekonać się, jak wygląda laserowy paintball nowej generacji, zapraszamy do Lasertag Warsaw. Przyjdź ze swoją drużyną i sprawdź, jak wygląda przyszłość aktywnej rozrywki.": "Калі хочаш убачыць, як выглядае лазерны пейнтбол новага пакалення, запрашаем у Lasertag Warsaw. Прыходзь са сваёй камандай і правер, як выглядае будучыня актыўных забаў.",
    "Turniej / 5 lipca": "Турнір / 5 ліпеня",
    "Turniej Open Lasertag - emocje do ostatniego meczu!": "Турнір Open Lasertag - эмоцыі да апошняга матча!",
    "Cztery pięcioosobowe drużyny, nowy scenariusz CS, zacięta walka do końca i zwycięstwo Hard Skill prowadzonego przez Shveda.": "Чатыры каманды па пяць чалавек, новы сцэнар CS, напружаная барацьба да канца і перамога Hard Skill пад кіраўніцтвам Shveda.",
    "5 lipca na bazie Lasertag Warsaw odbył się kolejny turniej Open Lasertag, który zgromadził cztery pięcioosobowe drużyny. Do rywalizacji stanęły trzy zespoły z Warszawy oraz jedna drużyna z Gdańska, a poziom rozgrywek od pierwszego meczu zapowiadał niezwykle wyrównaną walkę.": "5 ліпеня на базе Lasertag Warsaw адбыўся чарговы турнір Open Lasertag, які сабраў чатыры каманды па пяць чалавек. У барацьбу ўступілі тры каманды з Варшавы і адна з Гданьска, а ўзровень гульняў з першага матча абяцаў вельмі роўнае супрацьстаянне.",
    "Nowy scenariusz CS": "Новы сцэнар CS",
    "Tegoroczny turniej był wyjątkowy nie tylko ze względu na wysoki poziom zawodników, ale również dlatego, że uczestnicy po raz pierwszy zmierzyli się w nowym scenariuszu CS, inspirowanym klasycznymi rozgrywkami Counter-Strike.": "Сёлетні турнір быў асаблівым не толькі праз высокі ўзровень гульцоў, але і таму, што ўдзельнікі ўпершыню згулялі ў новым сцэнары CS, натхнёным класічнымі матчамі Counter-Strike.",
    "Oprócz niego drużyny rywalizowały również w dynamicznych scenariuszach biegowych, wymagających doskonałej współpracy, szybkiego podejmowania decyzji i skutecznej komunikacji.": "Акрамя яго, каманды спаборнічалі ў дынамічных бегавых сцэнарах, якія патрабавалі выдатнага супрацоўніцтва, хуткіх рашэнняў і эфектыўнай камунікацыі.",
    "Hard Skill wygrywa turniej": "Hard Skill выйграе турнір",
    "Po serii niezwykle zaciętych spotkań zwycięstwo wywalczyła drużyna Hard Skill, prowadzona przez Shveda, zdobywając 140 punktów w klasyfikacji końcowej całego turnieju.": "Пасля серыі надзвычай напружаных сустрэч перамогу здабыла каманда Hard Skill пад кіраўніцтвам Shveda, набраўшы 140 пунктаў у выніковай класіфікацыі турніру.",
    "Drugie miejsce zajęła drużyna Sztorm z Gdańska. Goście byli bardzo blisko zwycięstwa i do pierwszego miejsca zabrakło im naprawdę niewiele. Ich świetna gra pokazała, że poziom rywalizacji w polskim laserowym paintballu stale rośnie.": "Другое месца заняла каманда Sztorm з Гданьска. Госці былі вельмі блізкія да перамогі, і да першага месца ім не хапіла зусім крыху. Іх выдатная гульня паказала, што ўзровень польскага лазернага пейнтбола пастаянна расце.",
    "Jeśli chcesz wygrywać z najlepszymi, musisz pojawiać się na środowych treningach.": "Калі хочаш перамагаць найлепшых, трэба прыходзіць на серадовыя трэніроўкі.",
    "Trening robi różnicę": "Трэніроўкі робяць розніцу",
    "Po zakończeniu turnieju wielu zawodników zgodnie podkreślało, że regularne treningi pozwalają doskonalić komunikację, taktykę oraz zgranie drużyny, które często decydują o zwycięstwie w najbardziej wyrównanych meczach.": "Пасля заканчэння турніру многія гульцы аднадушна падкрэслівалі, што рэгулярныя трэніроўкі дапамагаюць удасканальваць камунікацыю, тактыку і згулянасць каманды, якія часта вырашаюць вынік самых роўных матчаў.",
    "Gratulujemy wszystkim uczestnikom za sportową rywalizację, świetną atmosferę oraz widowiskowe akcje na polu walki. Dziękujemy również drużynie z Gdańska za przyjazd i stworzenie fantastycznego widowiska.": "Віншуем усіх удзельнікаў са спартыўнай барацьбой, цудоўнай атмасферай і відовішчнымі дзеяннямі на полі бою. Таксама дзякуем камандзе з Гданьска за прыезд і фантастычнае відовішча.",
    "Analiza spotkań już wkrótce": "Аналіз матчаў ужо хутка",
    "Już wkrótce w zakładce Turniej pojawi się szczegółowa analiza wszystkich spotkań przygotowana przez naszego stałego komentatora. Będzie można znaleźć tam omówienie najciekawszych akcji, decyzji taktycznych oraz kluczowych momentów, które przesądziły o końcowej klasyfikacji.": "Ужо хутка ў раздзеле Турнір з'явіцца падрабязны аналіз усіх сустрэч, падрыхтаваны нашым пастаянным каментатарам. Там можна будзе знайсці разбор самых цікавых акцый, тактычных рашэнняў і ключавых момантаў, якія вырашылі выніковую класіфікацыю.",
    "Do zobaczenia na kolejnych turniejach oraz środowych treningach w Lasertag Warsaw!": "Да сустрэчы на наступных турнірах і серадовых трэніроўках у Lasertag Warsaw!",
    "Opinia gracza / JAK": "Водгук гульца / JAK",
    "Opinia gracza po turnieju Open Lasertag": "Водгук гульца пасля турніру Open Lasertag",
    "JAK opowiada o nowym sprzęcie, scenariuszu CS, ustawieniach turniejowych i tym, dlaczego po latach gry trzeba nauczyć się kilku rzeczy od nowa.": "JAK распавядае пра новае абсталяванне, сцэнар CS, турнірныя налады і пра тое, чаму пасля гадоў гульні трэба навучыцца некаторым рэчам нанова.",
    "Po zakończeniu turnieju Open Lasertag poprosiliśmy jednego z uczestników o podzielenie się wrażeniami na temat nowego sprzętu i ustawień gry. Poniżej publikujemy opinię gracza o nicku JAK.": "Пасля завяршэння турніру Open Lasertag мы папрасілі аднаго з удзельнікаў падзяліцца ўражаннямі пра новае абсталяванне і налады гульні. Ніжэй публікуем водгук гульца з нікам JAK.",
    "Dla JAK był to szczególny powrót: to dopiero jego trzecia gra w ciągu ostatnich sześciu lat, choć wcześniej grał regularnie przez około dziesięć lat bez przerwy. Dzięki temu jego opinia łączy perspektywę doświadczonego zawodnika i gracza, który na nowo wchodzi w system.": "Для JAK гэта было асаблівае вяртанне: гэта толькі яго трэцяя гульня за апошнія шэсць гадоў, хоць раней ён рэгулярна гуляў каля дзесяці гадоў без перапынку. Таму яго меркаванне аб'ядноўвае погляд дасведчанага гульца і чалавека, які зноў уваходзіць у сістэму.",
    "Szczerze mówiąc, spodziewałem się, że po całym dniu biegania nogi będą bolały dużo bardziej. Ostatecznie było całkiem normalnie, chociaż turniej naprawdę był bardzo intensywny.": "Шчыра кажучы, я чакаў, што пасля цэлага дня бегу ногі будуць балець значна мацней. У выніку ўсё было цалкам нармальна, хоць турнір сапраўды быў вельмі інтэнсіўны.",
    "Scenariusz CS z bombą": "Сцэнар CS з бомбай",
    "Jednym z najbardziej zapamiętanych momentów był dla JAK nowy scenariusz CS z podkładaniem bomby.": "Адным з найбольш запамінальных момантаў для JAK стаў новы сцэнар CS з закладкай бомбы.",
    "Do tej pory nie rozumiem, jak udało mi się podłożyć bombę. Drużyna świetnie wyczyściła teren, a ja przebiegłem przez otwartą przestrzeń i nie dostałem ani jednego trafienia. To było szczególnie dziwne po wcześniejszych meczach, gdzie przeciwnicy trafiali mnie nawet zza przeszkód.": "Дагэтуль не разумею, як мне ўдалося закласці бомбу. Каманда выдатна зачысціла тэрыторыю, а я прабег праз адкрытую прастору і не атрымаў ніводнага траплення. Гэта было асабліва дзіўна пасля папярэдніх матчаў, дзе мяне даставалі нават за перашкодамі.",
    "Nowe ustawienia i pierwsze wrażenia": "Новыя налады і першыя ўражанні",
    "Nowe ustawienia wywołały sporo rozmów wśród uczestników turnieju.": "Новыя налады выклікалі шмат размоў сярод удзельнікаў турніру.",
    "Na początku było nietypowo. Ustawienia były nowe dla wszystkich i myślę, że większość graczy będzie potrzebowała czasu, żeby się do nich przyzwyczaić.": "Спачатку было нязвыкла. Налады былі новыя для ўсіх, і думаю, што большасці гульцоў спатрэбіцца час, каб да іх прывыкнуць.",
    "JAK podzielił się też pierwszymi obserwacjami dotyczącymi broni używanej podczas gry.": "JAK таксама падзяліўся першымі назіраннямі наконт зброі, якая выкарыстоўвалася падчас гульні.",
    "Jeśli patrzeć na statystyki, nie zauważyłem dużej różnicy między zielonymi i niebieskimi karabinami. Ale kiedy trafiała mi się niebieska dziesiątka, grało mi się wyraźnie lepiej. Być może po prostu ta broń była dla mnie wygodniejsza.": "Калі глядзець па статыстыцы, я не заўважыў вялікай розніцы паміж зялёнымі і сінімі аўтаматамі. Але калі мне траплялася сіняя дзясятка, гулялася прыкметна лепш. Магчыма, проста гэтая зброя была для мяне больш зручнай.",
    "Trafienia, opóźnienia i sytuacje z pola": "Трапленні, затрымкі і сітуацыі на полі",
    "Podczas turnieju pojawiały się momenty, które na pierwszy rzut oka mogły wyglądać jak błędy sprzętu.": "Падчас турніру ўзнікалі моманты, якія на першы погляд маглі выглядаць як памылкі абсталявання.",
    "Czasami miałem wrażenie, że dźwięk trafienia i reakcja broni były lekko rozsynchronizowane. Zdarzało się, że słyszałem jedno trafienie, a na wyświetlaczu zostawała inna liczba żyć. Kilka razy wydawało mi się, że zostałem wyeliminowany już po schowaniu się za osłonę. Później zrozumiałem, że decydujący strzał najpewniej padł jeszcze zanim całkowicie zniknąłem za przeszkodą, a informacja dotarła do broni z niewielkim opóźnieniem.": "Часам у мяне было адчуванне, што гук траплення і рэакцыя зброі былі крыху рассінхранізаваныя. Бывала, чуеш адно трапленне, а на дысплеі застаецца іншая колькасць жыццяў. Некалькі разоў здавалася, што мяне выбілі ўжо пасля таго, як я схаваўся за ўкрыццё. Пазней я зразумеў, што вырашальны стрэл, хутчэй за ўсё, быў зроблены яшчэ да таго, як я цалкам знік за перашкодай, а інфармацыя дайшла да зброі з невялікай затрымкай.",
    "Według gracza wiele takich sytuacji wynikało z tego, że do jednego celu strzelało jednocześnie kilku przeciwników.": "Паводле гульца, шмат такіх сітуацый узнікала таму, што па адной мэце адначасова стралялі некалькі супернікаў.",
    "Bardzo łatwo obwinić sprzęt, ale po analizie sytuacji często okazuje się, że ktoś strzelał do ciebie równocześnie z innej pozycji.": "Вельмі лёгка абвінаваціць абсталяванне, але пасля аналізу сітуацыі часта высвятляецца, што па табе адначасова стралялі яшчэ з іншай пазіцыі.",
    "Gra zza osłon": "Гульня з-за ўкрыццяў",
    "Nie zabrakło również uwag dotyczących pojedynków przy przeszkodach.": "Не абышлося і без заўваг адносна дуэляў каля перашкод.",
    "Czasami widziałem tylko wystawiony karabin przeciwnika, strzelałem w niego, ale trafienia się nie naliczały. Po chwili przeciwnik wychylał się mocniej, otwierał ogień i trafiał już mnie. Do tego też trzeba się przyzwyczaić i zrozumieć specyfikę nowego systemu.": "Часам я бачыў толькі выстаўлены аўтамат суперніка, страляў у яго, але трапленні не залічваліся. Праз хвіліну супернік выглядаў мацней, адкрываў агонь і ўжо трапляў у мяне. Да гэтага таксама трэба прывыкнуць і зразумець асаблівасці новай сістэмы.",
    "Potencjał nowego sprzętu": "Патэнцыял новага абсталявання",
    "Pomimo kilku uwag końcowa ocena nowego wyposażenia była bardzo pozytywna.": "Нягледзячы на некалькі заўваг, выніковая ацэнка новага абсталявання была вельмі станоўчая.",
    "Moim zdaniem ten sprzęt ma ogromny potencjał. Tak, niektóre rzeczy trzeba jeszcze dopracować, ale najważniejsze jest to, że my, gracze, sami musimy nauczyć się grać na nowo. Przez lata wyrobiły się pewne odruchy: intuicyjnie wiedziałem, jak prowadzić pojedynek, liczyłem amunicję w głowie i rozumiałem, jak ograć przeciwnika. Teraz te przyzwyczajenia trzeba przebudować. To zajmie czas, ale właśnie dzięki temu gra znowu wydaje się świeża, ciekawa i motywuje do dalszego rozwoju.": "На мой погляд, у гэтага абсталявання вялізны патэнцыял. Так, некаторыя рэчы яшчэ трэба дапрацаваць, але галоўнае тое, што мы, гульцы, самі павінны навучыцца гуляць нанова. За гады ў мяне выпрацаваліся пэўныя рэфлексы: я інтуітыўна ведаў, як весці дуэль, лічыў боепрыпасы ў галаве і разумеў, як перайграць суперніка. Цяпер гэтыя звычкі трэба перабудаваць. Гэта зойме час, але менавіта дзякуючы гэтаму гульня зноў здаецца свежай, цікавай і матывуе развівацца далей.",
    "Wniosek JAK": "Выснова JAK",
    "Wszyscy graliśmy w takich samych warunkach. Trzeba po prostu częściej przyjeżdżać na treningi, przyzwyczajać się do nowego sprzętu i stawać się silniejszym.": "Мы ўсе гулялі ў аднолькавых умовах. Трэба проста часцей прыязджаць на трэніроўкі, прывыкаць да новага абсталявання і станавіцца мацнейшым.",
  },
  en: {
    "Telegram + YouTube": "Telegram + YouTube",
    "Dołącz do": "Join the",
    "społeczności.": "community.",
    "Najważniejsze terminy, zapisy i szybkie komunikaty trzymamy w Telegramie. Klimat gier, akcję z kamery i życie BAZY pokazujemy na kanale YouTube.": "We keep the key dates, signups and quick announcements on Telegram. The atmosphere of the games, camera action and life at BAZA are shown on our YouTube channel.",
    "Otwórz Telegram": "Open Telegram",
    "YouTube Lasertag Warsaw": "YouTube Lasertag Warsaw",
    "Odtwórz film na YouTube": "Play the video on YouTube",
    "YouTube / Lasertag Warsaw": "YouTube / Lasertag Warsaw",
    "Zobacz grę z perspektywy gracza": "Watch the game from a player's POV",
    "Materiał z otwartej gry pokazuje tempo, komunikację i atmosferę naszej areny. To najlepszy szybki podgląd tego, co czeka Cię na BAZIE.": "Footage from an open game shows the pace, communication and atmosphere of our arena. It is the best quick preview of what awaits you at BAZA.",
    "Otwórz film": "Open video",
    "Otwórz kanał": "Open channel",
    "Środowe gry są przygotowane dla osób, które chcą grać bardziej taktycznie: komunikacja, cele rundy i praca drużynowa są ważniejsze niż przypadkowe bieganie po arenie.": "Wednesday games are prepared for players who want a more tactical experience: communication, round objectives and teamwork matter more than random running around the arena.",
    "Niedziela jest najlepszym startem dla nowych graczy: można przyjść solo, z rodziną albo znajomymi, a organizator pomaga dobrać drużyny i wyjaśnia zasady przed grą.": "Sunday is the best starting point for new players: you can come solo, with family or friends, and the organizer helps build teams and explains the rules before the game.",
    "Telegram zostaje głównym miejscem szybkich komunikatów: tam pojawiają się zapisy, zmiany terminów, wyjazdy, turnieje oraz listy graczy przed wydarzeniami.": "Telegram remains the main place for quick announcements: signups, schedule changes, away games, tournaments and player lists appear there before events.",
    "Technologia / BAZA": "Technology / BAZA",
    "Nowa era laserowego paintballa w Lasertag Warsaw": "A new era of laser paintball at Lasertag Warsaw",
    "Największa aktualizacja w historii naszej areny: statystyki w czasie rzeczywistym, efekty dźwiękowe jak w FPS-ach i nowe scenariusze rozgrywek.": "The biggest update in our arena's history: real-time statistics, FPS-style sound effects and new game scenarios.",
    "Technologia zmienia sposób, w jaki gramy. Dlatego w Lasertag Warsaw wprowadziliśmy największą aktualizację w historii naszej areny, która przenosi rozgrywkę na zupełnie nowy poziom.": "Technology is changing the way we play. That is why at Lasertag Warsaw we introduced the biggest update in our arena's history, taking gameplay to a completely new level.",
    "Statystyki w czasie rzeczywistym": "Real-time statistics",
    "Nasza arena została pokryta dedykowaną siecią Wi-Fi, dzięki której całe wyposażenie komunikuje się w czasie rzeczywistym. Oznacza to, że gracze mogą na bieżąco śledzić swoje wyniki i statystyki podczas rozgrywki.": "Our arena is covered by a dedicated Wi-Fi network, allowing all equipment to communicate in real time. This means players can track their scores and statistics live during the game.",
    "To rozwiązanie otwiera zupełnie nowe możliwości - od dokładniejszej analizy własnej gry po jeszcze bardziej dynamiczne scenariusze i wydarzenia na polu walki.": "This solution opens completely new possibilities, from more precise analysis of your own game to even more dynamic scenarios and battlefield events.",
    "Efekty dźwiękowe jak w grach komputerowych": "Sound effects like in video games",
    "Każda eliminacja dostarcza jeszcze większych emocji. System rozpoznaje wyjątkowe osiągnięcia i odtwarza komunikaty głosowe znane z najpopularniejszych gier FPS.": "Every elimination brings even more excitement. The system recognizes special achievements and plays voice announcements known from the most popular FPS games.",
    "Double Kill, Triple Kill, Killing Spree i wiele innych efektów sprawiają, że każda akcja daje jeszcze większą satysfakcję i pozwala poczuć klimat profesjonalnej gry komputerowej.": "Double Kill, Triple Kill, Killing Spree and many other effects make every action more satisfying and bring the feel of a professional video game.",
    "Zdjęcia nowego systemu gry": "Photos of the new game system",
    "Nowe scenariusze rozgrywek": "New game scenarios",
    "Aktualizacja umożliwiła stworzenie zupełnie nowych trybów gry.": "The update made it possible to create completely new game modes.",
    "Jednym z nich jest scenariusz inspirowany klasycznym trybem podkładania bomby. Drużyny muszą współpracować, aby podłożyć lub rozbroić bombę, a cały przebieg rozgrywki uzupełniają realistyczne komunikaty głosowe oraz odliczanie czasu, dzięki czemu żaden uczestnik nie przegapi najważniejszych wydarzeń.": "One of them is a scenario inspired by the classic bomb-planting mode. Teams must work together to plant or defuse the bomb, while realistic voice announcements and a countdown keep every participant aware of the key moments.",
    "To jednak dopiero początek. System pozwala nam stale rozwijać kolejne scenariusze oraz dodawać nowe mechaniki, które wcześniej nie były możliwe do zrealizowania.": "But this is only the beginning. The system lets us keep developing new scenarios and adding mechanics that were not possible before.",
    "Jeszcze większa immersja": "Even deeper immersion",
    "Naszym celem było stworzenie rozgrywki, która daje emocje porównywalne z najlepszymi grami komputerowymi, jednocześnie pozostając aktywnością na świeżym powietrzu.": "Our goal was to create gameplay that delivers emotions comparable to the best video games while remaining an outdoor activity.",
    "Połączenie nowoczesnego sprzętu, inteligentnego systemu komunikacji, realistycznych efektów dźwiękowych i zaawansowanych scenariuszy sprawia, że gracze mogą całkowicie zanurzyć się w świecie laserowego paintballa.": "The combination of modern equipment, an intelligent communication system, realistic sound effects and advanced scenarios lets players fully immerse themselves in the world of laser paintball.",
    "Technologia, której nie znajdziesz nigdzie indziej": "Technology you will not find anywhere else",
    "To rozwiązanie jest efektem wielu miesięcy pracy nad infrastrukturą naszej areny i konfiguracją całego systemu. Dzięki własnej sieci Wi-Fi oraz najnowszej generacji sprzętu możemy oferować funkcje, które do tej pory były dostępne jedynie w grach komputerowych.": "This solution is the result of many months of work on our arena infrastructure and full system configuration. With our own Wi-Fi network and latest-generation equipment, we can offer features that until now were available only in video games.",
    "Nieustannie rozwijamy naszą bazę i już pracujemy nad kolejnymi nowościami, które jeszcze bardziej zwiększą realizm i interaktywność rozgrywek.": "We are constantly developing our base and already working on more updates that will further increase realism and interactivity.",
    "Jeżeli chcesz przekonać się, jak wygląda laserowy paintball nowej generacji, zapraszamy do Lasertag Warsaw. Przyjdź ze swoją drużyną i sprawdź, jak wygląda przyszłość aktywnej rozrywki.": "If you want to see what next-generation laser paintball looks like, come to Lasertag Warsaw. Bring your team and see the future of active entertainment.",
    "Turniej / 5 lipca": "Tournament / July 5",
    "Turniej Open Lasertag - emocje do ostatniego meczu!": "Open Lasertag Tournament - excitement until the final match!",
    "Cztery pięcioosobowe drużyny, nowy scenariusz CS, zacięta walka do końca i zwycięstwo Hard Skill prowadzonego przez Shveda.": "Four five-player teams, a new CS scenario, a close fight to the end and victory for Hard Skill led by Shved.",
    "5 lipca na bazie Lasertag Warsaw odbył się kolejny turniej Open Lasertag, który zgromadził cztery pięcioosobowe drużyny. Do rywalizacji stanęły trzy zespoły z Warszawy oraz jedna drużyna z Gdańska, a poziom rozgrywek od pierwszego meczu zapowiadał niezwykle wyrównaną walkę.": "On July 5, another Open Lasertag tournament took place at the Lasertag Warsaw base, bringing together four five-player teams. Three teams from Warsaw and one team from Gdansk joined the competition, and from the first match the level promised an extremely even fight.",
    "Nowy scenariusz CS": "New CS scenario",
    "Tegoroczny turniej był wyjątkowy nie tylko ze względu na wysoki poziom zawodników, ale również dlatego, że uczestnicy po raz pierwszy zmierzyli się w nowym scenariuszu CS, inspirowanym klasycznymi rozgrywkami Counter-Strike.": "This year's tournament was special not only because of the high level of the players, but also because participants faced the new CS scenario for the first time, inspired by classic Counter-Strike gameplay.",
    "Oprócz niego drużyny rywalizowały również w dynamicznych scenariuszach biegowych, wymagających doskonałej współpracy, szybkiego podejmowania decyzji i skutecznej komunikacji.": "Teams also competed in dynamic running scenarios that demanded excellent cooperation, quick decision-making and effective communication.",
    "Hard Skill wygrywa turniej": "Hard Skill wins the tournament",
    "Po serii niezwykle zaciętych spotkań zwycięstwo wywalczyła drużyna Hard Skill, prowadzona przez Shveda, zdobywając 140 punktów w klasyfikacji końcowej całego turnieju.": "After a series of extremely close matches, victory went to Hard Skill, led by Shved, with 140 points in the final tournament standings.",
    "Drugie miejsce zajęła drużyna Sztorm z Gdańska. Goście byli bardzo blisko zwycięstwa i do pierwszego miejsca zabrakło im naprawdę niewiele. Ich świetna gra pokazała, że poziom rywalizacji w polskim laserowym paintballu stale rośnie.": "Second place went to Sztorm from Gdansk. The guests were very close to victory and missed first place by a narrow margin. Their strong performance showed that the level of competition in Polish laser paintball keeps rising.",
    "Jeśli chcesz wygrywać z najlepszymi, musisz pojawiać się na środowych treningach.": "If you want to beat the best, you have to show up for Wednesday training.",
    "Trening robi różnicę": "Training makes the difference",
    "Po zakończeniu turnieju wielu zawodników zgodnie podkreślało, że regularne treningi pozwalają doskonalić komunikację, taktykę oraz zgranie drużyny, które często decydują o zwycięstwie w najbardziej wyrównanych meczach.": "After the tournament, many players agreed that regular training helps improve communication, tactics and team coordination, which often decide the outcome of the closest matches.",
    "Gratulujemy wszystkim uczestnikom za sportową rywalizację, świetną atmosferę oraz widowiskowe akcje na polu walki. Dziękujemy również drużynie z Gdańska za przyjazd i stworzenie fantastycznego widowiska.": "Congratulations to all participants for fair competition, a great atmosphere and spectacular actions on the battlefield. We also thank the team from Gdansk for coming and creating a fantastic show.",
    "Analiza spotkań już wkrótce": "Match analysis coming soon",
    "Już wkrótce w zakładce Turniej pojawi się szczegółowa analiza wszystkich spotkań przygotowana przez naszego stałego komentatora. Będzie można znaleźć tam omówienie najciekawszych akcji, decyzji taktycznych oraz kluczowych momentów, które przesądziły o końcowej klasyfikacji.": "Soon, the Tournament tab will feature a detailed analysis of all matches prepared by our regular commentator. You will find a breakdown of the most interesting actions, tactical decisions and key moments that shaped the final standings.",
    "Do zobaczenia na kolejnych turniejach oraz środowych treningach w Lasertag Warsaw!": "See you at the next tournaments and Wednesday training sessions at Lasertag Warsaw!",
    "Opinia gracza / JAK": "Player review / JAK",
    "Opinia gracza po turnieju Open Lasertag": "A player's review after the Open Lasertag tournament",
    "JAK opowiada o nowym sprzęcie, scenariuszu CS, ustawieniach turniejowych i tym, dlaczego po latach gry trzeba nauczyć się kilku rzeczy od nowa.": "JAK talks about the new equipment, the CS scenario, tournament settings and why, after years of playing, some habits have to be learned again.",
    "Po zakończeniu turnieju Open Lasertag poprosiliśmy jednego z uczestników o podzielenie się wrażeniami na temat nowego sprzętu i ustawień gry. Poniżej publikujemy opinię gracza o nicku JAK.": "After the Open Lasertag tournament, we asked one participant to share his impressions of the new equipment and game settings. Below is the review from the player known as JAK.",
    "Dla JAK był to szczególny powrót: to dopiero jego trzecia gra w ciągu ostatnich sześciu lat, choć wcześniej grał regularnie przez około dziesięć lat bez przerwy. Dzięki temu jego opinia łączy perspektywę doświadczonego zawodnika i gracza, który na nowo wchodzi w system.": "For JAK, this was a special return: only his third game in the last six years, although before that he had played regularly for around ten years without a break. That makes his opinion both the view of an experienced player and of someone entering the system again almost from scratch.",
    "Szczerze mówiąc, spodziewałem się, że po całym dniu biegania nogi będą bolały dużo bardziej. Ostatecznie było całkiem normalnie, chociaż turniej naprawdę był bardzo intensywny.": "Honestly, I expected my legs to hurt much more after a full day of running. In the end it was completely fine, although the tournament really was very intense.",
    "Scenariusz CS z bombą": "The CS bomb scenario",
    "Jednym z najbardziej zapamiętanych momentów był dla JAK nowy scenariusz CS z podkładaniem bomby.": "One of the most memorable moments for JAK was the new CS scenario with bomb planting.",
    "Do tej pory nie rozumiem, jak udało mi się podłożyć bombę. Drużyna świetnie wyczyściła teren, a ja przebiegłem przez otwartą przestrzeń i nie dostałem ani jednego trafienia. To było szczególnie dziwne po wcześniejszych meczach, gdzie przeciwnicy trafiali mnie nawet zza przeszkód.": "I still do not understand how I managed to plant the bomb. The team cleared the area perfectly, and I ran through open ground without taking a single hit. That felt especially strange after earlier matches, where opponents were hitting me even behind cover.",
    "Nowe ustawienia i pierwsze wrażenia": "New settings and first impressions",
    "Nowe ustawienia wywołały sporo rozmów wśród uczestników turnieju.": "The new settings sparked plenty of discussion among the tournament participants.",
    "Na początku było nietypowo. Ustawienia były nowe dla wszystkich i myślę, że większość graczy będzie potrzebowała czasu, żeby się do nich przyzwyczaić.": "At first it felt unusual. The settings were new for everyone, and I think most players will need time to adapt to them.",
    "JAK podzielił się też pierwszymi obserwacjami dotyczącymi broni używanej podczas gry.": "JAK also shared his first observations about the weapons used during the game.",
    "Jeśli patrzeć na statystyki, nie zauważyłem dużej różnicy między zielonymi i niebieskimi karabinami. Ale kiedy trafiała mi się niebieska dziesiątka, grało mi się wyraźnie lepiej. Być może po prostu ta broń była dla mnie wygodniejsza.": "Looking at the statistics, I did not notice a major difference between the green and blue rifles. But whenever I got the blue number ten, I played noticeably better. Maybe that weapon was simply more comfortable for me.",
    "Trafienia, opóźnienia i sytuacje z pola": "Hits, delays and field situations",
    "Podczas turnieju pojawiały się momenty, które na pierwszy rzut oka mogły wyglądać jak błędy sprzętu.": "During the tournament, there were moments that at first glance could look like equipment errors.",
    "Czasami miałem wrażenie, że dźwięk trafienia i reakcja broni były lekko rozsynchronizowane. Zdarzało się, że słyszałem jedno trafienie, a na wyświetlaczu zostawała inna liczba żyć. Kilka razy wydawało mi się, że zostałem wyeliminowany już po schowaniu się za osłonę. Później zrozumiałem, że decydujący strzał najpewniej padł jeszcze zanim całkowicie zniknąłem za przeszkodą, a informacja dotarła do broni z niewielkim opóźnieniem.": "Sometimes it felt like the hit sound and the weapon reaction were slightly out of sync. I would hear one hit, while the display showed a different number of lives. A few times it seemed like I was eliminated after already getting behind cover. Later I realized that the decisive shot had most likely been fired before I fully disappeared behind the obstacle, and the information reached the weapon with a slight delay.",
    "Według gracza wiele takich sytuacji wynikało z tego, że do jednego celu strzelało jednocześnie kilku przeciwników.": "According to the player, many of these moments happened because several opponents were shooting at the same target at once.",
    "Bardzo łatwo obwinić sprzęt, ale po analizie sytuacji często okazuje się, że ktoś strzelał do ciebie równocześnie z innej pozycji.": "It is very easy to blame the equipment, but after reviewing the situation it often turns out that someone else was shooting at you from another position at the same time.",
    "Gra zza osłon": "Playing around cover",
    "Nie zabrakło również uwag dotyczących pojedynków przy przeszkodach.": "There were also comments about duels around obstacles.",
    "Czasami widziałem tylko wystawiony karabin przeciwnika, strzelałem w niego, ale trafienia się nie naliczały. Po chwili przeciwnik wychylał się mocniej, otwierał ogień i trafiał już mnie. Do tego też trzeba się przyzwyczaić i zrozumieć specyfikę nowego systemu.": "Sometimes I could only see the opponent's rifle sticking out, I shot at it, but the hits did not count. A moment later the opponent leaned out more, opened fire and hit me instead. This is also something you have to get used to and understand as part of the new system.",
    "Potencjał nowego sprzętu": "The potential of the new equipment",
    "Pomimo kilku uwag końcowa ocena nowego wyposażenia była bardzo pozytywna.": "Despite a few remarks, the final assessment of the new equipment was very positive.",
    "Moim zdaniem ten sprzęt ma ogromny potencjał. Tak, niektóre rzeczy trzeba jeszcze dopracować, ale najważniejsze jest to, że my, gracze, sami musimy nauczyć się grać na nowo. Przez lata wyrobiły się pewne odruchy: intuicyjnie wiedziałem, jak prowadzić pojedynek, liczyłem amunicję w głowie i rozumiałem, jak ograć przeciwnika. Teraz te przyzwyczajenia trzeba przebudować. To zajmie czas, ale właśnie dzięki temu gra znowu wydaje się świeża, ciekawa i motywuje do dalszego rozwoju.": "In my opinion, this equipment has huge potential. Yes, some things still need refinement, but the most important thing is that we, the players, have to learn how to play in a new way. Over the years I developed certain reflexes: I intuitively understood how to take a duel, counted ammunition in my head and knew how to outplay an opponent. Now those habits have to be rebuilt. It will take time, but that is exactly why the game feels fresh and interesting again, and motivates further development.",
    "Wniosek JAK": "JAK's conclusion",
    "Wszyscy graliśmy w takich samych warunkach. Trzeba po prostu częściej przyjeżdżać na treningi, przyzwyczajać się do nowego sprzętu i stawać się silniejszym.": "We all played under the same conditions. You simply have to come to training more often, get used to the new equipment and become stronger.",
  },
  uk: {
    "Telegram + YouTube": "Telegram + YouTube",
    "Dołącz do": "Приєднуйся до",
    "społeczności.": "спільноти.",
    "Najważniejsze terminy, zapisy i szybkie komunikaty trzymamy w Telegramie. Klimat gier, akcję z kamery i życie BAZY pokazujemy na kanale YouTube.": "Головні дати, записи та швидкі повідомлення тримаємо в Telegram. Атмосферу ігор, екшн з камери та життя BAZY показуємо на YouTube-каналі.",
    "Otwórz Telegram": "Відкрити Telegram",
    "YouTube Lasertag Warsaw": "YouTube Lasertag Warsaw",
    "Odtwórz film na YouTube": "Відтворити відео на YouTube",
    "YouTube / Lasertag Warsaw": "YouTube / Lasertag Warsaw",
    "Zobacz grę z perspektywy gracza": "Подивись гру очима гравця",
    "Materiał z otwartej gry pokazuje tempo, komunikację i atmosferę naszej areny. To najlepszy szybki podgląd tego, co czeka Cię na BAZIE.": "Матеріал з відкритої гри показує темп, комунікацію та атмосферу нашої арени. Це найкращий швидкий погляд на те, що чекає тебе на BAZIE.",
    "Otwórz film": "Відкрити відео",
    "Otwórz kanał": "Відкрити канал",
    "Środowe gry są przygotowane dla osób, które chcą grać bardziej taktycznie: komunikacja, cele rundy i praca drużynowa są ważniejsze niż przypadkowe bieganie po arenie.": "Ігри по середах підготовлені для тих, хто хоче грати тактичніше: комунікація, цілі раунду та командна робота важливіші за випадковий біг по арені.",
    "Niedziela jest najlepszym startem dla nowych graczy: można przyjść solo, z rodziną albo znajomymi, a organizator pomaga dobrać drużyny i wyjaśnia zasady przed grą.": "Неділя - найкращий старт для нових гравців: можна прийти самому, з родиною або друзями, а організатор допоможе підібрати команди й пояснить правила перед грою.",
    "Telegram zostaje głównym miejscem szybkich komunikatów: tam pojawiają się zapisy, zmiany terminów, wyjazdy, turnieje oraz listy graczy przed wydarzeniami.": "Telegram залишається головним місцем швидких повідомлень: там з'являються записи, зміни дат, виїзди, турніри та списки гравців перед подіями.",
    "Technologia / BAZA": "Технологія / BAZA",
    "Nowa era laserowego paintballa w Lasertag Warsaw": "Нова ера лазерного пейнтболу в Lasertag Warsaw",
    "Największa aktualizacja w historii naszej areny: statystyki w czasie rzeczywistym, efekty dźwiękowe jak w FPS-ach i nowe scenariusze rozgrywek.": "Найбільше оновлення в історії нашої арени: статистика в реальному часі, звукові ефекти як у FPS і нові сценарії гри.",
    "Technologia zmienia sposób, w jaki gramy. Dlatego w Lasertag Warsaw wprowadziliśmy największą aktualizację w historii naszej areny, która przenosi rozgrywkę na zupełnie nowy poziom.": "Технологія змінює те, як ми граємо. Саме тому в Lasertag Warsaw ми впровадили найбільше оновлення в історії нашої арени, яке переносить гру на абсолютно новий рівень.",
    "Statystyki w czasie rzeczywistym": "Статистика в реальному часі",
    "Nasza arena została pokryta dedykowaną siecią Wi-Fi, dzięki której całe wyposażenie komunikuje się w czasie rzeczywistym. Oznacza to, że gracze mogą na bieżąco śledzić swoje wyniki i statystyki podczas rozgrywki.": "Наша арена покрита окремою Wi-Fi мережею, завдяки якій усе обладнання комунікує в реальному часі. Це означає, що гравці можуть одразу відстежувати свої результати й статистику під час гри.",
    "To rozwiązanie otwiera zupełnie nowe możliwości - od dokładniejszej analizy własnej gry po jeszcze bardziej dynamiczne scenariusze i wydarzenia na polu walki.": "Це рішення відкриває зовсім нові можливості - від точнішого аналізу власної гри до ще динамічніших сценаріїв і подій на полі бою.",
    "Efekty dźwiękowe jak w grach komputerowych": "Звукові ефекти як у комп'ютерних іграх",
    "Każda eliminacja dostarcza jeszcze większych emocji. System rozpoznaje wyjątkowe osiągnięcia i odtwarza komunikaty głosowe znane z najpopularniejszych gier FPS.": "Кожне вибуття дає ще більше емоцій. Система розпізнає особливі досягнення й відтворює голосові повідомлення, знайомі з найпопулярніших FPS-ігор.",
    "Double Kill, Triple Kill, Killing Spree i wiele innych efektów sprawiają, że każda akcja daje jeszcze większą satysfakcję i pozwala poczuć klimat profesjonalnej gry komputerowej.": "Double Kill, Triple Kill, Killing Spree та багато інших ефектів роблять кожну дію ще приємнішою і дозволяють відчути атмосферу професійної комп'ютерної гри.",
    "Zdjęcia nowego systemu gry": "Фото нової ігрової системи",
    "Nowe scenariusze rozgrywek": "Нові сценарії ігор",
    "Aktualizacja umożliwiła stworzenie zupełnie nowych trybów gry.": "Оновлення дозволило створити абсолютно нові режими гри.",
    "Jednym z nich jest scenariusz inspirowany klasycznym trybem podkładania bomby. Drużyny muszą współpracować, aby podłożyć lub rozbroić bombę, a cały przebieg rozgrywki uzupełniają realistyczne komunikaty głosowe oraz odliczanie czasu, dzięki czemu żaden uczestnik nie przegapi najważniejszych wydarzeń.": "Один із них - сценарій, натхненний класичним режимом закладання бомби. Команди мають співпрацювати, щоб закласти або знешкодити бомбу, а гру доповнюють реалістичні голосові повідомлення та відлік часу, щоб жоден учасник не пропустив головні події.",
    "To jednak dopiero początek. System pozwala nam stale rozwijać kolejne scenariusze oraz dodawać nowe mechaniki, które wcześniej nie były możliwe do zrealizowania.": "Але це лише початок. Система дозволяє нам постійно розвивати нові сценарії та додавати механіки, які раніше неможливо було реалізувати.",
    "Jeszcze większa immersja": "Ще більша імерсія",
    "Naszym celem było stworzenie rozgrywki, która daje emocje porównywalne z najlepszymi grami komputerowymi, jednocześnie pozostając aktywnością na świeżym powietrzu.": "Нашою метою було створити гру, яка дає емоції, порівнянні з найкращими комп'ютерними іграми, але водночас залишається активністю на свіжому повітрі.",
    "Połączenie nowoczesnego sprzętu, inteligentnego systemu komunikacji, realistycznych efektów dźwiękowych i zaawansowanych scenariuszy sprawia, że gracze mogą całkowicie zanurzyć się w świecie laserowego paintballa.": "Поєднання сучасного обладнання, розумної системи комунікації, реалістичних звукових ефектів і просунутих сценаріїв дозволяє гравцям повністю зануритися у світ лазерного пейнтболу.",
    "Technologia, której nie znajdziesz nigdzie indziej": "Технологія, якої не знайдеш більше ніде",
    "To rozwiązanie jest efektem wielu miesięcy pracy nad infrastrukturą naszej areny i konfiguracją całego systemu. Dzięki własnej sieci Wi-Fi oraz najnowszej generacji sprzętu możemy oferować funkcje, które do tej pory były dostępne jedynie w grach komputerowych.": "Це рішення - результат багатьох місяців роботи над інфраструктурою нашої арени та конфігурацією всієї системи. Завдяки власній Wi-Fi мережі та обладнанню найновішого покоління ми можемо пропонувати функції, які досі були доступні лише в комп'ютерних іграх.",
    "Nieustannie rozwijamy naszą bazę i już pracujemy nad kolejnymi nowościami, które jeszcze bardziej zwiększą realizm i interaktywność rozgrywek.": "Ми постійно розвиваємо нашу базу і вже працюємо над наступними новинками, які ще більше підвищать реалізм та інтерактивність ігор.",
    "Jeżeli chcesz przekonać się, jak wygląda laserowy paintball nowej generacji, zapraszamy do Lasertag Warsaw. Przyjdź ze swoją drużyną i sprawdź, jak wygląda przyszłość aktywnej rozrywki.": "Якщо хочеш побачити, який вигляд має лазерний пейнтбол нового покоління, запрошуємо до Lasertag Warsaw. Приходь зі своєю командою і перевір, як виглядає майбутнє активних розваг.",
    "Turniej / 5 lipca": "Турнір / 5 липня",
    "Turniej Open Lasertag - emocje do ostatniego meczu!": "Турнір Open Lasertag - емоції до останнього матчу!",
    "Cztery pięcioosobowe drużyny, nowy scenariusz CS, zacięta walka do końca i zwycięstwo Hard Skill prowadzonego przez Shveda.": "Чотири команди по п'ять гравців, новий сценарій CS, напружена боротьба до кінця і перемога Hard Skill під керівництвом Shveda.",
    "5 lipca na bazie Lasertag Warsaw odbył się kolejny turniej Open Lasertag, który zgromadził cztery pięcioosobowe drużyny. Do rywalizacji stanęły trzy zespoły z Warszawy oraz jedna drużyna z Gdańska, a poziom rozgrywek od pierwszego meczu zapowiadał niezwykle wyrównaną walkę.": "5 липня на базі Lasertag Warsaw відбувся черговий турнір Open Lasertag, який зібрав чотири команди по п'ять гравців. До боротьби стали три команди з Варшави та одна команда з Гданська, а рівень гри з першого матчу обіцяв дуже рівне протистояння.",
    "Nowy scenariusz CS": "Новий сценарій CS",
    "Tegoroczny turniej był wyjątkowy nie tylko ze względu na wysoki poziom zawodników, ale również dlatego, że uczestnicy po raz pierwszy zmierzyli się w nowym scenariuszu CS, inspirowanym klasycznymi rozgrywkami Counter-Strike.": "Цьогорічний турнір був особливим не лише через високий рівень гравців, а й тому, що учасники вперше зіграли в новому сценарії CS, натхненному класичними матчами Counter-Strike.",
    "Oprócz niego drużyny rywalizowały również w dynamicznych scenariuszach biegowych, wymagających doskonałej współpracy, szybkiego podejmowania decyzji i skutecznej komunikacji.": "Крім нього, команди змагалися в динамічних бігових сценаріях, які вимагали чудової співпраці, швидкого ухвалення рішень і ефективної комунікації.",
    "Hard Skill wygrywa turniej": "Hard Skill виграє турнір",
    "Po serii niezwykle zaciętych spotkań zwycięstwo wywalczyła drużyna Hard Skill, prowadzona przez Shveda, zdobywając 140 punktów w klasyfikacji końcowej całego turnieju.": "Після серії надзвичайно напружених зустрічей перемогу здобула команда Hard Skill під керівництвом Shveda, набравши 140 очок у фінальній класифікації всього турніру.",
    "Drugie miejsce zajęła drużyna Sztorm z Gdańska. Goście byli bardzo blisko zwycięstwa i do pierwszego miejsca zabrakło im naprawdę niewiele. Ich świetna gra pokazała, że poziom rywalizacji w polskim laserowym paintballu stale rośnie.": "Друге місце посіла команда Sztorm з Гданська. Гості були дуже близькі до перемоги, і до першого місця їм забракло зовсім небагато. Їхня сильна гра показала, що рівень польського лазерного пейнтболу постійно зростає.",
    "Jeśli chcesz wygrywać z najlepszymi, musisz pojawiać się na środowych treningach.": "Якщо хочеш перемагати найкращих, потрібно приходити на тренування по середах.",
    "Trening robi różnicę": "Тренування робить різницю",
    "Po zakończeniu turnieju wielu zawodników zgodnie podkreślało, że regularne treningi pozwalają doskonalić komunikację, taktykę oraz zgranie drużyny, które często decydują o zwycięstwie w najbardziej wyrównanych meczach.": "Після завершення турніру багато гравців одностайно підкреслювали, що регулярні тренування допомагають удосконалювати комунікацію, тактику та зіграність команди, які часто вирішують долю найрівніших матчів.",
    "Gratulujemy wszystkim uczestnikom za sportową rywalizację, świetną atmosferę oraz widowiskowe akcje na polu walki. Dziękujemy również drużynie z Gdańska za przyjazd i stworzenie fantastycznego widowiska.": "Вітаємо всіх учасників зі спортивною боротьбою, чудовою атмосферою та видовищними діями на полі бою. Також дякуємо команді з Гданська за приїзд і фантастичне видовище.",
    "Analiza spotkań już wkrótce": "Аналіз матчів уже скоро",
    "Już wkrótce w zakładce Turniej pojawi się szczegółowa analiza wszystkich spotkań przygotowana przez naszego stałego komentatora. Będzie można znaleźć tam omówienie najciekawszych akcji, decyzji taktycznych oraz kluczowych momentów, które przesądziły o końcowej klasyfikacji.": "Уже скоро у вкладці Турнір з'явиться детальний аналіз усіх зустрічей, підготовлений нашим постійним коментатором. Там можна буде знайти розбір найцікавіших дій, тактичних рішень і ключових моментів, які визначили фінальну класифікацію.",
    "Do zobaczenia na kolejnych turniejach oraz środowych treningach w Lasertag Warsaw!": "До зустрічі на наступних турнірах і тренуваннях по середах у Lasertag Warsaw!",
    "Opinia gracza / JAK": "Відгук гравця / JAK",
    "Opinia gracza po turnieju Open Lasertag": "Відгук гравця після турніру Open Lasertag",
    "JAK opowiada o nowym sprzęcie, scenariuszu CS, ustawieniach turniejowych i tym, dlaczego po latach gry trzeba nauczyć się kilku rzeczy od nowa.": "JAK розповідає про нове обладнання, сценарій CS, турнірні налаштування і про те, чому після років гри доводиться вчитися деяким речам заново.",
    "Po zakończeniu turnieju Open Lasertag poprosiliśmy jednego z uczestników o podzielenie się wrażeniami na temat nowego sprzętu i ustawień gry. Poniżej publikujemy opinię gracza o nicku JAK.": "Після завершення турніру Open Lasertag ми попросили одного з учасників поділитися враженнями про нове обладнання та налаштування гри. Нижче публікуємо відгук гравця з ніком JAK.",
    "Dla JAK był to szczególny powrót: to dopiero jego trzecia gra w ciągu ostatnich sześciu lat, choć wcześniej grał regularnie przez około dziesięć lat bez przerwy. Dzięki temu jego opinia łączy perspektywę doświadczonego zawodnika i gracza, który na nowo wchodzi w system.": "Для JAK це було особливе повернення: це лише його третя гра за останні шість років, хоча раніше він регулярно грав приблизно десять років без перерви. Саме тому його думка поєднує погляд досвідченого гравця і людини, яка заново входить у систему.",
    "Szczerze mówiąc, spodziewałem się, że po całym dniu biegania nogi będą bolały dużo bardziej. Ostatecznie było całkiem normalnie, chociaż turniej naprawdę był bardzo intensywny.": "Чесно кажучи, я очікував, що після цілого дня біганини ноги болітимуть набагато сильніше. У підсумку все було цілком нормально, хоча турнір справді був дуже інтенсивним.",
    "Scenariusz CS z bombą": "Сценарій CS з бомбою",
    "Jednym z najbardziej zapamiętanych momentów był dla JAK nowy scenariusz CS z podkładaniem bomby.": "Одним із найбільш пам'ятних моментів для JAK став новий сценарій CS із закладанням бомби.",
    "Do tej pory nie rozumiem, jak udało mi się podłożyć bombę. Drużyna świetnie wyczyściła teren, a ja przebiegłem przez otwartą przestrzeń i nie dostałem ani jednego trafienia. To było szczególnie dziwne po wcześniejszych meczach, gdzie przeciwnicy trafiali mnie nawet zza przeszkód.": "Досі не розумію, як мені вдалося закласти бомбу. Команда чудово зачистила територію, а я пробіг через відкриту ділянку і не отримав жодного влучання. Це було особливо дивно після попередніх матчів, де мене діставали навіть за укриттями.",
    "Nowe ustawienia i pierwsze wrażenia": "Нові налаштування і перші враження",
    "Nowe ustawienia wywołały sporo rozmów wśród uczestników turnieju.": "Нові налаштування викликали багато розмов серед учасників турніру.",
    "Na początku było nietypowo. Ustawienia były nowe dla wszystkich i myślę, że większość graczy będzie potrzebowała czasu, żeby się do nich przyzwyczaić.": "Спочатку було незвично. Налаштування були новими для всіх, і думаю, що більшості гравців знадобиться час, щоб до них адаптуватися.",
    "JAK podzielił się też pierwszymi obserwacjami dotyczącymi broni używanej podczas gry.": "JAK також поділився першими спостереженнями щодо зброї, яку використовували під час гри.",
    "Jeśli patrzeć na statystyki, nie zauważyłem dużej różnicy między zielonymi i niebieskimi karabinami. Ale kiedy trafiała mi się niebieska dziesiątka, grało mi się wyraźnie lepiej. Być może po prostu ta broń była dla mnie wygodniejsza.": "Якщо дивитися на статистику, я не помітив великої різниці між зеленими й синіми автоматами. Але коли мені діставалася синя десятка, грати виходило помітно краще. Можливо, просто ця зброя була для мене зручнішою.",
    "Trafienia, opóźnienia i sytuacje z pola": "Влучання, затримки і ситуації на полі",
    "Podczas turnieju pojawiały się momenty, które na pierwszy rzut oka mogły wyglądać jak błędy sprzętu.": "Під час турніру виникали моменти, які на перший погляд могли виглядати як помилки обладнання.",
    "Czasami miałem wrażenie, że dźwięk trafienia i reakcja broni były lekko rozsynchronizowane. Zdarzało się, że słyszałem jedno trafienie, a na wyświetlaczu zostawała inna liczba żyć. Kilka razy wydawało mi się, że zostałem wyeliminowany już po schowaniu się za osłonę. Później zrozumiałem, że decydujący strzał najpewniej padł jeszcze zanim całkowicie zniknąłem za przeszkodą, a informacja dotarła do broni z niewielkim opóźnieniem.": "Іноді здавалося, що звук влучання і реакція зброї були трохи розсинхронізовані. Бувало, чуєш одне влучання, а на дисплеї залишається інша кількість життів. Кілька разів здавалося, що мене вибили вже після того, як я сховався за укриття. Пізніше я зрозумів, що вирішальний постріл, найімовірніше, був зроблений ще до того, як я повністю зник за перешкодою, а інформація дійшла до зброї з невеликою затримкою.",
    "Według gracza wiele takich sytuacji wynikało z tego, że do jednego celu strzelało jednocześnie kilku przeciwników.": "За словами гравця, багато таких ситуацій пояснювалися тим, що по одній цілі одночасно стріляли кілька суперників.",
    "Bardzo łatwo obwinić sprzęt, ale po analizie sytuacji często okazuje się, że ktoś strzelał do ciebie równocześnie z innej pozycji.": "Дуже легко звинуватити обладнання, але після розбору ситуації часто виявляється, що по тобі одночасно стріляли ще з іншої позиції.",
    "Gra zza osłon": "Гра з-за укриттів",
    "Nie zabrakło również uwag dotyczących pojedynków przy przeszkodach.": "Не обійшлося і без зауважень щодо перестрілок біля перешкод.",
    "Czasami widziałem tylko wystawiony karabin przeciwnika, strzelałem w niego, ale trafienia się nie naliczały. Po chwili przeciwnik wychylał się mocniej, otwierał ogień i trafiał już mnie. Do tego też trzeba się przyzwyczaić i zrozumieć specyfikę nowego systemu.": "Іноді я бачив лише виставлений автомат суперника, стріляв у нього, але влучання не зараховувалися. За мить суперник виглядав сильніше, відкривав вогонь і вже влучав у мене. До цього теж потрібно звикнути і зрозуміти особливості нової системи.",
    "Potencjał nowego sprzętu": "Потенціал нового обладнання",
    "Pomimo kilku uwag końcowa ocena nowego wyposażenia była bardzo pozytywna.": "Попри кілька зауважень, підсумкова оцінка нового обладнання була дуже позитивною.",
    "Moim zdaniem ten sprzęt ma ogromny potencjał. Tak, niektóre rzeczy trzeba jeszcze dopracować, ale najważniejsze jest to, że my, gracze, sami musimy nauczyć się grać na nowo. Przez lata wyrobiły się pewne odruchy: intuicyjnie wiedziałem, jak prowadzić pojedynek, liczyłem amunicję w głowie i rozumiałem, jak ograć przeciwnika. Teraz te przyzwyczajenia trzeba przebudować. To zajmie czas, ale właśnie dzięki temu gra znowu wydaje się świeża, ciekawa i motywuje do dalszego rozwoju.": "На мою думку, це обладнання має величезний потенціал. Так, деякі моменти ще треба доопрацювати, але найголовніше те, що ми, гравці, самі маємо навчитися грати по-новому. За роки в мене виробилися певні рефлекси: я інтуїтивно розумів, як вести дуель, рахував боєприпаси в голові і знав, як переграти суперника. Тепер ці звички треба перебудувати. Це займе час, але саме завдяки цьому гра знову відчувається свіжою, цікавою і мотивує розвиватися далі.",
    "Wniosek JAK": "Висновок JAK",
    "Wszyscy graliśmy w takich samych warunkach. Trzeba po prostu częściej przyjeżdżać na treningi, przyzwyczajać się do nowego sprzętu i stawać się silniejszym.": "Ми всі грали в однакових умовах. Потрібно просто частіше приїжджати на тренування, звикати до нового обладнання і ставати сильнішим.",
  },
};

Object.entries(updateArticleCopy).forEach(([language, copy]) => {
  Object.assign(siteCopy[language], copy);
});

const interfaceCopy = {
  be: {
    "RU": "RU",
    "Lista graczy": "Спіс гульцоў",
    "Ceny": "Цэны",
    "Cennik": "Цэннік",
    "Ceny gier": "Цэны гульняў",
    "Dodaj do listy": "Дадаць у спіс",
    "Sprawdź koszt gry": "Праверыць кошт гульні",
    "Komentarze": "Каментары",
    "Dodaj komentarz": "Дадаць каментар",
    "Nick albo imię": "Нік або імя",
    "Twój komentarz": "Твой каментар",
    "Wyślij komentarz": "Адправіць каментар",
    "Brak komentarzy": "Каментароў пакуль няма",
    "Komentarz dodany.": "Каментар дададзены.",
    "Dziękujemy za opinię.": "Дзякуй за меркаванне.",
    "Czytaj dalej": "Чытаць далей",
    "Zwiń tekst": "Згарнуць тэкст",
    "Najbliższa gra otwarta": "Бліжэйшая адкрытая гульня",
    "Niedziela 18:00": "Нядзеля 18:00",
    "Dla wszystkich chętnych": "Для ўсіх ахвотных",
    "10+ lat": "10+ гадоў",
    "Błąd komentarza.": "Памылка каментара.",
    "Spróbuj ponownie za chwilę.": "Паспрабуй яшчэ раз праз хвіліну.",
  },
  en: {
    "RU": "RU",
    "Lista graczy": "Player list",
    "Ceny": "Prices",
    "Cennik": "Pricing",
    "Ceny gier": "Game prices",
    "Dodaj do listy": "Add to list",
    "Sprawdź koszt gry": "Check game price",
    "Komentarze": "Comments",
    "Dodaj komentarz": "Add comment",
    "Nick albo imię": "Nickname or name",
    "Twój komentarz": "Your comment",
    "Wyślij komentarz": "Send comment",
    "Brak komentarzy": "No comments yet",
    "Komentarz dodany.": "Comment added.",
    "Dziękujemy za opinię.": "Thanks for the feedback.",
    "Czytaj dalej": "Read more",
    "Zwiń tekst": "Collapse text",
    "Najbliższa gra otwarta": "Next open game",
    "Niedziela 18:00": "Sunday 18:00",
    "Dla wszystkich chętnych": "For everyone",
    "10+ lat": "10+ years",
    "Błąd komentarza.": "Comment error.",
    "Spróbuj ponownie za chwilę.": "Try again in a moment.",
  },
  uk: {
    "RU": "RU",
    "Lista graczy": "Список гравців",
    "Ceny": "Ціни",
    "Cennik": "Ціни",
    "Ceny gier": "Ціни ігор",
    "Dodaj do listy": "Додати до списку",
    "Sprawdź koszt gry": "Перевірити ціну гри",
    "Komentarze": "Коментарі",
    "Dodaj komentarz": "Додати коментар",
    "Nick albo imię": "Нік або ім'я",
    "Twój komentarz": "Твій коментар",
    "Wyślij komentarz": "Надіслати коментар",
    "Brak komentarzy": "Коментарів поки немає",
    "Komentarz dodany.": "Коментар додано.",
    "Dziękujemy za opinię.": "Дякуємо за думку.",
    "Czytaj dalej": "Читати далі",
    "Zwiń tekst": "Згорнути текст",
    "Najbliższa gra otwarta": "Найближча відкрита гра",
    "Niedziela 18:00": "Неділя 18:00",
    "Dla wszystkich chętnych": "Для всіх охочих",
    "10+ lat": "10+ років",
    "Błąd komentarza.": "Помилка коментаря.",
    "Spróbuj ponownie za chwilę.": "Спробуй ще раз за хвилину.",
  },
  ru: {
    "RU": "RU",
    "Lista graczy": "Список игроков",
    "Ceny": "Цены",
    "Cennik": "Цены",
    "Ceny gier": "Цены игр",
    "Dodaj do listy": "Добавить в список",
    "Sprawdź koszt gry": "Посмотреть стоимость игры",
    "Komentarze": "Комментарии",
    "Dodaj komentarz": "Добавить комментарий",
    "Nick albo imię": "Ник или имя",
    "Twój komentarz": "Ваш комментарий",
    "Wyślij komentarz": "Отправить комментарий",
    "Brak komentarzy": "Комментариев пока нет",
    "Komentarz dodany.": "Комментарий добавлен.",
    "Dziękujemy za opinię.": "Спасибо за мнение.",
    "Czytaj dalej": "Читать дальше",
    "Zwiń tekst": "Свернуть текст",
    "Informacja o zdobywaniu punktów": "Информация о получении баллов",
    "Punkty można zdobyć, wysyłając swój artykuł na lasertagwarsaw@gmail.com albo zdobywając je podczas gry.": "Баллы можно получить, отправив свою статью на lasertagwarsaw@gmail.com или добрав их на игре.",
    "Najbliższa gra otwarta": "Ближайшая открытая игра",
    "Niedziela 18:00": "Воскресенье 18:00",
    "Dla wszystkich chętnych": "Для всех желающих",
    "10+ lat": "10+ лет",
    "Błąd komentarza.": "Ошибка комментария.",
    "Spróbuj ponownie za chwilę.": "Попробуйте еще раз через минуту.",
  },
};

Object.entries(interfaceCopy).forEach(([language, copy]) => {
  siteCopy[language] = siteCopy[language] || {};
  Object.assign(siteCopy[language], copy);
});

const copyById = {};

const mergeCopyById = (incomingCopyById = {}) => {
  Object.entries(incomingCopyById).forEach(([copyId, translations]) => {
    copyById[copyId] = {
      ...(copyById[copyId] || {}),
      ...translations,
    };
  });
};

const mergeSiteCopy = (incomingSiteCopy = {}) => {
  Object.entries(incomingSiteCopy).forEach(([language, copy]) => {
    siteCopy[language] = {
      ...(siteCopy[language] || {}),
      ...copy,
    };
  });
};

const loadExternalCopy = async () => {
  try {
    const response = await fetch("data/tort-review-translations.json");
    if (!response.ok) return;
    const data = await response.json();
    mergeCopyById(data.copyById);
    mergeSiteCopy(data.siteCopy);
  } catch (error) {
    console.warn("Translation copy is unavailable", error);
  }
};

const normalizeCopy = (value) => value.replace(/\s+/g, " ").trim();
const translateCopy = (source, language = currentSiteLanguage, copyId = "") => {
  const normalized = normalizeCopy(source);
  if (!normalized) return normalized;
  if (copyId && copyById[copyId]?.[language]) return copyById[copyId][language];
  if (siteCopy[language]?.[normalized]) return siteCopy[language][normalized];
  if (language === "pl") return normalized;
  const pointsMatch = normalized.match(/^(\d+) pkt$/);
  if (pointsMatch) return `${pointsMatch[1]} ${pointLabels[language]}`;

  return normalized;
};

const textRecords = [];
const attributeRecords = [];
const documentTitleSource = normalizeCopy(document.title);

const collectTranslatableText = () => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || ["SCRIPT", "STYLE"].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      if (parent.closest("[data-no-translate]")) {
        return NodeFilter.FILTER_REJECT;
      }

      return normalizeCopy(node.textContent) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });

  while (walker.nextNode()) {
    const copyElement = walker.currentNode.parentElement?.closest("[data-copy-id]");

    textRecords.push({
      node: walker.currentNode,
      source: normalizeCopy(walker.currentNode.textContent),
      copyId: copyElement?.dataset.copyId || "",
    });
  }
};

const collectTranslatableAttributes = () => {
  const attributes = ["aria-label", "placeholder", "title"];

  document.querySelectorAll("*").forEach((element) => {
    attributes.forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (!value) return;
      if (element.closest("[data-no-translate]")) return;

      attributeRecords.push({
        element,
        attribute,
        source: normalizeCopy(value),
      });
    });
  });

  document.querySelectorAll('meta[name="description"]').forEach((element) => {
    const value = element.getAttribute("content");
    if (!value) return;

    attributeRecords.push({
      element,
      attribute: "content",
      source: normalizeCopy(value),
    });
  });
};

const setLanguageButtons = () => {
  siteLanguageButtons.forEach((button) => {
    const switcherHasRussian = Boolean(button.closest(".language-switcher")?.querySelector('[data-site-lang="ru"]'));
    const isActive =
      button.dataset.siteLang === currentSiteLanguage ||
      (currentSiteLanguage === "ru" && button.dataset.siteLang === "be" && !switcherHasRussian);
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

const applySiteLanguage = (language) => {
  currentSiteLanguage = supportedSiteLanguages.includes(language) ? language : "pl";
  document.documentElement.lang = currentSiteLanguage;
  localStorage.setItem("bazaSiteLanguage", currentSiteLanguage);

  textRecords.forEach(({ node, source, copyId }) => {
    node.textContent = translateCopy(source, currentSiteLanguage, copyId);
  });

  attributeRecords.forEach(({ element, attribute, source }) => {
    element.setAttribute(attribute, translateCopy(source, currentSiteLanguage));
  });

  document.title = translateCopy(documentTitleSource, currentSiteLanguage);
  setLanguageButtons();
  updateRecurringGameDates();
  updateHeroNextGame();
  renderTortReviewSections();
  renderNewsComments();
  renderSignupLists();
};

const getNextGameDate = (weekday, time, now = new Date()) => {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date(now);
  const daysUntilGame = (weekday - now.getDay() + 7) % 7;

  date.setDate(now.getDate() + daysUntilGame);
  date.setHours(hours, minutes, 0, 0);

  if (date <= now) {
    date.setDate(date.getDate() + 7);
  }

  return date;
};

const updateRecurringGameDates = () => {
  recurringGameRows.forEach((row) => {
    const dateBlock = row.querySelector(".date-block");
    const dayNumber = dateBlock?.querySelector("strong");
    const dateLabel = dateBlock?.querySelector("span");
    const weekday = Number(row.dataset.recurringWeekday);
    const time = row.dataset.recurringTime;

    if (!dateBlock || !dayNumber || !dateLabel || Number.isNaN(weekday) || !time) return;

    const nextDate = getNextGameDate(weekday, time);
    dayNumber.textContent = String(nextDate.getDate()).padStart(2, "0");
    dateLabel.textContent = `${monthLabels[currentSiteLanguage][nextDate.getMonth()]} / ${
      weekdayLabels[currentSiteLanguage][nextDate.getDay()]
    }`;
    dateBlock.setAttribute(
      "aria-label",
      `${nextDateLabels[currentSiteLanguage]}: ${dayNumber.textContent} ${
        monthLabels[currentSiteLanguage][nextDate.getMonth()]
      }, ${weekdayLabels[currentSiteLanguage][nextDate.getDay()]}, ${time}`,
    );
  });
};

const getHeroGameConfig = (now = new Date()) => {
  const day = now.getDay();
  const wednesdayGame = getNextGameDate(3, "18:30", now);
  const sundayGame = getNextGameDate(0, "18:00", now);

  if (day === 1 || day === 2 || (day === 3 && wednesdayGame > now)) {
    return {
      game: "wednesday",
      date: wednesdayGame,
      title: "Środa 18:30",
      scenario: "Counter-Strike 6v6",
      age: "14+ lat",
      meter: "50%",
    };
  }

  return {
    game: "sunday",
    date: sundayGame,
    title: "Niedziela 18:00",
    scenario: "Dla wszystkich chętnych",
    age: "10+ lat",
    meter: "32%",
  };
};

const formatGameDateLabel = (date) =>
  `${String(date.getDate()).padStart(2, "0")} ${monthLabels[currentSiteLanguage][date.getMonth()]} / ${
    weekdayLabels[currentSiteLanguage][date.getDay()]
  }`;

const updateHeroNextGame = () => {
  if (!nextGamePanel) return;

  const config = getHeroGameConfig();
  activeNextGame = config.game;

  const title = nextGamePanel.querySelector("[data-next-game-title]");
  const date = nextGamePanel.querySelector("[data-next-game-date]");
  const scenario = nextGamePanel.querySelector("[data-next-game-scenario]");
  const age = nextGamePanel.querySelector("[data-next-game-age]");
  const meter = nextGamePanel.querySelector("[data-next-game-meter]");

  if (title) title.textContent = translateCopy(config.title);
  if (date) date.textContent = formatGameDateLabel(config.date);
  if (scenario) scenario.textContent = translateCopy(config.scenario);
  if (age) age.textContent = translateCopy(config.age);
  if (meter) meter.style.width = config.meter;

  nextGamePanel.dataset.nextGame = activeNextGame;
  renderHeroSignupList();
};

const renderSignupItems = (list, signups) => {
  list.innerHTML = "";

  if (!signups.length) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty-signup";
    emptyItem.textContent = translateCopy("Lista jest pusta");
    list.append(emptyItem);
    return;
  }

  signups.forEach((signup, index) => {
    const item = document.createElement("li");
    const note = signup.note ? signup.note : translateCopy("bez notatki");
    const number = document.createElement("strong");
    const content = document.createElement("span");
    const nickname = document.createElement("b");
    const noteText = document.createElement("em");

    number.textContent = String(index + 1).padStart(2, "0");
    nickname.dataset.noTranslate = "";
    nickname.textContent = signup.nickname;
    noteText.textContent = note;

    content.append(nickname, noteText);
    item.append(number, content);
    list.append(item);
  });
};

const renderHeroSignupList = () => {
  if (!nextGameList) return;

  const signups = getStoredSignups().filter((signup) => signup.game === activeNextGame);
  renderSignupItems(nextGameList, signups);
  if (nextGameCount) nextGameCount.textContent = String(signups.length);
};

const setupPlayerCarousel = () => {
  if (!playerCarousel) return;

  const viewport = playerCarousel.querySelector(".points-viewport");
  const cards = [...playerCarousel.querySelectorAll(".points-card")];
  const prevButton = playerCarousel.querySelector("[data-carousel-prev]");
  const nextButton = playerCarousel.querySelector("[data-carousel-next]");
  const status = playerCarousel.querySelector("[data-carousel-status]");
  const cardsPerPage = 5;
  const totalPages = Math.ceil(cards.length / cardsPerPage);
  let currentPage = 0;

  const setPage = (page) => {
    currentPage = (page + totalPages) % totalPages;
    const targetCard = cards[currentPage * cardsPerPage];
    const offset = targetCard.offsetLeft - cards[0].offsetLeft;

    viewport.scrollTo({ left: offset, behavior: "smooth" });
    if (status) status.textContent = `${currentPage + 1} / ${totalPages}`;
  };

  const updatePageFromScroll = () => {
    const pageWidth = cards[cardsPerPage]?.offsetLeft - cards[0].offsetLeft || viewport.clientWidth;
    currentPage = Math.min(totalPages - 1, Math.max(0, Math.round(viewport.scrollLeft / pageWidth)));
    if (status) status.textContent = `${currentPage + 1} / ${totalPages}`;
  };

  prevButton?.addEventListener("click", () => setPage(currentPage - 1));
  nextButton?.addEventListener("click", () => setPage(currentPage + 1));
  viewport.addEventListener("scroll", updatePageFromScroll);
  viewport.addEventListener(
    "wheel",
    (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      event.preventDefault();
      viewport.scrollLeft += event.deltaY;
      updatePageFromScroll();
    },
    { passive: false },
  );
  window.addEventListener("resize", updatePageFromScroll);
  setPage(0);
};

const showToast = (title, text) => {
  if (!toast) return;

  toast.querySelector("b").textContent = title;
  toast.querySelector("span").textContent = text;
  toast.classList.add("visible");

  window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 4000);
};

const getCurrentSignupCycleStart = (now = new Date()) => {
  const cycleStart = new Date(now);
  const daysSinceMonday = (cycleStart.getDay() + 6) % 7;
  cycleStart.setDate(cycleStart.getDate() - daysSinceMonday);
  cycleStart.setHours(10, 0, 0, 0);

  if (now < cycleStart) {
    cycleStart.setDate(cycleStart.getDate() - 7);
  }

  return cycleStart.toISOString();
};

const ensureCurrentSignupCycle = () => {
  const currentCycleStart = getCurrentSignupCycleStart();
  const storedCycleStart = localStorage.getItem(signupCycleStorageKey);

  if (storedCycleStart !== currentCycleStart) {
    localStorage.setItem(signupCycleStorageKey, currentCycleStart);
    localStorage.setItem(signupStorageKey, JSON.stringify([]));

    if (localStorage.getItem(deviceSignupStorageKey) !== currentCycleStart) {
      localStorage.removeItem(deviceSignupStorageKey);
    }
  }

  return currentCycleStart;
};

const hasDeviceSignupThisCycle = (game) => {
  const deviceSignups = getDeviceSignupsThisCycle();
  return Boolean(deviceSignups[game]);
};

const markDeviceSignupThisCycle = (game) => {
  const deviceSignups = getDeviceSignupsThisCycle();
  deviceSignups[game] = true;
  localStorage.setItem(deviceSignupStorageKey, JSON.stringify({
    cycle: ensureCurrentSignupCycle(),
    games: deviceSignups,
  }));
};

const getDeviceSignupsThisCycle = () => {
  const currentCycle = ensureCurrentSignupCycle();
  const rawValue = localStorage.getItem(deviceSignupStorageKey);

  if (!rawValue) return {};

  if (rawValue === currentCycle) {
    try {
      const storedSignups = JSON.parse(localStorage.getItem(signupStorageKey)) || [];
      return storedSignups.reduce((games, signup) => {
        if (signup?.game) games[signup.game] = true;
        return games;
      }, {});
    } catch (error) {
      return {};
    }
  }

  try {
    const parsed = JSON.parse(rawValue);
    return parsed?.cycle === currentCycle && parsed.games && typeof parsed.games === "object" ? parsed.games : {};
  } catch (error) {
    return {};
  }
};

const getStoredSignups = () => sharedSignups;

const setSharedSignups = (signups) => {
  sharedSignups = Array.isArray(signups) ? signups : [];
  localStorage.setItem(signupStorageKey, JSON.stringify(sharedSignups));
};

const fetchSharedSignups = async () => {
  try {
    const response = await fetch(telegramSignupEndpoint, { cache: "no-store" });
    if (!response.ok) return;

    const data = await response.json();
    setSharedSignups(data.signups);
    renderSignupLists();
  } catch (error) {
    // If the local server is not available, keep the current in-memory list.
  }
};

const getGameLabel = (game) =>
  game === "wednesday" ? "Środa 18:30 / Counter-Strike 6v6" : "Niedziela 18:00 / otwarta gra";

const renderSignupLists = () => {
  const signups = getStoredSignups();

  signupLists.forEach((list) => {
    const game = list.dataset.signupList;
    const gameSignups = signups.filter((signup) => signup.game === game);
    renderSignupItems(list, gameSignups);
  });

  signupCounters.forEach((counter) => {
    const game = counter.dataset.signupCount;
    counter.textContent = String(signups.filter((signup) => signup.game === game).length);
  });

  renderHeroSignupList();
};

const sendSignupToTelegram = async (signup) => {
  const response = await fetch(telegramSignupEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...signup,
      gameLabel: getGameLabel(signup.game),
    }),
  });

  if (!response.ok) throw new Error("Telegram endpoint error");
  return response.json();
};

const getArticleId = (article, index = 0) => {
  if (article.dataset.newsId) return article.dataset.newsId;

  const copyId = article.querySelector("[data-copy-id]")?.dataset.copyId;
  const title = article.querySelector("h3")?.textContent || "";
  const base = copyId || title || `news-${index + 1}`;
  const articleId = base
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  article.dataset.newsId = articleId || `news-${index + 1}`;
  return article.dataset.newsId;
};

const setupNewsCommentWidgets = () => {
  newsArticles.forEach((article, index) => {
    const body = article.querySelector(".update-article-body");
    if (!body || body.querySelector(".news-comments")) return;

    const articleId = getArticleId(article, index);
    const widget = document.createElement("div");
    widget.className = "news-comments";
    widget.dataset.commentsFor = articleId;
    widget.innerHTML = `
      <div class="news-comments-head">
        <h4 data-comments-title></h4>
        <span data-comments-count></span>
      </div>
      <ol class="news-comment-list" data-comment-list></ol>
      <form class="news-comment-form" data-comment-form>
        <input name="name" type="text" maxlength="40" autocomplete="nickname" required />
        <textarea name="text" maxlength="500" rows="3" required></textarea>
        <button type="submit"></button>
      </form>
    `;
    body.append(widget);

    widget.querySelector("[data-comment-form]")?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);
      const name = formData.get("name")?.trim();
      const text = formData.get("text")?.trim();
      if (!name || !text) return;

      const button = form.querySelector("button");
      if (button) button.disabled = true;

      try {
        const response = await fetch(newsCommentsEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            articleId,
            name,
            text,
            createdAt: new Date().toISOString(),
          }),
        });
        if (!response.ok) throw new Error("Comment endpoint error");
        const data = await response.json();
        setNewsComments(data.comments);
        form.reset();
        showToast(translateCopy("Komentarz dodany."), translateCopy("Dziękujemy za opinię."));
      } catch (error) {
        const fallbackComment = {
          id: `${Date.now()}`,
          name,
          text,
          createdAt: new Date().toISOString(),
        };
        setNewsComments({
          ...newsComments,
          [articleId]: [...(newsComments[articleId] || []), fallbackComment].slice(-80),
        });
        form.reset();
        showToast(translateCopy("Błąd komentarza."), translateCopy("Spróbuj ponownie za chwilę."));
      } finally {
        if (button) button.disabled = false;
      }
    });
  });
};

const setNewsComments = (comments) => {
  newsComments = comments && typeof comments === "object" ? comments : {};
  localStorage.setItem(newsCommentsStorageKey, JSON.stringify(newsComments));
  renderNewsComments();
};

const fetchNewsComments = async () => {
  try {
    const cached = JSON.parse(localStorage.getItem(newsCommentsStorageKey) || "{}");
    if (cached && typeof cached === "object") newsComments = cached;
  } catch (error) {
    newsComments = {};
  }

  renderNewsComments();

  try {
    const response = await fetch(newsCommentsEndpoint, { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    setNewsComments(data.comments);
  } catch (error) {
    // Keep local comments visible when the API is not available.
  }
};

const renderNewsComments = () => {
  document.querySelectorAll(".news-comments").forEach((widget) => {
    const articleId = widget.dataset.commentsFor;
    const comments = newsComments[articleId] || [];
    const title = widget.querySelector("[data-comments-title]");
    const count = widget.querySelector("[data-comments-count]");
    const list = widget.querySelector("[data-comment-list]");
    const form = widget.querySelector("[data-comment-form]");

    if (title) title.textContent = translateCopy("Komentarze");
    if (count) count.textContent = comments.length ? String(comments.length) : translateCopy("Brak komentarzy");
    form?.querySelector('input[name="name"]')?.setAttribute("placeholder", translateCopy("Nick albo imię"));
    form?.querySelector('textarea[name="text"]')?.setAttribute("placeholder", translateCopy("Twój komentarz"));
    if (form?.querySelector("button")) form.querySelector("button").textContent = translateCopy("Wyślij komentarz");

    if (!list) return;
    list.innerHTML = "";

    comments.forEach((comment) => {
      const item = document.createElement("li");
      const name = document.createElement("b");
      const text = document.createElement("p");
      const date = document.createElement("time");

      name.dataset.noTranslate = "";
      name.textContent = comment.name;
      text.textContent = comment.text;
      date.dateTime = comment.createdAt;
      date.textContent = new Date(comment.createdAt).toLocaleDateString(document.documentElement.lang || "pl", {
        day: "2-digit",
        month: "2-digit",
      });

      item.append(name, text, date);
      list.append(item);
    });
  });
};

const tortReviewImages = [
  "assets/tort-review-01.jpg",
  "assets/tort-review-02.jpg",
  "assets/tort-review-03.jpg",
  "assets/tort-review-04.jpg",
  "assets/tort-review-05.jpg",
  "assets/tort-review-06.jpg",
  "assets/tort-review-07.jpg",
  "assets/tort-review-08.jpg",
  "assets/tort-review-09.jpg",
  "assets/tort-review-10.jpg",
  "assets/tort-review-11.jpg",
  "assets/tort-review-12.jpg",
  "assets/tort-review-13.jpg",
  "assets/tort-review-14.jpg",
];

const splitReviewIntoSections = (text) => {
  const lines = text
    .replace(/\u00a0/g, " ")
    .split("\n")
    .map((line) => line.trimEnd());
  const sections = [];
  let current = { title: "", lines: [] };

  lines.forEach((line, index) => {
    const isNumberedHeading = /^\d+\.\s+/.test(line.trim());
    if ((isNumberedHeading || index === 0) && (current.title || current.lines.length)) {
      sections.push(current);
      current = { title: "", lines: [] };
    }

    if (!current.title && line.trim()) {
      current.title = line.trim();
      return;
    }

    current.lines.push(line);
  });

  if (current.title || current.lines.length) sections.push(current);
  return sections.filter((section) => section.title || section.lines.some((line) => line.trim()));
};

const renderTortReviewSections = () => {
  const source = document.querySelector('[data-copy-id="tort-review-body"]');
  if (!source) return;

  const parent = source.parentElement;
  const oldReader = parent?.querySelector(".tort-review-reader");
  oldReader?.remove();

  const text = source.textContent.trim();
  if (!text || !parent) return;

  source.hidden = true;
  source.setAttribute("aria-hidden", "true");

  const sections = splitReviewIntoSections(text);
  const reader = document.createElement("div");
  reader.className = "tort-review-reader";
  reader.dataset.expanded = "false";

  sections.forEach((section, index) => {
    const block = document.createElement("section");
    block.className = "tort-review-section";
    if (index > 1) block.hidden = true;

    const title = document.createElement(index === 0 ? "h4" : "h5");
    title.textContent = section.title;
    block.append(title);

    section.lines
      .join("\n")
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .forEach((paragraph) => {
        const p = document.createElement("p");
        p.textContent = paragraph;
        block.append(p);
      });

    const galleryImages = tortReviewImages.slice(index * 2, index * 2 + 2);
    if (galleryImages.length) {
      const gallery = document.createElement("div");
      gallery.className = "tort-review-gallery";
      galleryImages.forEach((src, imageIndex) => {
        const image = document.createElement("img");
        image.className = "tort-review-image";
        image.loading = "lazy";
        image.src = src;
        image.alt = `Turniej Open Lasertag - zdjęcie ${index * 2 + imageIndex + 1}`;
        gallery.append(image);
      });
      block.append(gallery);
    }

    reader.append(block);
  });

  if (sections.length > 2) {
    const button = document.createElement("button");
    button.className = "tort-read-more";
    button.type = "button";
    button.textContent = translateCopy("Czytaj dalej");
    button.addEventListener("click", () => {
      const expanded = reader.dataset.expanded === "true";
      reader.dataset.expanded = String(!expanded);
      reader.querySelectorAll(".tort-review-section").forEach((section, index) => {
        if (index > 1) section.hidden = expanded;
      });
      button.textContent = translateCopy(expanded ? "Czytaj dalej" : "Zwiń tekst");
    });
    reader.append(button);
  }

  parent.insertBefore(reader, source.nextSibling);
};

const initializeSite = async () => {
  await loadExternalCopy();
  collectTranslatableText();
  collectTranslatableAttributes();
  setupNewsCommentWidgets();
  ensureCurrentSignupCycle();
  applySiteLanguage(currentSiteLanguage);
  setupPlayerCarousel();
  renderSignupLists();
  fetchSharedSignups();
  fetchNewsComments();
};

initializeSite();

window.setInterval(() => {
  const beforeCycle = localStorage.getItem(signupCycleStorageKey);
  const currentCycle = ensureCurrentSignupCycle();
  if (beforeCycle !== currentCycle) renderSignupLists();
  updateHeroNextGame();
  fetchSharedSignups();
}, 60 * 1000);

if (menuButton) {
  menuButton.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? translateCopy("Zamknij menu") : translateCopy("Otwórz menu"),
    );
  });
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", translateCopy("Otwórz menu"));
  });
});

const closeMobileMenu = () => {
  document.body.classList.remove("menu-open");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", translateCopy("Otwórz menu"));
};

const openPriceModal = () => {
  if (!priceModal) return;
  priceModal.hidden = false;
  document.body.classList.add("price-open");
  closeMobileMenu();
  priceModal.querySelector(".price-close")?.focus();
};

const closePriceModal = () => {
  if (!priceModal || priceModal.hidden) return;
  priceModal.hidden = true;
  document.body.classList.remove("price-open");
};

priceOpenButtons.forEach((button) => {
  button.addEventListener("click", openPriceModal);
});

priceCloseButtons.forEach((button) => {
  button.addEventListener("click", closePriceModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePriceModal();
});

nextGameToggle?.addEventListener("click", () => {
  if (!nextGamePanel) return;
  const signups = nextGamePanel.querySelector(".next-game-signups");
  const isOpen = nextGamePanel.classList.toggle("show-signups");
  if (signups) signups.hidden = !isOpen;
  renderHeroSignupList();
});

nextGameRegister?.addEventListener("click", () => {
  const select = bookingForm?.querySelector('select[name="game"]');
  if (select) select.value = activeNextGame;
  document.querySelector("#join")?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => bookingForm?.querySelector('input[name="nickname"]')?.focus(), 450);
});

let belarusianLanguageClickTimer = null;

const selectSiteLanguage = (language) => {
  applySiteLanguage(language);

  if (!document.body.classList.contains("menu-open")) return;
  document.body.classList.remove("menu-open");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", translateCopy("Otwórz menu"));
};

siteLanguageButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (button.dataset.siteLang === "pl" && event.detail >= 2) {
      openPriceModal();
      return;
    }

    if (button.dataset.siteLang !== "be") {
      selectSiteLanguage(button.dataset.siteLang);
      return;
    }

    if (event.detail >= 2) {
      window.clearTimeout(belarusianLanguageClickTimer);
      belarusianLanguageClickTimer = null;
      selectSiteLanguage("ru");
      return;
    }

    window.clearTimeout(belarusianLanguageClickTimer);
    belarusianLanguageClickTimer = window.setTimeout(() => {
      selectSiteLanguage("be");
      belarusianLanguageClickTimer = null;
    }, 260);
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    gameRows.forEach((row) => {
      row.classList.toggle("hidden", filter !== "all" && row.dataset.kind !== filter);
    });
  });
});

bookingForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const nickname = formData.get("nickname")?.trim();
  const phone = formData.get("phone")?.trim();
  const note = formData.get("note")?.trim();
  const game = formData.get("game");

  if (!nickname || !phone || !game) return;

  if (hasDeviceSignupThisCycle(game)) {
    const gameName = game === "sunday" ? "niedzielę" : "środę";
    showToast("Zapis już istnieje.", `Z tego urządzenia można zapisać się raz na ${gameName}. Limit odnowi się w poniedziałek o 10:00.`);
    return;
  }

  const signup = {
    id: globalThis.crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
    game,
    nickname,
    phone,
    note,
    createdAt: new Date().toISOString(),
  };

  showToast(translateCopy("Plus dodany."), translateCopy("Nick pojawił się na liście. Wysyłamy dane do Telegrama."));

  const submitButton = bookingForm.querySelector("[type='submit']");
  submitButton.disabled = true;

  try {
    const result = await sendSignupToTelegram(signup);
    setSharedSignups(result.signups);
    markDeviceSignupThisCycle(game);
    renderSignupLists();
    bookingForm.reset();
    showToast(
      result.telegram?.ok === false ? translateCopy("Plus zapisany na stronie.") : translateCopy("Telegram wysłany."),
      result.telegram?.ok === false
        ? translateCopy("Telegram endpoint trzeba jeszcze podłączyć na hostingu.")
        : translateCopy("Organizator dostał pełne dane gracza."),
    );
  } catch (error) {
    setSharedSignups([...sharedSignups, signup]);
    markDeviceSignupThisCycle(game);
    renderSignupLists();
    bookingForm.reset();
    showToast(
      translateCopy("Plus zapisany na stronie."),
      translateCopy("Telegram endpoint trzeba jeszcze podłączyć na hostingu."),
    );
  } finally {
    submitButton.disabled = false;
  }
});
