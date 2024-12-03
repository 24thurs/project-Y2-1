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
              type="text"
              name="email"
              className="border"
              // required
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
              type="text"
              name="password"
              className="border"
              // required
            />
          </div>
          <div className="grid">
            Confirm password
            <input
              placeholder="Password"
              type="text"
              name="confirmPassword"
              className="border"
              // required
            />
          </div>
          <div className="flex col-span-1 sm:col-span-2">
            Role:
            <div>
              <label className="option-1 ml-4">Student</label>
              <input
                type="radio"
                id="option-1"
                name="Status"
                value="Student"
                className="mr-4"
                // required
              />
            </div>
            <label className="option-2">Teacher</label>
            <input
              type="radio"
              id="option-2"
              name="Status"
              value="Teacher"
              // required
            />
          </div>
          <SignupButton />
        </form>
        <div className="col-span-1 sm:col-span-2 text-red-500 text-lg">
          {state?.errors?.name && <h2>{state.errors.name}</h2>}
        </div>
        {state?.errors?.password && (
          <div className="text-lg text-red-500">
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
