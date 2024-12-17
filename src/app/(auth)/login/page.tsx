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
        <div className="border border-gray-300 bg-blue-100 p-6 rounded-md max-w-xl   shadow-lg">
        <div className="flex justify-center mb-4">
            <img src="/image/logo.png" 
            alt="Iogo" 
            className="w-30 h-20 object-cover rounded-full  " />
          </div>
                    
        <div className="flex items-center justify-center grid-cols-3 gap-x-5 ">
           <button 
              className=" w-20 py-1 bg-blue-300 rounded-md ">
              <Link href="/login" className="text-blue-800 " >Login</Link>
           </button>

           <button 
              className=" w-20 py-1 bg-gray-200 rounded-md hover:bg-gray-400">
              <Link href="/signup" className="text-gray-600 ">Sign up</Link>
           </button>
        </div>
        <div className="grid gap-3">
          Email
          <input
            placeholder="Email"
            type="text"
            name="email"
            className=" w-[400px] border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid gap-3">
          Password
          <input
            placeholder="Password"
            type="text"
            name="password"
            className=" w-[400px] border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className= "mb-4"></div>
        <div className="flex items-center justify-center ">
        <button className=" w-20 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-600 ">Log In</button>
        </div>
        <div>
          Message: {state.message}
        </div>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default LoginPage;