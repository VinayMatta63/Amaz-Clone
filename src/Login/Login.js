import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./Login.module.css";
import { auth } from "../firebase";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [connecting, setConnecting] = useState(false);
  let props = {};
  if (!connecting) {
    props = { display: "none" };
  }
  const signIn = (e) => {
    setConnecting(true);
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        setConnecting(false);
        history.push("/");
      })
      .catch((error) => {
        setConnecting(false);
        alert(error.message);
      });
  };
  const register = (e) => {
    setConnecting(true);
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          setConnecting(false);
          history.push("/");
        }
      })
      .catch((error) => {
        setConnecting(false);
        if (
          error.message ===
          "The email address is already in use by another account."
        ) {
          alert("Account already exists so logging in");
          auth
            .signInWithEmailAndPassword(email, password)
            .then((auth) => {
              history.push("/");
            })
            .catch((error) => {
              alert(error.message);
            });
        } else {
          alert(error.message);
        }
      });
  };
  return (
    <div className={styles.login}>
      <div className={styles.loader} style={props}>
        <img
          className={styles.loaderGif}
          src="https://www.wpfaster.org/wp-content/uploads/2013/06/loading-gif.gif"
          alt=""
        />
      </div>
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1920px-Amazon_logo.svg.png"
          alt="amazon_logo"
          className={styles.login__logo}
        ></img>
      </Link>
      <div className={styles.login__container}>
        <h1>Sign-in</h1>
        <form>
          <h5>Email</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={styles.login__signInButton}
            type="submit"
            onClick={signIn}
          >
            Sign In
          </button>
        </form>
        <p>
          By continuing, you agree to Amazon Clone's Conditions of Use and
          Privacy Notice.
        </p>
      </div>
      <span></span>
      <p className={styles.login__new}>New to Amazon?</p>
      <button
        className={styles.login__createButton}
        onClick={register}
        type="submit"
      >
        Create your Amazon account
      </button>
    </div>
  );
};

export default Login;
