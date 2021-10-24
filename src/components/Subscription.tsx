import styles from "src/components/Subscription.module.scss";
import cn from "classnames";
import { useState } from "react";
const Subscription = () => {
  const [subscriptionType, setSubscriptionType] = useState<string>("one-time");
  const [frequency, setFrequency] = useState<number>(1);

  return (
    <div className={styles["subscription"]}>
      <div
        className={cn(
          {
            [styles["subscription__selected"]]: subscriptionType === "one-time",
          },
          styles["subscription__option"]
        )}
      >
        <label>
          <input
            type="radio"
            name="radio"
            checked={subscriptionType === "one-time"}
            onChange={() => setSubscriptionType("one-time")}
          />
          <span>One time purchase</span>
        </label>
      </div>
      <div
        className={cn(
          {
            [styles["subscription__selected"]]: subscriptionType === "weekly",
          },
          styles["subscription__option"]
        )}
      >
        <label>
          <input
            type="radio"
            name="radio"
            checked={subscriptionType === "weekly"}
            onChange={() => setSubscriptionType("weekly")}
          />
          <span>Subscribe and delivery every </span>
          <select
            name="frequency"
            onChange={(e) => setFrequency(parseInt(e.target.value))}
          >
            <option value={1}> 1 week</option>
            <option value={2}> 2 weeks</option>
            <option value={3}> 3 weeks</option>
            <option value={4}> 4 weeks</option>
          </select>
        </label>
        <p className={styles["subscription__info"]}>
          Subscribe now and get the 10% of discount on every recurring order.
          The discount will be applied at checkout.
        </p>
      </div>
    </div>
  );
};

export default Subscription;
