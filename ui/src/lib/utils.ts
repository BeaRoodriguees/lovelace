export function forceDelay(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

export function mapToEnum<T>(
  enumObj: T,
  key: string | T,
): T[keyof T] | undefined {
  return enumObj[key as unknown as keyof T];
}

export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses são baseados em zero
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} às ${hours}:${minutes}:${seconds}`;
}
