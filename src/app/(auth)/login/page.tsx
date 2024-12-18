"use client";

import Link from "next/link";
import { login } from "@/serveraction/serverActions";
import { useActionState, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const initState = {
    message: '',
    error: ''
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [state, formAction] = useActionState(login, initState);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state.message) {
      toast.error(state.message);
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div>
      <ToastContainer/>
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
                    
        <div className="flex items-center justify-center grid-cols-3 gap-x-9 ">
           <button 
              className=" w-20 py-1 bg-blue-300 rounded-md ">
              <Link href="/login" className="text-blue-800 " >Login</Link>
           </button>

           <button 
              className=" w-20 py-1 bg-gray-200 rounded-md hover:bg-gray-400">
              <Link href="/signup" className="text-gray-600 ">Sign up</Link>
           </button>
        </div>
        <div className="grid gap-3 mb-4">
          Email
          <input
            placeholder="Email"
            type="text"
            name="email"
            className=" w-[400px] border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-3">
          Password
          <div className="relative w-[400px]">
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
                <img
                src={showPassword ? "/image/hide.png" : "/image/show.png"}
                alt={showPassword ? "Hide" : "Show"}
                className="h-5 w-5"
                />
            </button>
          </div>
        </div>
        <div className= "mb-4"></div>
        <div className="flex items-center justify-center ">
        <button className=" w-20 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-600 ">Log In</button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;