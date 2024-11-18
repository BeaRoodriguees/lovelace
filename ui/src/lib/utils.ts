export function forceDelay(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

export function mapToEnum<T>(
  enumObj: T,
  key: string | T,
): T[keyof T] | undefined {
  return enumObj[key as unknown as keyof T];
}

export function convertISOStringToDate(date: string): Date {
  const [datePart, timePart] = date.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute, second] = timePart.split(':').map(Number);

  return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
}

export function formatDate(date: Date): string {
  // Corrige a data para 'America/Sao_paulo' tanto no client quanto no servidor.
  // Assim evitamos problemas de hidratação.
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const parts = formatter.formatToParts(date);

  const day = parts.find((p) => p.type === 'day')?.value || '00';
  const month = parts.find((p) => p.type === 'month')?.value || '00';
  const year = parts.find((p) => p.type === 'year')?.value || '0000';
  const hours = parts.find((p) => p.type === 'hour')?.value || '00';
  const minutes = parts.find((p) => p.type === 'minute')?.value || '00';
  const seconds = parts.find((p) => p.type === 'second')?.value || '00';

  return `${day}/${month}/${year} às ${hours}:${minutes}:${seconds}`;
}

export function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}
