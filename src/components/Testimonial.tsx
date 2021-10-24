import Image from "next/image";
import styles from "./Testimonial.module.scss";
import cn from "classnames";

const Testimonial = ({
  text,
  owner,
  rating,
  avatar: { url, height, width, alt },
}) => {
  const ratingElement = (
    <Image src="/icons/star.svg" height={24} width={24} alt="star" />
  );
  const fullStarGroup = Array(Math.floor(rating)).fill(ratingElement);
  return (
    <div className={styles["testimonial"]}>
      <div className={styles["testimonial__avatar"]}>
        <Image
          src={url}
          height={height}
          width={width}
          objectFit="cover"
          alt={alt}
        />
      </div>
      <div>
        <div
          className={cn(
            styles["testimonial__ratings"],
            "flex flex-ai-c flex-jc-c"
          )}
        >
          {fullStarGroup}
          {rating % 1 == 0.5 && (
            <Image
              src="/icons/star-partial.svg"
              height={24}
              width={24}
              alt="star-partial"
            />
          )}
        </div>
        <p className={styles["testimonial__description"]}>
          &quot;{text}&quot;
          <span className={styles["testimonial__owner"]}> - {owner}</span>
        </p>
      </div>
    </div>
  );
};

export default Testimonial;
