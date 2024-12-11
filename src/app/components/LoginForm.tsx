"use client";

import { useFormStatus } from "react-dom";
import { createCell } from "../../../utils/actions";
import { useActionState } from "react";
import Link from "next/link";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
};

const LoginForm = () => {
  const [message, formAction] = useActionState(createCell, null); //[ข้อความที่ได้จาก server, action]

  return (
    <div>
      <form
        action={formAction}
        className="py-40 text-xl flex flex-col items-center justify-center gap-y-4"
      >
       
       <div className="border border-gray-300 bg-blue-100 p-6 rounded-md max-w-xl   shadow-lg">
       
  
        <div className="flex items-center justify-center grid-cols-3 gap-x-5 ">
        <button 
        className=" w-20 py-1 bg-blue-200 text-white rounded-md ">
           <Link href="/login" className="text-blue-600 hover:underline" >Login</Link>
        </button>

        <button 
        className=" w-20 py-1 bg-blue-100 text-white rounded-md hover:bg-gray-300">
           <Link href="/register" className="text-gray-600 hover:underline">Sign up</Link>
        </button>
          
         </div>
        
        <div className="grid">
        Email
          <input
            placeholder="Name"
            type="text"
            name="name"
            className=" border"
          />
       
        </div>
        <div className="grid ">
        Password
          <input
            placeholder="Password"
            type="text"
            name="surname"
            className="border"
          /> 
        </div>
        <div className="mb-4 "></div>
        <div className="flex items-center justify-center ">
        <button 
        type="submit" 
        className=" w-20 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-600">
        Login
        </button>
        </div>
        </div>
      </form>

    </div>
  );
};
export default LoginForm;
