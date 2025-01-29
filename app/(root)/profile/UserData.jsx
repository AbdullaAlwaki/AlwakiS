"use client";

import Link from "next/link";
import axios from "../util/axiosUrl";
import { useRouter } from "next/navigation";

function UserData({ user , lang, styles }) {
  const navigator = useRouter();

  const logOut = () => {
    axios("/logout").catch((err) => {
      return err;
    });
    localStorage.removeItem("token");
    navigator.push("/");
    window.location.reload();
  };

  const userData = [
    {
      name: lang?.name,
      value: user?.name,
    },
    {
      name: lang?.email,
      value: user?.email,
    },
    {
      name: lang?.password,
      value: "********",
    },
    {
      name: lang?.phone,
      value: user?.phone,
    },
    {
      name: lang?.street,
      value: user?.street,
    },
    {
      name: lang?.zipCode,
      value: user?.zip,
    },
    {
      name: lang?.city,
      value: user?.city,
    },
    {
      name: lang?.country,
      value: user?.country,
    },
  ];

  return (
    <div className={styles.car_details}>
      {userData.map((data, index) => (
        <p key={index}>
          <span>{data.name}:</span> 
            <span>{data.value}</span>
        </p>  
      ))
      }
      <ul>
        <li>
          <Link href="/order" className="edit">
            {lang?.order}
          </Link>
        </li>
        <li onClick={logOut}>{lang?.logout}</li>
      </ul>
    </div>
  );
}

export default UserData;
