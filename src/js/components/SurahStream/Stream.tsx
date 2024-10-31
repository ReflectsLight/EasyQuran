import type { Surah, Ayah, TAyat } from "@0x1eef/quran";
import { formatNumber, TFunction } from "~/lib/t";

type Props = {
  surah: Surah;
  stream: TAyat;
  endOfStream: boolean;
  isPaused: boolean;
  t: TFunction;
};

export function Stream({ surah, stream, endOfStream, isPaused, t }: Props) {
  const { theme, locale } = useContext(SettingsContext);
  const className = endOfStream || isPaused ? ["scroll-y"] : [];
  const ulRef = useRef<HTMLUListElement>(null);
  const ul = useMemo<JSX.Element>(() => {
    return (
      <ul
        lang={locale.name}
        className={classNames(
          "body stream scroll-y list-none p-0 m-0 h-5/6",
          ...className,
        )}
        ref={ulRef}
      >
        {stream.map((ayah: Ayah) => {
          return (
            <li key={ayah.id} className="ayah fade mb-1">
              <span className="flex h-6 items-center color-primary text-sm">
                <span className="color-primary font-extrabold">
                  {t(locale, "surah")} {formatNumber(locale, surah.id)}
                  {t(locale, "comma")} {t(locale, "ayah")}{" "}
                  {formatNumber(locale, ayah.id)} {t(locale, "of")}{" "}
                  {formatNumber(locale, surah.ayat.length)}
                </span>
              </span>
              <p className="m-0 mt-1 color-accent">{ayah.body}</p>
            </li>
          );
        })}
      </ul>
    );
  }, [stream, isPaused, endOfStream]);

  useEffect(() => {
    const el = ulRef.current;
    if (el) {
      el.focus();
      el.scrollTop = el.scrollHeight;
    }
  }, [theme, locale.name, stream.length]);

  return ul;
}
