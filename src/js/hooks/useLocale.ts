import type { TLocale } from "@0x1eef/quran";
type Result = [TLocale, (t: TLocale) => void];

export function useLocale(): Result {
  const locales = Object.values(Quran.locales);
  const cookies = Object.fromEntries(
    document.cookie.split(";").map((e) => e.split("=")),
  );
  const [locale, setLocale] = useState<TLocale>(
    locales.find((l) => l.name === cookies.locale) || Quran.locales["en"],
  );
  const set = (l: TLocale) => {
    const maxAge = 3600 * 24 * 90;
    document.cookie = `locale=${l.name}; path=/; max-age=${maxAge}; SameSite=Strict`;
    setLocale(l);
  };
  return [locale, set];
}
