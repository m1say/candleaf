import Layout from "@components/Layout";
import Quantity from "@components/Quantity";
import Button from "@components/Button";

import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import styles from "@styles/pages/Cart.module.scss";
import cn from "classnames";

import { useEffect, useState } from "react";
import { useCart } from "@contexts/cart-context.js";
import { buildCartQuery } from "@utils/products.js";
import { fetchProducts } from "@api/products.js";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const { cartItems, cartCount, addOrUpdateItem, removeItem } = useCart();

  const updateQuantity = (quantity: number, slug: string) => {
    addOrUpdateItem(slug, quantity, true);
  };

  useEffect(() => {
    const populateCart = async () => {
      if (cartCount === 0) {
        setProducts([]);
        return;
      }
      const query = buildCartQuery(cartItems);
      const res = await fetchProducts(query);
      setProducts(res);
    };
    populateCart();
  }, [cartCount, cartItems]);

  useEffect(() => {
    const computeTotal = () => {
      const sum = products.reduce((accum, { price, slug }) => {
        return accum + price * cartItems[slug];
      }, 0);
      setSubTotal(sum.toFixed(2));
    };
    computeTotal();
  }, [products, cartItems]);

  const emptyCart = (
    <tr>
      <td className={styles["cart__empty"]} colSpan={4}>
        i am empty... inside
      </td>
    </tr>
  );

  return (
    <Layout>
      <Head>
        <title>Cart</title>
        <link rel="icon" href="/icons/icon.svg" />
      </Head>

      <section className={styles["cart"]}>
        <div className={cn(styles["cart__wrapper"], "inner-container")}>
          <h1>Your cart items</h1>
          <Link href="/#products">
            <a>Back to shopping</a>
          </Link>

          <div className={cn(styles["cart__items"], "hide-for-mobile")}>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartCount
                  ? products.map(
                      ({
                        name,
                        price,
                        image: { url, height, width, alt },
                        slug,
                      }) => (
                        <tr key={slug}>
                          <td>
                            <div className={styles["cart__card"]}>
                              <div className={styles["cart__image"]}>
                                <Image
                                  src={url}
                                  height={height}
                                  width={width}
                                  objectFit="contain"
                                  alt={alt}
                                />
                              </div>
                              <div>
                                <h1>{name}</h1>
                                <button onClick={() => removeItem(slug)}>
                                  Remove
                                </button>
                              </div>
                            </div>
                          </td>
                          <td>${price}</td>
                          <td>
                            <Quantity
                              initial={cartItems[slug]}
                              onChange={(val) => updateQuantity(val, slug)}
                            />
                          </td>
                          <td>${cartItems[slug] * price}</td>
                        </tr>
                      )
                    )
                  : emptyCart}
              </tbody>
            </table>
          </div>

          <div className={cn(styles["cart__items"], "hide-for-desktop")}>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cartCount
                  ? products.map(
                      ({
                        title,
                        price,
                        image: { url, height, width, alt },
                        slug,
                      }) => (
                        <tr key={slug}>
                          <td>
                            <div className={styles["cart__card"]}>
                              <div className={styles["cart__image"]}>
                                <Image
                                  src={url}
                                  layout="fill"
                                  objectFit="contain"
                                  alt={alt}
                                />
                              </div>
                              <div>
                                <h1>{title}</h1>
                                <button onClick={() => removeItem(slug)}>
                                  Remove
                                </button>
                              </div>
                            </div>
                          </td>
                          <td>
                            ${price}
                            <Quantity
                              initial={cartItems[slug]}
                              onChange={(val) => updateQuantity(val, slug)}
                            />
                          </td>
                        </tr>
                      )
                    )
                  : emptyCart}
              </tbody>
            </table>
          </div>

          <div className={styles["footer"]}>
            <div className={cn(styles["footer__sub-total"])}>
              <span>Sub-total</span>
              <span> ${subTotal} </span>
              <p>Tax and shipping will be calculated later</p>
            </div>
            <Link href="/checkout">
              <a>
                <Button disabled={!products.length} primary text="Checkout" />
              </a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
