'use client';

const SETTINGS_KEY = 'ssb_notification_settings';
const DAILY_VERSE_TAG = 'ssb-daily-verse';
const STUDY_REMINDER_TAG = 'ssb-study-reminder';

export interface NotificationSettings {
  enabled: boolean;
  dailyVerse: boolean;
  dailyVerseTime: string;
  studyReminder: boolean;
  studyReminderTime: string;
}

const DEFAULT_SETTINGS: NotificationSettings = {
  enabled: false,
  dailyVerse: false,
  dailyVerseTime: '08:00',
  studyReminder: false,
  studyReminderTime: '19:00',
};

const DAILY_VERSES = [
  { ref: 'João 3:16', text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
  { ref: 'Salmos 23:1', text: 'O Senhor é o meu pastor; nada me faltará.' },
  { ref: 'Filipenses 4:13', text: 'Posso todas as coisas naquele que me fortalece.' },
  { ref: 'Romanos 8:28', text: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.' },
  { ref: 'Jeremias 29:11', text: 'Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.' },
  { ref: 'Isaías 40:31', text: 'Mas os que esperam no Senhor renovarão as forças, subirão com asas como águias.' },
  { ref: 'Provérbios 3:5-6', text: 'Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.' },
  { ref: 'Mateus 11:28', text: 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.' },
  { ref: '2 Timóteo 1:7', text: 'Porque Deus não nos deu o espírito de temor, mas de fortaleza, e de amor, e de moderação.' },
  { ref: 'Hebreus 11:1', text: 'Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem.' },
  { ref: 'Efésios 2:8-9', text: 'Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie.' },
  { ref: '1 Coríntios 10:13', text: 'Não vos sobreveio tentação que não fosse humana; mas Deus é fiel, e não deixará que sejais tentados acima do que podeis.' },
  { ref: 'Romanos 12:2', text: 'E não vos conformeis com este mundo, mas transformai-vos pela renovação do vosso entendimento.' },
  { ref: 'Salmos 46:10', text: 'Aquietai-vos, e sabei que eu sou Deus; serei exaltado entre os gentios; serei exaltado sobre a terra.' },
  { ref: 'Tiago 1:5', text: 'E, se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente, e o não lança em rosto, e ser-lhe-á dada.' },
  { ref: 'Mateus 6:33', text: 'Mas, buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.' },
  { ref: 'Gálatas 5:22-23', text: 'Mas o fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança.' },
  { ref: 'Colossenses 3:23', text: 'E, tudo o que fizerdes, fazei-o de todo o coração, como ao Senhor, e não aos homens.' },
  { ref: '1 Pedro 5:7', text: 'Lançando sobre ele todo o vosso cuidado, porque ele mesmo cuida de vós.' },
  { ref: 'Salmos 91:1', text: 'Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.' },
  { ref: 'Josué 1:9', text: 'Não to mandei eu? Esforça-te e tem bom ânimo; não pasmes, nem te espantes; porque o Senhor teu Deus é contigo, por onde quer que andares.' },
  { ref: 'Lamentações 3:22-23', text: 'As misericórdias do Senhor são a causa de não sermos consumidos; as suas misericórdias são novas a cada manhã.' },
  { ref: 'João 14:27', text: 'Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá.' },
  { ref: 'Romanos 15:13', text: 'Ora o Deus de esperança vos encha de todo o gozo e paz em crença, para que abundeis em esperança pela virtude do Espírito Santo.' },
  { ref: 'Efésios 6:10', text: 'No demais, irmãos meus, fortalecei-vos no Senhor e na força do seu poder.' },
  { ref: 'Mateus 5:14-16', text: 'Vós sois a luz do mundo. Não se pode esconder uma cidade edificada sobre um monte.' },
  { ref: 'Hebreus 13:8', text: 'Jesus Cristo é o mesmo ontem, e hoje, e eternamente.' },
  { ref: '1 João 4:19', text: 'Nós o amamos a ele, porque ele nos amou primeiro.' },
  { ref: 'Filipenses 4:6-7', text: 'Não vos preocupeis com coisa alguma; mas em tudo sejam conhecidas, diante de Deus, as vossas petições, pela oração e súplicas, com ações de graças.' },
  { ref: 'Salmos 119:105', text: 'Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.' },
];

function getRandomVerse(): { ref: string; text: string } {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
}

function parseTimeString(time: string): { hour: number; minute: number } {
  const [h, m] = time.split(':').map(Number);
  return { hour: h || 8, minute: m || 0 };
}

export function isSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'Notification' in window && 'serviceWorker' in navigator;
}

export function getPermission(): NotificationPermission {
  if (typeof window === 'undefined' || !('Notification' in window)) return 'denied';
  return Notification.permission;
}

export async function requestPermission(): Promise<boolean> {
  if (!isSupported()) return false;

  if (Notification.permission === 'granted') return true;

  if (Notification.permission === 'denied') return false;

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const settings = getNotificationSettings();
      saveNotificationSettings({ ...settings, enabled: true });
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

function getSWRegistration(): ServiceWorkerRegistration | null {
  if (typeof navigator === 'undefined' || !navigator.serviceWorker) return null;
  return navigator.serviceWorker.controller
    ? navigator.serviceWorker as unknown as ServiceWorkerRegistration
    : null;
}

async function showNotification(tag: string, title: string, body: string, url: string): Promise<void> {
  const reg = getSWRegistration();
  if (!reg) return;

  try {
    await reg.showNotification(title, {
      body,
      tag,
      icon: '/icon-192.png',
      badge: '/favicon.ico',
      data: { url },
      actions: [
        { action: 'open', title: 'Abrir' },
        { action: 'dismiss', title: 'Dispensar' },
      ],
      ...({ vibrate: [200, 100, 200] } as NotificationOptions),
    } as NotificationOptions);
  } catch {
    // SW showNotification may not be available
  }
}

export async function scheduleDailyVerse(hour: number, minute: number): Promise<void> {
  if (!isSupported()) return;

  await cancelNotification(DAILY_VERSE_TAG);

  const now = new Date();
  const target = new Date();
  target.setHours(hour, minute, 0, 0);

  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }

  const delay = target.getTime() - now.getTime();

  // Store schedule in localStorage so SW can re-register on page load
  const schedule = {
    tag: DAILY_VERSE_TAG,
    scheduledAt: now.getTime(),
    triggerAt: target.getTime(),
    hour,
    minute,
  };
  localStorage.setItem(`ssb_schedule_${DAILY_VERSE_TAG}`, JSON.stringify(schedule));

  // Use a one-shot timer that triggers the notification
  setTimeout(async () => {
    const verse = getRandomVerse();
    await showNotification(
      DAILY_VERSE_TAG,
      `📖 ${verse.ref}`,
      verse.text,
      '/biblia'
    );
    // Re-schedule for tomorrow
    scheduleDailyVerse(hour, minute);
  }, delay);
}

export async function scheduleStudyReminder(hour: number, minute: number): Promise<void> {
  if (!isSupported()) return;

  await cancelNotification(STUDY_REMINDER_TAG);

  const now = new Date();
  const target = new Date();
  target.setHours(hour, minute, 0, 0);

  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }

  const delay = target.getTime() - now.getTime();

  const schedule = {
    tag: STUDY_REMINDER_TAG,
    scheduledAt: now.getTime(),
    triggerAt: target.getTime(),
    hour,
    minute,
  };
  localStorage.setItem(`ssb_schedule_${STUDY_REMINDER_TAG}`, JSON.stringify(schedule));

  setTimeout(async () => {
    await showNotification(
      STUDY_REMINDER_TAG,
      '📚 Hora de Estudar!',
      'Reserve um tempo para estudar a Palavra de Deus hoje.',
      '/estudos'
    );
    scheduleStudyReminder(hour, minute);
  }, delay);
}

async function cancelNotification(tag: string): Promise<void> {
  localStorage.removeItem(`ssb_schedule_${tag}`);

  if (typeof navigator !== 'undefined' && navigator.serviceWorker) {
    try {
      const reg = await navigator.serviceWorker.ready;
      const notifications = await reg.getNotifications({ tag });
      notifications.forEach((n) => n.close());
    } catch {
      // Ignore errors
    }
  }
}

export async function cancelAllNotifications(): Promise<void> {
  await cancelNotification(DAILY_VERSE_TAG);
  await cancelNotification(STUDY_REMINDER_TAG);

  localStorage.removeItem(`ssb_schedule_${DAILY_VERSE_TAG}`);
  localStorage.removeItem(`ssb_schedule_${STUDY_REMINDER_TAG}`);

  const settings = getNotificationSettings();
  saveNotificationSettings({
    ...settings,
    enabled: false,
    dailyVerse: false,
    studyReminder: false,
  });
}

export function saveNotificationSettings(settings: NotificationSettings): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function getNotificationSettings(): NotificationSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    }
  } catch {
    // Ignore parse errors
  }
  return DEFAULT_SETTINGS;
}

export async function rescheduleFromStorage(): Promise<void> {
  if (!isSupported()) return;

  const settings = getNotificationSettings();
  if (!settings.enabled) return;

  const { hour: hv, minute: mv } = parseTimeString(settings.dailyVerseTime);
  const { hour: hs, minute: ms } = parseTimeString(settings.studyReminderTime);

  if (settings.dailyVerse) {
    await scheduleDailyVerse(hv, mv);
  }
  if (settings.studyReminder) {
    await scheduleStudyReminder(hs, ms);
  }
}

export async function sendTestNotification(): Promise<void> {
  if (!isSupported()) return;

  if (Notification.permission !== 'granted') return;

  const reg = getSWRegistration();
  if (reg) {
    await reg.showNotification('Sola Scriptura ✨', {
      body: 'Notificações funcionando perfeitamente! 🎉',
      tag: 'ssb-test',
      icon: '/icon-192.png',
      badge: '/favicon.ico',
    } as NotificationOptions);
  } else {
    new Notification('Sola Scriptura ✨', {
      body: 'Notificações funcionando perfeitamente! 🎉',
      icon: '/icon-192.png',
    });
  }
}
