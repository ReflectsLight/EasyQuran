/**
 * Types
 */
type TAyat = Ayah[];

type TLocale = {
  readonly name: string;
  readonly displayName: string;
  readonly direction: "rtl" | "ltr";
};

type TQuran = {
  readonly locale: TLocale;
  readonly surahs: Surah[];
};

type TSurah = {
  readonly id: number;
  readonly name: string;
  readonly urlName: string;
  readonly translitName: string;
  readonly numberOfAyah: number;
  readonly translatedBy: string | null;
};

type TAyah = {
  readonly id: number;
  readonly body: string;
  readonly ms: number;
};

/**
 * Classes
 */
class Quran {
  readonly locale: TLocale;
  readonly surahs: Surah[];

  /**
   * @returns {Record<string, TLocale>} The available locales
   */
  static get locales(): Record<string, TLocale> {
    return {
      en: { name: "en", displayName: "English", direction: "ltr" },
      ar: { name: "ar", displayName: "العربية", direction: "rtl" },
      fa: { name: "fa", displayName: "فارسی", direction: "rtl" },
    };
  }

  /**
   * @returns {Record<string, Surah[]>} The available surahs
   */
  static get surahs(): Record<string, Surah[]> {
    const result: Record<string, Surah[]> = {};
    const surahs: Record<string, TSurah[]> = require("@json/surahs");
    for (const locale in surahs) {
      result[locale] = surahs[locale].map(
        (surah: TSurah) => new Surah({ ...surah, locale }),
      );
    }
    return result;
  }

  /**
   * @returns {[number[]]} An array of ayah durations
   */
  static get durations(): [number[]] {
    return require("@json/durations");
  }

  constructor(self: TQuran) {
    this.locale = self.locale;
    this.surahs = self.surahs;
  }
}

class Surah {
  readonly id: number;
  readonly name: string;
  readonly urlName: string;
  readonly translitName: string;
  readonly numberOfAyah: number;
  readonly locale: string;
  readonly translatedBy: string | null;

  constructor(self: TSurah & { locale: string }) {
    this.id = self.id;
    this.name = self.name;
    this.urlName = self.urlName;
    this.translitName = self.translitName;
    this.numberOfAyah = self.numberOfAyah;
    this.translatedBy = self.translatedBy;
    this.locale = self.locale;
    return this;
  }

  get ayat(): Ayah[] {
    const ayat = require(`@json/${this.locale}/${this.id}.json`);
    return ayat.map(([id, body]) => {
      const ms = Quran.durations[this.id-1][id-1];
      return new Ayah({ id, body, ms })
    });
  }
}

class Ayah {
  readonly id: number;
  readonly body: string;
  readonly ms: number;

  constructor(self: TAyah) {
    this.id = self.id;
    this.body = self.body;
    this.ms = self.ms;
  }
}

/**
 * Exports
 */
export { Quran, Surah, Ayah, TQuran, TSurah, TAyah, TAyat, TLocale };
