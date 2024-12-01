"use client";
import Link from "next/link";
import { signup } from "../../../serveraction/serverActions";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";

function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} type="submit" className="mt-2 w-full">
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

export const SignupForm = () => {
  const [submit, actionSubmit] = useActionState(signup, undefined);
  return (
    <div className="flex items-center justify-center gap-y-4">
      <div>
        <div className="grid grid-cols-2 gap-x-3 text-center text-xl my-3">
          <Link href="/login">Login</Link>
          <Link href="/signup">Sign up</Link>
        </div>
        <hr />
        <form
          action={actionSubmit}
          className="text-xl grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-x-4 gap-y-3"
        >
          <div className="grid min-w-[300px]">
            Username
            <input
              placeholder="username"
              type="text"
              name="userName"
              className="border"
              required
              defaultValue="afdasffasd"
            />
          </div>
          <div className="grid">
            Name - Surname
            <input
              placeholder="Name - Surname"
              type="text"
              name="fullName"
              className="border"
              required
              defaultValue="bfdsafdas"
            />
          </div>

          <div className="grid">
            Email
            <input
              placeholder="Email"
              type="email"
              name="email"
              className="border"
              required
              defaultValue="su25@gmail.com"
            />
          </div>
          <div className="grid">
            phone number
            <input
              placeholder="phone number"
              pattern="[0-9]*"
              type="tel"
              name="phone"
              className="border"
              required
              defaultValue="0000000000"
            />
          </div>
          <div className="grid">
            Password
            <input
              placeholder="Password"
              type="password"
              name="password"
              className="border"
              required
              defaultValue="Sukum@47"
            />
          </div>
          <div className="grid">
            Confirm password
            <input
              placeholder="Password"
              type="password"
              name="confirmPassword"
              className="border"
              required
              defaultValue="Sukum@47"
            />
          </div>
          <div className="flex col-span-1 sm:col-span-2">
            Role:
            <div>
              <label className="option ml-4 mr-2">Student</label>
              <input
                type="radio"
                id="option-1"
                name="role"
                value="Student"
                className="mr-4"
                required
              />
            </div>
            <label className="option mr-2">Teacher</label>
            <input
              type="radio"
              id="option"
              name="role"
              value="Teacher"
              // required
            />
          </div>
          <div></div>
          <SignupButton />
        </form>
        <div className="my-5">
          Already have an account?
          <Link href="/login"> Login</Link>
        </div>
        {submit?.errors?.name && (
          <li className="col-span-1 sm:col-span-2 text-red-500 text-lg">
            {submit.errors.name}
          </li>
        )}
        {submit?.errors?.fullName && (
          <li className="col-span-1 sm:col-span-2 text-red-500 text-lg">
            {submit.errors.fullName}
          </li>
        )}
        {submit?.errors?.email && (
          <li className="col-span-1 sm:col-span-2 text-red-500 text-lg">
            {submit.errors.email}
          </li>
        )}

        {submit?.errors?.phone && (
          <li className="col-span-1 sm:col-span-2 text-red-500 text-lg">
            {submit.errors.phone}
          </li>
        )}
        {submit?.errors?.password && (
          <li className="col-span-1 sm:col-span-2 text-red-500 text-lg">
            Password must:
            <ul>
              {submit.errors.password.map((error) => (
                <li className="ml-6" key={error}>
                  - {error}
                </li>
              ))}
            </ul>
          </li>
        )}
        {submit?.errors?.confirmPassword && (
          <li className="col-span-1 sm:col-span-2 text-red-500 text-lg">
            {submit.errors.confirmPassword}
          </li>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
