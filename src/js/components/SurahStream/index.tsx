import type { Surah, Ayah, TAyat } from "@0x1eef/quran";
import { AudioControl } from "~/components/AudioControl";
import { Head } from "~/components/Head";
import {
  PlayIcon,
  PauseIcon,
  RefreshIcon,
  StalledIcon,
} from "~/components/Icon";
import { Timer } from "~/components/Timer";
import { TFunction } from "~/lib/t";
import { Stream } from "./Stream";
import { route } from "preact-router";
import "@css/main/SurahStream.scss";
import { useLocaleKeys } from "~/hooks/useLocaleKeys";
import { debug } from "~/lib/utils";

type Props = {
  surahId: string;
  localeId: string;
  t: TFunction;
};

export function SurahStream({ surahId, localeId, t }: Props) {
  const { locale, setLocale, theme } = useContext(SettingsContext);
  const surahs = useMemo(() => Quran.surahs[locale.name], [locale.name]);
  const [surah, setSurah] = useState<Surah>(surahs[Number(surahId) - 1]);
  const { ArrowLeft } = useLocaleKeys(locale);
  const [stream, setStream] = useState<TAyat>([]);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [endOfStream, setEndOfStream] = useState<boolean>(false);

  const audio = useMemo(() => new Audio(), []);
  const ayah: Ayah = stream[stream.length - 1] || surah.ayat[0];

  useEffect(() => {
    setLocale(Quran.locales[localeId]);
  }, [localeId]);

  useEffect(() => {
    setSurah(surahs[Number(surahId) - 1]);
  }, [locale.name]);

  useEffect(() => {
    if (!endOfStream) {
      setStream([surah.ayat[0]]);
    }
  }, [endOfStream]);

  useEffect(() => {
    function onKeyPress(event: KeyboardEvent) {
      debug("SurahSteam.tsx", "onKeyPress", event.key);
      if (event.key === "Backspace") {
        event.preventDefault();
        route(`/${locale.name}/index.html`);
      } else if (event.key === ArrowLeft) {
        if (endOfStream) {
          setEndOfStream(false);
        } else {
          setIsPaused(!isPaused);
        }
      } else {
        debug("SurahStream.tsx", "onKeyPress", "ignore");
      }
    }
    document.addEventListener("keydown", onKeyPress);
    return () => document.removeEventListener("keydown", onKeyPress);
  }, [locale.name, theme, endOfStream, isPaused]);

  useEffect(() => {
    if (!stream || !stream.length) {
      /* noop */
      return;
    } else if (surah.ayat[0].body === stream[0].body) {
      /* noop */
      return;
    } else {
      const slice = [...surah.ayat].slice(0, stream.length);
      setStream(slice);
    }
  }, [surah]);

  return (
    <article
      className={classNames(
        "flex flex-col h-full content theme stream",
        locale.name,
        locale.direction,
        theme,
      )}
    >
      <Head>{t(locale, "TheNobleQuran")}</Head>
      <Stream
        surah={surah}
        stream={stream}
        endOfStream={endOfStream}
        isPaused={isPaused}
        t={t}
      />
      <footer className="flex justify-between items-center h-16">
        {!endOfStream && isPaused && <PlayIcon />}
        {!endOfStream && !isPaused && <PauseIcon />}
        <span
          className={classNames("sound-box flex flex-col items-end w-16", {
            hidden: endOfStream,
          })}
        >
          <AudioControl
            audio={audio}
            surah={surah}
            ayah={ayah}
            hidden={endOfStream}
          />
        </span>
        <span
          className={classNames({
            hidden: endOfStream,
          })}
        >
          <Timer
            surah={surah}
            ayah={ayah}
            isPaused={isPaused}
            audio={audio}
            onComplete={(surah: Surah, ayah: Ayah) => {
              const layah = surah.ayat[surah.ayat.length - 1];
              if (!layah || !ayah) {
                return;
              } else if (layah.id === ayah.id) {
                setEndOfStream(true);
              } else {
                setStream([...stream, surah.ayat[ayah.id]]);
              }
            }}
          />
        </span>
        {false && <StalledIcon />}
        <span className={classNames({ hidden: !endOfStream })}>
          <RefreshIcon />
        </span>
      </footer>
    </article>
  );
}
