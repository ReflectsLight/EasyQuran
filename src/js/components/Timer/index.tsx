import { AudioState } from "~/components/AudioControl";
import type { Surah, Ayah } from "@0x1eef/quran";
import { formatNumber } from "~/lib/t";

type Maybe<T> = T | null | undefined;

type Props = {
  surah: Surah;
  ayah: Maybe<Ayah>;
  isPaused: boolean;
  audio: HTMLAudioElement;
  audioState: AudioState;
  onComplete: (surah: Surah, ayah: Ayah) => void;
};

export function Timer({
  surah,
  ayah,
  isPaused,
  audio,
  audioState,
  onComplete,
}: Props) {
  const { locale } = useContext(SettingsContext);
  const [ms, setMs] = useState<number | null>(null);

  function getMs() {
    const fallback = audio.paused || isNaN(audio.duration);
    if (fallback) {
      console.info("timer: length determined by ayah.ms");
      return ayah?.ms || 0;
    } else {
      console.info("timer: length determined by HTMLAudioElement");
      return audio.duration * 1000;
    }
  }

  useEffect(() => {
    if (ayah) {
      setMs(getMs());
    }
  }, [ayah?.id]);

  useEffect(() => {
    if (!audio.paused) {
      setMs(getMs());
    }
  }, [audio.paused]);

  useEffect(() => {
    const noop =
      !ayah ||
      typeof ms !== "number" ||
      isPaused ||
      audioState === AudioState.Stalled ||
      audioState === AudioState.Waiting;
    if (noop) {
      return;
    } else if (ms <= 0) {
      onComplete(surah, ayah);
    } else {
      const tid = setTimeout(() => setMs(ms - 100), 100);
      return () => clearTimeout(tid);
    }
  }, [isPaused, audioState, ms]);

  return (
    <div className="timer font-extrabold text-base w-10 flex justify-end color-primary">
      {!ms || ms / 1000 <= 0
        ? formatNumber(locale, 0)
        : formatNumber(locale, ms / 1000, { maximumFractionDigits: 0 })}
    </div>
  );
}
