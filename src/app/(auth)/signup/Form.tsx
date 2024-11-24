"use client";
import Link from "next/link";
import { signup } from "./actions";
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
  const [state, action] = useActionState(signup, undefined);

  return (
    <div className="flex items-center justify-center gap-y-4">
      <div>
        <div className="grid grid-cols-2 gap-x-3 text-center text-xl my-3">
          <Link href="/login">Login</Link>
          <Link href="/signup">Sign up</Link>
        </div>
        <form
          action={action}
          className="text-xl grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-x-4 gap-y-3"
        >
          <div className="grid min-w-[300px]">
            UserName
            <input
              placeholder="Name"
              type="text"
              name="name"
              className="border"
              // required
            />
          </div>
          <div className="grid">
            Name - Surname
            <input
              placeholder="Name"
              type="text"
              name="fullName"
              className="border"
              // required
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
            />
          </div>
          <div className="grid">
            phone number
            <input
              placeholder="phone number"
              type="text"
              name="phone"
              className="border"
              // required
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
            />
          </div>
          <div className="flex col-span-1 sm:col-span-2">
            Role:
            <div>
              <label className="option ml-4">Student</label>
              <input
                type="radio"
                id="option-1"
                name="Status"
                value="Student"
                className="mr-4"
                // required
              />
            </div>
            <label className="option">Teacher</label>
            <input
              type="radio"
              id="option"
              name="Status"
              value="Teacher"
              // required
            />
          </div>
          <div></div>
          <SignupButton />
        </form>
        <div>Already have an account?
          <Link href='/login'> Login</Link>
        </div>

        {state?.errors?.name && (
          <li className="col-span-1 sm:col-span-2 text-red-500 text-lg">
            {state.errors.name}
          </li>
        )}
        {state?.errors?.password && (
          <li className="col-span-1 sm:col-span-2 text-red-500 text-lg">
            Password must:
            <ul>
            {state.errors.password.map((error) => (
              <li className="ml-6" key={error}>- {error}</li>
            ))}</ul>
          </li>
        )}
        {state?.errors?.phone && (
          <li className="col-span-1 sm:col-span-2 text-red-500 text-lg">
            Phone number must
            <ul>
            {state.errors.phone.map((error) =>(
              <li className="ml-6" key={error}>-  {error}</li>
            ))}</ul>
          </li>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
