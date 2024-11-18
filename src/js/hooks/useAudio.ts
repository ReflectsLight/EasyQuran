export enum AudioState {
  Playing = "Playing",
  Paused = "Paused",
  Waiting = "Waiting",
  Stalled = "Stalled",
  Error = "Error",
}

export type AudioStateKey = keyof typeof AudioState;

export function useAudio() {
  const [state, setState] = useState<AudioStateKey>(AudioState.Paused);
  const audio = useMemo(() => new Audio(), []);
  const showStalledIcon = useMemo(() => {
    if (state === AudioState.Waiting) {
      return audio.currentTime > 0;
    } else {
      return state === AudioState.Stalled;
    }
  }, [state]);

  useEffect(() => {
    const onPause = () => setState(AudioState.Paused);
    const onWait = () => setState(AudioState.Waiting);
    const onStall = () => setState(AudioState.Stalled);
    const onResume = () => setState(AudioState.Playing);
    const onError = () => setState(AudioState.Error);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("waiting", onWait);
    audio.addEventListener("stalled", onStall);
    audio.addEventListener("playing", onResume);
    audio.addEventListener("error", onError);
    return () => {
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("waiting", onWait);
      audio.removeEventListener("stalled", onStall);
      audio.removeEventListener("playing", onResume);
      audio.removeEventListener("error", onError);
    };
  }, [audio.src]);

  return { audio, audioState: state, showStalledIcon };
}
