type Props = {
  localeId: string;
};

export function RandomSurah({ localeId }: Props) {
  const randomId = Math.floor(Math.random() * Quran.surahs[localeId].length);
  const href = `/${localeId}/${randomId + 1}`;
  const ref = useRef();

  useEffect(() => {
    const anchor = ref.current;
    anchor.click();
  }, [ref.current]);

  return <a href={href} ref={ref}></a>;
}
