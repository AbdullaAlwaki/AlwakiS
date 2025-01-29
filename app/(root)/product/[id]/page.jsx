"use client";

import React from "react";
import { CartContext, useCart } from "../../context/Context";
import { formatCurrency } from "../../util/fc";
import back from "../../images/images.png";
import share from "../../images/share.png";
import { useRouter } from "next/navigation";
import s from "./Product.module.scss";
import Carousel from "./Carousel";
import Image from "next/image";

function Product({ params }) {
  const { increaseItemQty } = useCart();
  const [num, setNum] = React.useState(0);
  const { products , lang } = React.useContext(CartContext);
  const [size, setSize] = React.useState(0);
  const { id } = React.use(params);
  const router = useRouter();



  const items = products.find((cartItem) => cartItem._id === id);
  const shareProduct = (name, text) => {
    if (navigator.share) {
      navigator
        .share({
          title: name,
          text: text,
          url: window.location.href,
        })

        .catch((error) => console.log("Error sharing", error));
    }
  };

  const onChange = (e) => {
    setSize(e.target.value);
  };

  if (items?.length === 0) {
    return (
      <div className="non-cart">
        <h3>{lang.cartEmpty}</h3>
      </div>
    );
  }

  return (
    <div className={s.product_con}>
      <div className={s.product_header}>
        <div className={s.share_button}>
          <Image
            src={share}
            onClick={() => shareProduct(items?.name, items?.description)}
            alt=""
          />
        </div>
        <div onClick={() => window.history.back()} className={s.back}>
          <Image src={back} alt="" />
        </div>
      </div>

      <Carousel items={items} setNum={setNum} num={num} s={s} />

      <div className={s.product_info_con}>
        <div className={s.product_info}>
          <h1 className={s.product_title}>{items?.name}</h1>
          <p className={s.product_price}>{formatCurrency(items?.price)}</p>
          <div className={s.product_description}>
            <p>{items?.description}</p>
          </div>

          <div className={s.colors_con}>
            <div className={s.allColors}>
              {items?.color.map((color, index) => (
                <div
                  className={s.color_con}
                  style={{ border: num === index ? "1px solid #000" : "" }}
                  key={index}
                >
                  <span
                    className={color}
                    style={{ backgroundColor: color }}
                    onClick={() => setNum(index)}
                  ></span>
                </div>
              ))}
            </div>
          </div>
          <div className={s.size}>
            <select name="" id="" onChange={onChange}>
              {items?.size.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={s.btn_con}>
          <div className={s.product_btn}>
            <button
              onClick={() => {
                increaseItemQty(items?._id, items?.color[num], size);
              }}
              className={s.button}
            >
              {lang.addToCart}
            </button>
            <button onClick={() => router.push("/cart")} className={s.button}>
              {lang.goToCart}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
