export interface LeituraDia {
  dia: number;
  titulo: string;
  passagens: Array<{ livro: string; capitulo: number }>;
}

function padZero(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function formatICalDate(date: Date): string {
  return (
    date.getUTCFullYear().toString() +
    padZero(date.getUTCMonth() + 1) +
    padZero(date.getUTCDate()) +
    'T' +
    padZero(date.getUTCHours()) +
    padZero(date.getUTCMinutes()) +
    padZero(date.getUTCSeconds()) +
    'Z'
  );
}

function escapeICalText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

function foldLine(line: string): string {
  const maxLen = 75;
  if (line.length <= maxLen) return line;
  let result = line.slice(0, maxLen);
  let remaining = line.slice(maxLen);
  while (remaining.length > 0) {
    result += '\r\n ' + remaining.slice(0, maxLen - 1);
    remaining = remaining.slice(maxLen - 1);
  }
  return result;
}

function generateUID(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let uid = '';
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) uid += '-';
    uid += chars[Math.floor(Math.random() * chars.length)];
  }
  return uid + '@solascripturabr.com.br';
}

export function exportPlanToICal(
  days: LeituraDia[],
  planName: string,
  completedDays: number[],
  startDate: string,
  hour: number = 7,
  minute: number = 0,
): string {
  const start = new Date(startDate);
  const now = new Date();
  const dtStamp = formatICalDate(now);

  const events: string[] = [];

  for (const day of days) {
    const eventDate = new Date(start);
    eventDate.setDate(eventDate.getDate() + (day.dia - 1));

    const dtStart = new Date(eventDate);
    dtStart.setUTCHours(hour + 3, minute, 0, 0); // +3 for BRT (UTC-3)

    const dtEnd = new Date(dtStart);
    dtEnd.setUTCMinutes(dtEnd.getUTCMinutes() + 30);

    const passages = day.passagens
      .map(p => `${p.livro} ${p.capitulo}`)
      .join(', ');

    const summary = `Leitura Bíblica: ${day.titulo}`;
    const description = `${passages} — ${planName}`;
    const isCompleted = completedDays.includes(day.dia);

    const lines = [
      'BEGIN:VEVENT',
      foldLine(`UID:${generateUID()}`),
      `DTSTAMP:${dtStamp}`,
      `DTSTART:${formatICalDate(dtStart)}`,
      `DTEND:${formatICalDate(dtEnd)}`,
      foldLine(`SUMMARY:${escapeICalText(summary)}`),
      foldLine(`DESCRIPTION:${escapeICalText(description)}`),
      `STATUS:${isCompleted ? 'COMPLETED' : 'NEEDS-ACTION'}`,
      'BEGIN:VALARM',
      'TRIGGER:-PT10M',
      'ACTION:DISPLAY',
      foldLine(`DESCRIPTION:Lembrete: hora de ler ${escapeICalText(passages)}`),
      'END:VALARM',
      'END:VEVENT',
    ];

    events.push(lines.join('\r\n'));
  }

  const calendar = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sola Scriptura BR//Plano de Leitura//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    foldLine(`X-WR-CALNAME:${escapeICalText(planName)}`),
    'X-WR-TIMEZONE:America/Sao_Paulo',
    'BEGIN:VTIMEZONE',
    'TZID:America/Sao_Paulo',
    'BEGIN:STANDARD',
    'DTSTART:19700101T000000',
    'TZOFFSETFROM:-0300',
    'TZOFFSETTO:-0300',
    'TZNAME:BRT',
    'END:STANDARD',
    'END:VTIMEZONE',
    ...events,
    'END:VCALENDAR',
  ].join('\r\n');

  return calendar;
}

export function downloadICal(filename: string, icalString: string): void {
  const blob = new Blob([icalString], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
