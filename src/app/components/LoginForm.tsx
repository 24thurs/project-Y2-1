"use client";

import { useFormStatus } from "react-dom";
import { createCell } from "../../../utils/actions";
import { useActionState } from "react";
import Link from "next/link";

const LoginForm = () => {
  const [message, formAction] = useActionState(createCell, null); //[ข้อความที่ได้จาก server, action]

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
            name="surname"
            className="border"
          />
           
        </div>
       
      </form>

    </div>
  );
};
export default LoginForm;
