export function forceDelay(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

export function mapToEnum<T>(
  enumObj: T,
  key: string | T,
): T[keyof T] | undefined {
  return enumObj[key as unknown as keyof T];
}

export function convertToPatchedDate(dateString: string): Date {
  // A string de data que vem do servidor representa o horário no timezone
  // 'America/Sao_Paulo'. Só que ao criar o objeto Date, o client corrige
  // a string para a timezone 'America/Sao_Paulo', pois imagina que a 
  // string fornecida é UTC. Portanto, temos que colocar um offset de 3 horas
  // de forma a cancelar a correção automática que o navegador faz.
  const timeZone = 'America/Sao_Paulo';

  const [datePart, timePart] = dateString.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute, second] = timePart.split(':').map(Number);

  const localDate = new Date(Date.UTC(year, month - 1, day, hour, minute, second));

  // Offset da confusão
  const saoPauloOffset = 3 * 60;
  return new Date(localDate.getTime() + saoPauloOffset * 60 * 1000);
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
