'use client';

// Checks if user has an active reading plan that's behind schedule
// and sends a push notification reminder

const PLAN_STORAGE_KEY = 'ssb_plano_leitura_v2';
const PUSH_ENABLED_KEY = 'ssb_push_plano_enabled';
const LAST_PLAN_CHECK_KEY = 'ssb_last_plan_check';
const CHECK_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours

interface PlanoLeitura {
  id: string;
  nome: string;
  capitulos: Array<{
    livro: string;
    capitulo: number;
    data: string; // ISO date string
    concluido: boolean;
  }>;
}

export function isPushEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(PUSH_ENABLED_KEY) !== 'false' && 
         Notification.permission === 'granted';
}

export function setPushEnabled(enabled: boolean): void {
  localStorage.setItem(PUSH_ENABLED_KEY, String(enabled));
}

export function getActivePlan(): PlanoLeitura | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PLAN_STORAGE_KEY);
    if (!raw) return null;
    const plan = JSON.parse(raw);
    if (plan?.capitulos?.length > 0) return plan;
  } catch {}
  return null;
}

export function isPlanBehindSchedule(plan: PlanoLeitura): { behind: boolean; daysBehind: number; nextChapter: string | null } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Find the next uncompleted chapter
  const nextUncompleted = plan.capitulos.find(c => !c.concluido);
  if (!nextUncompleted) return { behind: false, daysBehind: 0, nextChapter: null };
  
  const chapterDate = new Date(nextUncompleted.data);
  chapterDate.setHours(0, 0, 0, 0);
  
  const diffMs = today.getTime() - chapterDate.getTime();
  const daysBehind = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (daysBehind > 0) {
    return { 
      behind: true, 
      daysBehind, 
      nextChapter: `${nextUncompleted.livro} ${nextUncompleted.capitulo}` 
    };
  }
  
  return { behind: false, daysBehind: 0, nextChapter: `${nextUncompleted.livro} ${nextUncompleted.capitulo}` };
}

export async function checkAndSendPlanReminder(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  if (!isPushEnabled()) return false;
  
  // Don't check too frequently
  const lastCheck = localStorage.getItem(LAST_PLAN_CHECK_KEY);
  if (lastCheck && Date.now() - Number(lastCheck) < CHECK_INTERVAL) return false;
  
  localStorage.setItem(LAST_PLAN_CHECK_KEY, String(Date.now()));
  
  const plan = getActivePlan();
  if (!plan) return false;
  
  const { behind, daysBehind, nextChapter } = isPlanBehindSchedule(plan);
  if (!behind || !nextChapter) return false;
  
  // Calculate progress
  const completed = plan.capitulos.filter(c => c.concluido).length;
  const total = plan.capitulos.length;
  const percent = Math.round((completed / total) * 100);
  
  // Send via service worker
  try {
    const reg = await navigator.serviceWorker.ready;
    if (reg.active) {
      reg.active.postMessage({
        type: 'SCHEDULE_NOTIFICATION',
        notification: {
          title: `📖 Plano de Leitura - ${daysBehind} dia${daysBehind > 1 ? 's' : ''} atrasado`,
          body: `Seu próximo capítulo é ${nextChapter}. Você está com ${percent}% do plano concluído. Continue firme!`,
          tag: 'plan-reminder',
          url: '/planos',
        },
      });
    }
    
    // Also try pushManager
    if (reg.pushManager) {
      const subscription = await reg.pushManager.getSubscription();
      if (subscription) {
        // Use the web push API directly via fetch to our notification endpoint
        await fetch('/api/notifications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'plan-reminder',
            title: `📖 Plano de Leitura - ${daysBehind} dia${daysBehind > 1 ? 's' : ''} atrasado`,
            body: `Seu próximo capítulo é ${nextChapter}. Você está com ${percent}% do plano concluído.`,
            tag: 'plan-reminder',
            url: '/planos',
          }),
        });
      }
    }
    
    return true;
  } catch {
    return false;
  }
}

export function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return Promise.resolve('denied');
  }
  return Notification.requestPermission();
}

export function shouldCheckPlan(): boolean {
  if (typeof window === 'undefined') return false;
  const lastCheck = localStorage.getItem(LAST_PLAN_CHECK_KEY);
  if (!lastCheck) return true;
  return Date.now() - Number(lastCheck) >= CHECK_INTERVAL;
}
