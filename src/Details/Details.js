import React, { useState } from "react";
import styles from "./Details.module.css";
import { useStateValue } from "../StateProvider";
import StarIcon from "@material-ui/icons/Star";
import { useHistory } from "react-router-dom";

const Details = () => {
  const [quantity, setQuantity] = useState(1);
  const history = useHistory();
  const [{ user, product }, dispatch] = useStateValue();
  if (Object.keys(product).length === 0) {
    history.push("/");
  }
  const addToCart = () => {
    if (user) {
      dispatch({
        type: "ADD_TO_CART",
        item: {
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          details: product.details,
          rating: product.rating,
          quantity: parseInt(quantity),
        },
      });
      history.push("/");
    } else {
      history.push("/login");
    }
  };

  return (
    <div className={styles.details}>
      <img src={product.image} alt="" className={styles.details__img} />
      <div className={styles.details__info}>
        <p className={styles.details__title}>{product.title}</p>
        <p className={styles.details__price}>
          <small>
            <strong>{String.fromCharCode(8377)}</strong>
          </small>
          <strong>{product.price}</strong>
        </p>

        <p className={styles.details__rating}>
          <StarIcon
            className={
              product.rating >= 1
                ? styles.details__ratingStar
                : styles.details__ratingStarEmpty
            }
          />
          <StarIcon
            className={
              product.rating >= 2
                ? styles.details__ratingStar
                : styles.details__ratingStarEmpty
            }
          />
          <StarIcon
            className={
              product.rating >= 3
                ? styles.details__ratingStar
                : styles.details__ratingStarEmpty
            }
          />
          <StarIcon
            className={
              product.rating >= 4
                ? styles.details__ratingStar
                : styles.details__ratingStarEmpty
            }
          />
          <StarIcon
            className={
              product.rating >= 5
                ? styles.details__ratingStar
                : styles.details__ratingStarEmpty
            }
          />
        </p>
        <p className={styles.details__array}>
          {product.details?.map((detail) => (
            <p>-{detail}</p>
          ))}
        </p>
        <p className={styles.details__quantity}>
          Quantity:
          <input
            className={styles.details__quantity__input}
            type="number"
            defaultValue={1}
            min={1}
            onChange={(e) => setQuantity(e.target.value)}
          ></input>
        </p>

        <button className={styles.details__button} onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Details;
