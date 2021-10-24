import styles from "./Button.module.scss";
import cn from "classnames";

interface Props {
  text: string;
  className?: string;
  primary?: boolean;
  disabled?: boolean;
  onClick?: () => any;
}

const Button = ({
  text,
  className,
  primary,
  disabled = false,
  onClick,
}: Props) => {
  return (
    <button
      className={cn(styles["btn"], className, {
        [styles["primary"]]: primary,
      })}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
