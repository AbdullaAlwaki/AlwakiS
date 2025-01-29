'use client';

import { useState, useContext } from "react";
import { CartContext } from "../context/Context";
import axios from "../util/axiosUrl"; 
import loadingIcon from "../images/loading.png"; 
import logo from "../images/logo.png"; 
import Image from "next/image";
import style from "./Register.module.scss";

const Register = () => {
  const { lang } = useContext(CartContext);
  const [res, setRes] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    const dataForm = new FormData(e.currentTarget);
    const name = dataForm.get("name");
    const email = dataForm.get("email");
    const password = dataForm.get("password");
    const cp = dataForm.get("cp");

    const data = {
      name,
      email,
      password,
      cp,
    };

    try {
      setLoading(true);
      const response = await axios.post("/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = response.data;

      if (json.error) {
        setRes(json);
      } else {
        setRes(json);
        localStorage.setItem("token", json.token);
        setTimeout(() => {
          window.history.back();
        }, 2000);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setRes(error.response?.data || { error: "An error occurred" });
    }
  };

  return (
    <div className={style.Register}>
      <Image src={logo} alt="Logo" className={style.logo} />
      <h1>{lang.register}</h1>
      <form onSubmit={handleSubmitSignUp}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder={lang.name}
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder={lang.email}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder={lang.password}
          required
        />
        <input
          type="password"
          name="cp"
          id="cp"
          placeholder={lang.cp}
          required
        />
        <button type="submit">{lang.register}</button>
      </form>
      {loading && <Image src={loadingIcon} alt="Loading Icon" className="loadingIcon" />}
      {res?.message && <p>{res.message}</p>}
      {res?.error && <p style={{ color: "red" }}>{res.error}</p>}
    </div>
  );
};

export default Register;
