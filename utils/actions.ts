"use server";

import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

export const createCell = async (prevState, formData) => {
  await new Promise((resolve) => setInterval(resolve, 1000));

  //   const name = formData.get('name');
  //   const surname = formData.get('surname');
  const rawData = Object.fromEntries(formData);
  console.log(rawData);
  revalidatePath("/login"); //refresh data
  revalidatePath("/register"); //refresh data
  // redirect('/login')
  return "success!!";
};

export const fetchCell = async () => {
  const cells = [
    { id: 1, title: "a" },
    { id: 2, title: "b" },
    { id: 3, title: "c" },
  ];
  return cells;
};
