import type { Surah, Ayah } from "@0x1eef/quran";
import { SoundOnIcon, SoundOffIcon } from "~/components/Icon";
import { debug, getContext } from "~/lib/utils";

type Props = {
  audio: HTMLAudioElement;
  surah: Surah;
  ayah: Ayah;
  hidden: boolean;
};

export function AudioControl({ audio, surah, ayah, hidden }: Props) {
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    audio.src = `${audioBaseUrl}/${surah.id}/${ayah.id}.mp3`;
    debug("AudioControl.tsx", "ChangeAudioSource", audio.src);
  }, [ayah.id]);

  useEffect(() => {
    function onKeyPress(event: KeyboardEvent) {
      const context = getContext(event);
      if (context === "surah-stream") {
        if (event.key === "Enter") {
          event.stopImmediatePropagation();
          setEnabled(!enabled);
        }
      }
    }
    document.addEventListener("keydown", onKeyPress);
    return () => document.removeEventListener("keydown", onKeyPress);
  }, [ayah.id]);

  useEffect(() => {
    if (enabled) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [ayah.id, enabled]);

  if (hidden) {
    return null;
  }

  return (
    <>
      {enabled && <SoundOnIcon />}
      {!enabled && <SoundOffIcon />}
    </>
  );
}
