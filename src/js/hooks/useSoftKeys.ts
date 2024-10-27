import type { TLocale } from "@0x1eef/quran";
export function useSoftKeys(locale: TLocale) {
  const SoftRight = locale.direction === "ltr" ? "SoftRight" : "SoftLeft";
  const SoftLeft = locale.direction === "ltr" ? "SoftLeft" : "SoftRight";
  return { SoftRight, SoftLeft };
}
