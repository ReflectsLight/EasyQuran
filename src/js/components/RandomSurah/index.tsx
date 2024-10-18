type Props = {
  locale: string;
};

export function RandomSurah({ locale }: Props) {
  const randomId = Math.floor(Math.random() * Quran.surahs.length);
  const href = `/${locale}/${randomId + 1}`
  const ref = useRef();

  useEffect(() => {
    const anchor = ref.current;
    anchor.click();
  }, [ref.current]);

  return <a href={href} ref={ref}></a>;
}
