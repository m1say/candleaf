import axios from "axios";

import Layout from "src/components/Layout";
import Quantity from "src/components/Quantity";
import Subscription from "src/components/Subscription";

import Head from "next/head";
import Image from "next/image";
import Button from "src/components/Button";
import cn from "classnames";
import styles from "@styles/pages/ProductPage.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "src/contexts/cart-context";

import { getProduct, fetchProducts } from "src/api/products";
import { Product } from "src/interfaces/product";
import { GetServerSideProps } from "next";

const benefits = [
  {
    name: "Wax",
    details: "Top grade soy that delivers a smoke less, consistent burn ",
  },
  {
    name: "Fragrance",
    details: "Premium quality ingredients with natural essential oils ",
  },
  {
    name: "Burning Time",
    details: "70-75 hours ",
  },
  {
    name: "Dimension",
    details: "10cm x 5cm ",
  },
  {
    name: "Weight",
    details: "400g",
  },
];

interface Props {
  product: Product;
}

const ProductPage = ({ product }: Props) => {
  const {
    title,
    price,
    slug,
    image: { url, height, width, alt },
  } = product;

  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();

  const { addOrUpdateItem } = useCart();
  const addToCartHandler = () => {
    addOrUpdateItem(slug, quantity);
    router.push("/cart");
  };

  return (
    <Layout>
      <Head>
        <title>Product</title>
        <meta name="description" content="Whenever I see" />
        <link rel="icon" href="/icon.svg" />
      </Head>

      <section className={cn(styles["product"])}>
        <div className={cn(styles["product__wrapper"], "inner-container")}>
          <div
            className={cn(styles["product__image"], "flex flex-jc-c flex-ai-c")}
          >
            <Image
              src={url}
              height={height}
              width={width}
              layout="fixed"
              alt={alt}
            />
          </div>
          <p className={styles["product__title"]}>{title} Candleaf</p>
          <div className={styles["product__purchase"]}>
            <div className={styles["product__options"]}>
              <div className={styles["product__order"]}>
                <p className={styles["product__price"]}>${price}</p>
                <Quantity
                  initial={quantity}
                  onChange={(val: number) => setQuantity(val)}
                />
              </div>
              <div>
                <Subscription />
                <Button
                  className={styles["product__cta"]}
                  primary
                  text="Add to cart"
                  onClick={addToCartHandler}
                  disabled={!quantity}
                />
              </div>
            </div>
            <div className={cn(styles["product__benefits"])}>
              {benefits.map((b, index) => (
                <div className={styles["product__benefit"]} key={index}>
                  <span>{b.name}: </span>
                  <span>{b.details}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  const product = await getProduct(params.slug);
  return {
    props: { product },
  };
}

export async function getStaticPaths() {
  const res = await fetchProducts();
  const paths = res.map(({ slug }) => ({
    params: { slug },
  }));

  return { paths, fallback: false };
}

export default ProductPage;
