export function clamp(value: number, min: number, max: number): number {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

export function isMobile() {
  return window.matchMedia('(max-width: 576px)').matches;
}
