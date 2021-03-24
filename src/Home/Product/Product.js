import React from "react";
import styles from "./Product.module.css";
import StarIcon from "@material-ui/icons/Star";
import { useStateValue } from "../../StateProvider.js";
import { useSpring, animated } from "react-spring";
import { useHistory } from "react-router-dom";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 200,
  (x - window.innerWidth / 2) / 200,
  1.03,
];
const trans = (x, y, s) =>
  `perspective(1200px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const Product = ({ id, title, image, price, rating, details }) => {
  const history = useHistory();
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 1, tension: 450, friction: 30 },
  }));
  const [, dispatch] = useStateValue();
  const redirect = () => {
    dispatch({
      type: "PRODUCT_DETAILS",
      product: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
        details: details,
      },
    });

    history.push("/details");
  };

  return (
    <animated.div
      className={`${styles.product} ${styles.card}`}
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{ transform: props.xys.interpolate(trans) }}
      onClick={redirect}
    >
      <div className={styles.product__info}>
        <p>{title}</p>
        <p className={styles.product__price}>
          <small>
            <strong>{String.fromCharCode(8377)}</strong>
          </small>
          <strong>{price}</strong>
        </p>
        <div className={styles.product__rating}>
          <p>
            <StarIcon
              className={
                rating >= 1
                  ? styles.product__ratingStar
                  : styles.product__ratingStarEmpty
              }
            />
            <StarIcon
              className={
                rating >= 2
                  ? styles.product__ratingStar
                  : styles.product__ratingStarEmpty
              }
            />
            <StarIcon
              className={
                rating >= 3
                  ? styles.product__ratingStar
                  : styles.product__ratingStarEmpty
              }
            />
            <StarIcon
              className={
                rating >= 4
                  ? styles.product__ratingStar
                  : styles.product__ratingStarEmpty
              }
            />
            <StarIcon
              className={
                rating >= 5
                  ? styles.product__ratingStar
                  : styles.product__ratingStarEmpty
              }
            />
          </p>
        </div>
      </div>

      <img src={image} alt="" className={styles.product__img} />

      <div className={styles.product__button}>
        <button>Details</button>
      </div>
    </animated.div>
  );
};

export default Product;
