import { Quran, TLocale } from "@0x1eef/quran";
import { Select } from "~/components/Select";

type Props = {
  locale: TLocale;
  setLocale: (v: TLocale) => void;
};

export function LanguageSelect({ locale, setLocale }: Props) {
  const locales = Object.values(Quran.locales);

  if (!locale) {
    return null;
  }

  return (
    <Select value={locale.name} className="language-select w-20">
      {locales.map((l: TLocale, i: number) => {
        return (
          <Select.Option
            key={i}
            className={classNames(
              "flex h-4 text-sm w-full items-center justify-center no-underline rounded pb-1 pt-1 mb-1 border-accent",
              l.direction,
              l.name === locale.name ? "active font-bold" : undefined,
            )}
            value={l.name}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              setLocale(l);
            }}
          >
            {l.displayName}
          </Select.Option>
        );
      })}
    </Select>
  );
}
