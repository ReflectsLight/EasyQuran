type Refs = React.RefObject<HTMLAnchorElement>[];
type FindProps = { context: string; refs: Refs };

export function getContext(e: KeyboardEvent) {
  const { target } = e;
  if (target instanceof Element) {
    return target.getAttribute("data-context");
  } else {
    return null;
  }
}

export function getNextRef(e: KeyboardEvent, refs: Refs) {
  const { target } = e;
  const isAnchor = target instanceof HTMLAnchorElement;
  if (!target || !isAnchor) {
    return null;
  }
  const index = Number(target.getAttribute("data-index"));
  if (e.key === "ArrowDown") {
    return refs[index + 1];
  } else if (e.key === "ArrowUp") {
    return refs[index - 1];
  } else {
    return refs[index];
  }
}

export function findActiveElement({ context, refs }: FindProps) {
  const query = `[data-context='${context}'].active`;
  const target = document.querySelector(query);
  if (target) {
    const index = Number(target.getAttribute("data-index"));
    return refs[index]?.current;
  } else {
    return null;
  }
}

export function debug(...messages: string[]) {
  if (buildenv === "development") {
    console.debug(...messages);
  }
}
