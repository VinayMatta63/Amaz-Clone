import React, { useRef } from "react";
import styles from "./Header.module.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";
import MessageHub from "../Home/Product/MessageHub/MessageHub";
import { cartSum } from "../reducer";

const Header = () => {
  const [{ cart, user }, dispatch] = useStateValue();
  const ref = useRef(null);
  const loginHandler = () => {
    if (user) {
      ref.current("Logged Out");
      auth.signOut();
      dispatch({
        type: "REMOVE_USER",
        user: null,
        cart: [],
      });
    }
  };
  return (
    <div className={styles.header}>
      <Link to="/">
        <img
          className={styles.header__logo}
          src="http://pngimg.com/uploads/amazon/amazon_PNG25.png"
          alt="amazon_logo"
        />
      </Link>

      <div className={styles.header__search}>
        <input
          className={styles.header__searchInput}
          type="text"
          placeholder="Search..."
        />
        <SearchIcon className={styles.header__searchIcon} />
      </div>
      <div className={styles.header__nav}>
        <Link to={user ? "/" : "/login"}>
          <MessageHub children={(add) => (ref.current = add)} />
          <div className={styles.header__option} onClick={loginHandler}>
            <span className={styles.header__optionOne}>
              {user ? `Hello ${user.email}` : "Hello Guest"}
            </span>
            <span className={styles.header__optionTwo}>
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to={user ? "/orders" : "/login"}>
          <div className={styles.header__option}>
            <span className={styles.header__optionOne}>Returns</span>
            <span className={styles.header__optionTwo}>
              <span className={styles.header__optionOne}>&</span>Orders
            </span>
          </div>
        </Link>
        <Link to="/checkout">
          <div className={styles.header__optionCart}>
            <span
              className={`${styles.header__optionTwo} ${styles.header__cartCount}`}
            >
              {cartSum(cart)}
            </span>
            <ShoppingCartIcon />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
