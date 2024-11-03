import { Quran as Q } from "@0x1eef/quran";
import * as preact from "preact";
import * as compat from "preact/compat";
import * as hooks from "preact/hooks";
import classn from "classnames";
import type { Theme } from "~/hooks/useTheme";
import type { TLocale } from "~/hooks/useLocale";

type WakeLock = {
  unlock: () => void
}

interface ISettingsContext {
  theme: Theme;
  locale: TLocale;
  setTheme: (t: Theme) => void;
  setLocale: (l: TLocale) => void;
}

declare global {
  interface Navigator {
    requestWakeLock: (t: string) => WakeLock
  }

  const Quran: typeof Q;
  const render: typeof preact.render;
  const useState: typeof hooks.useState;
  const useEffect: typeof hooks.useEffect;
  const useRef: typeof hooks.useRef;
  const useMemo: typeof hooks.useMemo;
  const useContext: typeof hooks.useContext;
  const createRef: typeof preact.createRef;
  const forwardRef: typeof compat.forwardRef;
  const classNames: typeof classn;
  const SettingsContext: preact.PreactContext<ISettingsContext>;
  const buildenv: string;
  const audioBaseUrl: string;
}
