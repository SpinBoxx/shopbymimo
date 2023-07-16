"use server";

import { auth } from "@clerk/nextjs";

interface AddStoreType {
  name: string;
}

export async function addStore(formData: FormData) {
  const data = {
    name: formData.get("name"),
  } as const;

  //   if (!name) throw new Error("Name is required");
}

interface UpdateStoreType {
  name: string;
  storeId: string;
}
export async function updateStore({ storeId, name }: UpdateStoreType) {
  return { error: true };
}
