import { Quran, TLocale } from "Quran";
import { Select } from "~/components/Select";

type Props = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  locale: TLocale;
  setLocale: (v: TLocale) => void;
};

export function LanguageSelect({
  isOpen,
  setIsOpen,
  locale,
  setLocale,
}: Props) {
  const locales = Object.values(Quran.locales);

  if (!locale) {
    return null;
  }

  return (
    <Select
      value={locale.name}
      className="language-select w-20"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      {locales.map((l: TLocale, i: number) => {
        return (
          <Select.Option
            key={i}
            className={classNames(
              "flex h-5 text-sm w-full items-center justify-center no-underline mb-1 rounded",
              l.direction,
              l.name === locale.name ? "active" : undefined,
            )}
            value={l.name}
            onClick={(e: React.ChangeEvent) => [
              e.preventDefault(),
              setLocale(l),
            ]}
          >
            {l.displayName}
          </Select.Option>
        );
      })}
    </Select>
  );
}
