import { Select } from "~/components/Select";
import type { Theme } from "~/hooks/useTheme";
import { useSoftKeys } from "~/hooks/useSoftKeys";
import { getNextRef, findActiveElement } from "~/lib/utils";

export function ThemeSelect() {
  const { theme, locale, setTheme } = useContext(SettingsContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const themes: Theme[] = useMemo(() => ["blue", "green"], []);
  const refs = useMemo(() => themes.map(() => createRef()), []);
  const { SoftRight } = useSoftKeys(locale);

  useEffect(() => {
    function onKeyPress(e: KeyboardEvent) {
      if (e.key === SoftRight) {
        const anchor = findActiveElement({ context: "theme-select", refs });
        if (anchor) {
          setIsOpen(!isOpen);
          anchor.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyPress);
    return () => document.removeEventListener("keydown", onKeyPress);
  }, [isOpen, locale.name]);

  useEffect(() => {
    function onKeyPress(e: KeyboardEvent) {
      if (["ArrowUp", "ArrowDown"].indexOf(e.key) >= 0) {
        const el = document.activeElement;
        const ctx = el?.getAttribute("data-context");
        if (ctx === "theme-select") {
          const anchor = getNextRef(e, refs)?.current;
          anchor.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyPress);
    return () => document.removeEventListener("keydown", onKeyPress);
  }, [theme]);

  return (
    <Select
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      value={theme}
      className="theme-select"
    >
      {themes.map((t, i) => {
        return (
          <Select.Option
            data-index={i}
            data-context="theme-select"
            ref={refs[i]}
            key={i}
            onClick={() => setTheme(t)}
            className={classNames(
              "flex rounded w-5 h-5 justify-end circle mb-1",
              theme === t ? "active" : undefined,
              t,
            )}
            value={t}
          />
        );
      })}
    </Select>
  );
}
