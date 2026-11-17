const DEMO_TRACKING_NUMBER = "gh3948598014";

export function isValidDemoTrackingNumber(value: string): boolean {
  return value.trim().toLowerCase() === DEMO_TRACKING_NUMBER;
}