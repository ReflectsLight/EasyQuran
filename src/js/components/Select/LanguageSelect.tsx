import { Quran, TLocale } from "@0x1eef/quran";
import { Select } from "~/components/Select";
import { useSoftKeys } from "~/hooks/useSoftKeys";
import { getNextRef, getContext, findActiveElement } from "~/lib/utils";

export function LanguageSelect() {
  const { locale, theme, setLocale } = useContext(SettingsContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const locales = useMemo(
    () => sort(locale, Object.values(Quran.locales)),
    [locale.name],
  );
  const refs = useMemo(() => locales.map(() => createRef()), []);
  const { SoftLeft } = useSoftKeys(locale);

  if (!locale) {
    return null;
  }

  function sort(locale: TLocale, locales: TLocale[]) {
    return [locale, ...locales.filter((l) => l.name !== locale.name)];
  }

  useEffect(() => {
    function onKeyPress(event: KeyboardEvent) {
      if (event.key === SoftLeft) {
        const anchor = findActiveElement({ context: "language-select", refs });
        anchor?.focus();
        setIsOpen(!isOpen);
      } else {
        const context = getContext(event);
        if (context === "language-select") {
          event.stopImmediatePropagation();
          if (["ArrowUp", "ArrowDown"].indexOf(event.key) >= 0) {
            const anchor = getNextRef(event, refs)?.current;
            anchor?.focus();
          }
        }
      }
    }
    document.addEventListener("keydown", onKeyPress);
    return () => document.removeEventListener("keydown", onKeyPress);
  }, [isOpen, theme, locale.name]);

  return (
    <Select
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      value={locale.name}
      className="language-select w-20"
    >
      {locales.map((l: TLocale, i: number) => {
        return (
          <Select.Option
            data-index={i}
            data-context="language-select"
            ref={refs[i]}
            key={i}
            className={classNames(
              "flex h-4 text-sm w-full items-center justify-center no-underline rounded pb-1 pt-1 mb-1",
              l.direction,
              l.name === locale.name ? "active" : undefined,
            )}
            value={l.name}
            onClick={() => setLocale(l)}
          >
            {l.displayName}
          </Select.Option>
        );
      })}
    </Select>
  );
}
