import axios from "axios";

import Layout from "src/components/Layout";
import Quantity from "src/components/Quantity";

import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import Button from "src/components/Button";
import cn from "classnames";
import styles from "@styles/pages/Cart.module.scss";
import { useEffect, useState } from "react";
import { useCart } from "src/contexts/cart-context.js";
import { buildCartQuery } from "src/utils/products";
import { fetchProducts } from "src/api/products";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const { cartItems, cartCount, addOrUpdateItem, removeItem } = useCart();

  const populateCart = async () => {
    if (cartCount === 0) {
      setProducts([]);
      return;
    }
    const query = buildCartQuery(cartItems);
    const res = await fetchProducts(query);
    setProducts(res);
  };

  const computeTotal = () => {
    const sum = products.reduce((accum, { price, slug }) => {
      return accum + price * cartItems[slug];
    }, 0);
    setSubTotal(sum.toFixed(2));
  };

  const updateQuantity = (quantity: number, slug: string) => {
    addOrUpdateItem(slug, quantity, true);
  };

  useEffect(() => {
    populateCart();
  }, [cartCount]);

  useEffect(() => {
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
                                  height={height}
                                  width={width}
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
                                  height={height}
                                  width={width}
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
            <Link href="/thank-you">
              <a>
                <Button disabled={!cartCount} primary text="Checkout" />
              </a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
