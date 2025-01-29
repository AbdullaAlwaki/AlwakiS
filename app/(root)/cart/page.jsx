"use client";

import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Cart.module.scss";
import { CartContext, useCart } from "../context/Context";
import { formatCurrency } from "../util/fc";
import axios from "../util/axiosUrl";
import deletee from "../images/delete.png";

function Cart() {
  const router = useRouter();
  const { lang } = useContext(CartContext);
  const {
    getItemsQty,
    removeItem,
    getItemsColor,
    getItemsSize,
    cart,
    userData,
    address,
    products,
    equalsItemQty,
  } = useCart();
  const [user, setUser] = useState({});
  const [addressUser, setAddressUser] = useState([]);

  useEffect(() => {
    setUser(userData);
    setAddressUser(address);
  }, [userData, address]);

  const items = products.filter((item) =>
    cart.find((cartItem) => cartItem._id === item._id)
  );

  const onOrder = async () => {
    if (!user?.name) {
      router.push("/login");
    } else if (!addressUser?.street) {
      router.push("/address");
    } else {
      try {
        await axios.post("/order", {
          user: user._id,
          address: addressUser._id,
          orderItems: items.map((item) => ({
            name: item.name,
            qty: getItemsQty(item._id),
            price: item.price,
            product: item._id,
            size: getItemsSize(item._id),
            color: getItemsColor(item._id),
          })),
          paymentMethod: "Cash",
          paymentResult: {
            id: "123456",
            status: "success",
            update_time: "2021-08-01T00:00:00Z",
          },
          taxPrice: 0,
          shippingPrice: 0,
          totalPrice: items.reduce(
            (acc, item) => acc + item.price * getItemsQty(item._id),
            0
          ),
        });
        localStorage.removeItem("ItemChoosed");
        router.push("/bill");
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className={styles.nonCart}>
        <h3>{lang?.cartEmpty || "Your cart is empty."}</h3>
      </div>
    );
  }

  return (
    <div className={styles.conCart}>
      <h1 className={styles.cartTitle}>{lang?.cart || "Cart"}</h1>
      {items.map((item) => (
        <div key={item._id} className={styles.cartFoodItem}>
          <div className={styles.conDetails}>
            <img
              src={`https://api-alwaki.onrender.com/${item.images[0]}`}
              alt={item.name}
            />
            <div className={styles.cartDetails}>
              <h3>{item.name}</h3>
              <div className={styles.cartDetailsSizeColor}>
                <span>Size: {getItemsSize(item._id)}</span>
                <span>Color: {getItemsColor(item._id)}</span>
              </div>
              <div className={styles.cartDetailsInfo}>
                <div className={styles.cartQty}>
                  Qty
                  <input
                    type="number"
                    defaultValue={getItemsQty(item._id)}
                    onChange={(e) =>
                      equalsItemQty(item._id, parseInt(e.target.value))
                    }
                  />
                  <span
                    onClick={() => removeItem(item._id)}
                    className={styles.delete}
                  >
                    <img src={deletee.src} alt="delete" />
                  </span>
                </div>
                <div className={styles.cartDetailsPrice}>
                  {formatCurrency(item.price * getItemsQty(item._id))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className={styles.cartTotal}>
        <h3>{lang?.total || "Total"}: </h3>
        <p>
          {formatCurrency(
            items.reduce(
              (acc, item) => acc + item.price * getItemsQty(item._id),
              0
            )
          )}
        </p>
      </div>
      <button onClick={onOrder}>{lang?.orderNow || "Order Now"}</button>
    </div>
  );
}

export default Cart;
