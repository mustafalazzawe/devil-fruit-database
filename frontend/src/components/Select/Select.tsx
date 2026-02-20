import { FC, useState } from "react";
import { Icon } from "../Icon/Icon";
import { ISelectProps } from "./Select.types";
import { SelectCaret, SelectContainer, SelectInput } from "./Select.styled";

const Select: FC<ISelectProps> = ({ value, options, onChange, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectContainer $isOpen={isOpen}>
      <SelectInput
        {...rest}
        value={value}
        onMouseDown={() => setIsOpen((prev) => !prev)}
        onChange={(e) => {
          onChange?.(e.target.value);
          setIsOpen(false);
        }}
        onBlur={() => setIsOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setIsOpen(false);
          } else if (
            ["ArrowUp", "ArrowDown", " "].includes(e.key) &&
            !isOpen
          ) {
            setIsOpen(true);
          }
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </SelectInput>
      <SelectCaret>
        <Icon iconName="CaretDown" fontSize="16px" />
      </SelectCaret>
    </SelectContainer>
  );
};

export default Select;
