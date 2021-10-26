/* eslint-disable @next/next/no-img-element */
import Layout from "@components/Layout";
import Button from "@components/Button";
import Card from "@components/Card";
import Testimonial from "@components/Testimonial";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";

import styles from "@styles/pages/Home.module.scss";

import { fetchProducts } from "@api/products";
import { fetchTestimonials } from "@api/testimonials";
import { Product } from "src/interfaces/product";
import { Testimonial as TestimonialType } from "src/interfaces/testimonial";
import { GetStaticProps } from "next";

const benefits = [
  {
    title: "Eco-sustainable",
    details: "All recyclable materials, 0% CO2 emissions",
  },
  {
    title: "Hyphoallergenic",
    details: "100% natural, human friendly ingredients",
  },
  {
    title: "Handmade",
    details: "All candles are craftly made with love",
  },
  {
    title: "Long burning",
    details: "No more waste. Created for last long",
  },
];

interface Props {
  products: Product[];
  testimonials: TestimonialType[];
}

const Home = ({ products, testimonials }: Props) => {
  return (
    <Layout>
      <Head>
        <title>Candleaf</title>
        <link rel="icon" href="/icons/icon.svg" />
      </Head>

      <section className={cn(styles["benefits"], "section")}>
        <div className={cn(styles["benefits__wrapper"], "inner-container")}>
          <div className={styles["benefits__header"]}>
            <h1 className="header">Clean and fragrant soy wax</h1>
            <p>Made for your home and for your wellness</p>
          </div>
          <div className={styles["benefits__images"]}>
            <img
              className={styles["bg-mint-candle"]}
              src="/candles/hero-mint-candle.png"
              alt="mint-candle"
            />
            <img
              className={styles["bg-yellow-candle"]}
              src="/candles/hero-yellow-candle.png"
              alt="yellow-candle"
            />
          </div>
          <div className={styles["benefits__list"]}>
            {benefits.map(({ title, details }, index) => (
              <div key={index} className={styles["benefits__item"]}>
                <div className={styles["benefits__icon"]}>
                  <Image
                    src="/icons/checkmark.svg"
                    height={14}
                    width={14}
                    layout="fixed"
                    alt="checkmark"
                  />
                </div>
                <div className={styles["benefits__description"]}>
                  <span className={styles["title"]}>{title}:</span>
                  {` `}
                  <span>{details}</span>
                </div>
              </div>
            ))}
          </div>
          <Link href="#products">
            <a>
              <Button
                className={styles["benefits__cta"]}
                primary
                text="View products"
              />
            </a>
          </Link>
        </div>
      </section>

      <section
        id="products"
        className={cn(styles["products"], "inner-container section")}
      >
        <h1 className="header">Products</h1>
        <p>Order it for you or for your beloved ones</p>
        <div className={styles["products__grid"]}>
          {products.map(({ name, slug, price, image }) => (
            <Card
              key={slug}
              name={name}
              slug={slug}
              price={price}
              image={image}
            />
          ))}
        </div>
      </section>

      <section className={cn(styles["testimonials"], "section")}>
        <div className={cn(styles["testimonials__wrapper"], "inner-container")}>
          <h1 className="header">Testimonials</h1>
          <p>Some quotes from our happy customers</p>
          <div className={styles["testimonials__grid"]}>
            {testimonials.map(({ owner, text, rating, avatar }, index) => (
              <Testimonial
                key={index}
                owner={owner}
                text={text}
                rating={rating}
                avatar={avatar}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const products = await fetchProducts();
  const testimonials = await fetchTestimonials();
  // const testimonials = [];
  return {
    props: { products, testimonials },
  };
};

export default Home;
