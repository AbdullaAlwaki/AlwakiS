"use client";

import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "../context/Context";
import { formatCurrency } from "../util/fc";
import style from "./Bill.module.scss";

const Bill = () => {
  const { cart, userData, address, getItemsQty, products, lang } = useContext(CartContext);
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (products && cart) {
      const items = products.filter((item) => cart.some((cartItem) => cartItem._id === item._id));
      setOrder(items);
    }
    setUser(userData);
    setAddressData(address);
  }, [cart, products, userData, address]);

  const onFinish = () => {
    router.push("/");
  };

  return (
    <div className={style.con_bill}>
      <h1>{lang?.order}</h1>
      <h2>{lang?.orderSummary}</h2>
      <div className={style.order_summary}>
        {user && (
          <div className={style.order_user}>
            <h3>{lang?.shippingAddress}</h3>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{addressData?.phone}</p>
            <p>{addressData?.street}</p>
            <p>{addressData?.zip}</p>
            <p>{addressData?.city}</p>
            <p>{addressData?.country}</p>
          </div>
        )}
        <h3>{lang?.items}</h3>
        {order.map((item) => (
          <div className={style.item_div} key={item._id}>
            <p>{getItemsQty(item._id)} {item.name}</p>
            <p>{lang?.price}: {formatCurrency(item.price)}</p>
          </div>
        ))}
        <h2>{lang?.total}: { 
          formatCurrency(
            order.reduce((acc, item) => acc + item.price * getItemsQty(item._id), 0)
          )
        }</h2>
      </div>
      <button className={style.btn} onClick={onFinish}>{lang?.finish}</button>
    </div>
  );
};

export default Bill;
