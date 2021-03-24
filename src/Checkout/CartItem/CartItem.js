import React from "react";
import StarIcon from "@material-ui/icons/Star";
import styles from "./CartItem.module.css";
import { useStateValue } from "../../StateProvider";

const CartItem = ({
  id,
  image,
  title,
  rating,
  price,
  hideButton,
  quantity,
}) => {
  const [{ user }, dispatch] = useStateValue();
  const removeFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };
  const addToCart = () => {
    if (user) {
      dispatch({
        type: "ADD_TO_CART",
        item: {
          id: id,
          title: title,
          image: image,
          price: price,
          rating: rating,
          quantity: 1,
        },
      });
    }
  };
  const checkout__cart = {
    marginTop: "20px",
    display: "flex",
    fontSize: "18px",
    borderBottom: "1px solid lightgray",
    marginBottom: "20px",
    fontWeight: "600",
  };
  const checkout__cartInfo = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  };

  return (
    <div className={styles.checkout__cart} style={checkout__cart}>
      <img src={image} alt="" className={styles.checkout__cartImage}></img>
      <div className={styles.checkout__cartInfo} style={checkout__cartInfo}>
        <p>{title}</p>
        <p>
          <small>
            <strong>{String.fromCharCode(8377)}</strong>
          </small>
          <strong>{`${price} * ${quantity}`}</strong>
        </p>
        <p>
          <StarIcon
            className={
              rating >= 1
                ? styles.checkout__ratingStar
                : styles.checkout__ratingStarEmpty
            }
          />
          <StarIcon
            className={
              rating >= 2
                ? styles.checkout__ratingStar
                : styles.checkout__ratingStarEmpty
            }
          />
          <StarIcon
            className={
              rating >= 3
                ? styles.checkout__ratingStar
                : styles.checkout__ratingStarEmpty
            }
          />
          <StarIcon
            className={
              rating >= 4
                ? styles.checkout__ratingStar
                : styles.checkout__ratingStarEmpty
            }
          />
          <StarIcon
            className={
              rating >= 5
                ? styles.checkout__ratingStar
                : styles.checkout__ratingStarEmpty
            }
          />
        </p>
        {hideButton && (
          <div>
            <button
              className={styles.checkout__cartButton}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
            <button className={styles.checkout__cartButton} onClick={addToCart}>
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
