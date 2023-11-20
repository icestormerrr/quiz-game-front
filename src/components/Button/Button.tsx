import React, { ButtonHTMLAttributes, FC } from "react";
import classes from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const Button: FC<ButtonProps> = ({ title, ...props }) => {
  return (
    <button {...props} className={classes.button}>
      {title}
    </button>
  );
};

export default Button;
