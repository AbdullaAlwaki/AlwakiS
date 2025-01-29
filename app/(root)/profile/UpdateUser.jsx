"use client";

import React from "react";
import axios from "../util/axiosUrl"; // تأكد من أن هذه هي الـ URL الصحيحة لملف axios
import { useRouter } from "next/navigation"; // استيراد useRouter لتوجيه المستخدم إذا لزم الأمر

function UpdateUser({ user, lang, styles }) {
  const [res, setRes] = React.useState({});
  const router = useRouter();

  const onChange = async (e) => {
    e.preventDefault();

    const dataForm = new FormData(e.currentTarget);
    const userData = Object.fromEntries(dataForm.entries());

    const data = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      cp: userData.cp,
    };

    const address = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      cp: userData.cp,
      userId: user.userId,
      phone: userData.phone,
      street: userData.street,
      zip: userData.zip,
      city: userData.city,
      state: userData.state,
      country: userData.country,
    };

    if (
      data.name !== user.name ||
      data.email !== user.email ||
      data.password !== data.cp ||
      address.phone !== user.phone ||
      address.street !== user.street ||
      address.zip !== user.zip ||
      address.city !== user.city ||
      address.state !== user.state ||
      address.country !== user.country
    ) {
      try {
        // تحديث بيانات المستخدم
        await axios.put(
          `/user`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // تحديث بيانات العنوان
        await axios.put(
          `/address`,
          address,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setRes({ message: lang?.successMessage });
        setTimeout(() => {
          router.reload(); // إعادة تحميل الصفحة بعد نجاح التحديث
        }, 2000);
      } catch (err) {
        setRes({ error: err?.response?.data?.message || lang?.errorMessage });
      }
    } else {
      setRes({ message: lang?.noChanges });
    }
  };

  const input = [
    { name: lang?.name, type: "text", id: "name", value: user.name },
    { name: lang?.email, type: "email", id: "email", value: user.email },
    { name: lang?.password, type: "password", id: "password", value: "" },
    { name: lang?.cp, type: "password", id: "cp", value: "" },
    { name: lang?.phone, type: "text", id: "phone", value: user.phone },
    { name: lang?.street, type: "text", id: "street", value: user.street },
    { name: lang?.zipCode, type: "text", id: "zip", value: user.zip },
    { name: lang?.city, type: "text", id: "city", value: user.city },
    { name: lang?.state, type: "text", id: "state", value: user.state },
    { name: lang?.country, type: "text", id: "country", value: user.country },
  ];

  return (
    <div className={styles.update_con}>
      <form onSubmit={onChange}>
        {input.map((item) => (
          <div key={item.id}>
            <input
              type={item.type}
              id={item.id}
              name={item.id}
              defaultValue={item.value}
              placeholder={item.name}
              required
            />
          </div>
        ))}
        <button type="submit">{lang?.save}</button>
      </form>
      {res.message && <p>{res.message}</p>}
      {res.error && <p style={{ color: "red" }}>{res.error}</p>}
    </div>
  );
}

export default UpdateUser;
