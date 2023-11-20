import React, { FC } from "react";
import classes from "./Select.module.scss";
import clsx from "clsx";

export interface Option<Type = any> {
  label: string;
  value: Type;
}

interface SelectProps {
  value: Option;
  onChange: (newOption: Option) => void;
  options: Option[];
}

const Select: FC<SelectProps> = ({ value, onChange, options }) => {
  const handleOptionClick = (newOption: Option) => {
    onChange(newOption);
  };

  return (
    <div className={classes.radioInputs}>
      {options.map((option) => (
        <label className={classes.radio} key={option.value}>
          <span
            className={clsx(classes.name, option.value === value.value && classes.checked)}
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default Select;
