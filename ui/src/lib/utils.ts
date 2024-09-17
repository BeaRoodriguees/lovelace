export function forceDelay(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}
