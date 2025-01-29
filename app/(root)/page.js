"use client";

import React, { useContext, useEffect } from "react";
import { CartContext } from "./context/Context";
import { useRouter } from "next/navigation";
import logo from "./images/arabic.png";
import s from "./page.module.scss";
import axios from "../(root)/util/axiosUrl";
import Items from "./components/Items";
import Categories from "./components/Categories";
import SearchBar from "./components/SearchBar";
import ProfileData, { languageProduct } from "./util/profileData";
import Image from "next/image";

function Home() {
  const {
    products,
    lang,
    setUserData,
    setAddress,
    setOrder,
    setProducts,
    setLang,
  } = useContext(CartContext);
  const router = useRouter();

  let items = products[0] ? products : null;  

  useEffect(() => {
    const lang = localStorage.getItem("language")
    if(localStorage.getItem("language") !== null){ 
    axios.get(`/language/${lang}`).then((res) => {
      setLang(res.data.language[0]);
    });
  }    

    languageProduct(lang, setProducts)
    if (localStorage.getItem("language") === null) router.push("/language");

    ProfileData(setUserData, setAddress, setOrder);
  }, []);

  // return router.push("/language");
  return (
    <div className={s.con_home}>
      <h1>Alwaki Store</h1>
      <SearchBar />
      <div className={s.newItems}>
        <Image src={logo} alt="Logo" />
      </div>
      <Items items={items} />
      <Categories lang={lang} />
    </div>
  );
}

export default Home;
