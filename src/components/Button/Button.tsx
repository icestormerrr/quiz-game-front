import React, { ButtonHTMLAttributes, FC } from "react";

import clsx from "clsx";

import classes from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  hint?: string;
  className?: string;
}

const Button: FC<ButtonProps> = ({ title, hint, className, ...props }) => {
  return (
    <button {...props} title={hint} className={clsx(classes.button, className)}>
      {title}
    </button>
  );
};

export default Button;
