"use client";

import Link from "next/link";
import { login } from "@/serveraction/serverActions";
import { useActionState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

const LoginPage = () => {
  const initState = {
    message: '',
    error: ''
  };

  const [state, formAction] = useActionState(login, initState)

  return (
    <div>
      <form
        action={formAction}
        className="py-40 text-xl flex flex-col items-center justify-center gap-y-4"
      >
        <div className="grid grid-cols-2 gap-x-3">
          <Link href="/login">Login</Link>
          <Link href="/signup">Sign up</Link>
        </div>
        <div className="grid">
          Email
          <input
            placeholder="Email"
            type="text"
            name="email"
            className="border"
            defaultValue="su25@gmail.com"
          />
        </div>
        <div className="grid">
          Password
          <input
            placeholder="Password"
            type="text"
            name="password"
            className="border"
            defaultValue="Sukum@47"
          />
        </div>
        <button className="bg-green-500">Log In</button>
        <div>
          Message: {state.message}
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default LoginPage;
