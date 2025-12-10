"use server";

import { z } from "zod";
import { getUser } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const UpdateProfileSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  image: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
});

type FormState = {
  error: string | null;
  success: boolean;
};

export async function updateUserProfile(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const user = await getUser();
  if (!user) {
    return {
      error: "You must be logged in to update your profile.",
      success: false,
    };
  }

  const rawData = {
    name: formData.get("name"),
    image: formData.get("image"),
  };

  const validatedFields = UpdateProfileSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.name?.[0]
        || validatedFields.error.flatten().fieldErrors.image?.[0]
        || "Invalid data provided.",
      success: false,
    };
  }

  try {

    await auth.api.updateUser({
      body: { name: validatedFields.data.name, image: validatedFields.data.image },
      headers: await headers(),
    });

    return {
      error: null,
      success: true,
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      error: "An unexpected error occurred. Please try again.",
      success: false,
    };
  }
}
