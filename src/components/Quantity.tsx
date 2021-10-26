import { useEffect, useState } from "react";
import styles from "@components/Quantity.module.scss";

interface Props {
  initial?: number;
  onChange?: (val: number) => any;
}

const Quantity = ({ initial, onChange }: Props) => {
  const [count, setCount] = useState<number>(initial || 0);

  const updateCount = (number: number) => {
    const max = Math.max(count + number, 0);
    setCount(max);
    onChange(max);
  };

  return (
    <div className={styles["quantity"]}>
      <span className={styles["quantity__text"]}>Quantity</span>
      <div className={styles["quantity__controller"]}>
        <button
          className={styles["quantity__increase"]}
          onClick={() => updateCount(1)}
        >
          +
        </button>
        <span>{count}</span>
        <button
          className={styles["quantity__decrease"]}
          onClick={() => updateCount(-1)}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default Quantity;
