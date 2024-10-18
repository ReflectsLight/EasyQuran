import type { ReactNode, AnchorHTMLAttributes } from "react";
import { Link } from "preact-router/match";
type Rest = AnchorHTMLAttributes<HTMLAnchorElement>;
type Props = {
  value: string;
  children: ReactNode;
} & Rest;

export function Option({ children, ...rest }: Props) {
  return <Link {...rest}>{children}</Link>;
}
