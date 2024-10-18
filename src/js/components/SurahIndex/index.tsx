import type { Surah, TLocale } from "Quran";
import { useTheme } from "~/hooks/useTheme";
import { formatNumber, TFunction } from "~/lib/t";
import { Arrow } from "~/components/Icon";
import { Head } from "~/components/Head";
import { LanguageSelect, ThemeSelect } from "~/components/Select";
import "@css/main/SurahIndex.scss";

type Props = {
  locale: TLocale;
  surahs: Record<"string", Surah[]>;
  t: TFunction;
};

export function SurahIndex({ locale, surahs, t }: Props) {
  const [activeLocale, setActiveLocale] = useState<TLocale>(locale);
  const [theme, setTheme] = useTheme();
  const [showLangDropdown, setShowLangDropdown] = useState<boolean>(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState<boolean>(false);

  const index = surahs[activeLocale.name];
  const rootRef = useRef<HTMLDivElement>(null);
  const activeEl = useMemo(
    () => document.activeElement,
    [document.activeElement],
  );

  useEffect(() => {
    const onKeyPress = (e) => {
      if (e.key === "SoftLeft") {
        setShowLangDropdown(!showLangDropdown);
      } else if (e.key === "SoftRight") {
        setShowThemeDropdown(!showThemeDropdown);
      }
    };
    activeEl.addEventListener("keydown", onKeyPress);
    return () => activeEl.removeEventListener("keydown", onKeyPress);
  }, [activeEl, showLangDropdown, showThemeDropdown]);

  return (
    <div
      ref={rootRef}
      className={classNames(
        "flex flex-col h-full content surah-index theme",
        theme,
        activeLocale.name,
        activeLocale.direction,
      )}
    >
      <Head title={t(activeLocale, "TheNobleQuran")} locale={activeLocale}>
        <LanguageSelect
          isOpen={showLangDropdown}
          setIsOpen={setShowLangDropdown}
          activeLocale={activeLocale}
          setActiveLocale={setActiveLocale}
        />
        <ThemeSelect
          isOpen={showThemeDropdown}
          setIsOpen={setShowThemeDropdown}
          theme={theme}
          setTheme={setTheme}
        />
      </Head>
      <ul className="flex flex-wrap body index scroll-y list-none m-0 p-0 w-full h-full">
        {index.map((surah, key) => (
          <li
            className={classNames("flex justify-center surah mb-2", {
              "w-full": activeLocale.direction === "ltr",
              "w-1/2": activeLocale.direction === "rtl",
            })}
            key={key}
          >
            <a
              className="flex items-center color-primary no-underline rounded w-11/12 h-8"
              href={`/${activeLocale.name}/${surah.id}/`}
            >
	      <span className="background-primary color-secondary ml-2 mr-3 rounded font-extrabold w-10 text-center">
	        {formatNumber(activeLocale, surah.id)}
	      </span>
              <span>{surah.name}</span>
            </a>
          </li>
        ))}
      </ul>
      <footer className="flex flex-row justify-between mb-5 h-12">
        <a
          className="flex flex-row items-center no-underline"
          href={`/${activeLocale.name}/random/`}
        >
          {activeLocale.direction === "ltr" ? (
            <Arrow direction="right" />
          ) : (
            <Arrow direction="left" />
          )}
          <span
            className={classNames({
              "pl-3": activeLocale.direction === "ltr",
              "pr-3": activeLocale.direction === "rtl",
            })}
          >
            {t(activeLocale, "ChooseRandomChapter")}
          </span>
        </a>
      </footer>
    </div>
  );
}
