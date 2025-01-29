"use client";

import React, { useContext } from 'react';
import { CartContext } from '../context/Context';
import styles from './order.module.scss'; 
import { formatCurrency } from '../util/fc';

const Order = () => {
  const { order, lang } = useContext(CartContext);

  const reverseOrder = order?.length
    ? [...order].reverse()
    : [];

  return (
    <div className={styles.conOrder}>
      <h1>{lang?.order}</h1>
      {order?.length > 0 ? (
        reverseOrder?.map((item) => (
          <div className={styles.orderCart} key={item._id}>
            {item.orderItems.map((orderItem) => (
              <div className={styles.orderItem} key={orderItem._id}>
                <p>{orderItem.name}</p>
                <p>
                  {lang.price}: {formatCurrency(orderItem.price)}
                </p>
                <p>
                  {lang.qty}: {orderItem.qty}
                </p>
              </div>
            ))}
            <p>
              {lang.shipping}: {formatCurrency(item.shippingPrice)}
            </p>
            <p>
              {lang.total}: {formatCurrency(item.totalPrice)}
            </p>
            <p>
              {lang.orderDate}{' '}
              {item.createdAt.slice(0, 10)} {item.createdAt.slice(11, 16)}
            </p>
          </div>
        ))
      ) : (
        <div className={styles.noOrder}>
          <p>{lang?.noOrder}</p>
          <p>{lang?.noOrderMessage}</p> {/* رسالة إضافية */}
          <button onClick={() => alert('Redirecting to shop...')}>
            {lang?.shopNow} {/* زر التوجيه إلى المتجر */}
          </button>
        </div>
      )}
    </div>
  );
};

export default Order;
