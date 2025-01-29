"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CartContext } from "../context/Context"; 
import axios from "../util/axiosUrl"; 
import styles from "./LogIn.module.scss"; 

import loadingIcon from "../images/loading.png"; 
import logo from "../images/logo.png";

const LogIn = () => {
  const [res, setRes] = useState(null);
  const { setUserData, lang } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      setLoading(true);
      const response = await axios.post("/login", {
        email,
        password,
      });
      const resData = response.data;

      setRes(resData);
      setUserData(resData.data);

      localStorage.setItem("token", resData.token);

      setTimeout(() => {
        router.push("/");
        window.location.reload();
      }, 1000);

      setLoading(false);
    } catch (error) {
      setRes(error.response?.data || { error: "An unexpected error occurred." });
      setLoading(false);
    }
  };

  return (
    <div className={styles.con_logIn}>
      <div className={styles.logIn}>
        <Image src={logo} alt="Logo" className={styles.logo} />
        <h1>{lang?.login}</h1>
        <form onSubmit={handleSubmitLogin}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder={lang?.email}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder={lang?.password}
            required
          />
          <Link href="/forgetPassword" className={styles.forget}>
            Forget Password?
          </Link>
          <button type="submit">
            {loading ? (
              <Image
                src={loadingIcon}
                alt="Loading"
                className={styles.loadingIcon}
              />
            ) : (
              lang?.login
            )}
          </button>
        </form>
        {res?.message && <p>{res?.message}</p>}
        {res?.error && <p style={{ color: "red" }}>{res?.error}</p>}
      </div>

      <div className={styles.social}>
        <p> or </p>

        <div className={styles.socialBtn}>
          <button className={styles.google}>Google</button>
          <button className={styles.facebook}>Facebook</button>
        </div>

        <button className={styles.register}>
          <Link href="/register">
            جديد هنا؟ {lang?.registerNow}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default LogIn;
