import { ButtonHTMLAttributes } from "react";
import { StyledButton } from "./style";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return <StyledButton className="button" {...props} />;
}
