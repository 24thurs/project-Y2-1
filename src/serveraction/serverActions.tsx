"use server";

import "server-only";
import {
  SignupFormSchema,
  FormState,
  SessionPayload,
} from "@/app/(auth)/definitions";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

export async function valid(
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
  const userID = cookieStore.get("session");

  if (userID) return true;
  else return false;
};

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  // redirect("/");
}

export async function deleteSession(currentPath: string) {
  const cookieStore = await cookies();
  cookieStore.delete("session");

  if (currentPath !== "/") {
    redirect("/");
  }
}

export async function login(prevState: FormState, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password") as string;

  const resCheckUser = await fetch("http://localhost:3000/api/checkUser", {
    method: "POST",
    headers: {
      "Content-Type": "application-json",
    },
    body: JSON.stringify({ email }),
  });

  if (!resCheckUser.ok) {
    console.error("User not found");
    return { message: "", error: "user not found" };
  }
  const data = await resCheckUser.json();
  const passwordMatch = await bcrypt.compare(password, data.user.password);

  if (!passwordMatch) {
    return { message: "", error: "email or password is wrong" };
  }

  const userId = data.user._id.toString();
  await createSession(userId);

  return { message: "login successfully" };
}

export async function getProfile() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    console.error("Session not found in cookies.");
    return null;
  }

  const payload = await decrypt(session);
  if (!payload) {
    console.error("Failed to decrypt session.");
    return null;
  }

  const userId = payload.userId;
  const response = await fetch(`http://localhost:3000/api/profile/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch profile");
    return null;
  }

  const profile = await response.json();
  console.log(profile);
  return profile;
}

export async function postCourse(formData: FormData) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const rawData = Object.fromEntries(formData);

  if (!session) {
    console.error("Session not found in cookies.");
    return null;
  }

  const payload = await decrypt(session);
  if (!payload) {
    console.error("Failed to decrypt session.");
    return null;
  }

  const userId = payload.userId;

  const allData = { ...rawData, userId };

  console.log(allData);
  const response = await fetch(`http://localhost:3000/api/course`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(allData),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(data.error);
    return null;
  }

  console.log(data.message);
}

export async function getCourse() {
  try {
    const res = await fetch("http://localhost:3000/api/course", {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    const data = await res.json();
    data.courses = data.courses.map(course => {
      const matchingRoll = data.number_roll.find(roll => roll._id === course._id);
      return {
        ...course,
        count: matchingRoll ? matchingRoll.count : 0,
      };
    });
    console.log(data.courses)
    return data.courses;
  } catch (error) {
    console.log("Error loading posts: ", error);
    return [];
  }
}

export async function getCourseById(course_id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/course/${course_id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    const data = await res.json();
    console.log("Courses data:", data);
    return data;
  } catch (error) {
    console.log("Error loading posts: ", error);
    return [];
  }
}

export async function updateCourse(course_id: string, formData: FormData) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const rawData = Object.fromEntries(formData);

  if (!session) {
    console.error("Session not found in cookies.");
    return null;
  }

  const payload = await decrypt(session);
  if (!payload) {
    console.error("Failed to decrypt session.");
    return null;
  }

  const userId = payload.userId;
  const allData = { ...rawData, userId };

  console.log(allData)

  try {
    const res = await fetch(`http://localhost:3000/api/course/${course_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(allData),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data.error)
      throw new Error("Failed to update course");
    }
  } catch (error) {
    return;
  }
}


export async function enroll(course_id: string) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    console.error("Session not found in cookies.");
    return null;
  }

  const payload = await decrypt(session);
  if (!payload) {
    console.error("Failed to decrypt session.");
    return null;
  }

  const userId = payload.userId;

  try {
    const res = await fetch(`http://localhost:3000/api/enroll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, course_id }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data.error);
      throw new Error("Failed to enroll course");
    }
  } catch (error) {
    console.error("Error enrolling course:", error);
    return;
  }
}



export async function cancelEnroll(course_id: string) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    console.error("Session not found in cookies.");
    return null;
  }

  const payload = await decrypt(session);
  if (!payload) {
    console.error("Failed to decrypt session.");
    return null;
  }

  const userId = payload.userId;

  try {
    const res = await fetch(`http://localhost:3000/api/enroll`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, course_id }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data.error);
      throw new Error("Failed to cancel enrollment");
    }
  } catch (error) {
    console.error("Error canceling enrollment:", error);
    return;
  }
}