"use client";

import Link from "next/link";
import { valid } from "../../../serveraction/serverActions";
import { useFormStatus } from "react-dom";
import { useActionState, useState } from "react";
import { ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      type="submit"
      className="w-[100px] py-1 text-white rounded-md ml-auto bg-blue-400 hover:bg-600"
 
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}
const SignupPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [submit, actionSubmit] = useActionState(valid, undefined);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
  
    
    if (submit?.errors) {
     
      toast.error("Please fix the errors in the form before submitting.");
      return;
    } else {
      try {
        const formElement = event.currentTarget as HTMLFormElement;
        const formData = new FormData(formElement);
        const formDataObject = Object.fromEntries(formData.entries());
        
        const res = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataObject),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success(data.message);
        } else {
          toast.error(data.error);
        }
      } catch (error) {
        toast.error("An error occurred while submitting the form.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-xl">
       <div className="border border-gray-300 bg-blue-100 p-6 rounded-md max-w-2xl w-full shadow-lg">
         <div className="flex justify-center mb-4">
            <img src="/image/logo.png" 
            alt="Iogo" 
            className="w-30 h-20 object-cover rounded-full  " />
          </div>
      <div className="flex items-center justify-center text-xl grid-cols-3 gap-x-9 ">
           <button 
              className=" w-20 py-1 bg-gray-200 rounded-md hover:bg-gray-400 ">
              <Link href="/login" className="text-gray-600 " >Login</Link>
           </button>

           <button 
              className="  w-20 py-1 bg-blue-300 rounded-md">
              <Link href="/signup" className="text-blue-800 ">Sign up</Link>
           </button>
        </div>
        <hr />
        <div className="mb-4"></div>
        <form
          onSubmit={handleSubmit}
          action={actionSubmit}
          className="text-xl grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-x-4 gap-y-3"
        >
        
          <div className="grid gap-3">
            Username
            <input
              placeholder="username"
              type="text"
              name="userName"
              className=" border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={formData.userName}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-3">
            Name - Surname
            <input
              placeholder="Name - Surname"
              type="text"
              name="fullName"
              className=" border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-3">
            Email
            <input
              placeholder="Email"
              type="email"
              name="email"
              className=" border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-3">
            phone number
            <input
              placeholder="phone number"
              pattern="[0-9]*"
              type="tel"
              name="phone"
              className=" border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-3">
            Password
            <input
              placeholder="Password"
              type="password"
              name="password"
              className=" border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-3">
            Confirm password
            <input
              placeholder="Password"
              type="password"
              name="confirmPassword"
              className=" border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
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
                checked={formData.role === "Student"}
                onChange={handleChange}
              />
            </div>
            <label className="option mr-2">Teacher</label>
            <input
              type="radio"
              id="option"
              name="role"
              value="Teacher"
              checked={formData.role === "Teacher"}
              onChange={handleChange}
              // required
            />
          </div>
          <div></div>
          <SignupButton />
        </form>
        <div className="my-5 flex items-center gap-2">
          Already have an account?
          <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
        </div>
        {submit?.errors?.userName && (
          <li className="col-span-1 sm:col-span-2 text-red-500 text-lg">
            {submit.errors.userName}
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
        <ToastContainer 
        position= "top-right"
        autoClose= {5000}
        hideProgressBar= {false}
        closeOnClick= {true}
        pauseOnHover= {true}
        draggable= {true}
        theme= "light"/>
      </div>
    </div>
  );
};

export default SignupPage;
