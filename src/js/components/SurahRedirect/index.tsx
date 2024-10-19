export function SurahRedirect() {
  const defaultl = "en";
  const locales = Object.keys(Quran.locales);
  const locale =
    navigator.languages
      .map((s) => s.slice(0, 2).toLowerCase())
      .find((s) => locales.includes(s)) || defaultl;
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const anchor = ref.current;
    if (anchor) {
      anchor.click();
    }
  }, [ref.current]);

  return <a href={`/${locale}/`} ref={ref}></a>;
}
