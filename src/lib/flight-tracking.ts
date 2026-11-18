const DEMO_TRACKING_NUMBER = "h72389859327";

export function isValidDemoTrackingNumber(value: string): boolean {
  return value.trim().toLowerCase() === DEMO_TRACKING_NUMBER;
}