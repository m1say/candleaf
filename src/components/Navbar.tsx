import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.scss";
import cn from "classnames";
import { useRef } from "react";

import { useCart } from "src/contexts/cart-context";

const Navbar = () => {
  const header = useRef(null);
  const overlay = useRef(null);
  const { cartCount } = useCart();

  const toggleHamburger = () => {
    if (header.current.classList.contains(styles["open"])) {
      document.body.classList.remove("no-scroll");
      header.current.classList.remove(styles["open"]);
      overlay.current.classList.remove("fade-in");
      overlay.current.classList.add("fade-out");
    } else {
      document.body.classList.add("no-scroll");
      header.current.classList.add(styles["open"]);
      overlay.current.classList.remove("fade-out");
      overlay.current.classList.add("fade-in");
    }
  };
  return (
    <header ref={header} className={cn(styles["header"], "inner-container")}>
      <div ref={overlay} className={cn(styles["overlay"], "fade-animation")}>
        <Link href="/#products">
          <a>Shop</a>
        </Link>
        <Link href="#">
          <a>About</a>
        </Link>
        <Link href="#">
          <a>Contact Us</a>
        </Link>
      </div>
      <nav className={cn(styles["nav"], "flex flex-jc-sb flex-ai-c")}>
        <a
          href="#"
          className={cn(styles["header__toggle"], "hide-for-desktop")}
          onClick={toggleHamburger}
        >
          <span></span>
          <span></span>
          <span></span>
        </a>
        <Link href="/">
          <a className={cn(styles["header__logo"], "flex flex-ai-c")}>
            <Image
              priority
              src="/logo.png"
              height={34}
              width={126}
              alt="candleaf-logo"
            />
          </a>
        </Link>

        <div className={cn(styles["header__links"], "hide-for-mobile")}>
          <Link href="/#products">
            <a>Shop</a>
          </Link>
          <Link href="#">
            <a>About</a>
          </Link>
          <Link href="#">
            <a>Contact Us</a>
          </Link>
        </div>

        <div className={cn(styles["header__actions"])}>
          <Link href="/cart">
            <a
              suppressHydrationWarning={true}
              className={cn(styles["header__cart"], "flex flex-ai-c flex-jc-c")}
            >
              <Image
                priority
                src="/icons/icon-cart.svg"
                height={23}
                width={23}
                layout="fixed"
                alt="shopping-cart"
              />

              {cartCount !== 0 && <span>{cartCount}</span>}
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
