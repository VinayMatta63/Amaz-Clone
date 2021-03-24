import React, { useState, useEffect } from "react";
import styles from "./Orders.module.css";
import { useStateValue } from "../StateProvider";
import { db } from "../firebase";
import Order from "./Order/Order";
const Orders = () => {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <div className={styles.order}>
      <h1>Your Orders</h1>
      <div className={styles.order__orders}>
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
