export enum AudioState {
  Playing = "Playing",
  Paused = "Paused",
  Waiting = "Waiting",
  Stalled = "Stalled",
  Error = "Error",
}

export type AudioStateKey = keyof typeof AudioState;

export function useAudio() {
  const [audioState, setAudioState] = useState<AudioStateKey>(
    AudioState.Paused,
  );
  const audio = useMemo(() => new Audio(), []);
  const showStalledIcon = useMemo(() => {
    if (audioState === AudioState.Waiting) {
      return audio.currentTime > 0;
    } else {
      return audioState === AudioState.Stalled;
    }
  }, [audioState]);

  useEffect(() => {
    const onPause = () => setAudioState(AudioState.Paused);
    const onWait = () => setAudioState(AudioState.Waiting);
    const onStall = () => setAudioState(AudioState.Stalled);
    const onResume = () => setAudioState(AudioState.Playing);
    const onError = () => setAudioState(AudioState.Error);
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

  return { audio, audioState, showStalledIcon };
}
