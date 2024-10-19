import type { ReactNode } from "react";
import type { TLocale } from "Quran";
import { Theme } from "~/hooks/useTheme";
import { LanguageSelect, ThemeSelect } from "~/components/Select";

type Props = {
  locale: TLocale;
  theme: string;
  setTheme: (t: Theme) => void;
  setLocale: (t: TLocale) => void;
  showLangDropdown: boolean;
  showThemeDropdown: boolean;
  setShowLangDropdown: (v: boolean) => void;
  setShowThemeDropdown: (v: boolean) => void;
  children: ReactNode;
};

export function Head({
  locale,
  theme,
  setLocale,
  setTheme,
  showLangDropdown,
  showThemeDropdown,
  setShowLangDropdown,
  setShowThemeDropdown,
  children,
}: Props) {
  return (
    <header
      className={classNames("flex flex-col h-20 mt-4", {
        "mb-6": locale.direction === "ltr",
        "mb-8": locale.direction === "rtl",
      })}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-center">
          <a
            data-testid="h1"
            href={`/${locale.name}/`}
            className="flex rounded justify-center p-3 m-0 mb-4 w-full no-underline font-semibold color-secondary text-2xl"
          >
            {children}
          </a>
        </div>
        <nav className="flex flex-row justify-between text-lg">
          <LanguageSelect
            isOpen={showLangDropdown}
            setIsOpen={setShowLangDropdown}
            setLocale={setLocale}
            locale={locale}
          />
          <ThemeSelect
            isOpen={showThemeDropdown}
            setIsOpen={setShowThemeDropdown}
            theme={theme}
            setTheme={setTheme}
          />
        </nav>
      </div>
    </header>
  );
}
