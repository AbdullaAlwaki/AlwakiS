"use client";

import React, { useContext } from "react";
import { useRouter, useParams } from "next/navigation";
import { CartContext } from "../../context/Context";
import { formatCurrency } from "../../util/fc";
import Image from "next/image";
import style from "./Home.module.scss";

const Sort = () => {
  const { products } = useContext(CartContext);
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const items = products?.filter((cartItem) => cartItem.category === id) || [];

  const getProduct = (id) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className={style.con_home}>
      <div className={style.home_items}>
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item._id} className={style.cart_item} onClick={() => getProduct(item._id)}>
              <Image
                src={item.images?.[0] ? `https://api-alwaki.onrender.com/${item.images[0]}` : "/placeholder.png"}
                alt={item.name || "Product Image"}
                width={200}
                height={200}
                className={style.product_image}
              />
              <h2>{item.name}</h2>
              <div>
                <p>{item.description}</p>
                <p>{formatCurrency(item.price)}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Sort;
