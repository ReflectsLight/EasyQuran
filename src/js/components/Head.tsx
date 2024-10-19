import type { ReactNode } from "react";
import type { TLocale } from "Quran";
import { Theme } from "~/hooks/useTheme";
import { LanguageSelect, ThemeSelect } from "~/components/Select";

type Props = {
  locale: TLocale;
  theme: string;
  setTheme: (t: Theme) => void;
  setLocale: (t: TLocale) => void;
  children: ReactNode;
};

export function Head({ locale, theme, setLocale, setTheme, children }: Props) {
  const [showLangDropdown, setShowLangDropdown] = useState<boolean>(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState<boolean>(false);
  return (
    <header className="flex flex-col h-20 mt-4 mb-2">
      <div className="flex flex-col">
        <div className="flex items-center justify-center">
          <a
            data-testid="h1"
            href={`/${locale.name}/`}
            className="flex rounded justify-center p-3 m-0 mb-4 w-full no-underline font-semibold color-secondary text-1xl"
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
