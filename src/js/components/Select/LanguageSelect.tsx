import { Quran, TLocale } from "@0x1eef/quran";
import { Select } from "~/components/Select";
import { useSoftKeys } from "~/hooks/useSoftKeys";
import { getNextRef, findActiveElement } from "~/lib/utils";

type Props = {
  locale: TLocale;
  setLocale: (v: TLocale) => void;
};

export function LanguageSelect({ locale, setLocale }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const locales = useMemo(() => Object.values(Quran.locales), []);
  const refs = useMemo(() => locales.map(() => createRef()), []);
  const { SoftLeft } = useSoftKeys(locale);

  if (!locale) {
    return null;
  }

  useEffect(() => {
    function onKeyPress(e: KeyboardEvent) {
      if (e.key === SoftLeft) {
        const anchor = findActiveElement({ context: "language-select", refs });
        if (anchor) {
          setIsOpen(!isOpen);
          anchor.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyPress);
    return () => document.removeEventListener("keydown", onKeyPress);
  }, [isOpen]);

  useEffect(() => {
    function onKeyPress(e: KeyboardEvent) {
      if (["ArrowUp", "ArrowDown"].indexOf(e.key) >= 0) {
        const el = document.activeElement;
        const ctx = el?.getAttribute("data-context");
        if (ctx === "language-select") {
          const anchor = getNextRef(e, refs)?.current;
          anchor.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyPress);
    return () => document.removeEventListener("keydown", onKeyPress);
  }, [locale.name]);

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
              l.name === locale.name ? "active font-bold" : undefined,
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
