import { ButtonHTMLAttributes } from "react";
import { StyledButton } from "./style";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  outlined?: boolean;
};

export function Button({ outlined = false, ...rest }: ButtonProps) {
  return <StyledButton className={`${outlined ? "outlined" : ""}`} {...rest} />;
}
