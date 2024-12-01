"use server";

import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

export const createCell = async (prevState: any, formData: FormData) => {
  await new Promise((resolve) => setInterval(resolve, 1000));

  const rawData = Object.fromEntries(formData);
  console.log(rawData);
  revalidatePath("/login"); //refresh data
  revalidatePath("/register"); //refresh data
  // redirect('/login')
  return "success!!";
};