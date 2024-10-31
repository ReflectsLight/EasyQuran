import type { Surah, Ayah, TAyat } from "@0x1eef/quran";
import { AudioControl, TAudioStatus } from "~/components/AudioControl";
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

type Maybe<T> = T | null | undefined;

type Props = {
  surahId: string;
  localeId: string;
  t: TFunction;
};

export function SurahStream({ surahId, localeId, t }: Props) {
  const { locale, setLocale, theme } = useContext(SettingsContext);
  const surahs = useMemo(() => Quran.surahs[locale.name], [locale.name]);
  const [surah, setSurah] = useState<Surah>(surahs[Number(surahId) - 1]);
  const { ArrowRight } = useLocaleKeys(locale);
  const [stream, setStream] = useState<TAyat>([]);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [audioStatus, setAudioStatus] = useState<Maybe<TAudioStatus>>(null);
  const [endOfStream, setEndOfStream] = useState<boolean>(false);

  const audio = useMemo(() => new Audio(), []);
  const ayah: Maybe<Ayah> = stream[stream.length - 1];

  useEffect(() => {
    setLocale(Quran.locales[localeId]);
  }, [localeId]);

  useEffect(() => {
    function onKeyPress(e: KeyboardEvent) {
      if (e.key === "Backspace") {
        e.preventDefault();
        route(`/${locale.name}/index.html`);
      } else if (e.key === ArrowRight) {
        setIsPaused(!isPaused);
      }
    }
    document.addEventListener("keydown", onKeyPress);
    return () => document.removeEventListener("keydown", onKeyPress);
  }, []);

  useEffect(() => {
    setSurah(surahs[Number(surahId) - 1]);
  }, [locale.name]);

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

  useEffect(() => {
    if (!endOfStream) {
      setStream([surah.ayat[0]]);
    }
  }, [endOfStream]);

  return (
    <article
      className={classNames(
        "flex flex-col h-full content theme",
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
        {!endOfStream && isPaused && (
          <PlayIcon onClick={() => setIsPaused(false)} />
        )}
        {!endOfStream && !isPaused && (
          <PauseIcon onClick={() => setIsPaused(true)} />
        )}
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
            enabled={audioEnabled}
            setEnabled={setAudioEnabled}
            onStatusChange={(status) => {
              if (status === "end") {
                setAudioEnabled(false);
              }
              setAudioStatus(status);
            }}
          />
        </span>
        <span
          className={classNames({
            hidden: endOfStream || audioStatus === "wait",
          })}
        >
          <Timer
            surah={surah}
            ayah={ayah}
            isPaused={isPaused}
            audio={audio}
            audioStatus={audioStatus}
            onComplete={(surah, ayah) => {
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
        {audioStatus === "wait" && <StalledIcon />}
        <span className={classNames({ hidden: !endOfStream })}>
          <RefreshIcon onClick={() => [setEndOfStream(false)]} />
        </span>
      </footer>
    </article>
  );
}
