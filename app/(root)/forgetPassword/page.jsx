'use client';

import style from "./ForgetPassword.module.scss";
import axiosUrl from "../util/axiosUrl";
import { useState } from "react";

function ForgetPassword() {
    const [res, setRes] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        setLoading(true); // Show loading state
        try {
            const response = await axiosUrl.post("/forgetPassword", { email });
            setRes(response.data);
            alert("Email has been sent");
        } catch (err) {
            setRes(err.response?.data || { error: "An error occurred" });
        } finally {
            setLoading(false); // Hide loading state after request completes
        }
    };

    return (
        <div className={style.forget_password_con}>
            <div className={style.forget_password_form}>
                <h1>Forget Password</h1>
                {res?.message && <p>{res?.message}</p>}
                {res?.error && <p style={{ color: "red" }}>{res?.error}</p>}
                <form onSubmit={onSubmit}>
                    <input type="email" name="email" placeholder="Email" required />
                    <button type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Send Email"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgetPassword;
