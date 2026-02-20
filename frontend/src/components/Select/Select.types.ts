import { SelectHTMLAttributes } from "react";

export interface ISelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  value?: string;
  options: readonly string[];
  onChange?: (value: string) => void;
}
