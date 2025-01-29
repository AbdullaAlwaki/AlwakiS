"use client";

import { createContext, useContext, useState } from "react";
import useStorge from "../util/storage/useStorge";

export const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useStorge("ItemChoosed", []);
  const [userData, setUserData] = useState({});
  const [address, setAddress] = useState({});
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [lang, setLang] = useState({});
  const [categories, setCategories] = useState([]);

  const cartQty = cart.reduce((acc, item) => acc + item.qty, 0);

  const getItemsQty = (_id) => {
    return cart.find((item) => item._id === _id)?.qty || 0;
  };

  const getItemsColor = (_id) => {
    return cart.find((item) => item._id === _id)?.color || 0;
  };

  const getItemsSize = (_id) => {
    return cart.find((item) => item._id === _id)?.size || 0;
  };

  const increaseItemQty = (_id, color, size) => {
    setCart((prev) => {
      if (prev.find((item) => item._id === _id) == null) {
        return [...prev, { _id, qty: 1, color, size }];
      } else if (prev.find((item) => item._id === _id && item.color === color && item.size === size) == null) {
        return [...prev, { _id, qty: 1, color, size }];
      } else {
        return prev.map((item) => {
          if (item._id === _id && item.color === color && item.size === size) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseItemQty = (_id) => {
    const item = cart.find((item) => item._id === _id);
    if (item) {
      if (item.qty > 1) {
        item.qty--;
        setCart([...cart]);
      } else {
        removeItem(_id);
      }
    }
  };

  const equalsItemQty = (_id, qty) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item._id === _id) {
          return { ...item, qty };
        } else {
          return item;
        }
      });
    });
  };

  const removeItem = (_id) => {
    setCart(cart.filter((item) => item._id !== _id));
  };

  return (
    <CartContext.Provider
      value={{
        getItemsQty,
        increaseItemQty,
        decreaseItemQty,
        equalsItemQty,
        removeItem,
        getItemsColor,
        getItemsSize,
        cart,
        cartQty,
        userData,
        setUserData,
        address,
        setAddress,
        order,
        setOrder,
        products,
        setProducts,
        lang,
        setLang,
        categories,
        setCategories,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
