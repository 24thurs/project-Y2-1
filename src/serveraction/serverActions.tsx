"use server";

import { SignupFormSchema, FormState } from "@/app/(auth)/definitions";
// import { baseURL } from "@/config/config";

export async function signup(
  state,
  formData: FormData
): Promise<FormState> {
  // 1. Validate form fields
  const rawData = Object.fromEntries(formData);
  console.log(rawData);

  const validatedFields = SignupFormSchema.safeParse(rawData);

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const newData = { 
      userName: rawData.userName,
      fullName: rawData.fullName,
      email: rawData.email,
      phone: rawData.phone,
      password: rawData.password,
      role: rawData.role
  } 

  try {
    const res = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData), // include data in body
    });

    if (res.ok) {
      console.log("success");
    } 
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      errors: { form: ["An error occurred while submitting the form."] },
    };
  }
}
