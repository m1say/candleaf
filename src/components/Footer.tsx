import styles from "./Footer.module.scss";
import cn from "classnames";
import Image from "next/image";

const Footer = () => (
  <footer className={styles["footer"]}>
    <div className={cn(styles["footer__wrapper"], "inner-container")}>
      <div className={styles["footer__division"]}>
        <hr />
      </div>
      <div className={styles["footer__company"]}>
        <Image src="/logo-bw.png" height={53} width={200} alt="logo-bw" />
        <p>Your natural candle made for your home and for your wellness.</p>
      </div>
      <div className={styles["footer__links"]}>
        <div
          className={cn(
            styles["footer__link-grp"],
            styles["footer__link-grp--1"]
          )}
        >
          <p>Discovery</p>
          <p>New season</p>
          <p>Most searched</p>
          <p>Most sold</p>
        </div>
        <div
          className={cn(
            styles["footer__link-grp"],
            styles["footer__link-grp--2"]
          )}
        >
          <p>About</p>
          <p>Help</p>
          <p>Shipping</p>
          <p>Affiliate</p>
        </div>
        <div
          className={cn(
            styles["footer__link-grp"],
            styles["footer__link-grp--3"]
          )}
        >
          <p>Info</p>
          <p>Contact us</p>
          <p>Privacy Policies</p>
          <p>Terms & Conditions</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
