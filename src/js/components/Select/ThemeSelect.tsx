import { Select } from "~/components/Select";
import type { Theme } from "~/hooks/useTheme";
import { useSoftKeys } from "~/hooks/useSoftKeys";

export function ThemeSelect() {
  const { theme, locale, setTheme } = useContext(SettingsContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const themes: Theme[] = useMemo(() => ["blue", "green"], []);
  const refs = useMemo(() => themes.map(() => createRef()), []);
  const { SoftRight } = useSoftKeys(locale);

  function onKeyPress(e: KeyboardEvent) {
    if (e.key === SoftRight) {
      setIsOpen(!isOpen);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress);
    return () => document.removeEventListener("keydown", onKeyPress);
  }, [isOpen, locale.name]);

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
            ref={refs[i]}
            key={i}
            onClick={() => setTheme(t)}
            className="flex w-10 h-6 justify-end"
            value={t}
          >
            <span className={classNames("rounded w-5 h-5", t)} />
          </Select.Option>
        );
      })}
    </Select>
  );
}
