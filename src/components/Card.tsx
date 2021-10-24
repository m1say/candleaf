import Image from "next/image";
import styles from "./Card.module.scss";
import Link from "next/link";
import cn from "classnames";
import { Product } from "src/interfaces/product";

const Card = ({
  title,
  price,
  slug,
  image: { url, height, width, alt },
}: Product) => {
  return (
    <Link href={`/products/${encodeURIComponent(slug)}`}>
      <a>
        <div className={styles["card"]}>
          <div
            className={cn(styles["card__image"], "flex flex-jc-c flex-ai-c")}
          >
            <Image
              src={url}
              height={height}
              width={width}
              objectFit="cover"
              objectPosition="center center"
              alt={alt}
            />
          </div>
          <div className={styles["card__description"]}>
            <div className={styles["card__name"]}>{title}</div>
            <div className={styles["card__pricing"]}>
              <p>${price}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
