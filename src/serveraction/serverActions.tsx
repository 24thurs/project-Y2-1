"use server";

import 'server-only'
import { SignupFormSchema, FormState, SessionPayload } from "@/app/(auth)/definitions";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

export async function signup(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  // 1. Validate form fields
  const rawData = Object.fromEntries(formData);

  const validatedFields = SignupFormSchema.safeParse(rawData);

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

}

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
    return null;
  }
}

export const checkCookie = async () => {
  const cookieStore = await cookies();
  const userID = cookieStore.get("user_id");

  if (userID) return true;
  else return false;
};

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });
  (await cookies()).set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  redirect("/dashboard");
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect('/login');
}

export async function login(prevState: FormState, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const resCheckUser = await fetch("http://localhost:3000/api/checkUser", {
    method: "POST",
    headers: {
      "Content-Type": "application-json",
    },
    body: JSON.stringify({ email }),
  });

  if (!resCheckUser.ok) {
    console.error("User not found");
    return { message: "user not found" };
  }
  const data = await resCheckUser.json();
  const passwordMatch = bcrypt.compare(password, data.user.password);

  if (!passwordMatch) {
    return { message: "wrong user or password" };
  }

  const userId = data.user._id.toString();
  await createSession(userId);

  return { message: "user found" };
}

export async function logout() {
  deleteSession();
}
