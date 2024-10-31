import type { TLocale } from "@0x1eef/quran";

export function useLocaleKeys(locale: TLocale) {
  const SoftRight = locale.direction === "ltr" ? "SoftRight" : "SoftLeft";
  const SoftLeft = locale.direction === "ltr" ? "SoftLeft" : "SoftRight";
  const ArrowRight = locale.direction === "ltr" ? "ArrowRight" : "ArrowLeft";
  const ArrowLeft = locale.direction === "ltr" ? "ArrowLeft" : "ArrowRight";
  return { SoftRight, SoftLeft, ArrowRight, ArrowLeft };
}
