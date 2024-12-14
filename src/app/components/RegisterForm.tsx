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
  
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="border border-gray-300 bg-blue-100 p-6 rounded-md max-w-2xl w-full shadow-lg">
   
    <div className="flex items-center justify-center text-xl mb-6 gap-10">
    <button 
        className=" w-20 py-1 bg-blue-100  rounded-md hover:bg-gray-300 ">
           <Link href="/login" className="text-gray-600 hover:underline" >Login</Link>
        </button>

        <button 
        className=" w-20 py-1 bg-blue-200  rounded-md">
           <Link href="/register" className="text-blue-600 ">Sign up</Link>
        </button>
    </div>


    <form
      action={formAction}
      className="text-lg grid gap-6"
    >
     
      <div className="grid grid-cols-2 gap-4">
        <div className="grid">
          <label>UserName</label>
          <input
            placeholder="Username"
            type="text"
            name="username"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="grid">
          <label>Name-Surname</label>
          <input
            placeholder="Name"
            type="text"
            name="realname"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
      </div>

     
      <div className="grid grid-cols-2 gap-4">
        <div className="grid">
          <label>Email</label>
          <input
            placeholder="Email"
            type="email"
            name="email"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="grid">
          <label>Phone Number</label>
          <input
            placeholder="Phone Number"
            type="text"
            name="phone"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      
      <div className="grid grid-cols-2 gap-4">
        <div className="grid">
          <label>Password</label>
          <input
            placeholder="Password"
            type="password"
            name="password"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="grid">
          <label>Confirm Password</label>
          <input
            placeholder="Confirm Password"
            type="password"
            name="Cpassword"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <label>Role:</label>
        <label className="flex items-center">
          <input
            type="radio"
            id="option-1"
            name="Status"
            value="Student"
            required
            className="mr-2"
          />
          Student
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            id="option-2"
            name="Status"
            value="Teacher"
            required
            className="mr-2"
          />
          Teacher
        </label>
      </div>
       {/* ฝากดูหน่อยอยากเปลี่ยนสีปุ่มตรงนี้ SubmitButton */}
      <div className="text-right ">
        <SubmitButton />
      </div>
    </form>

    {message && (
      <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2 transition-opacity duration-2000">
        {message}
      </div>
    )}
  </div>
</div>

  );
};
export default RegisterForm;
