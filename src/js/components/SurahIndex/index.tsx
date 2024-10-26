import type { TLocale } from "@0x1eef/quran";
import { useTheme } from "~/hooks/useTheme";
import { formatNumber, TFunction } from "~/lib/t";
import { Arrow } from "~/components/Icon";
import { Head } from "~/components/Head";
import "@css/main/SurahIndex.scss";

type Props = {
  localeId: string;
  t: TFunction;
};

export function SurahIndex({ localeId, t }: Props) {
  const [theme, setTheme] = useTheme();
  const [locale, setLocale] = useState<TLocale>(Quran.locales[localeId]);
  const index = useMemo(() => Quran.surahs[locale.name], [locale.name]);
  const ulRef = useRef<HTMLUListElement>(null);
  const refs = useMemo(
    () => Quran.surahs[locale.name].map(() => createRef()),
    Quran.surahs.length,
  );

  function getNextRef(e: KeyboardEvent) {
    if (e.target instanceof HTMLAnchorElement) {
      const { target } = e;
      const index = Number(target.getAttribute("data-index"));
      if (e.key === "ArrowDown") {
        return refs[index + 1];
      } else if (e.key === "ArrowUp") {
        return refs[index - 1];
      } else {
        return refs[index];
      }
    }
  }

  function getNextScrollTop(e: KeyboardEvent) {
    const ul = ulRef.current;
    if (!ul) {
      return 0;
    } else if (e.key === "ArrowDown") {
      return ul.scrollTop - 35;
    } else if (e.key === "ArrowUp") {
      return ul.scrollTop + 35;
    } else {
      return ul.scrollTop;
    }
  }

  function onKeyPress(e: KeyboardEvent) {
    const ul = ulRef.current;
    if (!ul) {
      return;
    } else {
      const anchor = getNextRef(e)?.current;
      if (anchor) {
        anchor.focus();
        ul.scroll({ behavior: "auto" });
        ul.scrollTop = getNextScrollTop(e);
      }
    }
  }

  useEffect(() => {
    const ref = refs[0];
    const anchor = ref.current;
    if (anchor) {
      anchor.focus();
    }
  }, []);

  useEffect(() => {
    refs.forEach((ref: React.RefObject<HTMLAnchorElement>) => {
      if (ref.current) {
        const el = ref.current;
        el.addEventListener("keydown", onKeyPress);
      }
    });
  }, [refs]);

  return (
    <div
      className={classNames(
        "flex flex-col h-full content surah-index theme",
        theme,
        locale.name,
        locale.direction,
      )}
    >
      <Head
        setLocale={setLocale}
        locale={locale}
        setTheme={setTheme}
        theme={theme}
      >
        {t(locale, "TheNobleQuran")}
      </Head>
      <ul
        ref={ulRef}
        className="flex flex-wrap body index scroll-y list-none m-0 p-0 w-full h-full"
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
              data-context="index-list-item"
              ref={refs[key]}
              className="flex items-center color-primary no-underline rounded w-11/12 h-8 index-item"
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
      <footer className="flex flex-row justify-between mb-5 h-12">
        <a
          className="flex flex-row items-center no-underline"
          href={`/${locale.name}/random/`}
        >
          {locale.direction === "ltr" ? (
            <Arrow direction="right" />
          ) : (
            <Arrow direction="left" />
          )}
          <span
            className={classNames({
              "pl-3": locale.direction === "ltr",
              "pr-3": locale.direction === "rtl",
            })}
          >
            {t(locale, "ChooseRandomChapter")}
          </span>
        </a>
      </footer>
    </div>
  );
}
