import Link from "next/link";
import Head from "next/head";
import styles from "@styles/pages/Checkout.module.scss";
import cn from "classnames";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCart } from "@contexts/cart-context.js";

const Checkout = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const { resetCart } = useCart();

  const onSubmit = (data) => {
    resetCart();
    router.replace("/");
  };

  return (
    <div className={styles["checkout"]}>
      <Head>
        <title>Cart</title>
        <link rel="icon" href="/icons/icon.svg" />
      </Head>

      <section className={styles["checkout__shipping"]}>
        <Link href="/">
          <a>
            <Image
              priority
              src="/logo.png"
              height={34}
              width={126}
              alt="candleaf-logo"
            />
          </a>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className={styles["checkout__shipping-header"]}>Contact</p>
          <input
            placeholder="Email or mobile phone number"
            {...register("contactInfo", { required: true })}
          />
          <p className={styles["checkout__shipping-header"]}>
            Shipping Address
          </p>
          <div className="flex">
            <input
              placeholder="First Name"
              {...register("firstName", { required: true })}
            />
            <input
              placeholder="Last Name"
              {...register("lastName", { required: true })}
            />
          </div>
          <input
            placeholder="Address"
            {...register("address", { required: true })}
          />
          <div className="flex">
            <input
              placeholder="City"
              {...register("city", { required: true })}
            />
            <input
              placeholder="Country"
              {...register("country", { required: true })}
            />
          </div>
          <input
            placeholder="Postal Code"
            {...register("postalCode", { required: true })}
          />
          <input type="submit" className={styles["btn"]} value="Submit" />
        </form>
        <Link href="cart">
          <a>Back to cart</a>
        </Link>
      </section>
      <section className={styles["checkout__summary"]}></section>
    </div>
  );
};

export default Checkout;
