import type { ReactNode, AnchorHTMLAttributes, ForwardedRef } from "preact/compat";
type Rest = AnchorHTMLAttributes<HTMLAnchorElement>;
type Props = {
  value: string;
  children?: ReactNode;
} & Rest;

function Component(props: Props, ref: ForwardedRef<HTMLAnchorElement>) {
  return (
    <a href="#" ref={ref} {...props}>
      {props.children}
    </a>
  );
}

export const Option = forwardRef<HTMLAnchorElement, Props>(Component);
