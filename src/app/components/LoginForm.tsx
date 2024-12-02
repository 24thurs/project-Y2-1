"use client";

import Link from "next/link";

const LoginForm = () => {

  return (
    <div>
      <form
        className="py-40 text-xl flex flex-col items-center justify-center gap-y-4"
      >
        <div className="grid grid-cols-2 gap-x-3">
          <Link href="/login">Login</Link>
          <Link href="/signup">Sign up</Link>
        </div>
        <div className="grid">
          Email
          <input
            placeholder="Name"
            type="text"
            name="name"
            className="border"
          />
        </div>
        <div className="grid">
          Password
          <input
            placeholder="Password"
            type="text"
            name="password"
            className="border"
          />
        </div>
        <button className="bg-green-500">Log In</button>
      </form>
    </div>
  );
};
export default LoginForm;
