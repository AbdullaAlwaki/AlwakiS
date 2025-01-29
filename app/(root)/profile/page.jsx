"use client";

import React from "react";
import { CartContext } from "../context/Context";
import { useRouter } from "next/navigation"; 
import styles from "./Profile.module.scss"; 
import UserData from "./UserData";
import UpdateUser from "./UpdateUser";

function Profile() {
  const { userData, address, lang } = React.useContext(CartContext);
  const [user, setUser] = React.useState({});
  const [edit, setEdit] = React.useState(false);
  const router = useRouter(); 

  React.useEffect(() => {
    setUser({ ...userData, ...address });
    
    // Client-side check for localStorage
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("token") || !userData) {
        router.push("/login");
      }
    }
  }, [userData, router, address]); 

  return (
    <div className={styles.con_Profile}>
      <h1>{lang?.profile}</h1>
      <div>
        <h2>{lang?.personalInformation}</h2>
        {edit ? (
          <UpdateUser user={user} lang={lang} styles={styles} />
        ) : (
          <UserData user={user} lang={lang} styles={styles}  />
        )}
        <button onClick={() => setEdit(!edit)}>
          {edit ? lang?.cancel : lang?.edit}
        </button>
      </div>
    </div>
  );
}

export default Profile;