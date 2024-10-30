import { Select } from "~/components/Select";
import type { Theme } from "~/hooks/useTheme";
import { useSoftKeys } from "~/hooks/useSoftKeys";
import { getNextRef, getContext, findActiveElement } from "~/lib/utils";
import { THEMES } from "~/hooks/useTheme";

export function ThemeSelect() {
  const { theme, locale, setTheme } = useContext(SettingsContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const themes: Theme[] = useMemo(() => sort(theme, THEMES), [theme]);
  const refs = useMemo(() => themes.map(() => createRef()), []);
  const { SoftRight } = useSoftKeys(locale);

  function sort(theme: Theme, themes: Theme[]) {
    return [theme, ...themes.filter((t) => t !== theme)];
  }

  useEffect(() => {
    function onKeyPress(event: KeyboardEvent) {
      if (event.key === SoftRight) {
        const anchor = findActiveElement({ context: "theme-select", refs });
        anchor?.focus();
        setIsOpen(!isOpen);
      } else {
        const context = getContext(event);
        if (context === "theme-select") {
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
