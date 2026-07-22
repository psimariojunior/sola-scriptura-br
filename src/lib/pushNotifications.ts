const VAPID_PUBLIC_KEY = 'BExG_PLACEHOLDER_VAPID_PUBLIC_KEY_REPLACE_WITH_REAL_KEY';
const PUSH_ENABLED_KEY = 'ssb_push_enabled';
const PUSH_SUBSCRIPTION_KEY = 'ssb_push_subscription';
const DAILY_VERSE_TAG = 'ssb-daily-verse-push';

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
  } catch {
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

  try {
    const permission = await requestNotificationPermission();
    if (permission !== 'granted') return null;

    const existingSubscription = await reg.pushManager.getSubscription();
    if (existingSubscription) {
      localStorage.setItem(PUSH_SUBSCRIPTION_KEY, JSON.stringify(existingSubscription.toJSON()));
      return existingSubscription;
    }

    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });

    localStorage.setItem(PUSH_SUBSCRIPTION_KEY, JSON.stringify(subscription.toJSON()));
    setPushEnabled(true);

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
      await subscription.unsubscribe();
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
  } catch {}
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
    const raw = localStorage.getItem('ssb_push_schedule');
    if (raw) {
      const schedule = JSON.parse(raw);
      const delay = schedule.triggerAt - Date.now();
      if (delay > 0) {
        setTimeout(async () => {
          await sendDailyVerseNotification();
          scheduleDailyPush(schedule.hour, schedule.minute);
        }, delay);
      } else {
        scheduleDailyPush(schedule.hour ?? 7, schedule.minute ?? 0);
      }
    } else {
      scheduleDailyPush(7, 0);
    }
  } catch {
    scheduleDailyPush(7, 0);
  }
}
