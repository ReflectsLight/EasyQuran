import type { ReactNode } from "preact/compat";
import { LanguageSelect, ThemeSelect } from "~/components/Select";

type Props = {
  children: ReactNode;
};

export function Head({ children }: Props) {
  const { locale } = useContext(SettingsContext);
  return (
    <header className="flex flex-col h-20 mt-4 mb-4">
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
        <LanguageSelect />
        <ThemeSelect />
      </nav>
    </header>
  );
}
