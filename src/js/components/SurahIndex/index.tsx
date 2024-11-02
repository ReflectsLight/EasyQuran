import { formatNumber, TFunction } from "~/lib/t";
import { Head } from "~/components/Head";
import { debug, getNextRef, getContext } from "~/lib/utils";
import "@css/main/SurahIndex.scss";

type Props = {
  localeId: string;
  t: TFunction;
};

export function SurahIndex({ localeId, t }: Props) {
  const { theme, locale, setLocale } = useContext(SettingsContext);
  const index = useMemo(() => Quran.surahs[locale.name], [locale.name]);
  const ulRef = useRef<HTMLUListElement>(null);
  const refs = useMemo(
    () => Quran.surahs[locale.name].map(() => createRef()),
    [],
  );

  useEffect(() => {
    setLocale(Quran.locales[localeId]);
  }, [localeId]);

  useEffect(() => {
    const ref = refs[0];
    const anchor = ref.current;
    if (anchor) {
      anchor.focus();
    }
  }, [locale.name, theme]);

  useEffect(() => {
    function onKeyPress(event: KeyboardEvent) {
      debug("SurahIndex.tsx", "onKeyPress", event.key);
      const context = getContext(event);
      if (context === "surah-index") {
        if (["ArrowUp", "ArrowDown"].indexOf(event.key) >= 0) {
          const ul = ulRef.current;
          const anchor = getNextRef(event, refs)?.current;
          if (ul && anchor) {
            anchor.focus();
            ul.scroll({ behavior: "auto" });
          }
          event.stopImmediatePropagation();
        } else {
          debug("SurahIndex.tsx", "onKeyPress", "ignore");
        }
      } else {
        debug("SurahIndex.tsx", "onKeyPress", "ignore");
      }
    }
    document.addEventListener("keydown", onKeyPress);
    return () => document.removeEventListener("keydown", onKeyPress);
  }, [locale.name, theme]);

  return (
    <div
      className={classNames(
        "flex flex-col h-full content surah-index theme",
        theme,
        locale.name,
        locale.direction,
      )}
    >
      <Head>{t(locale, "TheNobleQuran")}</Head>
      <ul
        ref={ulRef}
        className="flex flex-wrap body index list-none m-0 p-0 w-full h-full overflow-hidden"
      >
        {index.map((surah, key) => (
          <li
            className={classNames("flex justify-center surah mb-2", {
              "w-full": locale.direction === "ltr",
              "w-1/2": locale.direction === "rtl",
            })}
            key={key}
          >
            <a
              data-index={key}
              data-context="surah-index"
              ref={refs[key]}
              className="flex items-center color-primary no-underline rounded w-11/12 h-8"
              href={`/${locale.name}/${surah.id}/`}
            >
              <span className="flex items-center justify-center h-6 background-primary color-secondary ml-2 mr-3 rounded font-extrabold w-14 text-center">
                {formatNumber(locale, surah.id)}
              </span>
              <span className="w-48">{surah.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
