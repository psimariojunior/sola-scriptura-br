const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
const PUSH_ENABLED_KEY = 'ssb_push_enabled';
const PUSH_SUBSCRIPTION_KEY = 'ssb_push_subscription';
const DAILY_VERSE_TAG = 'ssb-daily-verse-push';
const PUSH_SCHEDULE_KEY = 'ssb_push_schedule';
const PUSH_SMART_KEY = 'ssb_push_smart';

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

async function obterTokenAuth(): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  try {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find((c) => c.trim().startsWith('ssb_token='));
    if (tokenCookie) return tokenCookie.split('=')[1];
    return localStorage.getItem('ssb_token');
  } catch {
    return null;
  }
}

async function enviarSubscriptionBackend(subscription: PushSubscription): Promise<boolean> {
  const token = await obterTokenAuth();
  if (!token) {
    console.warn('[Push] Usuário não autenticado, subscription não enviada ao backend');
    return false;
  }

  const json = subscription.toJSON();
  if (!json.endpoint || !json.keys) return false;

  try {
    const response = await fetch(`${API_URL}/notifications/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        endpoint: json.endpoint,
        p256dh: json.keys.p256dh,
        auth: json.keys.auth,
        userAgent: navigator.userAgent,
        plataforma: detectarPlataforma(),
      }),
    });

    if (!response.ok) {
      console.error('[Push] Erro ao enviar subscription ao backend:', response.status);
      return false;
    }

    console.log('[Push] Subscription enviada ao backend com sucesso');
    return true;
  } catch (err) {
    console.error('[Push] Falha ao comunicar com backend:', err);
    return false;
  }
}

async function removerSubscriptionBackend(endpoint: string): Promise<void> {
  const token = await obterTokenAuth();
  if (!token) return;

  try {
    await fetch(`${API_URL}/notifications/unsubscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ endpoint }),
    });
  } catch (err) {
    console.error('[Push] Erro ao remover subscription do backend:', err);
  }
}

function detectarPlataforma(): string {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent.toLowerCase();
  if (/android/.test(ua)) return 'android';
  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (/windows/.test(ua)) return 'windows';
  if (/macintosh|mac os x/.test(ua)) return 'macos';
  if (/linux/.test(ua)) return 'linux';
  return 'other';
}

function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray.buffer;
}

function getRandomVerse(): { ref: string; text: string } {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
}

export function isPushSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
}

export function isPushEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(PUSH_ENABLED_KEY) === 'true';
}

export function setPushEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PUSH_ENABLED_KEY, String(enabled));
}

async function getSWRegistration(): Promise<ServiceWorkerRegistration | null> {
  if (typeof navigator === 'undefined' || !navigator.serviceWorker) return null;
  try {
    return await navigator.serviceWorker.ready;
  } catch (e) {
    console.error('[push:get-sw-registration]', e);
    return null;
  }
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isPushSupported()) return 'denied';

  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';

  const result = await Notification.requestPermission();
  return result;
}

export async function subscribeToPush(): Promise<PushSubscription | null> {
  const reg = await getSWRegistration();
  if (!reg) return null;

  if (!VAPID_PUBLIC_KEY) {
    console.warn('[Push] NEXT_PUBLIC_VAPID_PUBLIC_KEY nao configurada. Push notifications desabilitadas.');
    return null;
  }

  try {
    const permission = await requestNotificationPermission();
    if (permission !== 'granted') return null;

    const existingSubscription = await reg.pushManager.getSubscription();
    if (existingSubscription) {
      localStorage.setItem(PUSH_SUBSCRIPTION_KEY, JSON.stringify(existingSubscription.toJSON()));
      await enviarSubscriptionBackend(existingSubscription);
      return existingSubscription;
    }

    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });

    localStorage.setItem(PUSH_SUBSCRIPTION_KEY, JSON.stringify(subscription.toJSON()));
    setPushEnabled(true);

    await enviarSubscriptionBackend(subscription);

    return subscription;
  } catch (err) {
    console.error('[Push] Subscribe failed:', err);
    return null;
  }
}

export async function unsubscribeFromPush(): Promise<boolean> {
  const reg = await getSWRegistration();
  if (!reg) return false;

  try {
    const subscription = await reg.pushManager.getSubscription();
    if (subscription) {
      const json = subscription.toJSON();
      await subscription.unsubscribe();
      if (json.endpoint) {
        await removerSubscriptionBackend(json.endpoint);
      }
    }
    localStorage.removeItem(PUSH_SUBSCRIPTION_KEY);
    setPushEnabled(false);
    return true;
  } catch (err) {
    console.error('[Push] Unsubscribe failed:', err);
    return false;
  }
}

export function getStoredSubscription(): PushSubscriptionJSON | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PUSH_SUBSCRIPTION_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { console.error('[push:get-stored-subscription]', e); }
  return null;
}

export async function sendDailyVerseNotification(): Promise<void> {
  if (!isPushSupported() || Notification.permission !== 'granted') return;

  const verse = getRandomVerse();
  const reg = await getSWRegistration();
  if (!reg) return;

  try {
    await reg.showNotification(`📖 ${verse.ref}`, {
      body: verse.text,
      tag: DAILY_VERSE_TAG,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      data: { url: '/biblia' },
      actions: [
        { action: 'open-bible', title: 'Abrir Bíblia' },
        { action: 'dismiss', title: 'Dispensar' },
      ],
      vibrate: [200, 100, 200],
    } as NotificationOptions);
  } catch (err) {
    console.error('[Push] Show notification failed:', err);
  }
}

export async function scheduleDailyPush(hour: number = 7, minute: number = 0): Promise<void> {
  if (!isPushSupported() || Notification.permission !== 'granted') return;

  const now = new Date();
  const target = new Date();
  target.setHours(hour, minute, 0, 0);

  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }

  const delay = target.getTime() - now.getTime();

  localStorage.setItem('ssb_push_schedule', JSON.stringify({
    tag: DAILY_VERSE_TAG,
    scheduledAt: now.getTime(),
    triggerAt: target.getTime(),
    hour,
    minute,
  }));

  setTimeout(async () => {
    await sendDailyVerseNotification();
    scheduleDailyPush(hour, minute);
  }, delay);
}

export async function enablePush(hour: number = 7, minute: number = 0): Promise<boolean> {
  const subscription = await subscribeToPush();
  if (!subscription) return false;

  setPushEnabled(true);
  await scheduleDailyPush(hour, minute);
  scheduleSmartNotifications();
  return true;
}

export async function disablePush(): Promise<void> {
  await unsubscribeFromPush();
  localStorage.removeItem('ssb_push_schedule');
}

export async function reschedulePushFromStorage(): Promise<void> {
  if (!isPushEnabled() || !isPushSupported()) return;
  if (Notification.permission !== 'granted') return;

  try {
    const raw = localStorage.getItem(PUSH_SCHEDULE_KEY);
    if (raw) {
      const schedule = JSON.parse(raw);
      const delay = schedule.triggerAt - Date.now();
      if (delay > 0) {
        setTimeout(async () => {
          await sendDailyVerseNotification();
          scheduleDailyPush(schedule.hour ?? 7, schedule.minute ?? 0);
        }, delay);
      } else {
        // Time already passed — schedule for next occurrence using stored hour/minute
        scheduleDailyPush(schedule.hour ?? 7, schedule.minute ?? 0);
      }
    } else {
      scheduleDailyPush(7, 0);
    }
  } catch (e) {
    console.error('[push:configure-smart-schedule]', e);
    scheduleDailyPush(7, 0);
  }
}

export interface SmartPushSettings {
  hora: number;
  minuto: number;
  lembreteStreak: boolean;
  lembretePlano: boolean;
  versiculoMotivacional: boolean;
}

export function getSmartPushSettings(): SmartPushSettings {
  if (typeof window === 'undefined') return { hora: 7, minuto: 0, lembreteStreak: true, lembretePlano: true, versiculoMotivacional: true };
  try {
    const raw = localStorage.getItem(PUSH_SMART_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { console.error('[push:get-smart-settings]', e); }
  return { hora: 7, minuto: 0, lembreteStreak: true, lembretePlano: true, versiculoMotivacional: true };
}

export function saveSmartPushSettings(settings: SmartPushSettings) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(PUSH_SMART_KEY, JSON.stringify(settings)); } catch (e) { console.error('[push:save-smart-settings]', e); }
}

const STREAK_REMINDER_VERSES = [
  { ref: 'Hebreus 12:1', text: 'Portanto, nós também, pois temos tal nuvem de testemunhas ao redor de nós, deixemos todo o peso e o pecado que nos assedia, e corramos com paciência a carreira que nos está posta diante.' },
  { ref: '1 Coríntios 9:24', text: 'Não sabeis que os que correm na pista, todos certamente correm, mas somente um recebe o prêmio? Assim correi, para que o alcanceis.' },
  { ref: 'Filipenses 3:13-14', text: 'Irmãos, eu não me julgo já haver alcançado; mas uma coisa faço: esquecendo-me das coisas que ficam atrás e procurando as que estão adiante, prossigo para o alvo, para o prêmio da soberana vocação de Deus em Cristo Jesus.' },
  { ref: 'Josué 1:8', text: 'Não se aparte deste livro da lei da tua boca, mas medita nele dia e noite, para que guardes e faças segundo tudo o que nele está escrito; porque então farás prosperar o teu caminho, e então terás êxito.' },
  { ref: 'Salmos 119:105', text: 'Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.' },
  { ref: '2 Timóteo 2:15', text: 'Procura apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar, que maneja bem a palavra da verdade.' },
];

export async function sendStreakReminder(streak: number): Promise<void> {
  if (!isPushSupported() || Notification.permission !== 'granted') return;

  const verse = STREAK_REMINDER_VERSES[Math.floor(Math.random() * STREAK_REMINDER_VERSES.length)];
  const streakText = streak > 0
    ? `🔥 ${streak} dias de sequência! Não pare agora.`
    : '📖 Que tal ler um versículo hoje?';

  const reg = await getSWRegistration();
  if (!reg) return;

  try {
    await reg.showNotification(`🔥 Lembrete de Leitura`, {
      body: `${streakText}\n\n"${verse.text}" — ${verse.ref}`,
      tag: `${DAILY_VERSE_TAG}-streak`,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      data: { url: '/biblia' },
      actions: [
        { action: 'open-bible', title: 'Ler Agora' },
        { action: 'dismiss', title: 'Mais Tarde' },
      ],
      vibrate: [200, 100, 200],
    } as NotificationOptions);
  } catch (err) {
    console.error('[Push] Streak reminder failed:', err);
  }
}

export async function sendStreakRiskNotification(streak: number): Promise<void> {
  if (!isPushSupported() || Notification.permission !== 'granted') return;
  if (streak < 2) return;

  const reg = await getSWRegistration();
  if (!reg) return;

  try {
    await reg.showNotification(`⚠️ Sua sequência está em risco!`, {
      body: `Você tem ${streak} dias de sequência. Leia agora para não perder!`,
      tag: `${DAILY_VERSE_TAG}-streak-risk`,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      data: { url: '/biblia' },
      actions: [
        { action: 'open-bible', title: 'Ler Agora' },
        { action: 'dismiss', title: 'Dispensar' },
      ],
      vibrate: [300, 150, 300],
    } as NotificationOptions);
  } catch (err) {
    console.error('[Push] Streak risk notification failed:', err);
  }
}

export async function sendTestNotification(): Promise<boolean> {
  if (!isPushSupported()) return false;
  if (Notification.permission !== 'granted') {
    const perm = await requestNotificationPermission();
    if (perm !== 'granted') return false;
  }

  const reg = await getSWRegistration();
  if (!reg) return false;

  try {
    await reg.showNotification('✅ Notificação de Teste', {
      body: 'Se você está vendo isto, as notificações estão funcionando!',
      tag: 'ssb-test-notification',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      data: { url: '/configuracoes/notificacoes' },
      actions: [
        { action: 'open-bible', title: 'Abrir Bíblia' },
        { action: 'dismiss', title: 'Dispensar' },
      ],
      vibrate: [200, 100, 200],
    } as NotificationOptions);
    return true;
  } catch (err) {
    console.error('[Push] Test notification failed:', err);
    return false;
  }
}

export function scheduleSmartNotifications() {
  const settings = getSmartPushSettings();
  if (!isPushEnabled() || !isPushSupported()) return;
  if (Notification.permission !== 'granted') return;

  const now = new Date();
  const hour = now.getHours();

  if (settings.versiculoMotivacional) {
    scheduleDailyPush(settings.hora, settings.minuto);
  }

  if (settings.lembreteStreak) {
    const reminderHour = Math.min(settings.hora + 12, 23);
    const reminderMinute = settings.minuto;
    const reminderTarget = new Date();
    reminderTarget.setHours(reminderHour, reminderMinute, 0, 0);
    if (reminderTarget.getTime() <= now.getTime()) {
      reminderTarget.setDate(reminderTarget.getDate() + 1);
    }
    const reminderDelay = reminderTarget.getTime() - now.getTime();
    setTimeout(() => {
      const raw = localStorage.getItem('ssb_gamificacao');
      if (raw) {
        const state = JSON.parse(raw);
        if (state.streakAtual > 0) {
          sendStreakReminder(state.streakAtual);
        }
      }
    }, reminderDelay);
  }
}
