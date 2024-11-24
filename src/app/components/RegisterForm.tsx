"use client";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { createCell } from "../../../utils/actions";
import { useActionState } from "react";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
};

const RegisterForm = () => {
  const [message, formAction] = useActionState(createCell, null); //[ข้อความที่ได้จาก server, action]

  return (
    <div className="flex items-center justify-center gap-y-4">
      <div>
      <div className="grid grid-cols-2 gap-x-3 text-center text-xl my-3">
        <Link href="/login">Login</Link>
        <Link href="/register">Sign up</Link>
      </div>
      <form
        action={formAction}
        className=" text-xl grid grid-cols-2 items-center justify-center gap-x-4"
      >
        <div className="grid">
        UserName
        <input
          placeholder="Name"
          type="text"
          name="username"
          className="border"
          required
        />
        </div>
        <div className="grid">
        Name - Surname
        <input
          placeholder="Name"
          type="text"
          name="realname"
          className="border"
          required
        />
        </div>
        <div className="grid">
        Email
        <input
          placeholder="Email"
          type="text"
          name="email"
          className="border"
          required
        />
        </div>
        <div className="grid">
        phone number
        <input
          placeholder="phone number"
          type="text"
          name="phone"
          className="border"
          required
        />
        </div>
        <div className="grid">
        Password
        <input
          placeholder="Password"
          type="text"
          name="password"
          className="border"
          required
        />
        </div>
        <div className="grid">
        Confirm password
        <input
          placeholder="Password"
          type="text"
          name="Cpassword"
          className="border"
          required
        />
        </div>
        <div className="flex justify-between">
        Role:
        <label className="option-1">Student</label>
        <input type="radio" id="option-1" name="Status" value="Student" required />
        <label className="option-2">Teacher</label>
        <input type="radio" id="option-2" name="Status" value="Teacher" required />
        </div>
        <div className="col-span-2 text-right my-5">
        <SubmitButton />
        </div>
      </form>
      </div>
      {message && 
      <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2 transition-opacity duration-2000">
        {message}
      </div>
     }
    </div>
  );
};
export default RegisterForm;
