import type { Surah, Ayah } from "@0x1eef/quran";
import { SoundOnIcon, SoundOffIcon } from "~/components/Icon";
import { debug, getContext } from "~/lib/utils";

type Props = {
  audio: HTMLAudioElement;
  audioState: keyof typeof AudioState;
  surah: Surah;
  ayah: Ayah;
  hidden: boolean;
};

export function AudioControl({
  audio,
  audioState,
  surah,
  ayah,
  hidden,
}: Props) {
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    audio.src = `${audioBaseUrl}/${surah.id}/${ayah.id}.mp3`;
    debug("AudioControl.tsx", "useEffect", "ChangeAudioSource", audio.src);
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
    debug("AudioControl.tsx", "useEffect", "AddKeyDownEvent");
    return () => {
      document.removeEventListener("keydown", onKeyPress);
      debug("AudioControl.tsx", "useEffect", "RemoveKeyDownEvent");
    };
  }, [ayah.id, enabled]);

  useEffect(() => {
    if (enabled) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [ayah.id, enabled]);

  useEffect(() => {
    if (audioState === AudioState.Error) {
      setEnabled(false);
    }
  }, [audioState]);

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
